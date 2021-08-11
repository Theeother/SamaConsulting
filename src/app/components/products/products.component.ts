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
  filteredProducts: IProduct[] = [];
  filterCritere: string = "";
  laptopDetails: any={};

  constructor(private _productService : ProductsService, public _cartService: CartService) {
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(data =>{
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  // Ajout des produits au panier (the shopping cart)
  addProductToCart(lap: IProduct){
    this._cartService.AddProduct(lap);
  }

  // Afficher détails produits
  showLaptopDetails(id: number) {
    this._productService.getById(id).subscribe(data => {
      this.laptopDetails = data;
    });
  }

  cancelLaptopDetails() {
    this.laptopDetails = {};
  }

  // Filtrer produits par catégorie:
  categoryFilter(critere: string){
    this.filterCritere = critere;
    this.filteredProducts = this.filterCritere ? this.performFilter(this.filterCritere) : this.products;
  }

  performFilter(critere: string): IProduct[] {
    return this.products.filter((prod: IProduct)=> prod.category === critere);
  }

}
