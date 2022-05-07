const router = require('express').Router();
const employeeRoutes = require('./employee');
const roleRoutes = require('./role');
const managerRoutes = require('./manager');

router.use('/employee', employeeRoutes);
router.use('/role', roleRoutes);
router.use('/manager', managerRoutes);

module.exports = router;
