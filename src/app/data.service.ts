import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  getGlobalMbtVariables(): Object {
    return window['mbtGlobal'];
  }

  getLinksetProfilesList(): any {
    const mbtGlobal = this.getGlobalMbtVariables();
    if (mbtGlobal !== undefined) {
      return JSON.parse(mbtGlobal['associatedCompanies']);
    }
  }
}
