const router = require('express').Router();
const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;