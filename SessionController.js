import jwt from 'jsonwebtoken'; // importação para criar o Token
import * as Yup from 'yup'; // importação para criar validação de dados

import User from '../models/User'; // importação para características de User
import authConfig from '../../config/auth'; // importação de segredo do Token

class SessionController {
  async store(req, res) {
    // validação dos dados enviados para criar sessão
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // verificação se o usuário existe usando email
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // verificação de senha utilizando checkPassword que está em User.js
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
