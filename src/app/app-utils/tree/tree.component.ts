import { TreeService } from './tree.service';
import { TreeModel } from './tree.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  tree: TreeModel[] = [];

  constructor(private _treeService: TreeService) {
  }

  ngOnInit() {
    this.tree = this._treeService.getData();
  }

  handleToggleEvent(ev) {
    switch(ev.target.className) {
      case 'fa fa-caret-down': 
        ev.target.className='fa fa-caret-right';
        ev.target.nextElementSibling.hidden=false;
        break;
      case 'fa fa-caret-right': 
        ev.target.className='fa fa-caret-down';
        ev.target.nextElementSibling.hidden=true;
        break;
    }
    console.log(ev.target);
  }

  handleCheckEvent(ev) {
    var nodeChecked = ev.target.checked;
    console.log(ev.target);
  }
}
