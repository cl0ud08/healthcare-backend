const prisma = require('../config/db');

exports.createMapping = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;

    // Optional: check if patient exists
    const patient = await prisma.patient.findUnique({ where: { id: Number(patientId) } });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    // Optional: check if doctor exists
    const doctor = await prisma.doctor.findUnique({ where: { id: Number(doctorId) } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const mapping = await prisma.mapping.create({
      data: { patientId: Number(patientId), doctorId: Number(doctorId) }
    });

    res.status(201).json(mapping);
  } catch (err) {
    next(err);
  }
};

exports.getMappings = async (req, res, next) => {
  try {
    const mappings = await prisma.mapping.findMany({
      include: { patient: true, doctor: true },
    });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

exports.getMappingsByPatient = async (req, res, next) => {
  try {
    const patientId = Number(req.params.patientId);
    const mappings = await prisma.mapping.findMany({
      where: { patientId },
      include: { doctor: true },
    });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

exports.deleteMapping = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const mapping = await prisma.mapping.findUnique({ where: { id } });

    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }

    await prisma.mapping.delete({ where: { id } });
    res.json({ message: 'Mapping deleted successfully' });
  } catch (err) {
    next(err);
  }
};
