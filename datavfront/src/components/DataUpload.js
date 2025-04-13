import React, { useState } from 'react';
import axios from 'axios';
import './DataUpload.css';

const DataUpload = ({ onUploadSuccess }) => {
  const [datasetName, setDatasetName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ text: 'Please select a file', isError: true });
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setMessage({ text: 'File must have .csv extension', isError: true });
      return;
    }

    if (!datasetName.trim()) {
      setMessage({ text: 'Please enter a dataset name', isError: true });
      return;
    }

    if (datasetName.trim().toLowerCase() === 'upload') {
      setMessage({ text: "'upload' is a reserved dataset name", isError: true });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('datasetName', datasetName.trim());

    setIsUploading(true);
    setMessage({ text: 'Uploading...', isError: false });

    try {
      const response = await axios.post(
        'https://dataviz-wcmx.onrender.com/api/data/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000
        }
      );

      setMessage({ text: response.data, isError: false });
      onUploadSuccess(datasetName);

      setDatasetName('');
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);

      let errorMsg = 'Upload failed';

      if (error.response) {
        const serverMessage = error.response.data;
        if (typeof serverMessage === 'string') {
          if (serverMessage.includes("upload")) {
            errorMsg = "Dataset name cannot be 'upload'";
          } else if (serverMessage.includes("extension")) {
            errorMsg = "Please upload a valid .csv file";
          } else {
            errorMsg = serverMessage;
          }
        } else {
          errorMsg = "Server returned an unexpected error format";
        }
      } else if (error.request) {
        errorMsg = 'No response from server. Please try again later.';
      } else {
        errorMsg = error.message;
      }

      setMessage({
        text: errorMsg,
        isError: true
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dataset Name:</label>
          <input
            type="text"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="e.g., sensor_data"
            disabled={isUploading}
          />
        </div>

        <div className="form-group">
          <label>CSV File:</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={isUploading}
          />
          {file && (
            <div className="file-info">
              Selected: {file.name} ({Math.round(file.size / 1024)} KB)
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isUploading || !file || !datasetName.trim()}
        >
          {isUploading ? (
            <span className="upload-spinner">Uploading...</span>
          ) : (
            'Upload Data'
          )}
        </button>

        {message.text && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
      </form>

      <div className="csv-requirements">
        <h4>CSV Requirements:</h4>
        <ul>
          <li>Must have <code>.csv</code> extension</li>
          <li>First row should be headers (e.g., <code>category,value</code>)</li>
          <li>Maximum file size: 10MB</li>
        </ul>
        <pre>
          Example format:
          category,value
          temp,25.5
          humidity,60
        </pre>
      </div>
    </div>
  );
};

export default DataUpload;
