const router = require('express').Router();
const { Role, Employee, Manager } = require('../../models');

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roleData = await Role.findAll();
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single role
router.get('/:id', async (req, res) => {
  try {
    const roleData = await Role.findByPk(req.params.id, {
      // JOIN with employees, using the Manager through table
      include: [{ model: Employee, through: Manager, as: 'role_employees' }]
    });

    if (!roleData) {
      res.status(404).json({ message: 'No role found with this id!' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a role
router.post('/', async (req, res) => {
  try {
    const roleData = await Role.create(req.body);
    res.status(200).json(roleData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a role
router.delete('/:id', async (req, res) => {
  try {
    const roleData = await Role.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!roleData) {
      res.status(404).json({ message: 'No role found with this id!' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
