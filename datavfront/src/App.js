import React, { useState, useEffect } from 'react';
import DataUpload from './components/DataUpload';
import DataChart from './components/DataChart';
import './App.css';

function App() {
  const [activeDataset, setActiveDataset] = useState(null);
  const [datasets, setDatasets] = useState([]);

  return (
    <div className="App">
      <h1>Real-Time Data Visualization</h1>
      <div className="container">
        <DataUpload 
          onUploadSuccess={(datasetName) => {
            setActiveDataset(datasetName);
            if (!datasets.includes(datasetName)) {
              setDatasets([...datasets, datasetName]);
            }
          }} 
        />
        {activeDataset && <DataChart datasetName={activeDataset} />}
      </div>
    </div>
  );
}

export default App;