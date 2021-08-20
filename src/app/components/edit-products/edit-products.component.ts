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


  toggle(lap:IProduct){

    lap.disp=!lap.disp;
    this.updateLaptop(lap);
  }
 

  updateLaptop(lap: IProduct) {
    if(!lap) return;
    this._productService.updateProduct(lap.id, lap).subscribe(res=>{
      this.getLaptopData();
    });
    this.editLaptopForm = false;
    this.editedLaptop ={};
  }




  ///////////////////// Importation

  //onFileChange(evt: any){
  //  const target:DataTransfer = <DataTransfer>(evt.target);
//
  //  const reader : FileReader = new FileReader();
//
  //  reader.onload = (e:any)=>{
  //    const bstr : string = e.target.result;
//
  //    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
//
  //    const wsname: string = wb.SheetNames[0];
//
  //    const ws :XLSX.WorkSheet = wb.Sheets[wsname];
//
  //    //console.log(ws);
  //    //console.log((XLSX.utils.sheet_to_json(ws)));
  //    this.product = (XLSX.utils.sheet_to_json(ws));
  //    console.log(this.product);
  //  };
//
  //  reader.readAsBinaryString(target.files[0]);
  //  this.submitbut=true;
  //  //console.log(this.product);
  //}
//
  //submit(){
  //  this.submitbut=false;
  //  for (let lap of this.product){
  //    
  //    console.log(this.lapToAdd);
  //    
  //    this.saveLaptop(this.lapToAdd);
  //    this.laptopsList=[...this.laptopsList,this.lapToAdd];
  //    this.lapToAdd=<IProduct>{};
  //    
  //  }
  //  
  //}
}