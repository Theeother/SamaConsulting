import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:IProduct[] = [];
  sol:string;
  
  constructor(private _productService : ProductsService, public _cartService: CartService) {
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(data =>{
      this.products = data;
    });
    this.sol = "prolab";
    //console.log(this.products);
  }

  // Ajout des produits au panier (the shopping cart)
  addProductToCart(){
    for (let prd of this.products){
      if (this.sol==prd.titre){
        this._cartService.AddProduct(prd);
        console.log(this._cartService.ListeProductsSelected)
      }
      
  }
  }

  // Afficher détails produits
  setSol(s:string){
    this.sol=s;
  }
  
  getPrice(prd:string):number{
    for(let p of this.products){
      if (p.titre==prd)
        return p.prix;
    }
  }

  btnActive(prd:string):boolean{
    for(let p of this.products){
      if (p.titre==prd){
        //console.log(p.disp);
        return !p.disp;}
    }
  }
}
