// Get Hulu container elements
const huluPlayer = document.getElementById("dash-player-container");
const huluParent = document.getElementsByClassName(
  "Player__container addFocus"
)[0];

// Manipulate container styling to add flexbox
huluParent.style.display = "flex";
huluParent.style.justifyContent = "space-between";

huluPlayer.style.width = "67%";
huluPlayer.style.position = null;
huluPlayer.style.boxSizing = "border-box";

// Create and style CouchPotato
const div = document.createElement("DIV");
div.setAttribute("id", "couchPotato");
const frame = document.createElement("IFRAME");
frame.setAttribute("src", "https://couch-potato-extension.herokuapp.com/");
frame.setAttribute("id", "chatContainer");
frame.style.width = "100%";
frame.style.height = "100%";
div.appendChild(frame);

div.style.height = "100%";
div.style.width = "33%";
div.style.boxShadow = "border-box";

// Append CouchPotato to parent container
huluParent.appendChild(div);

function randomizeCouchId() {
  const id = Math.floor(Math.random() * 1000);
  return id.toString();
}

const huluID = randomizeCouchId();
localStorage.setItem("huluID", huluID);

const playButton = document.getElementsByClassName(
  "controls__playback-button"
)[0];

playButton.addEventListener("click", (event) => {
  if (localStorage.couchId && localStorage.username) {
    if (event.target !== event.currentTarget) {
      // fetch(`http://localhost:3000/api/play-pause/${localstorage.huluID}/${localstorage.couchID}/${localstorage.username}`, {
      fetch(
        `https://couch-potato-extension.herokuapp.com/api/play-pause/${localStorage.huluID}/${localStorage.couchId}/${localStorage.username}`,
        {
          mode: "cors",
        }
      )
        .then(function (response) {
          if (response.status === 200) console.log("success");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
});

window.addEventListener(
  "message",
  (event) => {
    console.log('event listener')
    if (event.origin === 'https://couch-potato-extension.herokuapp.com') {
      const message = event.data
      const messageArray = message.split(" ");
      const messageType = messageArray[0];
      if (messageType === "play-pause") {
        const id = messageArray[1];
        if (id !== localStorage.huluID) {
          playButton.click();
        }
      } else if (messageType === "couchID") {
        const couchId = messageArray[1];
        localStorage.setItem("couchId", couchId);

        const username = messageArray[2];
        localStorage.setItem("username", username);
      }

    }
  },
  false
);
