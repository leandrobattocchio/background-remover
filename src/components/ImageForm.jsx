import React from "react";
import { CLOUDINARY_INFO } from "../constants/cloudinaryInfo";

const ImageForm = () => {
  return (
    <main>
      <form
        id="dropzone"
        className="dropzone-form"
        action={`https://api.cloudinary.com/v1_1/${CLOUDINARY_INFO.CLOUDNAME}/image/upload`}
      >
        <button type="button">Upload image</button>
        <span>or drop here</span>
      </form>
    </main>
  );
};

export default ImageForm;
