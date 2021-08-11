import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { IAuths } from '../../models/auths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //isFormInvalid = false;
  areCredentialsInvalid = false;

  constructor(private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.areCredentialsInvalid = false;
    //this.isFormInvalid = this._authenticationService.isAuthenticated;
    //console.log(this.areCredentialsInvalid);
  }

  onSubmit(loginForm: NgForm){
    if (!loginForm.form.valid) {
      //this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(loginForm);
  }

  private checkCredentials(loginForm: NgForm) {
    const signInData: IAuths = {
      email: loginForm.value.email,
      password: loginForm.value.password
    };
    //console.log(signInData)
    if (!this._authenticationService.authenticate(signInData)) {
      //this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

}

