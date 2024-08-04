export default class Item {

    name;
    description;
    image;
    price;
    salePrice;
    stock;
  
    constructor(name, description, image, price, salePrice, stock) {
      this.description = description;
      this.image = image;
      this.name = name;
      this.price = price;
      this.salePrice = salePrice;
      this.stock = stock;
    }
  
  }
  