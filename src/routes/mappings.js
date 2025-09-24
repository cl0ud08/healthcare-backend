const express = require('express');
const router = express.Router();
const mappingController = require('../controllers/mappingController');
const authenticateToken = require('../middlewares/auth');
const { mappingValidator, idParamValidator, patientIdParamValidator } = require('../middlewares/validators');
const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.post('/', authenticateToken, mappingValidator, handleValidation, mappingController.createMapping);
router.get('/', authenticateToken, mappingController.getMappings);
router.get('/:patientId', authenticateToken, patientIdParamValidator, handleValidation, mappingController.getMappingsByPatient);
router.delete('/:id', authenticateToken, idParamValidator, handleValidation, mappingController.deleteMapping);

module.exports = router;
