import { TableColumnConf } from '../../app-utils/xDatatable/table/column.conf.datatable';

export const ColumnConfig: Array<TableColumnConf> = [
    { key: '$index', mapto: '$index', name: 'SN.', sort: { enabled: false } },
    {
        key: 'custName',
        name: 'Customer Name',
        sort: { enabled: true },
        search: true
    },
    {
        key: 'favFood',
        name: 'Favourite Food',
        sort: { enabled: true },
        search: true
    },    
    {
        key: 'html',
        sort: { enabled: false },
        name: 'Action',
        type: 'html',
        value: '<button class="ui basic icon button" value="delete"><i value="delete" class="trash outline icon"></i></button><button class="ui basic icon button" value="view"><i value="view" class="street view icon"></i></button><button class="ui basic icon button" value="edit"><i value="edit" class="edit icon"></i></button>',
        events: { click: true }
    }

];
