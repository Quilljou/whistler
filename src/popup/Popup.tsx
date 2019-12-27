import React, { useState, useEffect } from 'react';
import moment from 'moment'; // moment is not necessary

function App() {
  const [state, setState] = useState({
    url: '',
    time: '',
  });
  let count = 0;

  useEffect(() => {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.browserAction.setBadgeText({ text: count.toString() });
    chrome.tabs.query(queryInfo, function(tabs) {
      setState({
        url: tabs[0].url || '',
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    });
  }, []);

  function clickCountup() {
    chrome.browserAction.setBadgeText({ text: (++count).toString() });
  }

  function clickChangeBackground() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            color: '#555555',
          },
          function(msg: string) {
            console.log('result message:', msg);
          },
        );
      }
    });
  }

  return (
    <div>
      <ul style={{ minWidth: '700px' }}>
        <li>
          Current URL: <span>{state.url}</span>
        </li>
        <li>
          Current Time: <span>{state.time}</span>
        </li>
      </ul>
      <button onClick={clickCountup}>count up</button>
      <button onClick={clickChangeBackground}>change background</button>
    </div>
  );
}

export default App;
