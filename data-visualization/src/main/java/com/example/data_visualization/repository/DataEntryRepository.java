package com.example.data_visualization.repository;

import com.example.data_visualization.model.DataEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DataEntryRepository extends JpaRepository<DataEntry, Long> {
    List<DataEntry> findByDatasetName(String datasetName);
}