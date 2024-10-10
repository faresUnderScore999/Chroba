<template>
  <div class="background-main">
    <div class="player1"><el-button type="danger" plain disabled> {{ playerInfront }} </el-button><enemyHand v-if="playersCard" :nbcards="playersCard.get(playerInfront)" /></div>
    <div v-if="players.length > 2" class="player2"> <el-button type="danger" plain disabled> {{ playerNext }} </el-button>
     <enemyHand v-if="playersCard" :nbcards="playersCard.get(playerNext)" />
    </div>
    <div v-if="players.length > 2" class="player3"><enemyHand /><el-button type="danger" plain disabled> {{  playerBehind }} </el-button>  <enemyHand v-if="playersCard" :nbcards="playersCard.get(playerBehind)" /></div>
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
      <el-button style="margin-top: 10px;" type="danger" plain disabled> {{ userID }} </el-button>
      <div id="waiting" v-if="playerTurn != userID">
        {{  playerTurn+" في انتظار"  }}
      </div>
      <div style=" padding-right: 28px;padding-left: 28px;" class="card">
        <img
          v-for="card in myHand"
          :key="card.number + card.suit"
          :src="require(`~/static/cards/${card.number}_${card.suit}.png`)"
          alt="Card Image"
          @click="selectCard(card)"
          :class="{ imgSelected: selectedCard === card }"
        />
       
      </div>
      <el-button v-if="myHand" type="danger" @click="trowcard()" round>ارمي</el-button>
    
    </div>
    <el-dialog title="Addition" :visible.sync="gameover" width="80%" center>
      <!-- Displays the object as a string -->

      <table style="width: 100%" border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Player</th>
            <th>Suit</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the parsed gameoverstat object -->
          <tr v-for="(value, key) in gameoverstat" :key="key">
            <td>{{ key }}</td>
            <td>
              <div class="myhandstat">
                <div class="card">
                  <img
                    v-for="card in value"
                    :key="card.number + card.suit"
                    :src="
                      require(`~/static/cards/${card.number}_${card.suit}.png`)
                    "
                    alt="Card Image"
                  />
                </div>
              </div>
            </td>
            <!-- Display each card for the player -->
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gameover = false">OK</el-button>
      </span>
    </el-dialog>

    <el-dialog :show-close="false"
      title="Party Code"
      :visible.sync="waitingPlayer"
      width="30%"
      center
    >
      <span>code :  {{ RoomID }}</span>
    </el-dialog>
    <el-dialog :show-close="false" background=" rgba(0,0,0,0.4)" title="East move" :visible.sync="eatMove.on" width="fit-content" center>
      <span>
        <div class="myhandstat">
                <div class="card">
                  <img
                    v-for="card in eatMove.data"
                    :key="card.number + card.suit"
                    :src="
                      require(`~/static/cards/${card.number}_${card.suit}.png`)
                    "
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
  middleware: ['auth'],
  data() {
    return {
      selectedCard: null,
      listCardToEat: [],
      messageInput: "",
      messages: [],
      gameover: false,
      userID: "",
      waitingPlayer: true,
      RoomID: this.$auth.user.user.roomID,
      playerTurn: "",
      eatMove: { on: false, data: undefined ,card:undefined},

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
      playersCard:undefined,
      ws: null,
      reconnectInterval: 5000, // 5 seconds
    };
  },
  watch: {
    myHand: async function (newValue, oldValue) {},
  },
  async mounted() {

    await this.connectWebSocket();
  },
  beforeDestroy() {
    // Close the WebSocket connection when the component is destroyed
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
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
  const remainingPlayers = this.players.filter(player => 
    player !== this.playerInfront && player !== this.playerNext && player !== this.userID
  );

  // If there are remaining players, set the first one as playerBehind
  if (remainingPlayers.length > 0) {
    this.playerBehind = remainingPlayers[0];  // This assumes there's only one valid player behind
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

    selectCard(card) {
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
      if (somme === this.selectedCard.number) {
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
      console.warn( `ws://chkobaa3.onrender.com/gameroom/` + this.RoomID + "/" + token);
      this.ws = new WebSocket(
        `wss://chkobaa3.onrender.com/gameroom/` + this.RoomID + "/" + token
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
          console.log(new Map(receivedData.otherPlayer))
          this.playersCard=new Map(receivedData.otherPlayer)
          console.log(this.playersCard.get('d'))
        } else if (receivedData.operation === "getTapi") {
          this.tableCards = receivedData.data;
          this.playerTurn = receivedData.turn;
        } else if (receivedData.operation === "endGame") {
          console.error(receivedData.data);
          this.gameoverstat = receivedData.data;
          console.error(this.gameoverstat);
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
          setTimeout(() => {
            this.eatMove.on = false;
          }, 2000);
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
  background-image: url('~/static/cards/tapie.jpg'); /* Set the background image */
  background-repeat: no-repeat;              /* Prevent the image from repeating */
  background-size: cover;                    /* Cover the entire element */
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
  width: 110px;
  height: 165px;
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
.cardTapi .imgSelected {
  width: 110px;
  height: 165px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: solid green 5px;
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
  transform: perspective(var(--perspective, 542px)) rotateX(-23deg) scaleX(1.2);
}

.cardTapi img {
  width: 69px;
  height: 100px;
  object-fit: cover;
  margin: 4px;
}
.cardTapi .imgSelected {
  width: 69px;
  height: 100px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: solid green 5px;
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
  