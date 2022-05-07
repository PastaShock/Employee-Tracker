const router = require('express').Router();
const { manager } = require('../../models');

// CREATE a manager
router.post('/', async (req, res) => {
  try {
    const managerData = await Manager.create(req.body);
    res.status(200).json(managerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a manager
router.delete('/:id', async (req, res) => {
  try {
    const managerData = await Manager.destroy({
      where: { id: req.params.id }
    });
    if (!managerData) {
      res.status(404).json({ message: 'No manager with this id!' });
      return;
    }
    res.status(200).json(managerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
