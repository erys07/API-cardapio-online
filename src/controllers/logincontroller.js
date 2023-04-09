const jwt = require('jsonwebtoken');
const yup = require('yup');
const Person = require('../models/person');

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

class LoginController {
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            await userSchema.validate({ email, password });

            const user = await Person.findOne({ email });
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Usuário não autorizado' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            return res.status(200).json({ message: "Login realizado com sucesso!", token });
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ error: "Erro de validação", messages: err.errors });
            } else {
                console.error(err);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
}

module.exports = new LoginController();