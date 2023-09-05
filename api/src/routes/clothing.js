const { Router } = require('express');
const router = Router();

const {  
    getClothings, 
    createClothing ,
    deletedClothing
} = require('../constrollers/clothing')

// Configurar los routers
router.get("/", getClothings);

router.post('/', createClothing);

router.delete('/:id', deletedClothing)


module.exports = router;
