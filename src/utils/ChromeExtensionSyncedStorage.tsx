import { KeyValueStorageInterface } from 'aws-amplify/utils';
import { defaultStorage } from 'aws-amplify/utils';
export class ChromeExtensionSyncedStorage implements KeyValueStorageInterface {
  getItem(key: string): Promise<string | null> {
    return defaultStorage.getItem(key);
  }
  setItem(key: string, value: string): Promise<void> {
    window.postMessage({ type: 'setItem', key: key, value: value }, '*');
    return defaultStorage.setItem(key, value);
  }
  removeItem(key: string): Promise<void> {
    window.postMessage({ type: 'removeItem', key: key }, '*');
    return defaultStorage.removeItem(key);
  }
  clear(): Promise<void> {
    window.postMessage({ type: 'clear' }, '*');
    return defaultStorage.clear();
  }
}
