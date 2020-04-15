export class UserDefaults {
  public static get<T>(forKey: string, defaultValue: T): Promise<T> {
    return new Promise(function(resolve) {
      chrome.storage.sync.get({ [forKey]: defaultValue }, function(items) {
        if (items[forKey] === undefined) return resolve(defaultValue);
        return resolve(items[forKey]);
      });
    });
  }

  public static set<T>(forKey: string, value: T) {
    chrome.storage.sync.set({ [forKey]: value });
  }
}

// too lazy to simplify code
export class LocalUserDefaults {
  public static get<T>(forKey: string, defaultValue: T): Promise<T> {
    return new Promise(function(resolve) {
      chrome.storage.local.get({ [forKey]: defaultValue }, function(items) {
        if (items[forKey] === undefined) return resolve(defaultValue);
        return resolve(items[forKey]);
      });
    });
  }

  public static set<T>(forKey: string, value: T) {
    chrome.storage.local.set({ [forKey]: value });
  }
}
