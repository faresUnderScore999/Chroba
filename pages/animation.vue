<template>
  <div>
    <div style="overflow: hidden" class="container">
      <img
        id="cloud_img"
        :src="require('~/static/cloud.png')"
        alt="cloud Image"
      />
      <el-button
        id="btn-hover"
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
      <div id="parent-container">
        <img
          id="mario_kart"
          :src="require('~/static/mario_kart.png')"
          alt="cloud Image"
        />
      </div>
      <!-- <h1>Toggle Light/Dark Mode</h1>
        <button >
         Mode
        </button> -->
    </div>
  </div>
</template>
  
  <script>
export default {
  auth: false,
  data() {
    return {};
  },
  methods: {},
};
</script>
  
    
    <style >
body {
  background: lightblue;
  text-align: center;
}
#btn-hover {
  position: absolute;
  right: 50%;
  top: 40%;

  transition: transform 1s;
}
#btn-hover:hover {
  background: lightcoral;
  transform: rotate(360deg);
}
#parent-container {
  overflow: hidden; /* This hides any overflowing content */
  position: absolute;

  width: 100%;
  height: 30%;
  bottom: 0%;
  left: 0%;
}
#mario_kart {
  position: absolute;

  bottom: 0%;
  left: 0%;
  animation-name: drive;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
@keyframes drive {
  0% {
    left: -10%;
  }
  100% {
    left: 110%;
  }
}
#cloud_img {
  /* transform: translateX(200px); */
  transform: scaleX(2);
}
</style>
    