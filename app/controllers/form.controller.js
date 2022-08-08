const db = require('../models')
const Forms = db.forms;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const labelmsg = require('../labels/response.labels');


exports.Create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json({
      error: error.msg
    });
  }
  let data = req.body;
  Forms.findAll({  where: { form_key: data.form_key } }).then((info) => {
    if (info) {
          Forms.create(data).then((response) => {
            res.status(200).json({
              success: true,
              message: labelmsg.addedmsg
            })
          }).catch((err) => {
            //console.log(err);
            res.status(500).json({
              success: false,
              message: labelmsg.errormsg
            })
          })
    }
    else {
      res.json({
        success: false,
        message: labelmsg.keyalreadyExists
      })
    }

  })

  // if (!req.body.form_name) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // const formdata = {
  //   form_name: req.body.form_name,
  //   form_key: req.body.form_key,
  //   status: req.body.status ? req.body.status : false,
  //   submitButtonName: req.body.submitButtonName ? req.body.submitButtonName : false,
  //   fields:req.body.fields
  // };
  // Forms.create(formdata)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Form."
  //     });
  //   });
};


// Update a Form by the id in the request
exports.UpdateForm = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(422).json({
          error: error.msg
      });
  }

  const form_id = req.query.form_id;

  Forms.update(req.body, {
    where: { id: form_id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          success: true,
          message: labelmsg.updatemsg        
        });
      } else {
        res.json({
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
exports.findAll = async(req, res) => {
  const form_name = req.query.form_name
  let condition = form_name ? { form_name: { [Op.like]: `%${form_name}%` } } : null

  Forms.findAll({ where: condition })
    .then(data => {
      let new_arr = []
      for (let i = 0; i < data.length; i++) {
        let obj = {}
        try {
          obj["id"] = data[i]?.id
          obj["form_name"] = data[i]?.form_name
          obj["form_key"] = data[i]?.form_key
          obj["submitButtonName"] = data[i]?.submitButtonName
          obj["status"] = data[i]?.status
          obj["fields"] = JSON.parse(data[i]?.fields)
          obj["createdAt"] = data[i]?.createdAt
          obj["updatedAt"] = data[i]?.updatedAt
        }
        catch (err) {
          console.log(err.message)
        }
        new_arr.push(obj)
      }
      res.status(200).json({ message: "Record's Found", data: new_arr , totaldata : new_arr.length});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving the Form.'
      })
    })


}

// //Find a single Form by Id
exports.findById = (req, res) => {
  const form_id = req.query.form_id
  Forms.findOne({ where: { id:  form_id} })
      .then(data => {
          data.dataValues.fields = JSON.parse(data.dataValues.fields)
          res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
              message:
                  err.message || `Error retrieving Form with id ${id}.`
          })
      })

}

// //Delete Form by Id in req
exports.DeleteEntries = (req, res) => {
  const form_id = req.query.form_id
  Forms.destroy({ where: { id: form_id } })
    .then(num => {
      if (num == 1) {
        res.status(202).json({
          message: 'Form was deleted sucessfully!'
        })
      }
      else {
        res.status(500).json({
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

