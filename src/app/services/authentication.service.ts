import { Injectable } from '@angular/core';
import { IAuths } from '../models/auths';
import { UsersService } from './users.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isAuthenticated = false;
  isNotAuthenticated = true;
  utilisateurEnCours: any = {};

  constructor(private router: Router, private _usersService: UsersService) { }



  authenticate(signInData: IAuths): Observable<boolean> {
    let bool: any;
    this._usersService.getUsers().subscribe(data => {
      if (data.some(u => u.email === signInData.email && u.password === signInData.password)) {
        this.isAuthenticated = true;
        this.isNotAuthenticated = false;
        this.setUtilisateurEnCours(signInData);
        this.router.navigate(['home']);
        bool = true;
      } else {
        this.isAuthenticated = false;
        this.isNotAuthenticated = true;
        bool = false;
      }
    });
    return bool;
  }

  logout() {
    this.isAuthenticated = false;
    this.isNotAuthenticated = true;
    this.router.navigate(['']);
  }

  setUtilisateurEnCours(signInData: IAuths){
    this._usersService.getUsers().subscribe(data => {
      this.utilisateurEnCours = data.find(u => u.email === signInData.email && u.password === signInData.password);
    });
    console.log(this.utilisateurEnCours)
  }

  getIsAuthenticated(): boolean { 
    return this.isAuthenticated;
  }
}
