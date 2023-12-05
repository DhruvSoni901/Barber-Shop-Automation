const express = require('express');
const adminRoutes = express.Router();
const { loginCtrl, detailCtrl, approveCtrl, deleteCtrl, invDetailCtrl, updateinvCtrl} = require('../controllers/admin/admin');

adminRoutes.post('/admin_login', loginCtrl );

adminRoutes.get('/appointments', detailCtrl)

adminRoutes.put('/appointment/approve/:id', approveCtrl);

adminRoutes.delete('/appointment/decline/:id', deleteCtrl);

adminRoutes.get('/inventory', invDetailCtrl)

adminRoutes.put('/update-inventory', updateinvCtrl)

module.exports = adminRoutes;