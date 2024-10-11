<template>
  <div class="background-main">
    <audio ref="backgroundMusic">
      <source :src="soundeffect" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>

    <div class="player1">
      <el-button type="danger" plain disabled> {{ playerInfront }} </el-button
      ><enemyHand
        v-if="playersCard"
        :nbcards="playersCard.get(playerInfront)"
      />
    </div>
    <div v-if="players.length > 2" class="player2">
      <el-button type="danger" plain disabled> {{ playerNext }} </el-button>
      <enemyHand v-if="playersCard" :nbcards="playersCard.get(playerNext)" />
    </div>
    <div v-if="players.length > 2" class="player3">
      <enemyHand /><el-button type="danger" plain disabled>
        {{ playerBehind }}
      </el-button>
      <enemyHand v-if="playersCard" :nbcards="playersCard.get(playerBehind)" />
    </div>
    <div class="table">
      <div class="cardTapi">
        <img
          v-for="card in tableCards"
          :key="card.number + card.suit"
          :src="require(`~/static/cards/${card.number}_${card.suit}.png`)"
          alt="Card Image"
          @click="addCardEat(card)"
          :class="getCardClass(card)"
        />
      </div>
    </div>
    <div class="myhand">
      <div style="display: flex">
        <el-button style="width: 100%" plain disabled> {{ userID }}</el-button>
        <el-tooltip placement="top">
          <div slot="content">
            <img
              class="gif-img"
              src="https://media1.tenor.com/m/ktrPgmQGGnIAAAAC/tu-tunisia.gif"
              @click="
                sendGif(
                  `https://media1.tenor.com/m/ktrPgmQGGnIAAAAC/tu-tunisia.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXg2eXRxNGtiem9pZGZnY3FrZnk1YzN2N2VrM2U3a2hiaGxvOTVpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hryis7A55UXZNCUTNA/giphy.gif"
              @click="
                sendGif(
                  `https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXg2eXRxNGtiem9pZGZnY3FrZnk1YzN2N2VrM2U3a2hiaGxvOTVpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hryis7A55UXZNCUTNA/giphy.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://media1.tenor.com/m/0eGun8dPK2QAAAAd/boughanmi-taraji.gif"
              @click="
                sendGif(
                  `https://media1.tenor.com/m/0eGun8dPK2QAAAAd/boughanmi-taraji.gif`
                )
              "
              alt="My GIF"
            />
            <br />
            <img
              class="gif-img"
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXNpcHhpaXhybWs3YndsaXhtbDExMW5nOWRyeGlqY24yZWNpbHIzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KfrkgK7muB1E0c8ufO/giphy.gif"
              @click="
                sendGif(
                  `https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXNpcHhpaXhybWs3YndsaXhtbDExMW5nOWRyeGlqY24yZWNpbHIzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KfrkgK7muB1E0c8ufO/giphy.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXUxZzNsaW0zeXNsaXc0NXA4a29tZ3lxOTFrOWs4MHNoZzRxa210ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VdJpHBtDLdIDJsyGO5/giphy.gif"
              @click="
                sendGif(
                  `https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXUxZzNsaW0zeXNsaXc0NXA4a29tZ3lxOTFrOWs4MHNoZzRxa210ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VdJpHBtDLdIDJsyGO5/giphy.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://media1.tenor.com/m/Pts1f-cVV9sAAAAd/tounsi-mti9er-tunisia.gif"
              @click="
                sendGif(
                  `https://media1.tenor.com/m/Pts1f-cVV9sAAAAd/tounsi-mti9er-tunisia.gif`
                )
              "
              alt="My GIF"
            />
            <br />
            <img
              class="gif-img"
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDR3aWppeW14bzh6eGh6Mmhxb29lYTY5M3YybzI2cDUxMmR2MmUydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pslhuiH7jqzNixBV3S/giphy.gif"
              @click="
                sendGif(
                  `https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDR3aWppeW14bzh6eGh6Mmhxb29lYTY5M3YybzI2cDUxMmR2MmUydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pslhuiH7jqzNixBV3S/giphy.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://media1.tenor.com/m/BkxBJpfByvEAAAAC/vraiment-tunisie.gif"
              @click="
                sendGif(
                  `https://media1.tenor.com/m/BkxBJpfByvEAAAAC/vraiment-tunisie.gif`
                )
              "
              alt="My GIF"
            />
            <img
              class="gif-img"
              src="https://media1.tenor.com/m/ngoZGMzKjq8AAAAC/kais-said-president-ka%C3%AFs-sa%C3%AFed.gif"
              @click="
                sendGif(
                  `https://media1.tenor.com/m/ngoZGMzKjq8AAAAC/kais-said-president-ka%C3%AFs-sa%C3%AFed.gif`
                )
              "
              alt="My GIF"
            />
          </div>
          <el-button icon="el-icon-chat-dot-round" circle></el-button
        ></el-tooltip>
      </div>

      <div id="waiting" v-if="playerTurn != userID">
        {{ playerTurn + " في انتظار" }}
      </div>
      <div style="padding-right: 28px; padding-left: 28px" class="card">
        <img
          v-for="card in myHand"
          :key="card.number + card.suit"
          :src="require(`~/static/cards/${card.number}_${card.suit}.png`)"
          alt="Card Image"
          @click="selectCard(card)"
          :class="{ imgSelected: selectedCard === card }"
        />
      </div>
      <el-button v-if="myHand" type="danger" @click="trowcard()" round
        >ارمي</el-button
      >
    </div>
    <el-dialog title="Addition" :visible.sync="gameover" width="80%" center>
      <!-- Displays the object as a string -->

      <table style="width: 100%" border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Player</th>
            <th>Suit</th>
          
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the parsed gameoverstat object -->
          <tr v-for="(value, key) in gameoverstat" :key="key">
            <td>{{ key }}</td>
            <td>
              <div class="myhandstat">
               <strong>{{ analyzeDeck(value) }}</strong>
              
              </div>
            </td>
            <!-- Display each card for the player -->
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
      
        <el-button @click="gameoverReplay">العب مرة أخرى</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="يجب عليك مشاركة رمز اللعبة"
      :visible.sync="waitingPlayer"
      style=""
      width="30%"
      center
    >
      <span> RoomID : {{ RoomID }}</span>
    </el-dialog>
    <el-dialog
      :show-close="false"
      background=" rgba(0,0,0,0.4)"
      title="Eat move"
      :visible.sync="eatMove.on"
      width="fit-content"
      center
    >
      <span>
        <div class="myhandstat">
          <div class="card">
            <img
              v-for="card in eatMove.data"
              :key="card.number + card.suit"
              :src="require(`~/static/cards/${card.number}_${card.suit}.png`)"
              alt="Card Image"
            />
          </div>
          <img
            v-if="eatMove.card"
            :src="
              require(`~/static/cards/${eatMove.card.number}_${eatMove.card.suit}.png`)
            "
            alt="Card Image"
          />
        </div>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import myHand from "~/components/myHand.vue";
import enemyHand from "~/components/enemyHand.vue";
import cardTable from "~/components/cardTable.vue";
export default {
  components: { myHand, enemyHand, cardTable },
  layout: "gameLayout",
  // eslint-disable-next-line no-undef
  middleware: ["auth"],
  data() {
    return {
      soundeffect: "",
      selectedCard: null,
      listCardToEat: [],
      messageInput: "",
      messages: [],
      gameover: false,
      userID: "",
      waitingPlayer: true,
      RoomID: this.$auth.user.user.roomID,
      playerTurn: "",
      eatMove: { on: false, data: undefined, card: undefined },

      tableCards: [
        { suit: "back", number: "Chkobba" },
        { suit: "back", number: "Chkobba" },
        { suit: "back", number: "Chkobba" },
        { suit: "back", number: "Chkobba" },
      ],
      myHand: [
        { suit: "back", number: "Chkobba" },
        { suit: "back", number: "Chkobba" },
        { suit: "back", number: "Chkobba" },
      ],
      gameoverstat: {
        f: [],
        d: [
          { number: 1, suit: "Heart" },
          { number: 2, suit: "Heart" },
          { number: 3, suit: "Heart" },
        ],
      },
      players: [],

      playerInfront: "",
      playerNext: "",
      playerBehind: "",
      playersCard: undefined,
      ws: null,
      reconnectInterval: 5000, // 5 seconds
    };
  },
  watch: {
    myHand: async function (newValue, oldValue) {},
  },
  async mounted() {
    await this.connectWebSocket();
    this.soundeffect = "/salamoualykom.mp3";
    this.$refs.backgroundMusic.play();
  },
  beforeDestroy() {
    // Close the WebSocket connection when the component is destroyed
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
    analyzeDeck(deck) {
    // Initialize counters
    const totalCards = deck.length;
    let countNumber7 = 0;
    let countNumber6 = 0;
    let countNumber7Rectangle = 0;
    let countBlackChkoba = 0;

    // Iterate through each card in the deck
    deck.forEach(card => {
        // Count total cards with number 7
        if (card.suit != 'Rectangle' && card.number === 7) {
            countNumber7++;
        }
        // Count total cards with number 6
        if (card.number === 6) {
            countNumber6++;
        }
        // Count cards with suit Rectangle and number 7
        if (card.suit === 'Rectangle' && card.number === 7) {
            countNumber7Rectangle++;
        }
        // Count cards with suit Black and number Chkoba
        if (card.suit === 'back' && card.number === 'Chkobba') {
            countBlackChkoba++;
        }
    });

    // Return the results as an object
    return {
       carta: totalCards-countBlackChkoba,
       sbou3: countNumber7+countNumber7Rectangle,
       stout: countNumber6,
       l7aya: countNumber7Rectangle,
       chkeyb: countBlackChkoba
    };
},
    gameoverReplay() {
      this.ws.send(
        JSON.stringify({
          type: "system",
          operation: "replay",
          mycard: this.selectedCard,
        })
      );
      this.gameover = false;
    },
    getPreviousValue(value) {
      // Find the index of the current value
      let list = this.players;
      const index = list.indexOf(value);

      // If the value is not in the list, return null or handle the error
      if (index === -1) {
        throw new Error("Value not found in the list");
      }

      // Calculate the index of the previous value, wrapping around if necessary
      const previousIndex = (index - 1 + list.length) % list.length;

      // Return the element at the calculated previous index
      this.playerNext = list[previousIndex];
    },
    lastPlayer() {
      // Filter out the playerInfront, playerNext, and userID
      const remainingPlayers = this.players.filter(
        (player) =>
          player !== this.playerInfront &&
          player !== this.playerNext &&
          player !== this.userID
      );

      // If there are remaining players, set the first one as playerBehind
      if (remainingPlayers.length > 0) {
        this.playerBehind = remainingPlayers[0]; // This assumes there's only one valid player behind
      } else {
        console.warn("No valid players left to assign as playerBehind");
        this.playerBehind = null; // Handle this case if needed
      }
    },
    getNextValuePlusOne(value) {
      let list = this.players;

      // If the list contains only 2 elements, alternate between them
      if (list.length === 2) {
        let index = list.indexOf(value);

        // If the value is not in the list, throw an error
        if (index === -1) {
          throw new Error("Value not found in the list");
        }

        // Return the other element in the list (if index is 0, return 1; if index is 1, return 0)
        this.playerInfront = list[(index + 1) % 2];
        return;
      }

      // For lists longer than 2 elements, continue with the usual logic
      let index = list.indexOf(value);

      // If the value is not in the list, throw an error
      if (index === -1) {
        throw new Error("Value not found in the list");
      }

      // Calculate the index of the value 2 steps ahead, wrapping around the array
      const nextIndex = (index + 2) % list.length;

      // Return the element at the calculated index
      this.playerInfront = list[nextIndex];
    },
    trowcard() {
      if (this.selectedCard)
        this.ws.send(
          JSON.stringify({
            type: "system",
            operation: "trow",
            mycard: this.selectedCard,
          })
        );
      else console.log("no card selected");

      this.selectedCard = null;
    },
    sendGif(gif) {
      if (gif)
        this.ws.send(
          JSON.stringify({
            type: "gif",
            operation: "message",
            data: gif,
            mycard: this.userID,
          })
        );
      else console.log("no gif selected");
      console.log("gif sended" + gif);
    },
    selectCard(card) {
      this.listCardToEat = [];
      // Toggle selection, or select the clicked card
      this.selectedCard = this.selectedCard === card ? null : card;
      console.log("Selected card:", this.selectedCard);
    },
    addCardEat(card) {
      // Check if the card is NOT already in the listCardToEat
      if (
        !this.listCardToEat.some(
          (item) => item.number === card.number && item.suit === card.suit
        )
      ) {
        this.listCardToEat.push(card); // Add the card to the list
      } else {
        // Optional: Remove the card if it is already in the list (toggle behavior)
        this.listCardToEat = this.listCardToEat.filter(
          (item) => item.number !== card.number || item.suit !== card.suit
        );
      }
      console.log(this.listCardToEat); // Log the current state of listCardToEat
    },

    getCardClass(card) {
      const listTapi = this.listCardToEat;
      let somme = 0;

      // Check if listCardToEat is an array and not empty
      if (!Array.isArray(listTapi) || listTapi.length === 0) return "";
      if (
        !listTapi.some(
          (item) => item.number == card.number && item.suit == card.suit
        )
      )
        return "";
      // Sum the numbers of each card in listTapi
      for (let i = 0; i < listTapi.length; i++) {
        somme += Number(listTapi[i].number); // Ensure we add a number
      }

      // Check if selectedCard exists and has a number property
      if (!this.selectedCard || typeof this.selectedCard.number !== "number")
        return "";
      if (somme === this.selectedCard.number)  {
        console.log("i chose" +card.number)
        console.log('his.tableCards.some ='+ this.tableCards.some( (item) => item.number == card.number ))
        console.log(this.tableCards)
        if(  this.tableCards.some( (item) => item.number == this.selectedCard.number )&&listTapi.length!==1)  return "imgPreventSelected";
        
        this.ws.send(
          JSON.stringify({
            type: "system",
            operation: "eat",
            mycard: this.selectedCard,
            cardToEat: this.listCardToEat,
          })
        );
        this.listCardToEat = [];
        return "imgSelected";
      }
      // Return class based on whether the sum equals the number on the selectedCard
      return somme === this.selectedCard.number
        ? "imgSelected"
        : "imgPreventSelected";
    },
    // Function to connect to WebSocket
    connectWebSocket() {
      // Create a new WebSocket connection
      const token = this.$auth.getToken("local");
      this.userID = this.$auth.user.user.userId;

      console.log(this.$auth);
      console.warn(
        `${this.$config.apiUrl}/gameroom/` + this.RoomID + "/" + token
      );
      this.ws = new WebSocket(
        `${this.$config.apiUrl}/gameroom/` + this.RoomID + "/" + token
      );

      // Connection opened
      this.ws.onopen = () => {
        console.log("WebSocket is connected");
      };

      // Connection closed
      this.ws.onclose = (event) => {
        console.log(
          `WebSocket is closed now.for${event} Reconnecting in ${
            this.reconnectInterval / 1000
          } seconds...`
        );
        setTimeout(() => {
          this.connectWebSocket(); // Try to reconnect
        }, this.reconnectInterval);
      };

      // Connection error
      this.ws.onerror = (error) => {
        console.error("WebSocket error observed:", error);
        this.ws.close(); // Close the socket on error and reconnect
      };

      // Handling messages from the server
      this.ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        console.warn("receivedData : ");
        console.warn(receivedData);
        // Check if the operation is 'getHand'
        console.log(receivedData); // Check receivedData structure

        if (receivedData.operation === "getHand") {
          this.myHand = receivedData.data;
          console.log(new Map(receivedData.otherPlayer));
          this.playersCard = new Map(receivedData.otherPlayer);
          console.log(this.playersCard.get("d"));
        } else if (receivedData.operation === "getTapi") {
          this.tableCards = receivedData.data;
          this.playerTurn = receivedData.turn;
          if (this.tableCards.length == 0) {
            this.soundeffect = "/jhonsina.mp3";
            console.log("playing" + this.soundeffect);

            // Update the audio source element
            const audioElement = this.$refs.backgroundMusic;
            audioElement.src = this.soundeffect; // Set the new source
            audioElement.load(); // Load the new audio

            audioElement.play().catch((error) => {
              console.error("Playback failed:", error);
            });
          }
        } else if (receivedData.operation === "endGame") {
          this.gameoverstat = receivedData.data;
          this.gameover = true;
        } else if (receivedData.operation === "start game full players") {
          this.waitingPlayer = false;
          console.error(receivedData.players);
          this.players = receivedData.players;

          if (receivedData.players && Array.isArray(receivedData.players)) {
            console.error(receivedData.players.length > 2);
            this.getNextValuePlusOne(this.userID);
            this.getPreviousValue(this.userID);
            this.lastPlayer();
          } else {
            console.error(
              "receivedData.players is not defined or not an array"
            );
          }
        } else if (receivedData.operation === "eatMove") {
          console.error(receivedData.data);
          this.eatMove.data = receivedData.data;
          this.eatMove.card = receivedData.card;
          this.eatMove.on = true;
          if (
            this.eatMove.card.number == 7 ||
            this.eatMove.data.some((card) => card.number == 7)
          ) {
            this.soundeffect = "/ghabra.mp3";
            console.log("playing" + this.soundeffect);

            // Update the audio source element
            const audioElement = this.$refs.backgroundMusic;
            audioElement.src = this.soundeffect; // Set the new source
            audioElement.load(); // Load the new audio

            audioElement.play().catch((error) => {
              console.error("Playback failed:", error);
            });
          }
          setTimeout(() => {
            this.eatMove.on = false;
          }, 2000);
        } else if (receivedData.operation === "message") {
          this.$notify({
            title: receivedData.mycard,
            customClass: "msg_gif",
            dangerouslyUseHTMLString: true,

            message: `<img style=" width: 80%;height: 80%;" class="gif-img" src=${receivedData.data} alt="My GIF">`,
            showClose: true,
          });
        }
      };
    },
    // Method to send a message
    sendMessage() {
      if (this.ws) {
        // Create a JSON object with the data you want to send
        const messageData = {
          type: "system", // or any other type you want to specify
          operation: "getHand", //addcard,eat,
          data: [],
          timestamp: new Date().toISOString(), // Optionally include a timestamp
        };

        // Send the JSON object as a string
        this.ws.send(JSON.stringify(messageData));

        // Clear the input after sending
        this.messageInput = "";
      }
    },
  },
};
</script>
  
  <style scoped>
/* Add your styles here */

.msg_gif {
  transform: translateX(50%);
}
.gif-img {
  width: 80px;
  height: 80px;
}

h1 {
  font-size: 24px;
}
input {
  margin-right: 10px;
}
.background-main {
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: 1fr 2fr auto;
  align-items: center;
  font-family: monospace;
  justify-content: center;
}
.el-dialog {
  background: rgba(0, 0, 0, 0.5) !important;
}

.background-main .myhand {
  grid-column: 1/4;
  grid-row: 3/4;
  display: grid;
  justify-content: center;
}

.background-main .player1 {
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  justify-content: center;
}
#waiting {
  position: absolute;
  display: grid;
  border-radius: 15px;
  justify-self: center;
  align-self: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: xx-large;
  padding: 17px;
  z-index: 1;
}
.background-main .player2 {
  grid-column: 1/2;
  grid-row: 2/3;
  display: grid;
  justify-content: center;
}
.background-main .player3 {
  grid-column: 3/4;
  grid-row: 2/3;
  display: grid;
  justify-content: center;
}
.background-main .table {
  grid-column: 2/3;
  grid-row: 2/3;
  background-image: url("~/static/cards/tapie.jpg"); /* Set the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-size: cover; /* Cover the entire element */
  background-position: center;
  border: solid #242424;
  border-radius: 5px;
  width: 100%;
  height: fit-content;
  color: white;
  min-height: 100%;
}

