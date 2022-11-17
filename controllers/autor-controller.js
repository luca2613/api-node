const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt'); // criptografar senha
const jwt = require('jsonwebtoken'); // jwt

// exports.cadastroAutor = (req, res, next) => {
//     mysql.getConnection((err, conn) => {
//         if(err) {return res.status(500).send({error: error})}
//         conn.query('SELECT * FROM autor WHERE email = ?',[req.body.email], (error, results) =>{
//             if(error) {return res.status(500).send({error: error})}
//             if(results.length > 0) {
//                 return res.status(200).send({mensagem: 'Usuario já existe'})
//             } else {
//                 bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
//                     if(errBcrypt) {return res.status(500).send({error: errBcrypt})}
//                     conn.query(
//                         `INSERT INTO autor (cd_tipo_usuario, nm_autor, ds_autor, senha, email)
//                         VALUES (?,?,?,?,?)`,
//                         [
//                             req.body.tipo,
//                             req.body.nome,
//                             req.body.descricao,
//                             hash,
//                             req.body.email,
//                         ],
//                         (error, results) => {
//                             conn.release();
//                             if(error) {return res.status(500).send({error: error})}
//                             response = {
//                                 mensagem: 'Autor cadastrado',
//                                 AutorCriado: {
//                                     id_autor: results.insertId,
//                                     tipo: req.body.tipo,
//                                     nome: req.body.nome,
//                                     descricao: req.body.descricao,
//                                     email: req.body.email,
//                                 }
//                             }
//                             return res.status(201).send({response});
//                         }
//                     )
//                 });
//             }
            
//         });
//     });
// }

exports.cadastroAutor = async (req, res, next) => {
    //console.log(req.body);

    mysql.getConnection((err, conn) => {
        conn.query('SELECT * FROM autor WHERE email = ?',[req.body.email], async (error, result) => {
            if(error) {return res.status(500).send({error: error})}
            if(result.length > 0) {
                return res.status(401).send({mensagem: 'Erro na autenticação'});
            } else {
                decrySenha = await bcrypt.hash(senha,10);
                conn.query(
                    `INSERT INTO autor (cd_tipo_usuario, nm_autor, ds_autor, senha, email)
                      VALUES (?,?,?,?,?)`,
                        [
                            req.body.tipo,
                            req.body.nome,
                            req.body.descricao,
                            hash,
                            req.body.email,
                        ],
                        (error, results) => {
                            conn.release();
                            if(error) {return res.status(500).send({error: error})}
                            response = {
                                mensagem: 'Autor cadastrado',
                                AutorCriado: {
                                    id_autor: results.insertId,
                                    tipo: req.body.tipo,
                                    nome: req.body.nome,
                                    descricao: req.body.descricao,
                                    email: req.body.email,
                                }
                            }
                            return res.status(201).send({response});
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