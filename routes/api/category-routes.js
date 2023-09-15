const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Using tag-routes.js model I simply just repurposed the code changing variable names to fit the function.
  try {
    const allCatData = await Category.findAll();
    res.status(200).json(allCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // Using tag-routes.js model I simply just repurposed the code changing variable names to fit the function.
  try {
    const specificTagData = await Category.findByPk(req.params.id, {
      include: {model: Product}
    });

    if (!specificTagData) {
      res.status(404).json({ message: 'No product tag found with this id!' });
      return;
    }

    res.status(200).json(specificTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  // Using tag-routes.js model I simply just repurposed the code changing variable names to fit the function.
  try {
    const createCatData = await Category.create(req.body);
    res.status(200).json(createCatData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // Using tag-routes.js model I simply just repurposed the code changing variable names to fit the function.
  try {
    const updateCatData = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updateCatData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updateCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // Using tag-routes.js model I simply just repurposed the code changing variable names to fit the function.
  try {
    const deleteCatData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCatData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deleteCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
