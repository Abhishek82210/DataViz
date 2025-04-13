import React, { useState } from 'react';
import axios from 'axios';
import './DataUpload.css';

const DataUpload = ({ onUploadSuccess }) => {
  const [datasetName, setDatasetName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isUploading, setIsUploading] = useState(false);

  const resetForm = () => {
    setDatasetName('');
    setFile(null);
  };

  const handleApiError = (error) => {
    let errorMsg = 'Upload failed';

    try {
      if (error.response) {
        const responseData = error.response.data;

        if (typeof responseData === 'string') {
          // Only call .includes if responseData is a string
          if (responseData.includes("extension")) {
            errorMsg = "Please upload a valid .csv file";
          } else {
            errorMsg = responseData;
          }
        } else if (typeof responseData === 'object' && responseData !== null) {
          errorMsg = responseData.error || responseData.message || 'Server error occurred';
        } else {
          errorMsg = 'Server error occurred';
        }

        // Handle specific status codes
        if (error.response.status === 405) {
          errorMsg = 'Upload method not allowed. Please check the backend endpoint.';
        } else if (error.response.status === 413) {
          errorMsg = 'File too large (max 10MB)';
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMsg = 'Request timed out';
      } else if (error.request) {
        errorMsg = 'No server response';
      } else {
        errorMsg = error.message || 'Unknown error occurred';
      }
    } catch (err) {
      console.error('Error parsing error response:', err);
      errorMsg = 'An unexpected error occurred';
    }

    setMessage({ text: errorMsg, isError: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = datasetName.trim();

    // Validation
    if (!file) {
      setMessage({ text: 'Please select a file', isError: true });
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setMessage({ text: 'Only CSV files are allowed', isError: true });
      return;
    }

    if (!trimmedName) {
      setMessage({ text: 'Dataset name is required', isError: true });
      return;
    }

    // Optional: Prevent using reserved name "upload" (if necessary)
    if (trimmedName.toLowerCase() === 'upload') {
      setMessage({ text: "'upload' is a reserved dataset name", isError: true });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('datasetName', trimmedName);

    setIsUploading(true);
    setMessage({ text: 'Uploading...', isError: false });

    try {
      const response = await axios.post(
        'https://dataviz-wcmx.onrender.com/api/data/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000,
          withCredentials: true
        }
      );

      // Handle successful response
      let resMessage = 'Upload successful';
      if (typeof response.data === 'string') {
        resMessage = response.data;
      } else if (response.data?.message) {
        resMessage = response.data.message;
      }
      setMessage({ text: resMessage, isError: false });
      
      if (typeof onUploadSuccess === 'function') {
        onUploadSuccess(trimmedName);
      }
      resetForm();

    } catch (error) {
      handleApiError(error);
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
            placeholder="e.g., sensor_readings"
            disabled={isUploading}
          />
        </div>

        <div className="form-group">
          <label>CSV File:</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={isUploading}
              id="csvFile"
            />
            <label htmlFor="csvFile" className="file-input-label">
              {file ? file.name : 'Choose file'}
            </label>
          </div>
          {file && (
            <div className="file-info">
              Size: {(file.size / 1024).toFixed(2)} KB
            </div>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isUploading || !file || !datasetName.trim()}
        >
          {isUploading ? 'Uploading...' : 'Upload Data'}
        </button>

        {message.text && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default DataUpload;
