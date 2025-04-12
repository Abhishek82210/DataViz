import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: `https://dataviz-wcmx.onrender.com/api/data/${datasetName}`, // Your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Data API endpoints
const DataService = {
  // Upload CSV file
  uploadData: (file, datasetName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('datasetName', datasetName);
    
    return api.post('/data/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Get dataset by name
  getDataset: (datasetName) => {
    return api.get(`/data/${datasetName}`);
  },

  // Get all dataset names (optional - for future expansion)
  getDatasetNames: () => {
    return api.get('/data/datasets');
  }
};

export default DataService;
