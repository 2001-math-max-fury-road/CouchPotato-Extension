// Get Hulu container elements
const huluPlayer = document.getElementById('dash-player-container');
const huluParent = huluPlayer.parentElement;

// Manipulate container styling to add flexbox
huluParent.style.display = 'flex';
huluParent.style.justifyContent = 'space-between';

huluPlayer.style.width = '67%';
huluPlayer.style.position = null;
huluPlayer.style.boxSizing = 'border-box';

// Create and style CouchPotato
const div = document.createElement('DIV');
div.setAttribute('id', 'couchPotato');
const frame = document.createElement('IFRAME');
frame.setAttribute('src', 'https://couch-potato-extension.herokuapp.com/');
frame.setAttribute('id', 'chatContainer');
frame.style.width = '100%';
frame.style.height = '100%';
div.appendChild(frame);

div.style.height = '100%';
div.style.width = '33%';
div.style.boxShadow = 'border-box';

// Append CouchPotato to parent container
huluParent.appendChild(div);

function randomizeCouchId() {
  const id = Math.floor(Math.random() * 1000);
  return id.toString();
}

const huluID = randomizeCouchId();
localStorage.setItem('huluID', huluID);

// Create localStorage item to track whether show is playing
const playButton = document.getElementsByClassName(
  'controls__playback-button'
)[0];
const playStatus = playButton.getAttribute('aria-label');

if (playStatus === 'Pause') {
  localStorage.setItem('playing', 'true');
} else {
  localStorage.setItem('playing', 'false');
}

playButton.addEventListener('click', (event) => {
  // If the user has created/joined a couch
  if (localStorage.couchId && localStorage.username) {
    // If the user clicked play/pause
    if (event.target !== event.currentTarget) {
      // Grabe timestamp for URL, convert from colon to dash so url doesn't cause issues
      const timestamp = document.getElementsByClassName(
        'controls__time-elapsed'
      )[0].innerText;
      const urlTime = timestamp.replace(':', '-');

      // If the video was playing before button was clicked
      if (localStorage.playing === 'true') {
        // Switch localStorage to false for paused
        localStorage.setItem('playing', 'false');
        // Send backend route notifying other users that video was paused
        fetch(
          `https://couch-potato-extension.herokuapp.com/api/pause/${localStorage.huluID}/${localStorage.couchId}/${localStorage.username}/${urlTime}`,
          {
            mode: 'cors',
          }
        )
          .then(function (response) {
            if (response.status === 200) console.log('success');
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // Switch localStorage to true for playing
        localStorage.setItem('playing', 'true');
        // Send backend route notifying other users that video was played
        fetch(
          `https://couch-potato-extension.herokuapp.com/api/play/${localStorage.huluID}/${localStorage.couchId}/${localStorage.username}/${urlTime}`,
          {
            mode: 'cors',
          }
        )
          .then(function (response) {
            if (response.status === 200) console.log('success');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      // Flip local storage to keep track of whether video is playing for future clicks
      if (localStorage.playing === 'true') {
        localStorage.setItem('playing', 'false');
      } else {
        localStorage.setItem('playing', 'true');
      }
    }
  }
});

window.addEventListener(
  'message',
  (event) => {
    if (event.origin === 'https://couch-potato-extension.herokuapp.com') {
      const message = event.data;
      const messageArray = message.split(' ');
      const messageType = messageArray[0];

      if (messageType === 'play-pause') {
        const groupStatus = messageArray[1];
        const id = messageArray[2];

        // If this user didn't start the click cycle
        if (id !== localStorage.huluID) {
          // If localStorage says the video is playing and the initiator clicked pause
          if (localStorage.playing === 'true' && groupStatus === 'pause') {
            playButton.click();
            // Else if the localStorage says the video is paused and the initiator clicked play
          } else if (
            localStorage.playing === 'false' &&
            groupStatus === 'play'
          ) {
            playButton.click();
          }
          // Used if/else if because we don't want play/pause button clicked if video is already paused and someone else hit pause or if video is already playing and somone else hit play
        }
      } else if (messageType === 'couchID') {
        const couchId = messageArray[1];
        localStorage.setItem('couchId', couchId);

        const username = messageArray[2];
        localStorage.setItem('username', username);
      }
    }
  },
  false
);
