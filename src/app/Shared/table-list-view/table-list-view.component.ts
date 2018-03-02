import { Customer } from "./../../Model/Customer";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Product } from "../../Model/Product";

@Component({
  selector: "app-table-list-view",
  templateUrl: "./table-list-view.component.html",
  styleUrls: ["./table-list-view.component.css"]
})
export class TableListViewComponent implements OnInit {
  public isLoading$ = new BehaviorSubject(false);
  public dataToShowOnTable: Array<Customer>;

  @Input() dataForTable: Array<any>;
  @Input() tableHeader: Object;
  @Input() modelType: string;
  @Output() dataToEdit = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();

  constructor() {
    this.dataToShowOnTable = null;
  }

  ngOnInit() {
    console.log("dataaaa", this.dataForTable);
  }

  paginatedDataToDisplayOnTable(paginatedDataToDisplay: Array<Customer>) {
    if (paginatedDataToDisplay && paginatedDataToDisplay.length > 0) {
      this.isLoading$.next(true);
      this.dataToShowOnTable = paginatedDataToDisplay;
      this.isLoading$.next(false);
    }
  }

  private editItemEmit(item: any) {
    if (item != null) {
      this.dataToEdit.emit(item);
    }
  }

  private deleteItemEmit(item: any) {
    if (item != null) {
      this.dataToDelete.emit(item);
    }
  }
}
