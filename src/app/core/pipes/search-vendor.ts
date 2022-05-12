import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchVendors'
})
export class FilterPipe implements PipeTransform {
    constructor() { }
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) {
            return items;
        }
        searchText = searchText.trim();
        searchText = searchText.toLowerCase();
        return items.filter(it => {
           return it.vendorname.toLowerCase().includes(searchText);
        });
    }
}