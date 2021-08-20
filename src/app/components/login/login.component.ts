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
  
  areCredentialsInvalid = false;

  constructor(private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.areCredentialsInvalid = false;
   
  }

  onSubmit(loginForm: NgForm){
    if (!loginForm.form.valid) {
     
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
    
    if (!this._authenticationService.authenticate(signInData)) {
    
      this.areCredentialsInvalid = true;
    }
  }

}

