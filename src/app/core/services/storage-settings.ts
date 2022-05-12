import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageSettingsService {
  public storage: SecureStorageObject;
  constructor(private secureStorage: SecureStorage) {
  }
  setKey(key, data) {
    this.storage.set(key, data)
      .then(
        resp => {
        }, error => {
        }
      );
  }
  getKey(key, data) {
    this.storage.set(key, data)
      .then(
        resp => {
        }, error => {
        }
      );
  }
}


