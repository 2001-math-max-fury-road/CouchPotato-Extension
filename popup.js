function running() {
  chrome.tabs.executeScript({
    file: 'huluWindow.js',
  });
  window.close()
}

document.getElementById('clickme').addEventListener('click', running);
