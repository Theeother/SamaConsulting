import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:IUsers[];
  newUser: any = {};


  constructor(private _userService : UsersService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData(): void {
    this._userService.getUsers().subscribe(data =>{
      this.users = data;
  });
  }

  // add a new User
  saveUser(u: IUsers){
    u.id = this.users.length+1;
    this._userService.addUser(u).subscribe(() => {
      this.getUsersData();
    });
    this.newUser = {};
  }

  cancelNewUser() {
    this.newUser = {};
  }

}
