const { Router } = require('express');
const router = Router();

const clothing = require('./clothing');
const favorites = require('./favorites');
const login = require('./login');
const recoveryPass = require('./recoveryPass')
const user = require('./user')
const mercadopago = require('./mercadopago')

router.use('/clothing', clothing)
router.use('/favorite', favorites);
router.use('/login', login);
router.use('/recovery', recoveryPass )
router.use('/user', user)
router.use('/mercadopago', mercadopago)

module.exports = router;
