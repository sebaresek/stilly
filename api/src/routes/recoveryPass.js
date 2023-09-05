const { Router } = require('express');
const router = Router();

const { recoveryPass, updatePass } = require('../constrollers/recoveryPass')


router.post("/email", recoveryPass);
router.post('/pass', updatePass)

module.exports = router;