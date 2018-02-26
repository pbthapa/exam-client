import { TableColumnConf } from './column.conf.datatable';
import { EventEmitter } from '@angular/core';

export class TableOptions {
    // enable/disable server side
    serverSide: boolean = false;
    // request url where the table will request for data
    // during server side pagination;
    requestUrl?: string;

    // no of rows to be shown per page
    pageSize: number = 5;

    // options for page size;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    //columns for the table
    columns: Array<TableColumnConf> = [];

    // rows is data to the table
    // this is optional for server side
    // turned on
    rows?: Array<any>;

    // turn off/on search feature
    search: boolean = true;

    // turn off/on sorting feature
    sort: boolean = true;

    // enable disable pagination
    pagination: boolean = true;

    // download xls
    // default true
    download: { xls: boolean } = { xls: false };
}