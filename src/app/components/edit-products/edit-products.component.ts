import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  public products:IProduct[]

  laptopsList: IProduct[] = [];
  laptopForm: boolean;
  isNewLaptop: boolean;
  newLaptop: any = {};
  editLaptopForm: boolean;
  editedLaptop: any={};
  product:any=[];
  submitbut:boolean=false;
  lapToAdd=<IProduct>{};

  constructor(private _productService : ProductsService) {
  }

  ngOnInit(): void {
    this.getLaptopData();
    
  }

  getLaptopData(): void {
    this._productService.getProducts().subscribe(data => {this.laptopsList=data});
  }

  showEditLaptopForm(lap: IProduct) {
    if (!lap) {
      this.laptopForm = false;
      return;
    }
    this.editLaptopForm = true;
    this.editedLaptop = lap;
  }

  showAddLaptopForm() {
    // resets form if edited laptop
    if (this.laptopsList.length){
      this.newLaptop = {};
    }
    this.laptopForm = true;
    this.isNewLaptop = true;
  }

  saveLaptop(lap: IProduct){
    // add a new product
    lap.id = this.laptopsList[this.laptopsList.length-1].id;
    lap.id ++;
    this._productService.addProduct(lap).subscribe(res => {
      this.getLaptopData();
    });
    this.laptopForm = false;
  }

  updateLaptop(lap: IProduct) {
    if(!lap) return;
    this._productService.updateProduct(lap.id, lap).subscribe(res=>{
      this.getLaptopData();
    });
    this.editLaptopForm = false;
    this.editedLaptop ={};
  }

  removeLaptop(n: number) {
    const lap = this.laptopsList.find(x => x.id === n);
    if(!lap) return;
    //this._productService.deleteProduct(n).subscribe(() => this.laptopsList = this.laptopsList.filter(x => x.id !==n));
    this._productService.deleteProduct(n).subscribe(()=>{
      this.getLaptopData();
    });
    this.laptopForm = false;
  }

  cancelEdit() {
    this.editedLaptop = {};
    this.editLaptopForm = false;
    this.getLaptopData();
  }

  cancelNewLaptop() {
    this.newLaptop = {};
    this.laptopForm = false;
  }


  ///////////////////// Importation

  onFileChange(evt: any){
    const target:DataTransfer = <DataTransfer>(evt.target);

    const reader : FileReader = new FileReader();

    reader.onload = (e:any)=>{
      const bstr : string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];

      const ws :XLSX.WorkSheet = wb.Sheets[wsname];

      //console.log(ws);
      //console.log((XLSX.utils.sheet_to_json(ws)));
      this.product = (XLSX.utils.sheet_to_json(ws));
      console.log(this.product);
    };

    reader.readAsBinaryString(target.files[0]);
    this.submitbut=true;
    //console.log(this.product);
  }

  submit(){

    for (let lap of this.product){
      this.lapToAdd.category=lap.Categorie;
      this.lapToAdd.brand=lap.Marque;
      this.lapToAdd.model=lap.Modele;
      this.lapToAdd.series=lap.N_de_Serie;
      this.lapToAdd.screenSize=lap.Taille_Ecran;
      this.lapToAdd.cpuModel=lap.CPU;
      this.lapToAdd.cpuFreq=lap.Freq;
      this.lapToAdd.ramType=lap.RAM;
      this.lapToAdd.ramSize=lap.Taille_Ram;
      this.lapToAdd.gpuBrand=lap.GPU;
      this.lapToAdd.OS=lap.OS;
      this.lapToAdd.price=lap.Prix;
      this.lapToAdd.urlImage="/assets/images/laptops/"+lap.Url_image;
      this.lapToAdd.stock=lap.Stock;

      console.log(this.lapToAdd);
      
      this.saveLaptop(this.lapToAdd);
      this.laptopsList=[...this.laptopsList,this.lapToAdd];
      this.lapToAdd=<IProduct>{};
      




    }
    

  }
}