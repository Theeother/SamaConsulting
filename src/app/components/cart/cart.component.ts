import { Component, OnInit } from '@angular/core';
import { IProduct2,IProduct,IProductSold } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from '../../services/products.service';
import { SellService } from '../../services/sell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Pour l'affichage de la date facture
  toDay = new Date();
  toDayDate = this.toDay.toISOString().slice(0, 10);
  toDayTime = this.toDay.toISOString().slice(11, 16);
  factureDate = this.toDayDate.replace(/-/g,'/')+" - "+ this.toDayTime;
  factureUser: string = "aucun";
  product :IProduct;
  laptopsList:IProduct[];
  laptopsSold:IProductSold[]=[];
  soldItem=<IProductSold>{};
  // Pour la génération du code facture
  codeFacture = '#LAP'+ this.toDayDate.replace(/-/g,'')+ this.toDayTime.replace(/:/g,'');

  //Taux TVA
  tauxTVA = 0.18;

  ngOnInit(): void {
    this.getLaptopData();
  }

  getLaptopData(): void {
    this._productService.getProducts().subscribe(data => {this.laptopsList=data});
    this._sellService.getProducts().subscribe(data => {this.laptopsSold=data});
  }

  constructor(public _cartService: CartService,
     public _authenticationService: AuthenticationService,
     private _productService : ProductsService,private router: Router,
     private _sellService :SellService) {
    this.factureUser = this._authenticationService.utilisateurEnCours.firstName+" "+ this._authenticationService.utilisateurEnCours.lastName;
  }

  // Afficher facture d'achat (invoice)
  showInvoice(laptops: IProduct2) {
    // this._productService.getById(id).subscribe(data => {
    //   this.laptopDetails = data;
    // });
  }

  // Annuler régler facture
  cancelLaptopDetails() {
    // this.laptopDetails = {};
  } 

  payer(){
    this.soldItem.userId=this._authenticationService.utilisateurEnCours.id;
    for (let laptop of this._cartService.ListeProductsSelected){
      //tan9is l stock

      this.product=this.laptopsList.filter(u=>{
        return (u.id==laptop.id);
      })[0];
      
      this.product.stock-=laptop.qty;
      this._productService.updateProduct(laptop.id, this.product).subscribe(res=>{
        this.getLaptopData();
      });
      
      // adding to sold items for comptabelité

      this.soldItem.productId=this.product.id;
      this.soldItem.category=this.product.category;
      this.soldItem.brand=this.product.brand;
      this.soldItem.model=this.product.model;
      this.soldItem.series=this.product.series;
      this.soldItem.price=this.product.price;
      this.soldItem.urlImage=this.product.urlImage;
      this.soldItem.qty=laptop.qty;
      this.addSoldLap(this.soldItem);
      



    }
    this.router.navigate(['home']);
  }

  addSoldLap(lap: IProductSold){
    
    // add a new product
    if (this.laptopsSold.length !=0)
      { console.log(this.laptopsSold);
        lap.id = this.laptopsSold[this.laptopsSold.length-1].id +1;}
    else {console.log(this.laptopsSold);
      lap.id=1;
    }
    
    this._sellService.addProduct(lap).subscribe(res => {
      this.laptopsSold=[...this.laptopsSold,lap];
      console.log(this.laptopsSold);
    });
  }

}
