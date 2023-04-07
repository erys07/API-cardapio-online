const yup = require('yup')
const Person = require('../models/person')

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmpassword: yup.string().min(6).required(),
})

class UserController {
    async createUser(req, res) {
      const { name, email, password, confirmpassword } = req.body

  try {
    await schema.validate(req.body)

    if (password !== confirmpassword) {
      return res.status(400).json({
        error: true,
        message: 'As senhas não coincidem',
      })
    }

    const user = await Person.create({ name, email, password})

    return res.status(201).json({
      error: false,
      message: 'Usuário criado!',
    })
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Não foi possível criar conta!',
    })
  }
    }
  
    async getUser(req, res) {
      // lógica para obter um usuário pelo ID
      res.json({ message: 'Usuário encontrado' });
    }
  
    async updateUser(req, res) {
      // lógica para atualizar um usuário pelo ID
      res.json({ message: 'Usuário atualizado com sucesso' });
    }
  
    async deleteUser(req, res) {
      // lógica para deletar um usuário pelo ID
      res.json({ message: 'Usuário deletado com sucesso' });
    }
  }

  module.exports = new UserController();