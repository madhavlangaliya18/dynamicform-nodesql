const express = require("express");
const router = express.Router();
const formCtrl = require('../controllers/form.controller');
const rules = require('../validations/forms.validation');

// router.post("/forms/create", rules.Create(), formCtrl.create);
// router.post("/forms/update", rules.Update() ,formCtrl.UpdateForm);
// router.get("/forms/all", formCtrl.List);
// router.get('/forms/by/', formCtrl.DetailsByID);
// router.post('/forms/savedetails', rules.SaveFormDetails(), formCtrl.SaveFormDetails);
// router.get("/forms/GetAllFormEntries", formCtrl.GetAllFormEntries);
// router.get("/forms/GetEntriesById", formCtrl.GetEntriesByEntryID);
// router.post("/forms/UpdateEntries", rules.UpdateFormDetails(), formCtrl.UpdateEntries);
// router.get("/forms/DeleteEntries", formCtrl.DeleteEntries);

module.exports = router;