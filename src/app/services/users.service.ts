import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUsers } from '../models/users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUsers():Observable<IUsers[]> {
    return this.httpClient.get<IUsers[]>(this._apiUrl);
  }

  addUser(u: IUsers):Observable<IUsers> {
    return this.httpClient.post<IUsers>(this._apiUrl, u);
  }
}
