<template>
    <div class="card">
       <img v-for="i in nbcards" :key="i" :src="require('~/static/cards/Chkobba_back.png')" alt="Card Image" />
     </div>  
   </template>
   <script>
   
   export default{
    props: {
    nbcards: {
      type: Number,
    },
  },
     
       data(){
           return{
   
           }
       }
   }
   
   </script>
   
   <style scoped>
   .card img {
    width: 73px;
    height: 110px;
     object-fit: cover;
     margin: 4px;
   }
   .card {
     width: fit-content;
     height: fit-content;
     
     border-radius: 8px;
     overflow: hidden;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     display: inline;
   }
   @media (max-width: 480px) {
    .card img {
    width: 40px;
    height: 60px;
     object-fit: cover;
     margin: 4px;
   }}
   </style>