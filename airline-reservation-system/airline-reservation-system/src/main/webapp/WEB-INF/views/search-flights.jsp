<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<link rel="stylesheet" href="/css/style.css">

<div class="navbar">
    <a href="/">Home</a>
    <a href="/booking/history">My Bookings</a>
</div>

<div class="container">
    <h2>Search Flights</h2>

    <table border="1" cellpadding="8" width="100%">
        <tr>
            <th>Route</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Action</th>
        </tr>

        <c:forEach var="flight" items="${flights}">
            <tr>
                <td>${flight.source} → ${flight.destination}</td>
                <td>₹${flight.price}</td>
                <td>${flight.totalSeats}</td>

                <td>
                    <form action="/booking/book" method="post">
                        <input type="hidden" name="flightId" value="${flight.flightId}">

                        <label>Passenger:</label>
                        <input type="text" name="passengerName" required><br><br>

                        <label>Seats:</label>
                        <input type="number"
                               name="seats"
                               min="1"
                               max="${flight.totalSeats}"
                               required><br><br>

                        <label>Food:</label>
                        <select name="foodId">
                            <option value="">No Food</option>
                            <c:forEach var="f" items="${foods}">
                                <option value="${f.foodId}">
                                    ${f.name} - ₹${f.price}
                                </option>
                            </c:forEach>
                        </select>

                        <br><br>

                        <button type="submit">Book</button>
                    </form>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>
