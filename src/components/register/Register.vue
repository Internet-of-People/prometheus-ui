<template>
  <div>
    <Header/>
    <div class="container">
        <h1>Register Account</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <label for="psw"><b>Handle</b></label>
        <input type="text" placeholder="@handle" name="psw" required>

        <label for="psw"><b>Name</b></label>
        <input type="text" placeholder="Enter Name" name="psw" required>

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" required>

        <div class='display-inline-flex'>
            <Button name="Create ID"/>
            <div class='id-copyval'>IezbeWGSY2dqcUBqT8K7R14xr</div>
            <i class="fa fa-copy" title="Copy" style="font-size:24px"></i>
        </div>
        <hr>
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
        <Button name="Register"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
export default {
  name: 'Register',
  components: {
    Header,
    Button
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/* Add padding to containers */
.container {
  padding: 16px;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}

.id-copyval{
    border: 1px solid black;
    margin: 2px 8px;
    width: 100%;
    padding: 12px;
}

i{
    margin: 12px;
}
</style>
