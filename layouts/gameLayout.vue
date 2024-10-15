<template  >
  <div style="position: absolute;
  width: 100%;
  height: 100%;">
   
 

  
      <!-- Main Content -->
      <main class="background-body" >
        <div>




  </div>
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
    head() {
    return {
      title: 'Play Chkobaa Online – Free with Friends or AI',
      meta: [
        { hid: 'description', name: 'description', content: 'Play Chkobaa online for free with friends or against AI. No signup required! Enjoy a classic card game with great features.' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: '♣︎ Chkobaa ♣︎' },
        { property: 'og:description', content: 'Play Chkobaa online for free with friends or against AI. No signup required!' },
        { property: 'og:url', content: 'https://chroba-yejj.vercel.app' },
        { property: 'og:image', content: 'https://www.my-voyance.fr/wp-content/uploads/2013/10/chkobba.gif' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' }
      ]
    }
  },


  }
  </script>
  
  <style scopped>
 .background-body {
  margin: 0 auto;
  background-image: url('~/static/background_global.png');

  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100% ;

  position: absolute;

}
@media (max-width: 480px) {
  .background-body  {
    margin: 0 auto;
    background-image: url("~/static/background_mobile.png");
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
  