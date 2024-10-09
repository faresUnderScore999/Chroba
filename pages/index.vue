<template>
  <div class="background-main">
    <img
      id="table_login"
      style="
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%) translateY(-25%) scale(1.5);
      "
      :src="require(`~/static/tarot-chkobba.png`)"
      alt="Card Image"
    />
    <form @submit.prevent="login">
      <!-- <el-button @click="dialogFormVisibleJoin = true">Join</el-button>
      <el-button @click="dialogFormVisible = true">Create Game</el-button> -->
      <img
        style="transform: translateX(50%)"
        class="btn_img"
        :src="require(`~/static/cards/btn1.png`)"
        alt="Card Image"
        @click="dialogFormVisibleJoin = true"
      />
      <img
        style="transform: translateX(50%)"
        class="btn_img"
        :src="require(`~/static/cards/btn2.png`)"
        alt="Card Image"
        @click="dialogFormVisible = true"
      />
      <!-- Dialog for Room ID -->
      <el-dialog width="95%" :visible.sync="dialogFormVisible">
        <div style="display: grid; justify-content: center">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
          />
          <br />
          <label>who many players:</label>
          <br />
          <el-input-number
            v-model="nbPlayer"
            :min="2"
            :max="4"
            :step="2"
          ></el-input-number>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitRoomID">Login</el-button>
        </span>
      </el-dialog>

      <el-dialog width="95%" :visible.sync="dialogFormVisibleJoin">
        <div style="display: grid; justify-content: center">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
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
          <el-button @click="dialogFormVisibleJoin = false">Cancel</el-button>
          <el-button type="primary" @click="submitRoomID">Login</el-button>
        </span>
      </el-dialog>
    </form>
  </div>
</template>

<script>
export default {
  middleware: false,
  auth: false,
  data() {
    return {
      dialogFormVisibleJoin: false,
      dialogFormVisible: false,
      username: "",
      roomID: "",
      error: "",
      nbPlayer: 2,
    };
  },
  async mounted() {
    this.RoomID = this.$route.query.roomID;
 
  },
  methods: {
    async login() {
      try {
        // Call the login endpoint
        if (this.roomID == "") {
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
      }
    },

    async submitRoomID() {
      this.dialogFormVisible = false; // Close the dialog
      await this.login(); // Call the login function
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: min-content;
  justify-self: center;
  position: absolute;
  top: 20%;
  right: 50%;
}
.btn_img:hover {
  transform: scale(1.1);
}
.btn_img {
  padding: 20px;
}
.v-modal {
  display: none;
}
.background-main {
  margin: 0 auto;
  background-image: url("~/static/cards/background.PNG"); /* Set the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-size: cover; /* Cover the entire element */
  background-position: center;
  background-attachment: fixed;
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Responsive design for smaller mobile screens */

@media (max-width: 480px) {
  .background-main {
    margin: 0 auto;
    background-image: url("~/static/background-mobile.PNG");
    background-repeat: no-repeat;
    background-size: cover;

    width: 100%;
    height: calc(100%);

    position: absolute;
  }
  #table_login {
    display: none;
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