const huluPlayer = document.getElementById('dash-player-container');
const huluParent = document.getElementsByClassName(
  'Player__container addFocus'
)[0];

// create element, then append
// use flexbox on const hulu website to render in thirds
const div = document.createElement('DIV'); //<div><div/>
div.setAttribute('id', 'couchPotato');
const frame = document.createElement('iframe'); //<iframe></iframe>
frame.setAttribute('src', 'http://couch-potato-extension.herokuapp.com/'); //<iframe src="...">
div.appendChild(frame); //frame belongs to div
div.style.position = 'absolute';
div.style.height = '100%';
div.style.width = '50%';
div.style.boxShadow = 'border-box';
huluPlayer.style.width = '50%';
huluParent.appendChild(div);
// hulu.appendChild(div); //div belongs to hulu
