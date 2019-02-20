import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public title = 'Musify';
  public user: User;
  public identity: User; //comprobar datos del user logueado
  public token;
  public errorMessage;

  constructor ( public _user:UserService ) {
    this.user = new User('','','','','','ROLE_USER','');
  }

  public ngOnInit () {
    this.identity = this._user.getIndentity ();
    this.token = this._user.getToken ();
  }

  public onSubmit () {

    this._user.login (this.user).subscribe ( (response:User) => {

      localStorage.setItem ('identity', JSON.stringify ( response ) ) ;
      this.identity = response;

    }, (error:HttpErrorResponse) => {
      this.errorMessage = error.error.message  ;
      
    })
  }


}
