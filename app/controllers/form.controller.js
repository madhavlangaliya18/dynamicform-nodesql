const db = require('../models')
const Forms = db.forms;
const Fields = db.fields;
const Formsdataentries = db.formsdataentries;
const Formsentries = db.formsentries;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const labelmsg = require('../labels/response.labels');

// //Create and save new form
// exports.Create = async (req, res) => {
// console.log("called hereeeeeeee");
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const error = errors.array()[0];
//         return res.status(422).json({
//             error: error.msg
//         });
//     }

//     let data = req.body;
//     let fieldsarr = data.fields;
//     // console.log(fieldsarr);
//     // data.fields.filter((x) => {
//     //     // let mapping = x.validation?.map(a => [a.validation_type, a.validation_value]);
//     //     x.validation = mapping ? Object.fromEntries(mapping) : {};
// 	// 	// x.validation = x.validation?.map(a => Object.fromEntries([[a.validation_type, a.validation_value]]));
//     // })
//     // delete data._id;

//     Forms.findOne({ where: {form_key: data.form_key} }).then((info) => {
//         if (!info) {
//             Fields.bulkCreate(fieldsarr,(err,fieldres)=>{
//                 if(err){
//                     res.status(500).json({
//                         success : false,
//                         message : "Unable to create new field!"
//                     })
//                 }
//                 else{
//                     data.fields_id = fieldres;
//                     Forms.create(data).then((response) => {
//                         res.json({
//                             success: true,
//                             message: labelmsg.addedmsg
//                         })
//                     }).catch((err) => {
//                         //console.log(err);
//                         res.status(500).json({
//                             success: false,
//                             message: labelmsg.errormsg
//                         })
//                     })
//                 }
//             })
//         }
//         else {
//             res.json({
//                 success: false,
//                 message: labelmsg.keyalreadyExists
//             })
//         }

//     })
// }






// my api

exports.Create = (request, result) => {
    if (!request.body.form_name) {
      result.status(400).send({
        message: "Content cannot be empty"
      });
    }

    const formdata = {
      form_name: request.body.form_name,
      form_key: request.body.form_key,
      status: request.body.status ? request.body.status : false,
      submitButtonName: request.body.submitButtonName ? request.body.submitButtonName : false
    };
  
    Forms.create(formdata).then(data => {
      let formids = data.id
      data.push(formids)
      console.log("--------------formid",data.id);
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Some error occurred while saving."
      });
    });
    let fieldsarr = request.body.fields
    console.log("---------------------",fieldsarr)

    Fields.bulkCreate(fieldsarr).then(data => {
        result.send(data);
      }).catch(err => {
        result.status(500).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  };



// //Retieve all form from the db
// exports.findAll = (req, res) => {
//     const title = req.query.title
//     let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

//     Form.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || 'Some error occured while retrieving the Form.'
//             })
//         })

// }

// //Find a single Form by Id
// exports.findById = (req, res) => {

//     const id = req.params.id

//     Form.findByPk(id)
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || `Error retrieving Form with id ${id}.`
//             })
//         })

// }

// //Update Form by Id in request
// exports.update = (req, res) => {

//     const id = req.params.id
//     console.log('id :>> ', id);

//     Form.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: 'Form was updated sucessfully.'
//                 })
//             }
//             else {
//                 res.send({
//                     message: `Cannot update Form with id ${id}. Please try again.`
//                 })
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || `Error updating Form with id ${id}.`
//             })
//         })


// }

// //Delete Form by Id in request
// exports.delete = (req, res) => {

//     const id = req.params.id

//     Form.destroy({ where: { id: id } })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: 'Form was deleted sucessfully!'
//                 })
//             }
//             else {
//                 res.send({
//                     message: `Cannot delete Form with id ${id}. Please try again.`
//                 })
//             }
//         })
//         .catch(err => {
//             res.send(500).send({
//                 message:
//                     err.message || `Error deleting Form with id ${id}.`
//             })
//         })

// }

// //Deleta all form from database
// exports.deleteAll = (req, res) => {

//     Form.destroy({
//         where: {},
//         truncate: false
//     }).then(nums => {
//         res.send({
//             message: `${nums} form were deleted sucessfully.`
//         })
//     })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || 'Some error occured while deleting all form.'
//             })
//         })

// }

// //Find all publised form
// exports.findAllPublished = (req, res) => {

//     Form.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || 'Some error occured while retrieving published Form.'
//             })
//         })
// }