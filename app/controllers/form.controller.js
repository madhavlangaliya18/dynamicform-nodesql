const db = require('../models')
const Forms = db.forms;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const labelmsg = require('../labels/response.labels');


exports.Create = async(req, res) => {

  if (!req.body.form_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const formdata = {
    form_name: req.body.form_name,
    form_key: req.body.form_key,
    status: req.body.status ? req.body.status : false,
    submitButtonName: req.body.submitButtonName ? req.body.submitButtonName : false,
    fields:req.body.fields
  };
  Forms.create(formdata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  };


  // Update a Tutorial by the id in the request
exports.UpdateForm = (req, res) => {
  const form_id = req.query.form_id;
  console.log("-------------",form_id );

  Forms.update(req.body, {
    where: { id: form_id }
  })
    .then(num => {
      console.log("num",num);
      if (num == 1) {
        res.send({
          message: "Form was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Form with form_id=${form_id}. Maybe Form was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Form with id=" + form_id
      });
    });
};



// //Retieve all form from the db
exports.findAll = (req, res) => {
    const form_name = req.query.form_name
    let condition = form_name ? { form_name: { [Op.like]: `%${form_name}%` } } : null

    Forms.findAll({ where: condition })
        .then(data => {
          let new_arr = []
          for (let i = 0; i < data.length; i++) 
          {
            let obj = {}
            try{
              obj["id"] = data[i]?.id
              obj["form_name"] = data[i]?.form_name
              obj["form_key"] = data[i]?.form_key
              obj["submitButtonName"] = data[i]?.submitButtonName
              obj["status"] = data[i]?.status
              obj["fields"] = JSON.parse(data[i]?.fields)
              obj["createdAt"] = data[i]?.createdAt
              obj["updatedAt"] = data[i]?.updatedAt
            }
            catch(err){
              console.log(err)

            }
            new_arr.push(obj)
          }  
          res.json({message: "Record's Found",data:new_arr});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving the Form.'
            })
        })
      

}

// //Find a single Form by Id
  exports.findById = async (req, res) => {
    console.log("helooooooosdfsdfsdfsdf");
      const id = req.query.form_id
    const findOneForm = await Forms.findOne({ where: { id:  req.query.form_id} })
    console.log(findOneForm.dataValues);
    findOneForm.dataValues.fields = JSON.parse(findOneForm.dataValues.fields)
    res.json(findOneForm.dataValues)
      // Forms.findOne({ where: { id:  req.query.form_id} })
      //     .then(data => {

      //         res.send(data)
      //     })
      //     .catch(err => {
      //         res.status(500).send({
      //             message:
      //                 err.message || `Error retrieving Form with id ${id}.`
      //         })
      //     })

  }

// //Delete Form by Id in req
exports.DeleteEntries = (req, res) => {
    const form_id = req.query.form_id
  Forms.destroy({ where: { id: form_id } })
        .then(num => {
            if (num == 1) {
                res.json({
                    message: 'Form was deleted sucessfully!'
                })
            }
            else {
                res.json({
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

