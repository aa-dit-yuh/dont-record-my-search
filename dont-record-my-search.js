deleteMySearch = () => {
  chrome.history.search({'text': 'google.co'}, (results) => {
    console.log(results);
    results.map((result) => {
      chrome.history.deleteUrl({'url': result.url});
    });
  });
}

// Triggers every minute
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('delete-my-search', {when: 0, periodInMinutes: 1});
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'delete-my-search')
    deleteMySearch();
});
// Triggers when icon is clicked
chrome.browserAction.onClicked.addListener(deleteMySearch);
