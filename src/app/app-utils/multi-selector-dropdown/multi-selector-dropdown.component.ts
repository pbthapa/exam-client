import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DropdownModel } from './dropdown.model';

@Component({
  selector: 'multi-selector-dropdown',
  templateUrl: './multi-selector-dropdown.component.html',
  styleUrls: ['./multi-selector-dropdown.component.css']
})
export class MultiSelectorDropdownComponent implements OnInit {

  @Input() list: any[];
  @Output() selectedDataList = new EventEmitter();

  _selectedDataList: DropdownModel[];

  constructor() {
    this._selectedDataList = [];
  }

  ngOnInit() {
    this._selectedDataList = [];
  }

  getSelectedValue(id: number, value: string, status: boolean) {
    if (status) {
      this._selectedDataList.push(new DropdownModel(id, value, status));
    } else {
      const index = this._selectedDataList.findIndex(data => data.id === id);
      this._selectedDataList.splice(index, 1);
    }
 
    this.shareSelectedData();
  }

  shareSelectedData() {
    this.selectedDataList.emit(this._selectedDataList);
  }
}
