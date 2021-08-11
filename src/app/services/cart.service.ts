import { Injectable } from '@angular/core';
import { IProduct, IProduct2} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public ListeProductsSelected:IProduct2[];
  public PrixTotal:number;

  constructor() {
    this.ListeProductsSelected = [];
    this.PrixTotal = 0;
  }

  public AddProduct(Prd: IProduct){
    var Prds = {
      id:Prd.id,
      category:Prd.category,
      brand:Prd.brand,
      model:Prd.model,
      series:Prd.series,
      price:Prd.price,
      urlImage:Prd.urlImage,
      qty:1,
      stock:Prd.stock
    }
    this.PrixTotal = this.PrixTotal + Prd.price;
    this.ListeProductsSelected.push(Prds);
    console.log(this.ListeProductsSelected);
    this.CalculPrix();
  }

  public RemoveProduct(Prd: IProduct){
    var Liste = [];

      for(let p of this.ListeProductsSelected){
        if(p.id != Prd.id){
          Liste.push(p);

      }
      this.ListeProductsSelected = Liste;

    }
    this.CalculPrix();
  }
  public  CalculPrix(){
    this.PrixTotal = 0;
    for(let prd of this.ListeProductsSelected){
      this.PrixTotal += (prd.qty * prd.price);
    }
    console.log(this.ListeProductsSelected);
  }

  public changeQte(prd,op){
    for(let p of this.ListeProductsSelected){
      if(prd.id == p.id){
        if(op == "+"){
          if (p.stock!=p.qty)
            p.qty = p.qty+1;
        }else if (p.qty > 0) {
          p.qty = p.qty -1;
        }
      }
    }
    this.CalculPrix();
  }
}