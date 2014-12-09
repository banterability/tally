function setCount(tabCount){
  chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 255, 255]});
  chrome.browserAction.setBadgeText({text: tabCount.toString()});
}

function setDirection(direction){
  if(direction === '+'){
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 255, 0, 255]});
  } else {
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
  }
  chrome.browserAction.setBadgeText({text: direction});
}

function update(direction){
  chrome.tabs.query({}, function(tabs){
    if(direction){
      setDirection(direction);
      setTimeout(function(){
        setCount(tabs.length);
      }, 500);
    } else {
      setCount(tabs.length);
    }
  });
}

function init(){
  chrome.tabs.onCreated.addListener(function(){update('+');});
  chrome.tabs.onRemoved.addListener(function(){update('-');});
  update();
}

init();
