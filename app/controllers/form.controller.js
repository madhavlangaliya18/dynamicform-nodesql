const db = require('../models')

const Form = db.form;

const Op = db.Sequelize.Op;

//Create and save new form
exports.create = (req, res) => {
    //Validate Request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Title cannot be empty!'
        })
    }

    else {
        //Create a Form
        const Form = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        }

        Form.create(Form)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occured while creating the Form.'
                })
            })
    }


}

//Retieve all form from the db
exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Form.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving the Form.'
            })
        })

}

//Find a single Form by Id
exports.findById = (req, res) => {

    const id = req.params.id

    Form.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error retrieving Form with id ${id}.`
            })
        })

}

//Update Form by Id in request
exports.update = (req, res) => {

    const id = req.params.id
    console.log('id :>> ', id);

    Form.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Form was updated sucessfully.'
                })
            }
            else {
                res.send({
                    message: `Cannot update Form with id ${id}. Please try again.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error updating Form with id ${id}.`
            })
        })


}

//Delete Form by Id in request
exports.delete = (req, res) => {

    const id = req.params.id

    Form.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Form was deleted sucessfully!'
                })
            }
            else {
                res.send({
                    message: `Cannot delete Form with id ${id}. Please try again.`
                })
            }
        })
        .catch(err => {
            res.send(500).send({
                message:
                    err.message || `Error deleting Form with id ${id}.`
            })
        })

}

//Deleta all form from database
exports.deleteAll = (req, res) => {

    Form.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} form were deleted sucessfully.`
        })
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while deleting all form.'
            })
        })

}

//Find all publised form
exports.findAllPublished = (req, res) => {

    Form.findAll({ where: { published: true } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving published Form.'
            })
        })
}