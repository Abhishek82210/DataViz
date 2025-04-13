package com.example.data_visualization.controller;

import com.example.data_visualization.model.DataEntry;
import com.example.data_visualization.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = {
    "https://data-cbodtwzga-abhishek82210s-projects.vercel.app",
    "http://localhost:3000"
}, allowedHeaders = "*", allowCredentials = "true")
public class DataController {

    @Autowired
    private DataService dataService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadData(
            @RequestParam("file") MultipartFile file,
            @RequestParam("datasetName") String datasetName) {

        try {
            // Validate inputs
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", "File is empty")
                );
            }

            if (datasetName == null || datasetName.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", "Dataset name is required")
                );
            }

            // Validate file extension
            String filename = file.getOriginalFilename();
            if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(
                    Map.of("error", "Only CSV files are allowed")
                );
            }

            // Process file
            dataService.processCSV(file, datasetName);
            notifyClients(datasetName);

            return ResponseEntity.ok().body(
                Map.of("message", "File uploaded successfully")
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                Map.of("error", "Upload failed: " + e.getMessage())
            );
        }
    }

    @GetMapping("/{datasetName}")
    public ResponseEntity<?> getData(@PathVariable String datasetName) {
        try {
            List<DataEntry> data = dataService.getDataByDataset(datasetName);
            return ResponseEntity.ok().body(
                Map.of("data", data)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                Map.of("error", "Failed to fetch data: " + e.getMessage())
            );
        }
    }

    private void notifyClients(String datasetName) {
        try {
            List<DataEntry> data = dataService.getDataByDataset(datasetName);
            messagingTemplate.convertAndSend("/topic/data/" + datasetName, 
                Map.of("data", data)
            );
        } catch (Exception e) {
            System.err.println("WebSocket notification failed: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        try {
            // Add database health check if needed
            return ResponseEntity.ok(
                Map.of("status", "UP", "service", "Data Visualization API")
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(
                Map.of("status", "DOWN", "error", e.getMessage())
            );
        }
    }
}
