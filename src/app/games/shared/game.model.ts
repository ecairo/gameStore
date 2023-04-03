import { Guid } from "../../common/Guid";

export class Game {
    Id: Guid;
    Name: string;
    Description: string;
    ReleaseDate: Date;
    Price: number;
    Thumbnail: string;
    onSale: boolean;
    OnSalePrice: number;
  
    constructor(id: string, name: string, description: string, releaseDate: Date, price: number, thumbnail: string) {
      this.Id = new Guid(id);
      this.Name = name;
      this.Description = description;
      this.ReleaseDate = releaseDate;
      this.Price = price;
      this.Thumbnail = thumbnail;
      this.onSale = false;
      this.OnSalePrice = price;
    }

    public get isOnSale(): boolean{
        return this.onSale;
    }

    public set setOnSale(price: number){
        this.OnSalePrice = price;
        this.onSale = true;
    }
}