const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

const router = express.Router();

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createOneList);
router.get('/lists/:id', listController.getOneList);
router.patch('/lists/:id', listController.updateOneList);
router.delete('/lists/:id', listController.deleteOneList);


router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createOneCard);
router.get('/cards/:id', cardController.getOneCard);
router.patch('/cards/:id', cardController.updateOneCard);
router.delete('/cards/:id', cardController.deleteOneCard);


router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createOneTag);
router.get('/tags/:id', tagController.getOneTag);
router.patch('/tags/:id', tagController.updateOneTag);
router.delete('/tags/:id', tagController.deleteOneTag);

router.post('/cards/:id/tag', tagController.addTagToCard);
router.delete('/cards/:card_id/tag/:tag_id', tagController.deleteTagToCard);

module.exports = router;

