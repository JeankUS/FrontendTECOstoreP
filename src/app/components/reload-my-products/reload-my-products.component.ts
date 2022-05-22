import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reload-my-products',
  templateUrl: './reload-my-products.component.html',
  styleUrls: ['./reload-my-products.component.css']
})
export class ReloadMyProductsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['/Myproducts'])
  }

}
