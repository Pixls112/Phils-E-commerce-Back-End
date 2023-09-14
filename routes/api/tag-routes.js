const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll();
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const specificTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
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
  // create a new tag
  // I pulled this and repurposed it from Module 13's Student Mini-Project
  try {
    const createTagData = await Tag.create(req.body);
    res.status(200).json(createTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update({
      where: { id: req.params.id }
    });
    if (!updateTagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // I pulled this and repurposed it from Module 13's Student Mini-Project
  try {
    const deleteTagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleteTagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(deleteTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
