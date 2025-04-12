# Real-Time Data Visualization Platform

![Screenshot 2025-04-12 144201](https://github.com/user-attachments/assets/0bb2b004-60e5-4128-9a12-190e9ce8da09) 
![Screenshot 2025-04-12 144350](https://github.com/user-attachments/assets/0bc07c41-f553-44ab-808f-82d0f44ac2db)
![Screenshot 2025-04-12 144308](https://github.com/user-attachments/assets/f193ae7b-0fe5-41fd-b1a4-74ea401920e7)  
![Screenshot 2025-04-12 144247](https://github.com/user-attachments/assets/3822c804-4b62-4ea5-8048-6e73d39e36fe)
![Screenshot 2025-04-12 144438](https://github.com/user-attachments/assets/1a5a07fa-6feb-4a9e-b9d5-71d4b97feb12)

 
*Visualize CSV data in real-time with interactive charts*

## 🚀 Features
- **CSV Upload**: Drag & drop or browse files
- **Multi-Chart Visualization**: Line, Bar, Pie charts
- **Real-Time Updates**: WebSocket-powered live data
- **Data Table**: View raw uploaded data
- **Responsive Design**: Works on desktop & mobile

## 🛠 Tech Stack
| Component       | Technology               |
|-----------------|--------------------------|
| Frontend        | React 18, Chart.js, Axios |
| Backend         | Spring Boot 3, WebSocket |
| Database        | MySQL 8                  |
| Build Tools     | Maven, npm               |

## 📁 Project Structure
```
data-visualization/
├── backend/ # Spring Boot Application
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/com/datavis/
│ │ │ │ ├── config/ # WebSocket, Security
│ │ │ │ ├── controller/ # REST & WebSocket endpoints
│ │ │ │ ├── model/ # JPA Entities
│ │ │ │ ├── repository/ # Spring Data JPA
│ │ │ │ ├── service/ # Business logic
│ │ │ │ └── DataVisApplication.java
│ │ │ └── resources/
│ │ │ ├── application.properties
│ │ │ └── static/ # React build output
│ │ └── test/ # Unit tests
│ └── pom.xml
│
├── frontend/ # React Application
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── DataUpload.js # File upload form
│ │ │ └── DataChart.js # Interactive charts
│ │ ├── services/
│ │ │ └── api.js # Axios configuration
│ │ ├── App.js # Main component
│ │ └── index.js # Entry point
│ ├── package.json
│ └── README.md
│
└── README.md # This file
```

## 🖥️ System Requirements
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.9+

## 🛠 Installation
### Backend Setup
```bash
cd backend
# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/datavis_db
spring.datasource.username=your_username
spring.datasource.password=your_password

mvn spring-boot:run
```
## Frontend Setup
```
cd frontend
npm install
npm start
```
## 🌐 API Endpoints
```
Endpoint	Method	Description
/api/data/upload	POST	Upload CSV file
/api/data/{dataset}	GET	Retrieve dataset
/ws	WS	WebSocket connection for updates
```

## 📊 Sample CSV Format
```
category,value
Temperature,25.5
Humidity,60
Pressure,1013.2
```
## 🚨 Troubleshooting Error	Solution
``
"category is not a scale"	--> Update Chart.js registrations
MySQL connection failed	--> Verify credentials in application.properties
WebSocket disconnect	--> Check Spring Boot logs
``

##Happy Visualizing! 🎉
