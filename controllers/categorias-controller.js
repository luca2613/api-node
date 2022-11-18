const mysql = require('../mysql');

exports.getCategorias =  async (req, res, next) => {
    try {
        const query = `SELECT * FROM categoria;`;
        const response = await mysql.execute(query);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}