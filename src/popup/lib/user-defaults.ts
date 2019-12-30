export class UserDefaults {
  public static get<T>(forKey: string, defaultValue: T): Promise<T> {
    return new Promise(function(resolve) {
      chrome.storage.sync.get({ [forKey]: defaultValue }, function(items) {
        if (!items[forKey]) return resolve(defaultValue);
        return resolve(items[forKey]);
      });
    });
  }

  public static set<T>(forKey: string, value: T) {
    console.log(forKey, value);
    chrome.storage.sync.set({ [forKey]: value }, function() {
      chrome.storage.sync.get(forKey, function(items) {
        console.log(UserDefaults.get(forKey, ''));
      });
    });
  }
}
