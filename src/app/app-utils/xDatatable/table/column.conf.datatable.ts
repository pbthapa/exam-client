export class TableColumnConf {
    // maps to key in the data fetched/passed
    // sets the key for the columns with transform, mapto, type:'html'
    // into the processed rows arrat
    key: string;

    // used to map the value to table generated values
    // $index means the row id inside the data, so sorting preserves it
    // $sn means the order *ngFor has posted the data, so the sn will remain
    // same even after sorting or searching
    // optional
    mapto?: string;

    // name of the column to be shown
    name: string;

    // function that transforms constructs its own value
    // for the column. Returns promise with resolve returning
    // value:value to be rendered
    // row: which row has the tranform function processed
    // col: which col the transform function has processed
    transform?: Function;

    // enabled true means sorting has been enabled
    // status is used by the table inside itself
    // defaule is false
    // optional
    sort?: { enabled: boolean, status?:string };

    // enables search for the column
    // default false
    // optional
    search?: boolean;

    // type of data being passed as value to the column
    // default is normal string
    // 'html': html value passed will be rendered
    // optional
    type?: string;

    // inline value
    // used when there is type=html specified and value is provided
    // table assumes the value is of type html
    // optional
    value?: string;

    // case when the html is passed to column, then one might want
    // to have event hooks, 
    // 'click':true means click is enabled to the passed
    // html. value as attribute must be passed on to the html passed
    // so that event will return 
    //{ value: value attribute of the clicked html, row: row where the click was emitted}
    events?: { click: boolean };
}