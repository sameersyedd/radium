const authorModel = require('../models/authorModel');
const blogModel = require('../models/blogModel')


// API 2 - Create Blogs
const createBlog = async function(req, res) {
    try {

        let body = req.body;
        let authorId = req.body.authorId
        let authorProvided = await authorModel.findById(authorId)
        if (authorProvided) {
            let data = await BlogModel.create(body);
            res.status(201).send({ msg: data })
        } else {
            res.send({ msg: "Auhtor ID Invalid" })
        }
    } catch (err) {

        res.status(405).send({ msg: err.message })

    }
}

// API 3- fetch blogs and apply filters

// const fetchBlogs = async function(req, res) {
//     try {
//         let blogData = await BlogModel.find({ isDeleted: false, isPublished: true })
//         let body = req.body;
//         let parambody = req.query;

//         console.log(parambody)

//         let data = await BlogModel.find(parambody)
//         res.status(200).send({ msg: data })

//     } catch (err) {
//         res.status(400).send({ msg: err.message })

//     }
// }

const fetchBlogs = async function(req, res) {

    try {
        let array = []
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let blog = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] })

        if (blog) {
            for (let element of blog) {

                if (element.isDeleted === false && element.isPublished === true) {

                    array.push(element)

                }
            }

            res.status(200).send({
                status: true,
                data: array
            })
        } else {
            res.status(404).send({
                status: false,
                msg: "no such blog found"
            })
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }

}

module.exports.createBlog = createBlog;
module.exports.fetchBlogs = fetchBlogs;