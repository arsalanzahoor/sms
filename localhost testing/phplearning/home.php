<!DOCTYPE html>
<html>
    <title>Home PHP Learning</title>
    <link rel="stylesheet" href="style.css" type="text/css">

    <body>
        <?php
//        echo '<style>';
//        include 'style.css';
//        echo '</style>';
        //***************Begin Practice Code from W3Schools***************

        /*
          $x = 5985;
          var_dump($x);
          $y = 10;
          echo $x % $y;
          ?>

          <?php
          $cars = array("Volvo", "BMW", "Toyota");
          var_dump($cars);
          ?>

          <?php

          class Car {

          function Car() {
          $this->model = "VW";
          }

          }

          // create an object
          $herbie = new Car();

          // show object properties
          echo $herbie->model;
          ?>
          <br>

          <?php
          $string = "Hello world!";
          $string2;
          for ($i = 0, $j = strlen($string) - 1; $i < strlen($string), $j >= 0; $i++, $j--) {
          $string2[$i] = $string[$j];
          }
          echo $string;
          echo var_dump($string2);

          echo $string . "...***..." . implode("", $string2);
          //        echo strlen($string); // outputs 12
          ?>

          <br>

          <?php
          define("GREETING", "Welcome to W3Schools.com!", TRUE);
          echo greeting;
          ?>
          <br>
          <?php
          $t = date("H");

          if ($t < "12") {
          echo "Have a good day!";
          } else if ($t > "15") {
          echo "Have a good Afternoon!";
          } else {
          echo "Have a good night!";
          }
          ?>
          <br>

          <!DOCTYPE html>
          <html>
          <body>

          <?php
          $x = 1;

          do {
          echo "The number is: $x <br>";
          $x++;
          } while ($x <= 5);
          ?>
          <br>
          <?php
          $cars = array("Volvo", "BMW", "Toyota");
          //            $arrlength = count($cars);

          for ($x = 0; $x < count($cars); $x++) {
          echo $cars[$x];
          echo "<br>";
          }
          ?>
          <br>
          <?php
          $cars = array("Volvo" => "300", "BMW" => "500", "Toyota" => "250");
          //            $arrlength = count($cars);
          $cars["Mercedes"] = "900";

          class carAdd {

          function carAdd($name, $price) {
          $this->carName = $name;
          $this->carPrice = $price;
          }

          }

          class carAdd2 extends carAdd {

          function carAdd2($name, $price) {
          carAdd::carAdd($name, $price);
          }

          }

          $newcar = new carAdd("Nissan", "1500");
          $cars[$newcar->carName] = $newcar->carPrice;
          $newcar2 = new carAdd2("FOXI", "1200");
          $cars[$newcar2->carName] = $newcar2->carPrice;
          foreach ($cars as $x => $x_value) {
          //                echo $cars[$x];
          echo "Car Type Is $x and Price is:$x_value";
          echo "<br>";
          }
          ?>
          <br>
          <?php
          echo "Today is " . date("Y/m/d") . "<br>";
          echo "Today is " . date("Y.m.d") . "<br>";
          echo "Today is " . date("Y-m-d") . "<br>";
          echo "Today is " . date("l");
          ?>
          <br>
          <?php
          $d = strtotime("tomorrow");
          echo date("Y-m-d h:i:sa", $d) . "<br>";

          $d = strtotime("next Saturday");
          echo date("Y-m-d h:i:sa", $d) . "<br>";

          $d = strtotime("-26 Years -8 months +1 day");
          echo date("Y-m-d h:i:sa", $d) . "<br>";
          ?>
          <br>
          <?php
          $d1 = strtotime("July 04 1988");
          $d2 = ceil((time() - $d1) / 60 / 60 / 24);
          echo "There are " . $d2 . " days passed from 4th of July 1988.";
          ?>
          <br>
          <?php
          $myfile = fopen("myfile.txt", "r") or die("Unable to open file!");
          while (!feof($myfile)) {
          //                echo fgets($myfile)."<br>";
          echo fgets($myfile) . "<br>";
          }
          //            echo fread($myfile, filesize("myfile.txt"));
          fclose($myfile);
          ?>
          <br>
          <?php
          $myfile2 = fopen("newfile.txt", "w") or die("Unable to open file!");
          $txt = "Mickey Mouse\r\n";
          fwrite($myfile2, $txt);
          $txt = "Minnie Mouse\n";
          fwrite($myfile2, $txt);
          fclose($myfile2);
          ?>
          <br>
          <form action="upload.php" method="post" enctype="multipart/form-data">
          Select image to upload:
          <input type="file" name="fileToUpload" id="fileToUpload">
          <input type="submit" value="Upload Image" name="submit">
          </form>
          <br>
          <?php
          echo $str = "<h1>Hello World!</h1>";
          $newstr = filter_var($str, FILTER_SANITIZE_STRING);
          echo $newstr;
          ?>
          <br>
          <?php
          $servername = "localhost";
          $username = "root";
          $password = "786ab786";
          $dbname = "dpemployeedb";

          // Create connection
          $conn = new mysqli($servername, $username, $password, $dbname);

          // Check connection
          if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
          }
          echo "Connected successfully" . "<br>";

          $sql = "SELECT * FROM employee";
          $result = $conn->query($sql);

          if ($result->num_rows > 0) {
          // output data of each row
          while ($row = $result->fetch_assoc()) {
          echo "EmployeeId: " . $row["EmployeeID"] . " - Name: " . $row["FirstName"] . " " . $row["LastName"] . "<br>";
          }
          } else {
          echo "0 results";
          }

          try {
          $conn->close();
          echo "Connection Closed";
          } catch (Exception $e) {
          echo "Exception caught:" . $e->getMessage();
          }
          ?>
          <br>


         */


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

        $sql = "Select * FROM users";
