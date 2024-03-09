import { Product } from "../models/Product.js";

function productDecorator() {
  return {
    async addProduct(data) {
      const product = new Product(data);

      await product.save();
    },

    async getProducts(empresa) {
      const products = await Product.find({ empresa });

      return products;
    },

    async deleteProduct(id) {
      const producto = await Product.findById(id);
      await producto.deleteOne();
    },

    async getProduct(id) {
      const product = await Product.findById(id);
      return product;
    },

    async getProductByName(nameParams) {
      const productos = await Product.find({
        name: { $regex: new RegExp(nameParams, "i") },
        empresa: '65cbc7f243b5378739250155'
      });

      return productos;
    },
  };
}

export default productDecorator;
