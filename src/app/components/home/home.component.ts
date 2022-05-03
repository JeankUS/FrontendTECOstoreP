import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faCoffee = faCoffee;
  //Formularios

  //Listas

  //Otros

  //Constructor
  constructor(private auth: Auth) { }

  ngOnInit(): void {
    
  }

}
