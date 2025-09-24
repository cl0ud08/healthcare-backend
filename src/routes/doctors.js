const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');
const { doctorValidator, idParamValidator } = require('../middlewares/validators');
const handleValidation = require('../middlewares/handleValidation'); // Import the new middleware

router.post('/', authenticateToken, authorizeAdmin, doctorValidator, handleValidation, doctorController.createDoctor);
router.get('/', authenticateToken, doctorController.getDoctors);
router.get('/:id', authenticateToken, idParamValidator, handleValidation, doctorController.getDoctorById);
router.put('/:id', authenticateToken, authorizeAdmin, idParamValidator, doctorValidator, handleValidation, doctorController.updateDoctor);
router.delete('/:id', authenticateToken, authorizeAdmin, idParamValidator, handleValidation, doctorController.deleteDoctor);

module.exports = router;