import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterKey = 'filterCriteria';

  setFilterCriteria(criteria: string) {
    localStorage.setItem(this.filterKey, criteria);
  }

  getFilterCriteria(): string {
    return localStorage.getItem(this.filterKey) || '';
  }
}
