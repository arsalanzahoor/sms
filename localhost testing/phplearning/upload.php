<?php

echo '<style>';
include 'style.css';
echo '</style>';
$increment=1;
$target_dir = "uploads/";
//echo $_POST["myText"];
//echo $_GET["k"];
//echo $test;
//echo basename($_FILES["fileToUpload"]["name"]);
//echo $string = implode(".", basename($_FILES["fileToUpload"]["name"]));
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
//        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
//        echo "File is not an image.";
        echo '<script>';
        echo 'alert("Sorry, No file is selected.");';
        echo 'window.location = "home.php";';
        echo '</script>';
        $uploadOk = 0;
    }
}

// Check if file already exists
if (file_exists($target_file)) {
    ++$increment;
    $name = pathinfo($_FILES['fileToUpload']['name'], PATHINFO_FILENAME);
    $extension = pathinfo($_FILES['fileToUpload']['name'], PATHINFO_EXTENSION);
    $basename = $name . $increment . '.' . $extension;
//    $_FILES["fileToUpload"]["name"] = ++$replace.".png";

    $target_file = $target_dir . $basename;
//    echo "Sorry, file already exists.";
//    echo "Replaced Version Of\r\n";
    $uploadOk = 1;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    
    $uploadOk = 0;
}
// Allow certain file formats
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif") {
    echo '<script>';
        echo 'alert("Sorry, only JPG, JPEG, PNG & GIF files are allowed...");';
        echo 'window.location = "home.php";';
        echo '</script>';
//    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
//        echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.";
        echo '<script>';
        echo 'alert("Conrats...! Your file is Uploaded");';
        echo 'window.location = "home.php";';
        echo '</script>';
    } else {
//        echo "Sorry, there was an error uploading your file.";
        echo '<script>';
        echo 'alert("Oopsss...! Cannot uploaded...");';
        echo 'window.location = "home.php";';
        echo '</script>';
    }
}
//echo '<a href=/home.php>' . '<input type="button" value="Ok" name="ok">' . '</a>';
?>