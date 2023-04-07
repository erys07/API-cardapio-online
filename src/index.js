const express = require('express');
const router = express.Router();
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const usercontroller = require('./controllers/userController')
const productcontroller = require('./controllers/productcontroller')
const logincontroller = require('./controllers/logincontroller')
const categorycontroller = require('./controllers/categorycontroller')

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

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose 

.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wrbdjxu.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.use('/', router);
    app.listen(3001)
    console.log('Conectou ao banco de dados!')
})
.catch((err) => console.log(err))

