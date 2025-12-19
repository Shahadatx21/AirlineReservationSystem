✈️ Airline Reservation System

A complete Java Spring Boot + JSP + MySQL based Airline Reservation System that allows users to search flights, book tickets, add food, view booking history, cancel bookings, and includes an admin panel to manage flights.

⭐ Features
👤 User Features

Search flights

Book tickets with seat validation

Choose optional food

Auto total fare calculation

View booking history

Cancel a booking

Beautiful responsive UI

🔐 Admin Features

Login with admin credentials

Add new flights

View all bookings

Cancel any booking

Manage seat availability

Professional admin console

🛠️ Tech Stack
Backend

Spring Boot (MVC)

Spring Data JPA (Hibernate)

Java 21

Frontend

JSP

HTML / CSS

JSTL

Database

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
│   ├── WEB-INF/
│   ├── pages/ (JSP files)
│   ├── css/
│   ├── images/
│   └── index.jsp
│
└── pom.xml


🧩 Database ER Diagram

┌──────────┐        ┌───────────┐        ┌──────────┐
│  Flight  │ 1───∞  │  Booking  │ ∞───1  │   User   │
└──────────┘        └───────────┘        └──────────┘
       │                   │
       │ 1───∞             │
       ▼                   ▼
┌──────────┐        ┌──────────┐
│   Food   │        │  Admin   │
└──────────┘        └──────────┘




🚀 How to Run the Project
1. Clone the repository
git clone https://github.com/your-username/AirlineReservationSystem.git

2. Open in IntelliJ / Eclipse
3. Create MySQL database
CREATE DATABASE airdb;

4. Update MySQL username/password in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/airdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

5. Run the Spring Boot Application
🔑 Admin Login

Use this default admin:

username: admin
password: admin123
