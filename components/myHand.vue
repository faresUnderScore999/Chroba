<template>
 <div class="card">
  <img v-for="card in cards" :key="card.number+card.suit" :src="require(`~/static/cards/${card.number}_${card.suit}.png`)" alt="Card Image" />
  </div>  
</template>
<script>

export default{
    name:'MyHand',
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
.card img {
    width: 150px;
    height: 200px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 
}
.card {
  width: fit-content;
  height: fit-content;

  border-radius: 8px;
  overflow: hidden;
 
}
</style>