const { body, param } = require('express-validator');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.patientValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0 }).withMessage('Valid age is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
];

exports.doctorValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('specialty').notEmpty().withMessage('Specialty is required'),
];

exports.mappingValidator = [
  body('patientId').isInt().withMessage('Valid patientId is required'),
  body('doctorId').isInt().withMessage('Valid doctorId is required'),
];

exports.idParamValidator = [
  param('id').isInt().withMessage('Valid ID is required'),
];

exports.patientIdParamValidator = [
  param('patientId').isInt().withMessage('Valid patientId is required'),
];
