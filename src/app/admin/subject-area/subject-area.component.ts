import { PageModel } from './../../common/page.model';
import { AlertService } from './../../app-utils/alert/alert.service';
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
  pageModel: PageModel;

  goToPage(n: number): void {
    this.pageModel.page = n;
    this.getSubjectAreaList();
  }

  onNext(): void {
    this.pageModel.page++;
    this.getSubjectAreaList();
  }

  onPrev(): void {
    this.pageModel.page--;
    this.getSubjectAreaList();
  }

  // Table variables
  // tableOptions: TableOptions = new TableOptions();
  // refreshTable = new EventEmitter<any>();
  // public tableRows: Array<Subject> = [];

  // formgroup to enable create/edit operation
  subForm: FormGroup;

  // data is input to the table component 
  public data;

  constructor(private _formBuilder: FormBuilder, private _subjectAreaService: SubjectAreaService,
    private _alertService: AlertService) {
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
    this.pageModel = new PageModel();
    this.setFields();
    // Table Properties initialize
    // this.tableOptions.rows = [];
    // this.tableOptions.sort = true;

    // These are majority of data to be collected
    this.subForm = this._formBuilder.group({
      subject: ['', Validators.required],
      active: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
    this.getSubjectAreaList();
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      let subject = new Subject(
        this.subjectForm.value['id'],
        this.subjectForm.value['subject'],
        this.subjectForm.value['active'] == null ? false : this.subjectForm.value['active']
      );
      if (subject.id == null) {
        this._subjectAreaService.create(subject)
          .then(response => {
            this._alertService.success("Subject area updated successfully");
            this.setFields();
            this.getSubjectAreaList();
          })
          .catch(error => {
            this._alertService.success("Subject area updated successfully");
            console.log(error._body);
          });
      } else {
        this._subjectAreaService.update(subject)
          .then(response => {
            this._alertService.success("Subject area updated successfully");
            this.setFields();
            this.getSubjectAreaList();
          })
          .catch(error => {
            this._alertService.error("Unable to update Subject area");
            console.log(error._body);
          });
      }
      // this.refreshTable.emit();
    }
  }

  getSubjectAreaList() {
    this._subjectAreaService.getSubjectAreaPagedList({ page: this.pageModel.page, limit: this.pageModel.limit })
      .then(response => {
        console.log(response);
        this.data = response.result;
        // this.tableRows = this.data;
        // this.setTableOption();
        this.pageModel.total = response.count;
      })
      .catch(error => {
        this._alertService.error("Unable to show subject area list");
        console.log(error._body);
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
    this.subjectForm.patchValue({ 'id': row.id, 'subject': row.subject, 'active': row.active });
  }

  tableOnDeactivateSubject(row) {
    if (row.active) {
      this._subjectAreaService.delete(row.id)
        .then(response => {
          this._alertService.success(row.subject + " deactivated successfully");
          this.getSubjectAreaList();
        })
        .catch(error => {
          this._alertService.error("Unable to deactivate " + row.subject);
          console.log(error._body);
        });
    }
  }
}