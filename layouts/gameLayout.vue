<template  >
  <div style="position: absolute;
  width: 100%;
  height: 100%;">
   
      <!-- Header -->
      <!-- <header>
        <nav>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/game">Play Game</NuxtLink></li>
          </ul>
        </nav>
      </header> -->
  
      <!-- Main Content -->
      <main class="background-body" >
        <Nuxt />
      </main>
  
      <!-- Footer -->
      <!-- <footer>
        <p>&copy; 2024 Your Game App</p>
      </footer> -->
    </div>

  </template>
  
  <script>
  export default {
    css: [],
  }
  </script>
  
  <style scopped>
 .background-body {
  margin: 0 auto;
  background-image: url(/_nuxt/static/cards/background.PNG);
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100% ;

  position: absolute;

}
@media (max-width: 480px) {
  .background-body  {
    margin: 0 auto;
  background-image: url(/_nuxt/static/background-mobile.PNG);
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100%;

  position: absolute;
      }

   
    }


  header {
    background-color: #333;
    padding: 15px;
  }
  body{
    margin: 0;
  }
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin-right: 20px;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
    position: relative;
    bottom: 0;
    width: 100%;
  }
  </style>
  