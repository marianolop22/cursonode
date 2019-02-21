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
  public register: User;
  public identity: User; //comprobar datos del user logueado
  public token;
  public errorMessage;
  public registerSuccess: boolean = false;
  public registerError: string;

  constructor ( public _user:UserService ) {
    this.user = new User('','','','','','ROLE_USER','');
    this.register = new User('','','','','','ROLE_USER','');
  }

  public ngOnInit () {
    this.identity = this._user.getIndentity ();
    this.token = this._user.getToken ();
  }

  public onSubmit () {

    this._user.login (this.user).subscribe ( (response:User) => {

      localStorage.setItem ('identity', JSON.stringify ( response ) ) ;
      this.identity = response;
      this.user = new User('','','','','','ROLE_USER','');
      this.registerSuccess = false;
      this.registerError = null;
  

    }, (error:HttpErrorResponse) => {
      this.errorMessage = error.error.message  ;
      
    })
  }

  public logOut () {
    localStorage.clear();
    this.identity = null;
    this.token = null;

  }

  public registerUser () {

    this.registerSuccess = false;
    this.registerError = null;

    this._user.register( this.register).subscribe ( response => {
      console.log ( response );

      this.registerSuccess = true;
      this.register = new User('','','','','','ROLE_USER','');

    }, (error:HttpErrorResponse) => {
      this.registerError = error.error.message  ;
    })
  }

}
