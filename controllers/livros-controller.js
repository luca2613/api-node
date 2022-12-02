const mysql = require('../mysql');
const multer = require('multer');

exports.getLivros =  async (req, res, next) => {
    try {
        const query = `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
        FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
        JOIN categoria ON livro.cd_categoria = categoria.cd_categoria;`;

        const response = await mysql.execute(query)
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}

exports.getLivrosByLast = async (req, res, next) => {
    try {
        const query = `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
        FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
        JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
        order by dt_lancamento desc limit 5;`;

        const response = await mysql.execute(query)
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getLivroById = async (req, res, next) => {
    try {
        const query = `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,ds_livro
        FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
        JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
        WHERE cd_livro = ?;`;

        const response = await mysql.execute(query, [req.params.id_livro])
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getLivroByAutor = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM LIVRO WHERE cd_autor = ?;';

        const response = await mysql.execute(query, [req.params.id_autor])
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getLivroByBusca = async (req, res, next) => {
    try {
        let query = 'SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento ';
        query += 'FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor ';
        query += 'JOIN categoria ON livro.cd_categoria = categoria.cd_categoria ';
        query += 'WHERE nm_livro like "%' + req.params.busca + '%"';
        query += 'OR nm_autor like "%' + req.params.busca + '%"';

        const response = await mysql.execute(query)
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getLivroByCategoria = async (req, res, next) => {
    try {
        const query = `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
        FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
        JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
        WHERE nm_categoria = ?`;

        const response = await mysql.execute(query, [req.params.nm_categoria])
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

exports.postLivro = async (req, res, next) => {
    try {
        const query = `INSERT INTO LIVRO (cd_autor, cd_categoria, nm_livro, ds_livro, dt_lancamento,cd_img_livro) VALUES (?,?,?,?,?,?)`;

        const response = await mysql.execute(query, [
                req.body.cd_autor,
                req.body.cd_categoria, 
                req.body.nm_livro, 
                req.body.ds_livro, 
                req.body.dt_lancamento,
                req.body.cd_img_livro
            ],
        )
        return res.status(201).send({mensagem: 'livro cadastrado'});
    } catch (error) {
        return res.status(500).send(error);
    }
}

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

exports.patchLivro = async (req, res, next) => {
    try {
        const query = `UPDATE livro set cd_categoria = ?, nm_livro = ?, ds_livro = ?, dt_lancamento = ?,cd_img_livro = ? WHERE cd_livro = ?`;

        const response = await mysql.execute(query,
        [req.body.cd_categoria, req.body.nm_livro, req.body.ds_livro, req.body.dt_lancamento,req.body.cd_img_livro, req.params.cd_livro]
        )
        livro = req.body.nm_livro;
        return res.status(201).send({status: true});
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.deleteLivro = async (req, res, next) => {
    try {
        const query = `DELETE FROM LIVRO WHERE cd_livro = ?`;

        const response = await mysql.execute(query,[req.params.id_livro])
        return res.status(202).send({mensagem: 'livro deletado',id_livro: req.params.id_livro});
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}