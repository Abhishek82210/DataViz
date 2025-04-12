package com.example.data_visualization.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


import java.time.LocalDateTime;

@Entity
public class DataEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String datasetName;
    private LocalDateTime timestamp;
    private String category;
    private double value;

    // Default constructor (required by JPA)
    public DataEntry() {
    }

    // Constructor with parameters
    public DataEntry(String datasetName, LocalDateTime timestamp, String category, double value) {
        this.datasetName = datasetName;
        this.timestamp = timestamp;
        this.category = category;
        this.value = value;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDatasetName() {
        return datasetName;
    }

    public void setDatasetName(String datasetName) {
        this.datasetName = datasetName;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    // toString() method for debugging
    @Override
    public String toString() {
        return "DataEntry{" +
                "id=" + id +
                ", datasetName='" + datasetName + '\'' +
                ", timestamp=" + timestamp +
                ", category='" + category + '\'' +
                ", value=" + value +
                '}';
    }

    // equals() and hashCode() methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataEntry dataEntry = (DataEntry) o;

        return id != null ? id.equals(dataEntry.id) : dataEntry.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}