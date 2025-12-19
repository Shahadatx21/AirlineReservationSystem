✈️ Airline Reservation System
🛠️ Tech Stack

Java (Spring Boot, MVC)

Hibernate / JPA

JSP + JSTL

MySQL 8.0

📂 Project Structure
airline-reservation-system/
│
├── src/main/java/com/airline/airline_reservation_system/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── config/
│   └── AirlineReservationSystemApplication.java
│
├── src/main/webapp/
│   ├── pages/        (JSP files)
│   ├── css/
│   ├── images/
│   └── index.jsp
│
└── pom.xml

🗃️ Database ER Diagram
 Flight   1 ─── ∞   Booking   ∞ ─── 1   User
               │
               ∞
               │
              Food

🚀 How to Run the Project
1️⃣ Clone the repository
git clone https://github.com/Shahadatx21/AirlineReservationSystem.git

2️⃣ Open in IntelliJ / Eclipse
3️⃣ Create MySQL Database
CREATE DATABASE airdb;

4️⃣ Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/airdb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

5️⃣ Run the project
mvn spring-boot:run

6️⃣ Open in browser
http://localhost:8081/

🔐 Default Admin Login
INSERT INTO user(username, password, role)
VALUES ('admin', 'admin', 'ADMIN');
