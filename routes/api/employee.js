const router = require('express').Router();
const { employee, Manager, Role } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeeData = await Employee.findAll();
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single employee
router.get('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.params.id, {
      // JOIN with roles, using the Manager through table
      include: [{ model: Role, through: Manager, as: 'planned_managers' }]
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No employee found with this id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a employee
router.post('/', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body);
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a employee
router.delete('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No employee found with this id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
