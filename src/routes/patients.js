// controllers/patientController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createPatient: async (req, res) => {
    try {
      const patient = await prisma.patient.create({ data: req.body });
      res.status(201).json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPatients: async (req, res) => {
    try {
      const patients = await prisma.patient.findMany({ where: { userId: req.user.id } });
      res.json(patients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPatientById: async (req, res) => {
    try {
      const patient = await prisma.patient.findUnique({ where: { id: parseInt(req.params.id) } });
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updatePatient: async (req, res) => {
    try {
      const patient = await prisma.patient.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
      });
      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deletePatient: async (req, res) => {
    try {
      await prisma.patient.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
