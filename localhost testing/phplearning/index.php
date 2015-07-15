<!DOCTYPE html>
<html>
    <title>My PHP Learning</title>
    <link rel="stylesheet" href="style.css" type="text/css">

    <body>


        <br>
        <form action="login.php" method="post" enctype="multipart/form-data">

            <center><div>
                    Username:
                    <input type="text" name="username" id="username" placeholder="Username">
                    <br><br>
                    Password:
                    <input type="text" name="password" id="password" placeholder="Password">
                    <br><br>
                    <input type="submit" value="Login" name="login">
                </div></center>
            <?php
            $test = '';
            $test2 = '';
            ?>
        </form>
        <br>
        <script>
            function  login(){
                var user = document.getElementById('username').value;
                var pswd = document.getElementById('password').value;
                
                    
        console.log(user,pswd);
        if(user && pswd)
        {
            if(user == pswd)
            {
                alert("Hello...! Welcome please click ok to redirect home page..");
                window.location = 'home.php';
            }
            else 
            {
                alert("Oopsss...! Can't Login because your credentials didn't match...");
            }
        }
        else
        {
            alert("Please Enter Both Fields...!");
        }
    }
       
        </script>
    </body>
</html>