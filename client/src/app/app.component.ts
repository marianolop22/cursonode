import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title = 'Musify';
  public user: User;
  public identity: User; //comprobar datos del user logueado
  public token;
  public errorMessage;

  constructor ( public _user:UserService ) {
    this.user = new User('','','','','','ROLE_USER','');
  }

  public onSubmit () {

    this._user.login (this.user, false).subscribe ( (response:User) => {

      this.identity = response;

    }, (error:HttpErrorResponse) => {
      console.log (error);
      this.errorMessage = error.error.message  ;
      
    })
  }


}
