import { Component, OnInit } from '@angular/core';
import { SellService } from '../../services/sell.service';
import { IProductSold } from 'src/app/models/product';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  laptopsSold:IProductSold[]=[];
  total:number;
  fileName="Caisse.xlsx"
  constructor(private _sellService :SellService) { }

  ngOnInit(): void {
    this.getLaptopData(); 
  }

  getLaptopData() {
    this.total=0;
    this._sellService.getProducts().subscribe(data => {
      this.laptopsSold=data
      data.forEach(lap => {this.total+=lap.price*lap.qty
      });
    });
    
    this.laptopsSold.forEach(lap => {this.total+=lap.price*lap.qty
    });
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
  
}