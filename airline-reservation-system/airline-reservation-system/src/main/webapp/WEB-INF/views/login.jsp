<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="/css/style.css">

<div class="container">
    <h2>Login</h2>

    <form action="/login" method="post">

        <label>Username</label><br>
        <input type="text" name="username" required><br><br>

        <label>Password</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Login</button>
    </form>

    <p style="color:red">
        ${error}
    </p>
</div>
