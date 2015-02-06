RED = [255, 0, 0, 255];
GREEN = [0, 255, 0, 255];
BLUE = [0, 0, 255, 255];

function setBadge(text, color){
  if(color){
    chrome.browserAction.setBadgeBackgroundColor({color: color});
  }
  chrome.browserAction.setBadgeText({text: text});
}

function updateDirection(direction){
  setBadge(direction, direction === '+' ? GREEN : RED);
}

function updateCount(tabCount){
  setBadge(tabCount.toString(), BLUE);
}

function update(direction){
  chrome.tabs.query({}, function(tabs){
    if(direction){
      updateDirection(direction);
      setTimeout(function(){
        updateCount(tabs.length);
      }, 500);
    } else {
      updateCount(tabs.length);
    }
  });
}

function init(){
  chrome.tabs.onCreated.addListener(function(){update('+');});
  chrome.tabs.onRemoved.addListener(function(){update('-');});
  update();
}

init();
