let hulu = document.getElementById('dash-player-container')
// create element, then append
// use flexbox on const hulu website to render in thirds
const div = document.createElement('DIV'); //<div><div/>
div.setAttribute('id', 'couchPotato');
const frame = document.createElement('iframe'); //<iframe></iframe>
frame.setAttribute('src', 'http://couch-potato-extension.herokuapp.com/'); //<iframe src="...">
frame.style.width='50%'
hulu.style.width='50%'
div.appendChild(frame); //frame belongs to div
hulu.appendChild(div); //div belongs to hulu

