import React, { useEffect, useState } from "react";
import DownloadImage from "./DownloadImage";
import { useStore } from "../hooks/useStore";
import "two-up-element";
import Loader from "./Loader";

const ImageRemoveBackground = () => {
  const [originalImage, changedImage, imageBlur] = useStore((state) => [
    state.imageOriginal,
    state.imageWithouBackground,
    state.imageWithBlur,
  ]);

  const [processingImage, setProcessingImage] = useState(true);
  let tries = 0;
  let intervalId;

  useEffect(() => {
    if (processingImage) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        tries++;
        const img = new Image();
        img.src = changedImage;
        img.onload = () => {
          setProcessingImage(false);
          clearInterval(intervalId);
        };
      }, 500);
    }
  }, []);

  return (
    <section>
      <two-up style={{ margin: "0px 12%" }}>
        <div className="image-comparation">
          <img src={originalImage} alt="Original image from user" />
        </div>
        <div className="image-comparation">
          {processingImage ? (
            <img
              src={imageBlur}
              alt="Image with blur while wait for the image without background"
            />
          ) : (
            <img
              src={changedImage}
              alt="Image from the user without background"
            />
          )}
        </div>
      </two-up>
      {processingImage ? <Loader /> : <DownloadImage to={changedImage} />}
    </section>
  );
};

export default ImageRemoveBackground;
