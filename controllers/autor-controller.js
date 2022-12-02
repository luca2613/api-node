const mysql = require('../mysql').pool;
const mysql2 = require('../mysql');
const bcrypt = require('bcrypt'); // criptografar senha
const jwt = require('jsonwebtoken'); // jwt
const multer = require('multer');


exports.getAutor =  async (req, res, next) => {
    try {
        const query = "SELECT * FROM autor";
        const response = await mysql2.execute(query);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getAutorById =  async (req, res, next) => {
    try {
        const query = `SELECT cd_autor,nm_autor,ds_autor,cd_img_autor FROM autor WHERE cd_autor = ?;`;
        const response = await mysql2.execute(query, [req.params.id_autor]);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

exports.upload = multer({storage: storage});

exports.postArquivo = (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  }

exports.cadastroAutor = async (req, res, next) => {
    mysql.getConnection((err, conn) => {
        conn.query('SELECT * FROM autor WHERE email = ?',[req.body.email], async (error, result) => {
            if(error) {return res.status(500).send({error: error})}
            if(result.length > 0) {
                return res.status(401).send({mensagem: 'Erro na autenticação'});
            } else {
                decrySenha = await bcrypt.hash(req.body.senha,10);
                conn.query(
                    `INSERT INTO autor (cd_tipo_usuario, nm_autor, ds_autor, senha, email, cd_img_autor)
                      VALUES (?,?,?,?,?,?)`,
                        [
                            req.body.tipo,
                            req.body.nome,
                            req.body.descricao,
                            decrySenha,
                            req.body.email,
                            req.body.cd_img_autor
                        ],
                        (error, results) => {
                            conn.release();
                            if(error) {return res.status(500).send({error: error})}
                            return res.status(201).send({status: true});
                        }
                )
            }
        })
    });

}

exports.Login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        const verifyEmail = `SELECT * FROM autor WHERE email = ?`;
        conn.query(verifyEmail, [req.body.email], async (error, result) => {
            conn.release();
            if(error) {return res.status(500).send({error: error})}
            if(result.length < 1) {
                res.send({
                    status: false,
                    mensagem: "login inválido",
                  });
            } else {
                let cheSenha = await bcrypt.compare(req.body.senha, result[0].senha);
                if(cheSenha) {
                    if(error) {return res.status(500).send({error: error})}
                    let data = {
                        id_autor: result[0].cd_autor,
                        email: result[0].email,
                        nome: result[0].nm_autor
                    }
                    const token = jwt.sign({data}, `${process.env.JWT_KEY}`, {expiresIn: "2h"});
                   res.send({
                    status:true,
                    token:token,
                    result:data,
                    mensagem: 'login realizado com sucesso'
                   });
                } else {
                    res.send({
                        status:false,
                        mensagem: 'login invalido'
                    });
                }
            }

        });
    });
}