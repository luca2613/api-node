const mysql = require('../mysql').pool;

exports.getCategorias =  (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM categoria;',
            (error, resultado, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send(resultado)
            }
        )
    });
}