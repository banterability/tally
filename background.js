function updateCount(tabCount){
  chrome.browserAction.setBadgeText({text: tabCount.toString()});
}

function countTabs(){
  chrome.tabs.query({}, function(tabs){
    updateCount(tabs.length);
  });
}

function init(){
  chrome.tabs.onCreated.addListener(countTabs);
  chrome.tabs.onRemoved.addListener(countTabs);
  countTabs();
}

init();
