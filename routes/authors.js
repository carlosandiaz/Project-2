const express = require('express');
const router  = express.Router();

/* All Authors Route */
router.get('/', (req, res, next) => {
  res.render('authors/index');
});

/* New Author Route */
router.get('/new', (req, res, next) => {
    res.render('authors/new');
  });

/* Create Author Route */
router.post('/' , (req, res, next) => {
    res.send('Create');
  });

module.exports = router;
