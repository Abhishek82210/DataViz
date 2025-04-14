import React, { useState } from "react";
import axios from "axios";

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [datasetName, setDatasetName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file || !datasetName) {
      alert("Please select a file and enter a dataset name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("datasetName", datasetName);

    try {
      const response = await axios.post(
        "https://wandering-jackelyn-my-backend-b9f6cca0.koyeb.app/api/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully");
      console.log("Server response:", response.data);
    } catch (error) {
      const errMsg = error?.message || error?.toString() || "Unknown error";
      console.error("Upload failed:", errMsg);

      if (
        errMsg.includes("CORS") ||
        errMsg.includes("Failed to fetch") ||
        errMsg.includes("NetworkError")
      ) {
        alert("Failed due to network or CORS error. Try again later.");
      } else {
        alert("Upload failed: " + errMsg);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload CSV File</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter dataset name"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DataUpload;
