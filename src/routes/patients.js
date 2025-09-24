// src/routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken } = require('../middlewares/auth');
const { patientValidator, idParamValidator } = require('../middlewares/validators');
const handleValidation = require('../middlewares/handleValidation'); // Import the shared middleware

router.post('/', authenticateToken, patientValidator, handleValidation, patientController.createPatient);
router.get('/', authenticateToken, patientController.getPatients);
router.get('/:id', authenticateToken, idParamValidator, handleValidation, patientController.getPatientById);
router.put('/:id', authenticateToken, idParamValidator, patientValidator, handleValidation, patientController.updatePatient);
router.delete('/:id', authenticateToken, idParamValidator, handleValidation, patientController.deletePatient);

module.exports = router;