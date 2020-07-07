const huluPlayer = document.getElementById('dash-player-container');
const huluParent = huluPlayer.parentElement;

huluParent.style.display = 'flex';
huluParent.style.justifyContent = 'space-between';

huluPlayer.style.width = '67%';
huluPlayer.style.position = null;
huluPlayer.style.boxSizing = 'border-box';

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

huluParent.appendChild(div);

function randomizeCouchId() {
  const id = Math.floor(Math.random() * 1000);
  return id.toString();
}

const huluID = randomizeCouchId();
localStorage.setItem('huluID', huluID);

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
  if (localStorage.couchId && localStorage.username) {
    if (event.target !== event.currentTarget) {
      const timestamp = document.getElementsByClassName(
        'controls__time-elapsed'
      )[0].innerText;
      const urlTime = timestamp.replace(':', '-');

      if (localStorage.playing === 'true') {
        localStorage.setItem('playing', 'false');
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
        localStorage.setItem('playing', 'true');
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

        if (id !== localStorage.huluID) {
          if (localStorage.playing === 'true' && groupStatus === 'pause') {
            playButton.click();
          } else if (
            localStorage.playing === 'false' &&
            groupStatus === 'play'
          ) {
            playButton.click();
          }
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
