const mysql = require('../mysql').pool;

exports.getLivros =  (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
            FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
            JOIN categoria ON livro.cd_categoria = categoria.cd_categoria`,
            (error, resultado, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        )
    });

}

exports.getLivrosByLast =  (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
            FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
            JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
            order by dt_lancamento desc limit 5;`,
            (error, resultado) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        )
    });

}

exports.getLivroById = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,ds_livro
            FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
            JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
            WHERE cd_livro = ?`,
            [req.params.id_livro],
            (error, resultado, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        );
    });
}

exports.getLivroByAutor = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM LIVRO WHERE cd_autor = ?;',
            [req.params.id_autor],
            (error, resultado, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        )
    });
}

exports.getLivroByCategoria = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT livro.cd_autor,livro.cd_categoria,nm_categoria,nm_autor,cd_livro,cd_img_livro,nm_livro,dt_lancamento
            FROM livro JOIN autor ON livro.cd_autor = autor.cd_autor
            JOIN categoria ON livro.cd_categoria = categoria.cd_categoria
            WHERE nm_categoria = ?`,
            [req.params.nm_categoria],
            (error, resultado, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        )
    });
}

exports.postLivro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO LIVRO (cd_autor, cd_categoria, nm_livro, ds_livro, dt_lancamento) VALUES (?,?,?,?,?)',
            [
                req.autor.data.id_autor,
                req.body.categoria, 
                req.body.nome, 
                req.body.descricao, 
                req.body.lancamento,
            ],
            (error, resultado, field) => {
                conn.release(); // liberar conexao
                if(error) {return res.status(500).send({error: error})}
                console.log(req.autor.id_autor);
                res.status(201).send({
                    mensagem: 'livro cadastrado',
                    id_livro: resultado.insertId
                });
            }
        )
    });
}

exports.patchLivro = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE livro set 
            cd_categoria    = ?,
            cd_autor        = ?,
            nm_livro        = ?,
            ds_livro        = ?,
            dt_lancamento   = ?
            WHERE cd_livro = ?`,
            [req.body.categoria, req.body.autor, req.body.nome, req.body.descricao, req.body.lancamento, req.params.id_livro],
            (error, resultado, field) => {
                conn.release(); // liberar conexao
                if(error) {return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'livro alterado',
                    id_livro: resultado.insertId
                });
            }
        )
    });
}

exports.deleteLivro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM LIVRO WHERE cd_livro = ?`,
            [req.params.id_livro],
            (error, resultado, field) => {
                conn.release(); // liberar conexao
                if(error) {return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'livro deletado',
                    id_livro: resultado.insertId
                });
            }
        )
    });
}