//          $sql = "DELETE FROM employee WHERE EmployeeID between 12 and 25";
//                      $sql = "INSERT INTO employee (FirstName, LastName, MainID)
//          VALUES ('test', 'test', '0000');";
//                      $sql .= "INSERT INTO employee (FirstName, LastName, MainID)
//          VALUES ('test1', 'test1', '0000');";
//                      $sql .= "INSERT INTO employee (FirstName, LastName, MainID)
//          VALUES ('test2', 'test2', '0000')";

        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            echo '<br>' . '<u><b><center>Esajee Employees List/Data Examples</u>' . '<br><br>';
            echo '#1 Within PHP Tag';
            echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            echo '#2 With HTML Style In PHP Tag</b>' . '<br><br>';
            echo '<table class=table1><tr>';
            echo '<th class=th>' . "Id" . '</th>';
            echo '<th class=th>' . "Employee Name" . '</th>';
            while ($row = $result->fetch_assoc()) {
                echo '<tr>';
                echo '<td class=td>' . $row["username"] . '</td>';
                echo '<td class=td>' . $row["password"] . '</td>';
//                echo '<td class=td>' . $row["FirstName"] . " " . $row["LastName"] . '</td>';
                echo '</tr>';
            }
            echo '</center></table>';
        }


        // prepare and bind
//          $stmt = $conn->prepare("INSERT INTO employee (FirstName, LastName, MainID) VALUES (?, ?, ?)");
//          $stmt->bind_param("ssi", $firstname, $lastname, $mainid);
        // set parameters and execute
//          $firstname = "John";
//          $lastname = "Doe";
//          $mainid = "0000";
//          $stmt->execute();
//
//          $firstname = "Mary";
//          $lastname = "Moe";
//          $mainid = "0000";
//          $stmt->execute();
//
//          $firstname = "Julie";
//          $lastname = "Dooley";
//          $mainid = "0000";
//          $stmt->execute();
//
//          echo "New records created successfully";
//
//          $stmt->close();


        $conn->close();
        ?>
        <!--<u><b>Employee List Example#2 with HTML Syntax</b></u>-->
        <table class="table1">
            <tr>
                <th>Id</th>
                <th>Employee Name</th>
            </tr>

            <?php
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

            $sql = "Select * FROM users";

            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
//                echo var_dump($result);
//                $inc = 0;
                while ($row = $result->fetch_assoc()) {

                    echo '<tr>';
                    echo '<td class=td>' . $row["username"] . '</td>';
//                    $sql2 = "drop table " . $row["Tables_in_sms"];
//                    $result2 = $conn->query($sql2);
//                    if ($result2->num_rows > 0) 
//                    echo '<td class=td>' . var_dump($result2) . '</td>';

                    echo '<td class=td>' . $row["password"] . '</td>';
//                    echo '<td class=td>' . $row["FirstName"] . " " . $row["LastName"] . '</td>';
                    echo '</tr>';
//                    $inc++;
                }
            }
            $conn->close();
            ?>

        </table>
        <br><br>
        <?php
//***************End Practice Code from W3Schools***************
//***************Begin Practice Code from PHP The RightWay***************
//<?php 

        $raw = '22-12-1990';
//        $start = DateTime::createFromFormat('d.m.Y', $raw);
        $start = new DateTime($raw);
        echo 'Esajee Established Since:' . $start->format('Y-m-d') . "<br>";

        // create a copy of $start and add one month and 6 days
        $end = clone $start;
        $end->add(new DateInterval('P1M8D'));

        $diff = $end->diff($start);
        echo 'Difference: ' . $diff->format('%y year, %m month, %d days (total: %a days)') . "<br>";
// Difference: 1 month, 6 days (total: 37 days)
        // output all thursdays between $start and $end
        $periodInterval = DateInterval::createFromDateString('first sunday');
        $periodIterator = new DatePeriod($start, $periodInterval, $end, DatePeriod::EXCLUDE_START_DATE);
        foreach ($periodIterator as $date) {
            // output each date in the period
            echo $date->format('Y-m-d') . ' ';
        }

//        $a = '';
//        $b = 10;
//        echo var_dump($a == '5') . "<br>";
//        echo var_dump($b) . "<br>";
        /**
         * Strict comparisons
         */
//        if (strpos('testing', 'test') !== false) {    // 'test' is found at position 0, which is interpreted as the boolean 'false'
//            echo strpos("myFirsttesting", "s") . "<br>";
//        }
//        echo ($a);
//        echo ($a) ? (($a == 5) ? 'yay' : 'nay') : (($b == 10) ? 'excessive' : ':(');
//***************End Practice Code from PHP The RightWay***************
        ?>
        <br><br>
        <?php
        $name = 'Test';
//        echo '<script>';
//        echo "$.post('script.php', { num: 5 }, function(result) {alert(result);});";
//        <echo '</script>';
        ?>
        <br>
<!--        <script >
            $.post('script.php', {num : 5}, function(result) {
                alert("Result:",result);
            });
        </script>-->
        <br>
        <form action="upload.php" method="post" enctype="multipart/form-data">

            <b><u>Select image to upload:</u></b>
            <input type="file" name="fileToUpload" id="fileToUpload">
            <!--<input type="text" name="myText" value="" id="myText">-->

            <input type="submit" value="Upload Image" name="submit">
        </form>
        <br>
        <input type="button" value="Logout" name="logout" onclick="logout()">
        <!--<center></center>-->
        <br>
        <script>
            function  logout(){
//                post('script.php', {num : 5}, function(err,result) {
//                    alert("Error:",err);
//                    alert("Result:",result,err);
//                });
                alert("Good Bye...!");
                window.location = 'index.php';
            }
        </script>
    </body>
</html>