const express = require('express');
const router = express.Router();
const mappingController = require('../controllers/mappingController');
const { authenticateToken } = require('../middlewares/auth');
const { mappingValidator, idParamValidator, patientIdParamValidator } = require('../middlewares/validators');
const handleValidation = require('../middlewares/handleValidation'); // Import the shared middleware

router.post('/', authenticateToken, mappingValidator, handleValidation, mappingController.createMapping);
router.get('/', authenticateToken, mappingController.getMappings);
router.get('/:patientId', authenticateToken, patientIdParamValidator, handleValidation, mappingController.getMappingsByPatient);
router.delete('/:id', authenticateToken, idParamValidator, handleValidation, mappingController.deleteMapping);

module.exports = router;