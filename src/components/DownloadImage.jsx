import React from "react";

const DownloadImage = ({ to }) => {
  return (
    <>
      <p className="download-image">
        Download this image, clicking{" "}
        <a href={to} target="_blank">
          here
        </a>
        !
      </p>
      <a href="/" target="_self">
        Try again!
      </a>
    </>
  );
};

export default DownloadImage;
