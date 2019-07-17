import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  title: string, //verse number
  value: string, //verse content
  modified: number
}
 
const ITEMS_KEY = 'my-items'; // name of array storing user's verses in phone local memory

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  selectedVerse: any;
  selectedIndex = 0;
  selectedPage

  constructor(private storage: Storage) { }

  // CREATE
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // READ
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        console.log("update unsuccessful")
        return null;
      }
 
      let newItems: Item[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          console.log("updating")
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      console.log("updating2")
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // DELETE
  deleteItem(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Item[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

}
