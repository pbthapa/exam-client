import { TableOptions } from './table.options';
import { TableColumnConf } from './column.conf.datatable';
import { Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { LoaderParams } from './../service/loaderParams';
import { DataLoaderService } from './../service/dataLoader.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Output, EventEmitter } from '@angular/core';
import { Renderer } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, DoCheck, OnInit, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

declare const XLSX, saveAs;

@Component({
  selector: 'xtable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges, DoCheck {

  @Input() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  @Input() options: TableOptions = new TableOptions();

  processedRows = [];

  // pagination
  pageRows: Array<any> = [];
  totalDataRows: number = -1;
  noOfPages: number = 1;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50];
  pageinationDirecton = 0; // 0 means the specified number is clicked, -1 is left and 1 is left button
  currentPagination = [];

  // searching
  searchBy = null;
  searchQuery = "";
  public keyUp = new Subject<string>();

  params: LoaderParams = new LoaderParams();
  ready = false;

  private _diff;
  
  constructor(private loader: DataLoaderService, private differs: KeyValueDiffers) {
    this._diff = differs.find([]).create();
   }

   ngDoCheck() {
    if (this._diff.diff(this.options)) {
      this.ngOnChanges();
    }
  }

  ngOnChanges() {
    this.init();
  }

  ngOnInit() {
    this.refresh.subscribe(event => {
      this.init();
    });
    this.init();
  }


  private init() {
    this.ready = false;
    this.searchQuery = '';
    this.buildColumns();
    this.searchParamsInit();

    if (this.options.serverSide) {
      this.params.pagesize = this.options.pageSize;
      this.params.pageno = this.currentPage;
      this.loader.loadDataFromUrl(this.params, this.options.requestUrl).then(result => { this.lazyDataInit(result) });
    }
    else {
      this.buildTableRowsFromRawData();
      let self = this;
    }
  }

  private lazyDataInit(result) {
    this.options.rows = result.result;
    this.totalDataRows = result.totalRows;
    this.buildTableRowsFromRawData();
  }

  private searchParamsInit() {
    let self = this;
    this.keyUp
      .map(event => event['target']['value'])
      .debounceTime(350)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(100))
      .subscribe(query => {
        self.searchIndex(query);
      });
  }

  private buildPageInfo() {
    if (!this.options.serverSide) {
      // then this is client side pagination with all data we have is the array
      this.totalDataRows = this.processedRows.length;
      this.noOfPages = Math.ceil(this.totalDataRows / this.options.pageSize);
      if (this.currentPage > this.noOfPages) this.currentPage = this.noOfPages;
    } else {
      this.noOfPages = Math.ceil(this.totalDataRows / this.options.pageSize);
      if (this.currentPage > this.noOfPages) {
        this.currentPage = this.noOfPages;
        // this means we need to refetch
        this.selectPage(this.currentPage, 0);
      }
    }
  }

  currentPageInit() {
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.options.serverSide) this.pageRows = this.processedRows;
    else
      this.pageRows = this.processedRows.slice((this.currentPage - 1) * this.options.pageSize, this.currentPage * this.options.pageSize);
  }

  getPages() {
    // now thing is we can show max 3 pages at once, 
    // so we need to send arrays accordingly
    const pages = [];
    for (let i = 0; i < this.noOfPages; i++) {
      pages.push(i);
    }
    const reducer = this.pageinationDirecton === 0 ? 1 : (this.pageinationDirecton === -1 ? 0 : this.pageinationDirecton);
    // now we need to figure out which portion of the pages to show
    if (this.noOfPages > 3 && (this.currentPage - reducer) % 3 === 0) {
      if (this.pageinationDirecton === 0 || this.pageinationDirecton === 1) {
        this.currentPagination = pages.slice(this.currentPage - 1, this.currentPage * 3);
      } else {
        this.currentPagination = pages.slice((this.currentPage - 3) * 3, this.currentPage);
      }
      return this.currentPagination;
    } else if (this.noOfPages <= 3) {
      return pages;
    } else {
      return this.currentPagination;
    }
  }

  selectPage(i, direction) {
    this.pageinationDirecton = direction;
    if (i > this.noOfPages || i < 1) { return; }

    if (!this.options.serverSide) {
      this.currentPage = i;
      this.currentPageInit();
    } else {
      this.ready = false;
      this.params.pageno = i;
      this.loader.loadDataFromUrl(this.params, this.options.requestUrl)
        .then(result => { this.lazyDataInit(result); this.currentPage = i; })
        .catch(err => { this.params.pageno = this.currentPage; })
    }
  }

  isCurrentPage(i) {
    return this.currentPage == i;
  }

  isLastPage() {
    return this.currentPage === this.noOfPages;
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  setPageSize(pageSize) {
    if (!this.options.serverSide) {
      this.options.pageSize = pageSize;
      this.buildPageInfo();
      this.currentPageInit();
    } else {
      this.ready = false;
      this.params.pagesize = pageSize;
      this.loader.loadDataFromUrl(this.params, this.options.requestUrl)
        .then(result => { this.lazyDataInit(result); this.options.pageSize = pageSize; })
        .catch(err => {
          this.params.pagesize = this.options.pageSize;
        })
    }
  }

  private buildColumns() {
    this.options.columns.forEach(col => {
      if (!col['sort']) col['sort'] = { enabled: false, status: 'asc' };
      else col['sort']['status'] = 'asc';
      if (this.options.serverSide && (col.transform != null || col.mapto != null)) {
        col.search = false;
        col.sort.enabled = false;
      } else {
        col.search = this.options.search && col.search;
        col.sort.enabled = this.options.sort && col.sort.enabled;
      }
    })
    let searchables = this.getSearchableColumns();
    this.searchBy = searchables.length > 0 ? searchables[0] : null;
  }


  sort(col) {
    if (!this.options.serverSide && col.sort.enabled) {
      if (col.sort.status == 'desc') {
        this.processedRows = this.processedRows.sort(function (a, b) { return (a[col['key']] > b[col['key']]) ? 1 : -1; });
        col.sort.status = 'asc';
      } else {
        this.processedRows = this.processedRows.sort(function (a, b) { return (a[col['key']] < b[col['key']]) ? 1 : -1; });
        col.sort.status = 'desc';
      }
      this.currentPageInit();
    } else if (this.options.serverSide) {
      if (col.sort.enabled) {
        this.ready = false;
        this.params.sortby = col.key;
        this.params.sortorder = col.sort.status == 'asc' ? 1 : 0;
        this.loader.loadDataFromUrl(this.params, this.options.requestUrl)
          .then(result => { this.lazyDataInit(result); col.sort.status = col.sort.status == 'asc' ? 'desc' : 'asc'; })
          .catch(err => { this.params.sortby = ''; this.params.sortorder = 0; })
      }
    }
  }

  private buildTableRowsFromRawData() {
    let promises = [];
    this.processedRows = [];
    this.options.rows.forEach((row, i) => {
      let detachedRow = JSON.parse(JSON.stringify(row));
      detachedRow['$index'] = i;
      detachedRow['$match'] = 0.0;
      this.processedRows.push(detachedRow);
      this.options.columns.forEach((col, j) => {
        if (col['type'] == 'html' && col['value']) {
          // means this is auto resolved from value
          detachedRow[col['key']] = col['value'];
        }

        if (col['transform'] && typeof col['transform'] == 'function') {
          let aPromise = col['transform'](JSON.parse(JSON.stringify(detachedRow)), JSON.parse(JSON.stringify(col)))
          promises.push(aPromise);
          aPromise.then(result => {
            this.processedRows[result['row']['$index']][result['col']['key']] = result['value'];
          })
        }
      })
    })
    Promise.all(promises).then(res => {
      this.buildPageInfo();
      this.currentPageInit();
      this.ready = true;
    })
  }

  resolveColumnValue(row, col, index, elemRef) {
    this.currentPage = this.currentPage > 0 ? this.currentPage : 1;
    if (col.type && col.type == 'html') {
      return;
    }
    if (col['mapto'] && col['mapto'] != '') {
      if (col['mapto'] == '$index' && !this.options.serverSide) {
        return row['$index'] + 1;
      } else if (col['mapto'] == '$sn' || this.options.serverSide) {
        return ((this.currentPage - 1) * this.options.pageSize) + index + 1;
      }
    } else if (col['key']) {
      return row[col['key']];
    }
  }

  private similarity(string_a, string_b) {
    var longer = string_a;
    var shorter = string_b;
    if (string_a.length < string_b.length) {
      longer = string_b;
      shorter = string_a;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.calculateEditDistance(longer, shorter)) / parseFloat(longerLength);
  }
  /** for matching */
  private calculateEditDistance(string_a, string_b) {
    string_a = string_a.toLowerCase();
    string_b = string_b.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= string_a.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= string_b.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (string_a.charAt(i - 1) != string_b.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[string_b.length] = lastValue;
      }
    }
    return costs[string_b.length];
  }

  onEventFire(event) {
    const eventObj = {
      row: this.findOriginalRow(event.row),
      event: event.value
    }
    this.event.emit(eventObj);
  }

  onRowClick(row) {
    const eventObj = {
      row: this.findOriginalRow(row),
      event: '@@row'
    };
    this.event.emit(eventObj)
  }

  private findOriginalRow(processedRow) {
    //remove $match $index and send
    let resolved = {};
    for (let key in processedRow) {
      if (!key.startsWith('$') && key != 'html') {
        resolved[key] = processedRow[key];
      }
    }
    return resolved;

    // let match = this.options.rows.filter(row => {
    //   let match = true;
    //   for (let key in row) {
    //     match = match && (row[key] == processedRow[key]);
    //   }
    //   return match;
    // })
    // return match.length > 0 ? match[0] : null;
  }

  getSearchableColumns() {
    return this.options.columns.filter(col => {
      return (col['type'] ? col['type'] != 'html' : true)
        && (col['search'] != null ? col['search'] : false);
    })
  }

  searchByParam(option) {
    this.searchBy = option;
    this.searchIndex(this.searchQuery);
  }

  private searchIndex(query) {
    if (!this.options.serverSide) {
      if (query == '') {
        this.processedRows = (this.processedRows.sort((a, b) => (b['$index'] - a['$index'])));
        this.currentPageInit();
      }

      this.processedRows.forEach(row => {
        row['$match'] = this.similarity(query, row[this.searchBy.key]);
      })
      this.processedRows = (this.processedRows.sort((a, b) => (a['$match'] < b['$match']) ? 1 : -1));
      this.currentPageInit();
    } else {
      this.ready = false;
      this.params.sortorder = 0;
      this.params.filterby = this.searchBy.key;
      this.params.filterquery = query;
      this.loader.loadDataFromUrl(this.params, this.options.requestUrl).then(result => { this.lazyDataInit(result); })
        .catch(err => {
        })

    }
  }

  private s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    } else {
      let buf = new Array(s.length);
      for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  }

  downloadXls() {
    const preparedRows = this.prepareRowsForDownload();
    const ws = XLSX.utils.json_to_sheet(preparedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)]), 'exportdata' + new Date() + '.xlsx');
  }

  private prepareRowsForDownload() {
    const preparedRows = [];
    this.processedRows.forEach(row => {
      let r = {};
      for (let key in row) {
        if (!key.startsWith('$') && key !== 'html') {
          r[key] = row[key];
        }
      }
      preparedRows.push(r);
    });
    return preparedRows;
  }
}
