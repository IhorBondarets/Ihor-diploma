import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import { upload } from "../../services/request/request.service";

const Upload = forwardRef(({ children, onUpload, setImage , disabled, overlay = true }, ref) => {
  const id = useId();
  const [isLoading, setLoading] = useState(false);
  const [_drop, setDrop] = useState(false);
  const [file, setFile] = useState();

  const reset = () => {
    setLoading(false);
  };

  useEffect(() => {
    if(file){
        const objectUrl = URL.createObjectURL(file)
        setImage(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }
 }, [file])

  const handleRequest = () => {
    if (isLoading || !file) return;
    setLoading(true);
    const uploading = upload(file, 'http://localhost:8080/api/request', {isLoading: setLoading });
    uploading
      .then(onUpload)
      .catch((e) => {})
      .finally(reset);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const abortUploading = useRef();

  const abort = () => {
    abortUploading.current?.();
    reset();
  };

  const onDragLeave = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(false);
  };

  const onDragOver = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(true);
  };

  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setDrop(false);
    setFile(droppedFile);
  };
  const input = useRef();

  useImperativeHandle(ref, () => ({
    upload: () => input.current?.click(),
    abort,
  }));

  return (
    <div onDrop={handleDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} className="upload-container">
      <label htmlFor={id} className="label">
        <input
        className="input"
          ref={input}
          disabled={disabled}
          type="file"
          onChange={handleFileChange}
          id={id}
        />
      </label>
      <button onClick={handleRequest}>send image</button>
      {children}
      {isLoading && (
        <div>
        <p>Loading</p>
        </div>
      )}
    </div>
  );
});

export default Upload;
