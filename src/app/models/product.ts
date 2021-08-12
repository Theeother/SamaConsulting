export interface IProduct {
  id: number;
  category: string;
  brand: string;
  model: string;
  series: string;
  screenSize: number;
  cpuModel: string;
  cpuFreq: number;
  ramType: string;
  ramSize: number;
  gpuBrand: string;
  OS: string;
  price: number;
  urlImage: string;
  stock:number;
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
  userId: number;
  productId: number;
  category: string;
  brand: string;
  model: string;
  series: string;
  price: number;
  urlImage: string;
  qty:number;
}