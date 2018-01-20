import { Customer } from './../../Model/Customer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  private pageNumber: number;
  private totalPages: number;
  private currentIndex: number = 1;
  private isVisible: boolean = false;
  private previousEnabled: boolean = false;
  private nextEnabled: boolean = true;
  private items: Array<Customer>;
  private pages: number = 4;
  private pageSize: number = 10;

  pagesIndex: Array<number>;
  pageStart: number = 1;
  inputName: string = '';
  @Input() dataForTable: Array<Customer>;
  @Output() dataForTableEmit= new EventEmitter<Array<Customer>>();
  constructor() { }

  ngOnInit() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt("" + (this.dataForTable.length / this.pageSize));
    if (this.dataForTable.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    if(this.items)
    this.dataForTableEmit.emit(this.items);
  }

  private fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }


  private refreshItems() {
    this.items = this.dataForTable.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }


  private prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();

    this.dataForTableEmit.emit(this.items);
  }


  private nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }
    this.refreshItems();

    this.dataForTableEmit.emit(this.items);
  }


  private setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }



}

/*

items attribute: is an array of ‘Customers’ used to stock the result of the search process executed by ‘FilterByName’ function.
pageSize attribute : indicate the number of entries per page,
pages : is a maximum of Page numbers that can be displayed in pagination bar (it’s the size of ‘pagesIndex’ array).
pageNumber attribute : is the maximum number of page can we deduce from the ‘CustomersList’ in terms of ‘pageSize’ value,
currentIndex attribute : is the index of the current selected page,
items attribute : the content of selected page,
pagesIndex attribute : have the series of numbers shown in the pagination bar.
pageStart attribute : this the start index page in the pagination bar.
inputName attribute : is used to search a new list of Customers which the value of the attribute name for each one contains the text in ‘inputName’ .
Constructor method : initialize the ‘items’ from ‘CustomersList’, and the pagination.
Init method : used to calculate the pagination values, and update the view screen.
refreshItems method : refresh the content of table depending mainly on values of the following attributes : ‘currentIndex’ , ‘pageSize’ , 'pages' and 'pageStart' .
prevPage method : this function will decrease the selected page index (‘currentIndex’) by one, and will refresh the display.
nextPage method : this function will increase the selected page index (‘currentIndex’) by one, and will refresh the display.
setPage method : invoked when user select a number from pagination. It will modify the ‘currentIndex’ value and refresh the view.

*/