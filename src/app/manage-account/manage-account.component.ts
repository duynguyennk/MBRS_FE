import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  roleInformation : any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.roleInformation = localStorage.getItem("Role");
    console.log(this.roleInformation)
    if(this.roleInformation !== "AM")
    {
      this.router.navigate(['homepage'])
    }
  }

}
