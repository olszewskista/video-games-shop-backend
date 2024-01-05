const {Router} = require('express');
const User = require('../models/User');
const { checkAuthMiddleware } = require('../utils/auth');

const router = Router();
router.use(checkAuthMiddleware)

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Could not fetch user');
    }
});

module.exports = router;