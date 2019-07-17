import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Item } from '../storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
//import { docChanges } from '@angular/fire/firestore';
//import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-self',
  templateUrl: './self.page.html',
  styleUrls: ['./self.page.scss'],
})
export class SelfPage implements OnInit {

  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(private router: Router,
    private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      console.log("in constructor before loadItems")
      this.loadItems();
    });
  }

  ngOnInit() {
  }

 // ionViewWillEnter() {
    //console.log("in ionViewWillEnter before loadItems")
    //this.loadItems();
    //console.log("hello"+this.items.length)
  //}

   // CREATE
   addItem() {
    this.newItem.modified = 0;
    this.newItem.id = Date.now();
    //this.noBreakInputA = this.newItem.title
    //this.noBreakInputB = this.noBreakInputA.replace(/[ ]/g,"")
    //console.log("titleA="+this.noBreakInputA)
    //console.log("titleB="+this.noBreakInputB)
    if(this.newItem.title != null && this.newItem.value != null && this.newItem.title.replace(/ /g,"") != "" && this.newItem.value.replace(/ /g,"") != "") {
      if(this.items == null) {    
          this.storageService.addItem(this.newItem).then(item => {
          this.newItem = <Item>{};
          this.showToast('已添加經文!')
          this.loadItems(); // Or add it to the array directly
        });
      } else {
        if(this.items.length <= 49) {
            this.storageService.addItem(this.newItem).then(item => {
            this.newItem = <Item>{};
            this.showToast('已添加經文!')
            this.loadItems(); // Or add it to the array directly
          });
        } else {
          this.showToast('經文數量已到達50項上限!')
        }
      } 
    } else {
      this.showToast('請輸入經文章節及內容!')
    }
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
    console.log("finished loaditems")
  }

  // go to verse practice
  chooseItem(item, i, page) {
    console.log(item, i, page)
    this.storageService.selectedVerse = item;
    this.storageService.selectedIndex = i;
    this.storageService.selectedPage = page;
    this.router.navigate(['/verseself']);
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('已刪除經文!')
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }

// Helper
async showToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
    cssClass: 'myToast'
  });
  toast.present();
}

}
