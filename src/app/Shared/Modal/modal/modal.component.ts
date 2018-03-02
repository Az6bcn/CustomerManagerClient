import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ModalModel } from '../../../Model/modalModel';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends SimpleModalComponent<ModalModel, boolean> implements OnInit, ModalModel {

  title: string;
  message: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }


  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }
}
