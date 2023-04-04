import ImageRemoveBackground from "./ImageRemoveBackground";
import ImageForm from "./ImageForm";
import Spinner from "./Spinner";
import useCloudinary from "../hooks/useCloudinary";
import { IMAGE_STATUS } from "../constants/imageStatus";
import { API_KEY, CLOUDNAME, UPLOAD_PRESET } from "../constants/cloudinaryInfo";

const Main = () => {
  const { imageStatus } = useCloudinary();

  return (
    <>
      {imageStatus === IMAGE_STATUS.READY && <ImageForm />}
      {imageStatus === IMAGE_STATUS.UPLOADING && <Spinner />}
      {imageStatus === IMAGE_STATUS.DONE && <ImageRemoveBackground />}
    </>
  );
};

export default Main;
