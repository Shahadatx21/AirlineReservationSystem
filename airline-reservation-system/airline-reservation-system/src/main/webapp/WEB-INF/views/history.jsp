<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="/css/style.css">

<div class="navbar">
    <a href="/">Home</a>
    <a href="/booking/history">My Bookings</a>
</div>

<div class="container">
    <h2>My Bookings</h2>

    <table border="1" cellpadding="8" width="100%">
        <tr>
            <th>ID</th>
            <th>Passenger</th>
            <th>Route</th>
            <th>Seats</th>
            <th>Food</th>
            <th>Total</th>
            <th>Action</th>
        </tr>

        <c:forEach var="b" items="${bookings}">
            <tr>
                <td>${b.bookingId}</td>
                <td>${b.passengerName}</td>
                <td>${b.flight.source} → ${b.flight.destination}</td>
                <td>${b.seatsBooked}</td>
                <td>${b.foodItem}</td>
                <td>₹${b.totalPrice}</td>

                <td>
                    <a href="/booking/cancel/${b.bookingId}"
                       onclick="return confirm('Cancel this booking?')">
                        Cancel
                    </a>
                </td>
            </tr>
        </c:forEach>

    </table>
</div>
