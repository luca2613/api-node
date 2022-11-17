const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, `${process.env.JWT_KEY}`);
        req.autor = decode;
        console.log(req.autor);
        next();
    } catch(error) {
        return res.status(401).send({mensagem: 'Erro na verificação'});
    }
   
}