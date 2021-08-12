import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _apiUrl: string = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) {}
 
  getProducts():Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this._apiUrl);
  }

  addProduct(p: IProduct):Observable<IProduct> {
    return this.httpClient.post<IProduct>(this._apiUrl, p);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this._apiUrl+'/'+id}`);
  }
  getById(id: number) {
    console.log(this.httpClient.get<IProduct>(`${this._apiUrl+'/'+id}`));
    return this.httpClient.get<IProduct>(`${this._apiUrl+'/'+id}`);
  }

  updateProduct(id: number, p: IProduct) {
    return this.httpClient.put(`${this._apiUrl+'/'+id}`, p);
  }

}
