import jwt from 'jsonwebtoken'; // biblioteca para criar Token
import { promisify } from 'util'; // biblioteca  para criar async/await
import authConfig from '../../config/auth'; // importação de segredo do Token

export default async (req, res, next) => {
  // const que busca o token dentro do req.header da requisição
  const authHeader = req.headers.authorization;
  // verificação se o token foi enviado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  // função que separa o token de outra palavra que vem junto
  const [, token] = authHeader.split(' ');

  try {
    // comando que verifica se o token é valido e se não foi adulterado
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // comando que envia o id do user para a página
    req.userId = decoded.id;

    return next();
  } catch (error) {
    // se existir qualquer erro é pego pelo catch
    return res.status(401).json({ error: 'Token invalid' });
  }
};
