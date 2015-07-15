<?php

echo '<style>';
include 'style.css';
echo '</style>';
$user = $_POST["username"];
$pass = $_POST["password"];
if ($user == '' || $pass == '') {
    echo '<script>';
    echo 'alert("Please Enter Both Fields...!");';
    echo 'window.location = "index.php";';
    echo '</script>';
} else {
//MySql connection details.
    $servername = "localhost";
    $username = "root";
    $password = "123";
    $dbname = "test";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "Select * FROM users where username='" . $user . "' and password='" . $pass . "'";
//    where username=".$user."and password=".$pass;

    $result = $conn->query($sql);
//echo var_dump($result);
    if ($result->num_rows > 0) {
        echo '<script>';
        echo 'alert("Hello...! Welcome please click ok to redirect home page..");';
        echo 'window.location = "home.php";';
        echo '</script>';
    } else {
        echo '<script>';
        echo 'alert("Oopsss...! Cannot Login because your credentials did not match...");';
        echo 'window.location = "index.php";';
        echo '</script>';
    }
    $conn->close();
}
?>
