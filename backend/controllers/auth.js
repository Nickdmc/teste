const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const signup = [
  body('username').notEmpty().withMessage('Username é obrigatório'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });

      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

const login = [
  // Validações para o login
  body('email').isEmail().withMessage('O campo "email" deve ser válido'),
  body('password').notEmpty().withMessage('O campo "password" é obrigatório'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Verifica se o email existe no banco
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

// Logout apenas retorna uma mensagem de confirmação
const logout = (req, res) => {
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

module.exports = {
  signup,
  login,
  logout,
};
