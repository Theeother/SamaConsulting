import { Component, OnInit } from '@angular/core';
import { IProduct2,IProduct } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from '../../services/products.service';
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
  // Pour la génération du code facture
  codeFacture = '#LAP'+ this.toDayDate.replace(/-/g,'')+ this.toDayTime.replace(/:/g,'');

  //Taux TVA
  tauxTVA = 0.18;

  ngOnInit(): void {
    this.getLaptopData();
  }

  getLaptopData(): void {
    this._productService.getProducts().subscribe(data => {this.laptopsList=data});
  }

  constructor(public _cartService: CartService, public _authenticationService: AuthenticationService,private _productService : ProductsService,private router: Router) {
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
    for (let laptop of this._cartService.ListeProductsSelected){
      //console.log(this.laptopsList.filter(u=>{
      //  return (u.id==laptop.id);
      //}));

      this.product=this.laptopsList.filter(u=>{
        return (u.id==laptop.id);
      })[0];
      
      this.product.stock-=laptop.qty;
      this._productService.updateProduct(laptop.id, this.product).subscribe(res=>{
        this.getLaptopData();
      });
      

    }
    this.router.navigate(['home']);
  }

}
