

---

# ✈️ Airline Reservation System (Java Spring Boot + JSP)

A simple and fully functional **Airline Ticket Reservation System** built using **Spring Boot, JSP, Hibernate, and MySQL**.
Users can search flights, book tickets, choose food, view booking history, and cancel bookings.
Admins can add flights from the admin panel.

---

## 🚀 Features

### 👤 User Features

* Search available flights
* View flight details
* Book tickets
* Select optional food items
* View booking history
* Cancel booking

### 🛠️ Admin Features

* Login as admin
* Add new flights
* View all bookings

---

## 🛠️ Technologies Used

* **Java 21**
* **Spring Boot 4 (MVC + JPA + Hibernate)**
* **JSP + JSTL**
* **MySQL 8.0**
* **Maven**

---

## 📁 Project Structure

```txt
airline-reservation-system/
│
├── src/main/java/com/airline/airline_reservation_system/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   └── AirlineReservationSystemApplication.java
│
├── src/main/webapp/
│   ├── WEB-INF/views/        (JSP files)
│   ├── css/
│   └── index.jsp
│
└── pom.xml
```

---

## 🗃️ Database ER Diagram (Simplified)

```txt
 Flight   1 ──────── ∞   Booking   ∞ ──────── 1   User
               │
               ∞
               │
              Food
```

---

## 🛢️ Database Setup

Create a database:

```sql
CREATE DATABASE airdb;
```

---

## ⚙️ Application Configuration

Update **application.properties**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/airdb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

## ▶️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shahadatx21/AirlineReservationSystem.git
```

### 2️⃣ Open in IntelliJ / Eclipse

### 3️⃣ Run with Maven

```bash
mvn spring-boot:run
```

### 4️⃣ Visit in Browser

```
http://localhost:8081/
```

---

## 🔐 Default Admin Login

Insert admin into database:

```sql
INSERT INTO user(username, password, role)
VALUES ('admin', 'admin', 'ADMIN');
```

Then login at:

```
http://localhost:8081/login
```

---

## 💡 Future Enhancements 

* Payment integration
* JWT authentication
* Bootstrap UI
* Email booking confirmation

---

## 👨‍💻 Author

**Shubham **,
**Rudra Rajeev Srivastav**,
**Shahadat Hossain**

