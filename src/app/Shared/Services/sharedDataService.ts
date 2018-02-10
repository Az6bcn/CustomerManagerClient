import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class SharedDataService {

  private dataSource = new BehaviorSubject<object>({}); // default data is empty Object
  currentData = this.dataSource.asObservable();

  // change BehaviourSubject currentData value
  changeData (dataItem: object) {
        // this.currentData.next(dataItem); // doesn't work on object/any
        this.dataSource.next(dataItem);
  }
}
