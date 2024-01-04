const { Router } = require("express");
const { checkAuthMiddleware } = require("../utils/auth");

const router = Router()

router.get('/', checkAuthMiddleware, (req, res) => {
    res.status(200).send('ok')
})

module.exports = router