const AuthorModel = require('../models/authorModel')



//API 1 create authors

const createAuthor = async function(req, res) {
    try {

        let body = req.body;

        let author = await AuthorModel.findById(authorId);
        let data = await AuthorModel.create(body);
        res.status(201).send({ msg: data })

    } catch (err) {

        res.status(405).send({ msg: err.message })

    }
}

module.exports.createAuthor = createAuthor;