<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="/css/style.css">

<div class="container">
    <h2>Add Flight (Admin)</h2>

    <form action="/admin/add-flight" method="post">

        Source:
        <input type="text" name="source" required><br><br>

        Destination:
        <input type="text" name="destination" required><br><br>

        Price:
        <input type="number" step="0.01" name="price" required><br><br>

        Total Seats:
        <input type="number" name="totalSeats" required><br><br>

        <button type="submit">Add Flight</button>
    </form>

    <br><br>
    <a href="/admin/bookings">Back</a>
</div>
