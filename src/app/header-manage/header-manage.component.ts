import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-manage',
  templateUrl: './header-manage.component.html',
  styleUrls: ['./header-manage.component.css']
})
export class HeaderManageComponent implements OnInit {

  userInformation : any;
  typeSelected!: string;
  fullNameUser!: string;
  role:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userInformation = localStorage.getItem("UserInformation");
    this.role = localStorage.getItem("Role");
  }
  clearStorage()
  {
    localStorage.clear();
  }
}
