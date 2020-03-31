function running() {
  chrome.tabs.executeScript({
    file: 'huluWindow.js',
  });
}

document.getElementById('clickme').addEventListener('click', running);
