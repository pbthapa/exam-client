import { Http } from '@angular/http';
import { LoaderParams } from './loaderParams';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataLoaderService {
    constructor(private http: Http) { }

    public loadDataFromUrl(param: LoaderParams, url: string) {
        alert("hello");
        let urlWithParams = url + this.createQueryParams(param);
        return this.http.get(urlWithParams).map(res => res.json()).toPromise();
    }

    private createQueryParams(param: LoaderParams) {
        return "?filterby=" + param.filterby
            + "&filterquery=" + param.filterquery
            + "&sortby=" + param.sortby
            + "&sortorder=" + (param.sortorder == 0 ? 'asc' : 'desc')
            + "&pagesize=" + param.pagesize
            + "&pageno=" + param.pageno;
    }

    // public loadData(param: LoaderParams) {
    //     let data = { total_rows: lazyData.length, data: [] };
    //     data.data = this.getPage(this.sort(this.filter(lazyData, param), param), param);
    //     return Observable.of(data).toPromise();
    // }

    private filter(data, param: LoaderParams) {
        if (param.filterquery.length == 0 || param.filterby.length == 0) return data;
        data.forEach(row => {
            row['$match'] = this.similarity(param.filterquery, row[param.filterby]);
        })
        return (data.sort((a, b) => {
            return (b['$match'] - a['$match'])
        }))
    }

    private sort(data, param: LoaderParams) {
        if (param.sortby.length == 0) return data;
        return data.sort((a, b) => {
            if (a[param.sortby] > b[param.sortby]) return -1;
            else if (b[param.sortby] > b[param.sortby]) return 1;
            return 0;
        });
    }

    private getPage(data, param: LoaderParams) {
        return data.slice((param.pageno - 1) * param.pagesize, param.pageno * param.pagesize);
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
            if (i > 0)
                costs[string_b.length] = lastValue;
        }
        return costs[string_b.length];
    }

}