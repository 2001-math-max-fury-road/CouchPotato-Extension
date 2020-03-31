// const popupButton =

// popupButton.addEventListener("click", () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'Couch Potato Info',
      message: 'Start watching a show, then click on the Couch Potato extension to start a couch!',
      iconUrl: '/popcorn-icon.png',
      type: 'basic'
    }
  })
// })
