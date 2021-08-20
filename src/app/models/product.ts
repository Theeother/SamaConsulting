export interface IProduct {
  id: number;
  titre:string;
  prix:number;
  disp:boolean;
}

export interface IProduct2 {
  id: number;
  category: string;
  brand: string;
  model: string;
  series: string;
  price: number;
  urlImage: string;
  qty:number;
  stock:number;
}


export interface IProductSold {
  id:number;
  userId: string;
  productId: number;
  titre:string;
  prix:number;
  date:Date;
  disp:boolean;
}