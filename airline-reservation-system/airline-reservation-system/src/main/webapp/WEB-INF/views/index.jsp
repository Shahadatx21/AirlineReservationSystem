<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="/css/style.css">

<div class="navbar">
    <a href="/">Home</a>
    <a href="/history">My Bookings</a>
    <a href="/admin/bookings">Admin</a>
</div>

<div class="container">
    <h2>Available Flights</h2>

    <c:forEach var="flight" items="${flights}">
        <div class="card">
            <h3>${flight.source} → ${flight.destination}</h3>
            <p>Price: ₹${flight.price}</p>
            <p><b>Available Seats:</b> ${flight.totalSeats}</p>

            <form action="/book" method="post">

                <input type="hidden" name="flightId" value="${flight.flightId}">

                <label>Passenger Name:</label>
                <input type="text" name="passengerName" required />

                <label>Seats:</label>
                <input type="number" 
                       name="seats" 
                       min="1" 
                       max="${flight.totalSeats}" 
                       required />

                <label>Select Food:</label>
                <select name="foodId">
                    <option value="">No Food</option>

                    <c:forEach var="food" items="${foods}">
                        <option value="${food.foodId}">
                            ${food.name} - ₹${food.price}
                        </option>
                    </c:forEach>

                </select>

                <br><br>
                <button type="submit">Book Ticket</button>
            </form>
        </div>
    </c:forEach>
</div>

<div class="footer">
    © 2025 Airline Reservation System
</div>
