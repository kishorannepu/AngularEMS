import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;
  constructor() { }


  setSidenav(sidenav){
    this.sidenav = sidenav;
  }
  public close() {
    return this.sidenav.close();
  }
}
