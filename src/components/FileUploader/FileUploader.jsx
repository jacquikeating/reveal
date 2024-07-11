import { React, useState } from "react";
import axios from "axios";
import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk";
import "./FileUploader.scss";
import { key, secret } from "/src/utils/key.js";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

  async function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      console.log("Wrong file type");
    }
  }

  async function uploadFile() {
    setUploading(true);
    const S3_BUCKET = "reveal-images";
    const REGION = "us-east-2";

    AWS.config.update({
      accessKeyId: key,
      secretAccessKey: secret,
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      const cleanFileName = params.Key.replace(/\s/g, "+");
      const fileURL = `https://reveal-images.s3.us-east-2.amazonaws.com/${cleanFileName}`;
      setUploading(false);
      console.log("File upload successful. File URL is " + fileURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default FileUploader;
