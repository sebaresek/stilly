const { Router } = require('express');
const router = Router();
const multer = require('multer'); // Importa multer antes de usarlo
const {  
  getClothings, 
  createClothing,
  deletedClothing,
  getClothingByMale,
  getClothingByFemale,
  getClothingByaccessories,
  getClothingOffer,
  searchClothingByName,
  getClothingByIdd,
  getSizesClothing
} = require('../constrollers/clothing')

const {
  getTShirtAndMuscleMen,
  getshortsAndpantsMen,
  getDiversAndJacketsMen,
  getAccessoriesMen
} = require('../constrollers/clothingMen')

const {
  getTShirtAndMuscleWomen, 
  getshortsAndpantsWomen,
  getDiversAndJacketsWomen, 
  getAccessoriesWomen
} = require('../constrollers/clothingWomen')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada imagen
    },
  });
  const upload = multer({ storage: storage });



// 'images' debe coincidir con el nombre del campo de archivo en el formulario
router.post('/', upload.array('image', 5), createClothing);
router.delete('/:id', deletedClothing)
router.get('/detail/:id', getClothingByIdd)
router.get("/all", getClothings);
router.get("/accessories", getClothingByaccessories);
router.get('/offer', getClothingOffer);
router.get('/search', searchClothingByName);
router.get('/sizes/:name/', getSizesClothing);

router.get("/male", getClothingByMale);
router.get("/male/t-shirtandmuscle", getTShirtAndMuscleMen);
router.get("/male/shortsandpants", getshortsAndpantsMen);
router.get("/male/diversandjackets", getDiversAndJacketsMen);
router.get("/male/accessories", getAccessoriesMen);

router.get("/female", getClothingByFemale);
router.get("/female/t-shirtandmuscle", getTShirtAndMuscleWomen);
router.get("/female/shortsandpants", getshortsAndpantsWomen);
router.get("/female/diversandjackets", getDiversAndJacketsWomen);
router.get("/female/accessories", getAccessoriesWomen);

module.exports = router;
