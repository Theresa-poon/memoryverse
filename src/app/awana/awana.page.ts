import { Component, OnInit } from '@angular/core';
import { LocalstorageService, SearchType } from '../localstorage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-awana',
  templateUrl: './awana.page.html',
  styleUrls: ['./awana.page.scss'],
})
export class AwanaPage implements OnInit {

  public versesAll = [];
  public verses = [];
  searchVerse: string = '';
  unit: SearchType = SearchType.all;
  searchVerseArr = [];

  constructor(public localstorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit() {
    this.localstorageService.searchData()
      .subscribe(data => {
        this.versesAll = data;
        this.verses=this.versesAll;
        console.log(this.verses[0].text2);
        this.localstorageService.getLocalAwana(this.versesAll.length);
        console.log(this.versesAll.length)
        });
        
  }

  searchChanged() {
    console.log("search verse: "+this.searchVerse)
    console.log("search unit: "+this.unit)
    this.verses = [];
    this.localstorageService.searchData()
      .subscribe(data => {
        this.versesAll = data;
      });

      this.searchVerseArr = this.searchVerse.split(" ")
      console.log(this.searchVerseArr)

      var i = 0
      for (i = 0; i < this.versesAll.length; i++) { 
        //console.log(i)
        //console.log(this.videosAll[i].type)
        //console.log(this.type)
  
      var j = 0  
      for (j = 0; j < this.searchVerseArr.length; j++) {
      if (this.searchVerseArr[j] != " ") {
        //console.log(i)
        //console.log(j)
        //console.log("text9: "+this.versesAll[i].text9.search(this.searchVerseArr[j]))
        if (this.versesAll[i].verse.search(this.searchVerseArr[j]) != -1) {
          console.log(j)
          console.log(this.searchVerseArr.length)
          if (j == this.searchVerseArr.length - 1) {
          if (this.unit != "") {
            if (this.versesAll[i].unit==this.unit) {
              this.verses.push(this.versesAll[i])
              //break
            }
          } else {
            this.verses.push(this.versesAll[i])
            //break
          }
          }
        } else {
          break
        }
      }
      }
  
    }

  }

  GoToVerseAwana(item, page) {
    this.localstorageService.currentVerse = item;
    console.log("verse chosen: "+item.verse)
    //this.firebaseService.currentIndex = i;
    this.localstorageService.currentPage = page;
    this.router.navigate(['/verseawana']);
  }

}
