package com.example.data_visualization.service;

import com.example.data_visualization.model.DataEntry;
import com.example.data_visualization.repository.DataEntryRepository;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DataService {

    @Autowired
    private DataEntryRepository repository;

    public void processCSV(MultipartFile file, String datasetName) throws Exception {
        CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));
        String[] nextLine;

        // Skip header if exists
        reader.readNext();

        while ((nextLine = reader.readNext()) != null) {
            DataEntry entry = new DataEntry();
            entry.setDatasetName(datasetName);
            entry.setTimestamp(LocalDateTime.now());
            entry.setCategory(nextLine[0]);
            entry.setValue(Double.parseDouble(nextLine[1]));

            repository.save(entry);
        }
    }

    public List<DataEntry> getDataByDataset(String datasetName) {
        return repository.findByDatasetName(datasetName);
    }
}