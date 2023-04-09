const express = require('express');
const router = express.Router();
const app = express()
const usercontroller = require('./controllers/UserController')
const productcontroller = require('./controllers/ProductController')
const logincontroller = require('./controllers/LoginController')
const categorycontroller = require('./controllers/CategoryController')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para criar um novo usuário
router.post('/signup', usercontroller.createUser);

// Rota para acessar o sistema
router.post('/login', logincontroller.loginUser);

// Rota para listar todos as categorias
router.get('/category', categorycontroller.getcategory);

// Rota para criar um novo produto
router.post('/product', productcontroller.createProduct)

// Rota para listar todos os produtos
router.get('/product', productcontroller.getProducts);

// Rota para obter um produto pelo ID
router.get('/product/:id', productcontroller.getProduct);

// Rota para atualizar um produto pelo ID
router.patch('/product/:id', productcontroller.updateProduct);

// Rota para deletar um produto pelo ID
router.delete('/product/:id', productcontroller.deleteProduct);

module.exports = router