const yup = require('yup')
const Product = require('../models/product')
const Category = require('../models/category')

const schema = yup.object().shape({
  category: yup.string().required(),
  name: yup.string().required(),
  qty: yup.number().required(),
  price: yup.number().required(),
})

class UserController {
    async createProduct(req, res) {
      const { category, name, qty, price } = req.body;
      
      const foundCategory = await Category.findOne({ name: category });
      if (!foundCategory) {
        return res.status(400).json({ error: 'Categoria não encontrada!' });
      }
      
      try {
        const product = await Product.create({ category: foundCategory._id, name, qty, price });
        return res.status(201).json({
          error: false,
          message: 'Produto cadastrado!',
        });
      } catch (error) {
        return res.status(400).json({
          error: true,
          message: 'Não foi possível cadastrar produto!',
        });
      }
    }

    async getProducts(req, res) {

        try {
            const products = await Product.find()
    
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({error: 'Aconteceu um erro no sistema, não foi possível listar os produtos!'})
        }
      }
  
    async getProduct(req, res) { 
      try {
        const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({error: 'Produto não encontrado!'});
      }

          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({error: 'Esse produto não está cadastrado no sistema!'});
        }
      }
  
    async updateProduct(req, res) {
      try {
        const product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { new: true }
        );
      
        if (!product) {
          return res.status(404).json({error: 'Produto não encontrado!'});
        }
      
        res.status(200).json({message: 'Produto atualizado com sucesso!', product});
      } catch (error) {
        res.status(500).json({error: 'Esse produto não está cadastrado no sistema!'});
      }
      }
  
    async deleteProduct(req, res) {
      try {
        const product = await Product.findOneAndDelete({ _id: req.params.id });

        if (!product) {
          return res.status(404).json({error: 'Produto não encontrado!'});
        }

        res.status(200).json({message: 'Produto excluído com sucesso!'});
      } catch (error) {
        res.status(500).json({error: 'Esse produto não está cadastrado no sistema!'});
      }
    }
  }

  module.exports = new UserController();