const router = require('express').Router();
const employeeRoutes = require('./employeeRoutes');
const roleRoutes = require('./roleRoutes');
const managerRoutes = require('./managerRoutes');

router.use('/employee', employeeRoutes);
router.use('/role', roleRoutes);
router.use('/manager', managerRoutes);

module.exports = router;
