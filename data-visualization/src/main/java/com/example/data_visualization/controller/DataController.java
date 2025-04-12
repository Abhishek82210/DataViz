package com.example.data_visualization.controller;

import com.example.data_visualization.model.DataEntry;
import com.example.data_visualization.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @Autowired
    private DataService dataService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadData(
            @RequestPart("file") MultipartFile file,
            @RequestPart("datasetName") String datasetName) {

        try {
            // Validate file exists
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // Validate filename
            String filename = file.getOriginalFilename();
            if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                        .body("File must have .csv extension");
            }

            // Process valid file
            dataService.processCSV(file, datasetName);
            notifyClients(datasetName);

            return ResponseEntity.ok("File uploaded successfully!");

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/{datasetName}")
    public ResponseEntity<List<DataEntry>> getData(@PathVariable String datasetName) {
        try {
            return ResponseEntity.ok(dataService.getDataByDataset(datasetName));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // WebSocket notification method
    private void notifyClients(String datasetName) {
        try {
            List<DataEntry> data = dataService.getDataByDataset(datasetName);
            messagingTemplate.convertAndSend("/topic/data/" + datasetName, data);
        } catch (Exception e) {
            System.err.println("Failed to notify clients: " + e.getMessage());
        }
    }

    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Service is healthy");
    }
}