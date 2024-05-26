import React, { useRef, useState } from "react";
import Upload from "./Upload/Upload";
import { getFile } from "../services/request/request.service";

export default function Footer() {
  const [url, setUrl] = useState();
  const uploadRef = useRef();
  const onUpload = (data) => {
    if (data.image_name) {
      setUrl(data.image_name);
      getFile(data.text_file)
    }
  };
  return (
    <footer>
      <Upload ref={uploadRef} onUpload={onUpload} setImage={setUrl}>
        <img
          src={url}
          alt=""
          className="image"
        />
      </Upload>
      <button onClick={() => uploadRef.current.upload()}>Select File</button>
    </footer>
  );
}
