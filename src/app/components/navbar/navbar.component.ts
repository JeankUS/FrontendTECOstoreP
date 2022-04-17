import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public statusLogin=false;
  constructor() { }

  ngOnInit(): void {
    // this.validLoging();
  }


  validLoging(){
    if(this.statusLogin===true){
      console.log(this.statusLogin)
      return true;
    }
    return false
  }

}
