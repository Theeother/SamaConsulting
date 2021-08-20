import { Component, OnInit } from '@angular/core';
import { SellService } from '../../services/sell.service';
import { IProductSold,IProduct } from 'src/app/models/product';
import * as XLSX from 'xlsx';
import { ProductsService } from '../../services/products.service';
import { IUsers } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  prdSold:IProductSold[]=[];
  total:number;
  fileName="Caisse.xlsx";
  submitbut=false;
  product:any[];
  prdToAdd=<IProductSold>{};
  prdList: IProduct[] = [];
  user:IUsers[]=[];
  RZ:boolean=false;
  pwd:string;
  constructor(private _sellService :SellService,
    private _userService : UsersService,
    private _productService : ProductsService,
    public _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getLaptopData(); 
    this._userService.getUsers().subscribe(data => {this.user=data});
  }

  getLaptopData() {
    this.total=0;
    this._sellService.getProducts().subscribe(data => {
      this.prdSold=data
      data.forEach(lap => {this.total+=lap.prix
      });
    });
    
    this.prdSold.forEach(lap => {this.total+=lap.prix
    });
    this._productService.getProducts().subscribe(data => {this.prdList=data});
    }


    export(){
      
  
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
      /* save to file */  
      XLSX.writeFile(wb, this.fileName);
    }
  



///////////////////// Importation

  onFileChange(evt: any){
    const target:DataTransfer = <DataTransfer>(evt.target);

    const reader : FileReader = new FileReader();

    reader.onload = (e:any)=>{
      const bstr : string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary', cellDates: true});

    const wsname: string = wb.SheetNames[0];

    const ws :XLSX.WorkSheet = wb.Sheets[wsname];
//
    console.log(ws);
    console.log((XLSX.utils.sheet_to_json(ws)));
      this.product = (XLSX.utils.sheet_to_json(ws));
      console.log(this.product);
    };

    reader.readAsBinaryString(target.files[0]);
    this.submitbut=true;
    //console.log(this.product);
  }
//
  submit(){
    this.submitbut=false;
    for (let prd of this.product){
      console.log(prd);
      this.prdToAdd.titre=prd["Produit"];
      this.prdToAdd.productId=prd["#Produit"];
      
      this.prdToAdd.prix=Number( prd["Prix"]);
      this.prdToAdd.date= new Date(prd["date"]);
      this.prdToAdd.userId="404";
      for (let u of this.user){
        if(u.id==prd["client ID"]){
          this.prdToAdd.userId=u.firstName + " " + u.lastName;
          break;
        }
      }
      
      
      
      this.prdToAdd.id=this.prdSold[this.prdSold.length -1].id +1;

      this._sellService.addProduct(this.prdToAdd).subscribe(res => {
        this.prdSold=[...this.prdSold,this.prdToAdd];
        console.log(this.prdSold);
      });

      this.getLaptopData(); 
      
      
    }
    
  }




/////////////////////////// RZ
  RZCheck(){
    this.RZ=!this.RZ;
  } 

  reset(){
    if (this.pwd==this._authenticationService.utilisateurEnCours.password){
      for(let prd of this.prdSold){
        this._sellService.deleteProduct(prd.id).subscribe(res=>{
          console.log(res);
        });
      }
      this.RZCheck();
      this.ngOnInit();

    }
    else{
      alert("Mauvais MDP");
    }
  }

}







