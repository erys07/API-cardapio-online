const yup = require('yup')
const Person = require('../models/person')

class UserController {
  async createUser(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
        .required(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })

      const { name, email, password } = req.body

      const user = await Person.create({ name, email, password })

      return res.status(201).json({
        error: false,
        message: 'Usuário criado!',
        user,
      })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const messages = error.inner.map((err) => err.message);
        return res.status(400).json({
          error: true,
          messages,
        });
      } else {
        return res.status(500).json({
          error: true,
          message: 'Erro interno do servidor',
        });
      }
    }
  }
}

module.exports = new UserController()