.myhandstat img {
  width: 72px;
  height: 106px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
}
.card img {
  width: 110px;
  height: 165px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  transform: perspective(var(--perspective, 542px)) rotateX(-23deg) scaleX(1.2);
}

.card .imgSelected {

  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: solid green 5px;
  transform: perspective(var(--perspective, 542px)) rotateX(0deg) scaleX(1.2);
  border-radius: 15px;
}

.cardTapi img {
  width: 110px;
  height: 165px;
  object-fit: cover;
  margin: 4px;
}

.cardTapi .imgPreventSelected {
  width: 110px;
  height: 165px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: solid rgba(240, 8, 8, 0.897) 5px;
}
.card {
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  overflow: hidden;
}
.cardTapi {
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline;
}
@media (max-width: 480px) {
  .background-main {
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: auto 4fr auto;
  align-items: center;
  font-family: monospace;
  justify-content: center;
}
  .myhandstat img {
    width: 69px;
    height: 100px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 2.5px;
  }
  .card img {
    width: 69px;
    height: 100px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    transform: perspective(var(--perspective, 542px)) rotateX(-23deg)
      scaleX(1.2);
  }

  .cardTapi img {
    width: 69px;
    height: 100px;
    object-fit: cover;
    margin: 4px;
  }
  .cardTapi .imgSelected {
  width: 69px !important;
  height: 100px !important;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: solid green 5px;
  transform: scaleX(1);
}

  .cardTapi .imgPreventSelected {
    width: 69px;
    height: 100px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: solid rgba(240, 8, 8, 0.897) 5px;
  }
}
</style>
  