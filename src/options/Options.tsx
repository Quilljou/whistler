import React, { useState, useEffect, ChangeEvent } from 'react';

export default function App() {
  const [colorValue, setColorValue] = useState('');
  const [likeValue, setLikeValue] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        favoriteColor: 'red',
        likesColor: true,
      },
      function(items) {
        setColorValue(items.favoriteColor);
        setLikeValue(items.likesColor);
      },
    );
  }, []);

  const colorValueChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setColorValue(e.target.value);
  };

  const likeValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setLikeValue(e.target.checked);
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const saveOptions = () => {
    chrome.storage.sync.set(
      {
        favoriteColor: colorValue,
        likesColor: likeValue,
      },
      function() {
        // Update status to let user know options were saved.
        setStatus('Options saved.');
        setTimeout(function() {
          setStatus('');
        }, 750);
      },
    );
  };

  return (
    <div>
      Favorite color:
      <select value={colorValue} onChange={colorValueChanged}>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="blue">blue</option>
        <option value="yellow">yellow</option>
      </select>
      <label>
        <input type="checkbox" checked={likeValue} onChange={likeValueChanged} />I like colors.
      </label>
      <div id="status">{status}</div>
      <button id="save" onClick={saveOptions}>
        Save
      </button>
    </div>
  );
}
