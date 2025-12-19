<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="/css/style.css">

<div class="navbar">
    <a href="/">Home</a>
    <a href="/booking/history">My Bookings</a>
</div>

<div class="container">
    <div class="card">
        <h2>Booking Confirmed ✅</h2>

        <p><b>Booking ID:</b> ${booking.bookingId}</p>
        <p><b>Passenger:</b> ${booking.passengerName}</p>
        <p><b>Seats:</b> ${booking.seatsBooked}</p>
        <p><b>Food:</b> ${booking.foodItem}</p>
        <p><b>Total Price:</b> ₹${booking.totalPrice}</p>

        <p><b>Route:</b> ${booking.flight.source} → ${booking.flight.destination}</p>

        <a href="/">Back to Home</a>
    </div>
</div>

<div class="footer">
    © 2025 Airline Reservation System
</div>
