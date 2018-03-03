import { Component, OnInit, EventEmitter } from '@angular/core';
import { SubjectAreaService } from './service/subject-area.service';
import { Subject } from './model/subject.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TableOptions } from '../../app-utils/xDatatable/table/table.options';
import { ColumnConfig } from './table-column.config';

@Component({
  selector: 'app-subject-area',
  templateUrl: './subject-area.component.html'
})
export class SubjectAreaComponent implements OnInit {

  subjectForm: FormGroup;
  editLabel: string;

  // Table variables
  // tableOptions: TableOptions = new TableOptions();
  // refreshTable = new EventEmitter<any>();
  // public tableRows: Array<Subject> = [];

  // formgroup to enable create/edit operation
  subForm: FormGroup;

  // data is input to the table component 
  public data;

  constructor(private formBuilder: FormBuilder, private _subjectAreaService: SubjectAreaService) {
  }

  setFields() {
    this.editLabel = 'Add Subject Area';
    this.subjectForm = new FormGroup({
      'id': new FormControl(null),
      'subject': new FormControl(null, Validators.required),
      'active': new FormControl('true')
    });
  }

  ngOnInit() {
    this.setFields();
    // Table Properties initialize
    // this.tableOptions.rows = [];
    // this.tableOptions.sort = true;

    // These are majority of data to be collected
    this.subForm = this.formBuilder.group({
      subject: ['', Validators.required],
      active: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
    this.getSubjectAreaList();
  }

  onSubmit() {
    if(this.subjectForm.valid) {
      let subject = new Subject(
        this.subjectForm.value['id'],
        this.subjectForm.value['subject'],
        this.subjectForm.value['active']==null?false:this.subjectForm.value['active']
      );
      if(subject.id == null) {
        this._subjectAreaService.create(subject);
      } else {
        this._subjectAreaService.update(subject);
      }
      this.setFields();
      // this.refreshTable.emit();
    }
  }

  getSubjectAreaList() {
    Promise.all([this._subjectAreaService.getSubjectAreaList()])
    .then(response => {
      this.data = response[0];
      // this.tableRows = this.data;
      // this.setTableOption();
    });
  }


  // public setTableOption() {
  //   this.tableOptions.columns = ColumnConfig;
  //   this.tableOptions.rows = this.tableRows;
  //   this.tableOptions.serverSide = false;
  //   this.tableOptions.pagination = true;
  //   this.tableOptions.pageSize = 5;
  // }

  // Event for table Click
  // onCompleteApplicationClick(event) {
  //   if (event.event === 'view') {
  //     this.tableOnViewSubject(event.row);
  //   }
  //   if (event.event === 'edit') {
  //     this.tableOnEditSubject(event.row);
  //   }
  //   if (event.event === 'delete') {
  //     this.tableOnDeleteSubject(event.row);
  //   }
  //   if (event.event === 'deactivate') {
  //     this.tableOnDeactivateSubject(event.row);
  //   }
  // }

  tableOnEditSubject(ev, row) {
    this.editLabel = "Edit Subject Area";
    console.log(ev);
    this.subjectForm.patchValue({ 'id': row.id, 'subject': row.subject, 'active': row.active });
  }

  tableOnDeactivateSubject(row) {
    this._subjectAreaService.delete(row.id);
    this.getSubjectAreaList();
  }
  
}
