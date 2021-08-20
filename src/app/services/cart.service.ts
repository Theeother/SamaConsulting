import { Injectable } from '@angular/core';
import { IProduct, IProduct2} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public ListeProductsSelected:IProduct[];
  public PrixTotal:number;

  constructor() {
    this.ListeProductsSelected = [];
    this.PrixTotal = 0;
  }

  public AddProduct(Prd: IProduct){
    var Prds = {
      id:Prd.id,
      titre:Prd.titre,
      prix:Prd.prix,
      disp:Prd.disp
    }
    
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
      this.PrixTotal += prd.prix;
    }
    console.log(this.ListeProductsSelected);
  }

  
}