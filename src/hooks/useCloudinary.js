import { useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { backgroundRemoval, blur } from "@cloudinary/url-gen/actions/effect";
import { useStore } from "./useStore";
import { CLOUDNAME, UPLOAD_PRESET, API_KEY } from "../constants/cloudinaryInfo";
import Dropzone from "dropzone";

const useCloudinary = () => {
    const [
        uploadImage,
        errorImage,
        doneImage,
        updatedOriginalImage,
        imageWithouBackground,
        imageWithBlur,
        imageStatus
    ] = useStore((state) => [
        state.imageUploading,
        state.imageError,
        state.imageDone,
        state.updatedOriginalImage,
        state.updatedImageWithouBackground,
        state.updatedBlurImage,
        state.imageStatus
    ]);


    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: CLOUDNAME,
        },
        url: {
            secure: true,
        },
    });

    useEffect(() => {
        let dropzone = new Dropzone("#dropzone", {
            uploadMultiple: false,
            acceptedFiles: ".jpg, .jpeg, .png, .webp",
            maxFiles: 1,
        });

        dropzone.on("sending", (file, xhr, formData) => {
            uploadImage();
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("timestamp", Date.now() / 1000);
            formData.append("api_key", API_KEY);
        });

        dropzone.on("success", (file, response) => {
            const { public_id: publicId, secure_url: url } = response;
            updatedOriginalImage(url);
            const imageWithoutBackground = cloudinary
                .image(publicId)
                .effect(backgroundRemoval());

            const imageBlur = cloudinary.image(publicId).effect(blur().strength(999));

            imageWithBlur(imageBlur.toURL());
            imageWithouBackground(imageWithoutBackground.toURL());
            doneImage();
        });

        dropzone.on("error", (file, response) => {
            errorImage();
        });

        return () => {
            dropzone.destroy();
        };
    }, []);

    return { imageStatus }
}

export default useCloudinary