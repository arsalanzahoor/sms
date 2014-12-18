function validate()
{
    
var username=document.getElementById('user_name').value();
var password=document.getElementById('pass_word').value();
if(username.length>1 &&  password.length>1)
    {
        return true;
    }
    else
        {
            alert("Username or Password Empty! Please Try Again");
            return false;
        }
        //return
}
