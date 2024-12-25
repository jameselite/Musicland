<script setup>
const token = $cookies.get("AccessToken");
</script>

<template>
  <div class="header"></div>
  <h1 class="thetitle">Music API</h1>
  <div v-if="!token">
    <h1 class="login">Login</h1>
    <h1 class="register">Register</h1>
    <h1 class="alltracks">Tracks</h1>
  </div>
  <div v-else>
    <h2 class="mypanel">Panel</h2>
    <h2 class="upload">Upload</h2>
  </div>

  <h1 class="intro">Music is The language of Art , Let's speak with each other :))</h1>
  <h1 class="intro2">Listen, Upload, and Enjoy songs with the MusicAPI</h1>
  <h1 class="intro3"> This website is created by soroushGH with Express js as backend and Vue js and Vannila CSS as front end.
    <br>
    <br>
    source is available in Github at : 
    <br>
    <br>
    <a href="https://github.com/jameselite/music_api" style="color: greenyellow;">https://github.com/jameselite/music_api</a> </h1>

  <img src="./assets/pixlr-image-generator-464312cc-5b51-4a6f-be77-8cb70cdf0c2f.png" class="homepicture">
  
  <div class="footer">
    <h1 id="about">About us</h1>
    <h1 id="api">API documentation</h1>
    <h1 id="privacy">Privacy and Policy</h1>
    <h1 id="contact">Contact us</h1>
    <h1 id="support">Support</h1>
    <h1 id="faq">FAQ</h1>
  </div>
</template>

<style scope>
.header {
    width:100%;
    height: 47px;
    box-sizing: border-box;
    margin-top: -1px;
    background-color: #944786;
  }
  .thetitle {
    color: rgb(248, 248, 248);
    position: absolute;
    top: 1.2%;
    margin-left: 20px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 25px;
  }
  .mypanel {
    color: rgb(255, 255, 255);
    position: absolute;
    top: 1.6%;
    right: 1%;
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
  }
  .login {
    color: rgb(255, 255, 255);
    position: absolute;
    top: 1.6%;
    right: 9%;
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
  }
  .register {
    color: rgb(255, 255, 255);
    position: absolute;
    top: 1.6%;
    right: 1%;
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
}
  .homepicture {
    width: 350px;
    height: 350px;
    margin-top: 60px;
    margin-left: 20px;
    border-radius: 40px;
    border: 10px white solid;
  }
  .alltracks {
    color: rgb(255, 255, 255);
    position: absolute;
    top: 1.6%;
    right: 16%;
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
  }
  .intro{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 360px;
    position: absolute;
    top: 20%;
    right: 33%;
    width: 490px;
  }
  .intro2{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 360px;
    font-size: 15px;
    position: absolute;
    top: 40%;
    right: 33%;
    width: 490px;
  }
  .intro3{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 360px;
    font-size: 15px;
    position: absolute;
    top: 48%;
    right: 33%;
    width: 490px;
  }
  body {
    background-color: rgb(27, 27, 27);
  }
  .footer{
    width: 100%;
    background-color: black;
    height: 30px;
    position: absolute;
    bottom: 0%;
  }
  #about{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 360px;
    font-size: 14px;
    position: absolute;
    top: 18%;
    left: -24%;
    width: 490px;
  }
  #support{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 360px;
    font-size: 14px;
    position: absolute;
    top: 18%;
    left: -10%;
    width: 490px;
  }
  #privacy{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    font-size: 14px;
    position: absolute;
    top: 18%;
    right: 20%;
    width: 140px;
  }
  #contact{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    margin-left: 700px;
    font-size: 14px;
    position: absolute;
    top: 18%;
    width: 100px;
  }
  #api{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    font-size: 14px;
    position: absolute;
    top: 18%;
    margin-left: 400px;
    width: 490px;
  }
  #faq{

    font-family:Verdana, Geneva,Arial, Helvetica, sans-serif;
    color: white;
    font-size: 14px;
    position: absolute;
    top: 18%;
    margin-left: 1250px;
    width: 100px;
  }
</style>