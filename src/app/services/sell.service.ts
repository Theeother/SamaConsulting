import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProductSold } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  private _apiUrl: string = `${environment.apiUrl}/sold`;

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<IProductSold[]> {
    return this.httpClient.get<IProductSold[]>(this._apiUrl);
  }

  addProduct(p: IProductSold):Observable<IProductSold> {
    return this.httpClient.post<IProductSold>(this._apiUrl, p);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this._apiUrl+'/'+id}`);
  }
  getById(id: number) {
    console.log(this.httpClient.get<IProductSold>(`${this._apiUrl+'/'+id}`));
    return this.httpClient.get<IProductSold>(`${this._apiUrl+'/'+id}`);
  }

  deleteALL(id: number) {
    return this.httpClient.delete(`${this._apiUrl+'/'}`);
  }
  //updateProduct(id: number, p: IProductSold) {
  //  return this.httpClient.put(`${this._apiUrl+'/'+id}`, p);
  //}



}
