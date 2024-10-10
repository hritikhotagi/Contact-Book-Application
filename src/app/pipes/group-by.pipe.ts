import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: any[], field: string): any[] {
    if (!value) return [];

    const groupedObj = value.reduce((acc, obj) => {
      const key = obj[field].charAt(0).toUpperCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    return Object.keys(groupedObj).map(key => ({ key, contacts: groupedObj[key] }));
  }
}
