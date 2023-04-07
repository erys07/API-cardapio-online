const Category = require('../models/category');

class CategoryController {
  async getcategory(req, res) {
    try {
      const categories = await Category.find().exec();
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar as categorias de produtos' });
    }
  }
}

module.exports = new CategoryController();