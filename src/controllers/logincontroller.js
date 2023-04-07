const yup = require('yup')
const Login = require('../models/login')

const userSchema = yup.object().shape({
    email: yup.string().email().required().test(async function (value) {
        const user = await Login.findOne({email: value});
        return !user;
    }),
    password: yup.string().required().min(6),
});

class loginController {
    async loginUser(req, res) {
        const {email, password } = req.body

        try {
            await userSchema.validate(req.body);

            return res.status(200).json({ message: "Login realizado com sucesso!" });
          } catch (err) {
            return res.status(400).json({ error: "Usuário não encontrado" });
          }
        }
    }

module.exports = new loginController();