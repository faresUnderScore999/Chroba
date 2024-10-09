<template>
    <div class="cardTapi">
       <img v-for="card in cards" :key="card.number+card.suit" :src="require(`~/static/cards/${card.number}_${card.suit}.png`)" alt="Card Image" />

     </div>  
   </template>
   <script>
   
   export default{
  
    props: {
    // eslint-disable-next-line vue/require-default-prop
    cards: {
      type: undefined,
    }},
       data(){
           return{
   
           }
       }
   }
   
   </script>
   
   <style scoped>
   .cardTapi img {
       width: 100px;
       height: 150px;
     object-fit: cover;
     margin: 4px;
   }
   .cardTapi {
     width: fit-content;
     height: fit-content;
     
     border-radius: 8px;
     overflow: hidden;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     display: inline;
   }
   </style>