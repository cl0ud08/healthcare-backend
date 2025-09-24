const prisma = require('../config/db');

exports.createPatient = async (req, res, next) => {
  try {
    const { name, age, gender } = req.body;
    const patient = await prisma.patient.create({
      data: { name, age, gender, userId: req.user.id },
    });
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({ where: { userId: req.user.id } });
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: Number(req.params.id), userId: req.user.id } });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const { name, age, gender } = req.body;
    const patientExists = await prisma.patient.findUnique({ where: { id: Number(req.params.id), userId: req.user.id } });
    if (!patientExists) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const patient = await prisma.patient.update({
      where: { id: Number(req.params.id), userId: req.user.id },
      data: { name, age, gender },
    });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: Number(req.params.id), userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await prisma.patient.delete({ where: { id: Number(req.params.id), userId: req.user.id } });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    next(err);
  }
};
