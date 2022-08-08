const express = require('express');
const router = express.Router();
const formCtrl = require('../controllers/form.controller');
const rules = require('../validations/forms.validation');

router.post("/forms/create", rules.Create(), formCtrl.Create);
router.post("/forms/update", rules.Update() ,formCtrl.UpdateForm);
router.get("/forms/all", formCtrl.findAll);
router.get('/forms/by/', formCtrl.findById);
router.post("/forms/DeleteEntries", formCtrl.DeleteEntries);


module.exports = router;