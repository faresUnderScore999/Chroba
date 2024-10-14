<template>
  <div
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="background-main"
  >
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />

    <audio ref="backgroundMusic" loop>
      <source src="/elghostman.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
    <img
      id="table_login"
      :src="require(`~/static/tarot-chkobba.png`)"
      alt="Card Image"
    />
    <form @submit.prevent="login">
      <img
        class="btn_img"
        :src="require(`~/static/cards/btn2.png`)"
        alt="Card Image"
        @click="dialogFormVisible = true"
      />
      <img
        class="btn_img"
        :src="require(`~/static/cards/btn1.png`)"
        alt="Card Image"
        @click="dialogFormVisibleJoin = true"
      />
      <img
        class="btn_img"
        :src="require(`~/static/cards/btn3.png`)"
        alt="Card Image"
        @click="playVSai"
      />

      <!-- Dialog for Room ID -->
      <el-dialog width="95%" :visible.sync="dialogFormVisible">
        <div style="display: grid; justify-content: center">
          <input
            v-model="username"
            type="text"
            placeholder="اسمك هنا"
            required
          />
          <br />
          <label>عدد اللاعبين:</label>
          <br />
          <el-input-number
            v-model="nbPlayer"
            :min="2"
            :max="4"
            :step="2"
          ></el-input-number>
          <p v-if="error">{{ error }}</p>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitRoomID">إنشاء لعبة</el-button>
        </span>
      </el-dialog>

      <el-dialog width="95%" :visible.sync="dialogFormVisibleJoin">
        <div style="display: grid; justify-content: center">
          <input
            v-model="username"
            type="text"
            placeholder="اسمك هنا"
            required
          />
          <br />
          <label>Room ID:</label>
          <el-input
            v-model="roomID"
            type="text"
            placeholder="Room ID"
            autocomplete="off"
          ></el-input>
          <p v-if="error">{{ error }}</p>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitRoomID"
            >الانضمام إلى اللعبة</el-button
          >
        </span>
      </el-dialog>
    </form>
    <footer style="color: aliceblue">
      <p>&copy; 2024 Monkey.zip. All rights reserved.</p>
      <p>
        Contact us:
        <a style="color: aliceblue" href="mailto:benalifares@gmail.com"
          >benalifares999@gmail.com</a
        >
        <a
          style="margin: 10px"
          href="https://www.facebook.com/fares.ben.735507/"
          target="_blank"
        >
          <i class="fab fa-facebook"></i>
          <!-- Font Awesome Facebook Icon -->
        </a>
        <a href="https://www.instagram.com/ben_ali_fares.zip/" target="_blank">
          <i class="fab fa-instagram"></i>
          <!-- Font Awesome Instagram Icon -->
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  layout: "gameLayout",
  middleware: false,
  auth: false,
  data() {
    return {
      loading: false,
      dialogFormVisibleJoin: false,
      dialogFormVisible: false,
      username: "",
      roomID: "",
      error: "",
      nbPlayer: 2,
    };
  },
  async mounted() {
    this.$refs.backgroundMusic.play();
    this.RoomID = this.$route.query.roomID;
  },
  methods: {
    playVSai() {
      this.username = "PLAYER";
      this.nbPlayer = 1;
      this.login();
    },
    async login() {
      try {
        // Call the login endpoint
        if (this.roomID == "") {
          this.loading = true;
          console.warn("creating room");
          const response = await this.$auth.loginWith("local", {
            data: {
              username: this.username,
              nbPlayer: this.nbPlayer,
            },
          });
          console.log(response);
        } else {
          const response = await this.$auth.loginWith("local", {
            data: {
              username: this.username,
              roomID: this.roomID,
            },
          });
          console.log(response);
        }

        const res = await this.$axios.get("/protected");
        console.log(res);

        // After login, redirect to a protected route or show success message
        this.$router.push("/game");
      } catch (err) {
        // Handle error
        console.error("Login error:", err);
        // Display appropriate error message based on response
        if (err.response) {
          this.error = err.response.data.message; // Display the error message from backend
        } else {
          this.error = "An unexpected error occurred."; // Generic error message
        }
      } finally {
        this.loading = false;
      }
    },

    async submitRoomID() {
      await this.login(); // Call the login function
    },
  },
};
</script>
<style scoped>
i {
  color: aliceblue;
}
footer {
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 97%;
}
form {
  display: flex;
  flex-direction: column;
  width: min-content;
  justify-self: center;
  position: absolute;
  top: 20%;
  right: 50%;
}

.btn_img {
  padding: 20px;
  transform: translateX(50%);
}
.btn_img:hover {
  transform: translateX(50%) scale(1.1);
}
.v-modal {
  display: none;
}
.background-main {
  margin: 0 auto;
  background-image: url("~/static/background_global.png"); /* Set the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-size: cover; /* Cover the entire element */
  background-position: center;
  background-attachment: fixed;
  position: absolute;
  width: 100%;
  height: 100%;
}
#table_login {
  position: absolute;
  top: 10px;
  left: calc(50% - 510px);

  height: 80%;
}

/* Responsive design for smaller mobile screens */

@media (max-width: 480px) {
  .background-main {
    margin: 0 auto;
    background-image: url("~/static/background_mobile.png");
    background-repeat: no-repeat;
    background-size: cover;

    width: 100%;
    height: calc(100%);

    position: absolute;
  }
  #table_login {
    display: none;
    position: absolute;
    top: 20%;
    left: calc(50% - 510px);
  }

  form {
    top: 30%;

    right: 50%;

    width: 90%;
  }

  .btn_img {
    padding: 10px;
  }
}
</style>