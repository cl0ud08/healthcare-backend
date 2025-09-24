// src/routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken } = require('../middlewares/auth');
const { patientValidator, idParamValidator } = require('../middlewares/validators');
const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.post('/', authenticateToken, patientValidator, handleValidation, patientController.createPatient);
router.get('/', authenticateToken, patientController.getPatients);
router.get('/:id', authenticateToken, idParamValidator, handleValidation, patientController.getPatientById);
router.put('/:id', authenticateToken, idParamValidator, patientValidator, handleValidation, patientController.updatePatient);
router.delete('/:id', authenticateToken, idParamValidator, handleValidation, patientController.deletePatient);

module.exports = router; // ✅ MUST export router, not an object
