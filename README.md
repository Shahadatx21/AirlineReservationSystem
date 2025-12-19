✈️ Airline Reservation System

A complete Java Spring Boot + JSP + MySQL based Airline Reservation System that allows users to search flights, book tickets, add food, view booking history, cancel bookings, and includes an admin panel to manage flights.

📌 Features
👤 User Features

Search available flights

Book a ticket

Select food while booking

View booking summary

Check booking history

Cancel booked tickets

Fully responsive JSP views

🛠️ Admin Features

Admin login

Add new flights

View all bookings

Manage flights & bookings

🧱 Tech Stack
Component	Technology
Backend	Spring Boot (Java 21)
Frontend	JSP, HTML, CSS
Database	MySQL
ORM	Spring Data JPA + Hibernate
Server	Embedded Tomcat
Build Tool	Maven
📂 Project Structure
airline-reservation-system/
 ├── src/main/java/com/airline/airline_reservation_system
 │    ├── controller/
 │    │     ├── HomeController.java
 │    │     ├── BookingController.java
 │    │     ├── AdminFlightController.java
 │    │     ├── LoginController.java
 │    │
 │    ├── model/
 │    │     ├── Booking.java
 │    │     ├── Flight.java
 │    │     ├── Food.java
 │    │     ├── User.java
 │    │
 │    ├── repository/
 │          ├── BookingRepository.java
 │          ├── FlightRepository.java
 │          ├── FoodRepository.java
 │          ├── UserRepository.java
 │
 ├── src/main/webapp/WEB-INF/jsp/
 │     ├── index.jsp
 │     ├── search-flights.jsp
 │     ├── result.jsp
 │     ├── history.jsp
 │     ├── add-flight.jsp
 │     ├── admin-bookings.jsp
 │     ├── login.jsp
 │
 ├── src/main/resources/
 │     ├── application.properties
 │
 ├── pom.xml
 └── README.md

🏗️ Database Setup (MySQL)

Create a new database:

CREATE DATABASE airdb;


Add this in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/airdb
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true

▶️ How to Run
1️⃣ Clone the repository
git clone https://github.com/Shahadatx21/AirlineReservationSystem.git

2️⃣ Open in any IDE

IntelliJ

Eclipse

VS Code (with Java extensions)

3️⃣ Start MySQL Server
4️⃣ Run the Spring Boot Application

Run this file:

AirlineReservationSystemApplication.java

5️⃣ Open in browser
http://localhost:8081/
