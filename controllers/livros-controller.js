const mysql = require('../mysql');

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

exports.postLivro = async (req, res, next) => {
    try {
        const query = `INSERT INTO LIVRO (cd_autor, cd_categoria, nm_livro, ds_livro, dt_lancamento) VALUES (?,?,?,?,?)`;

        const response = await mysql.execute(query, [
                req.autor.data.id_autor,
                req.body.categoria, 
                req.body.nome, 
                req.body.descricao, 
                req.body.lancamento,
            ],
        )
        return res.status(201).send({mensagem: 'livro cadastrado',id_livro: response.insertId});
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.patchLivro = async (req, res, next) => {
    try {
        const query = `UPDATE livro set 
                        cd_categoria    = ?,
                        cd_autor        = ?,
                        nm_livro        = ?,
                        ds_livro        = ?,
                        dt_lancamento   = ?
                        WHERE cd_livro = ?`;

        const response = await mysql.execute(query,
        [req.body.categoria, req.body.autor, req.body.nome, req.body.descricao, req.body.lancamento, req.params.id_livro]
        )
        return res.status(202).send({mensagem: 'livro alterado',id_livro: req.params.id_livro});
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