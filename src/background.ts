chrome.proxy.settings.get({ incognito: false }, details => {
  if (details.levelOfControl == 'controlled_by_this_extension') {
    chrome.browserAction.setIcon({
      path: 'logo.png',
    });
  } else {
    chrome.browserAction.setIcon({
      path: 'logo-off.png',
    });
  }
});
