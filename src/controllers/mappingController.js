const prisma = require('../config/db');

exports.createMapping = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;
    const mapping = await prisma.mapping.create({ data: { patientId, doctorId } });
    res.status(201).json(mapping);
  } catch (err) {
    next(err);
  }
};

exports.getMappings = async (req, res, next) => {
  try {
    const mappings = await prisma.mapping.findMany({ include: { patient: true, doctor: true } });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

exports.getMappingsByPatient = async (req, res, next) => {
  try {
    const mappings = await prisma.mapping.findMany({
      where: { patientId: Number(req.params.patientId) },
      include: { doctor: true },
    });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

exports.deleteMapping = async (req, res, next) => {
  try {
    const mapping = await prisma.mapping.findUnique({ where: { id: Number(req.params.id) } });
    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }
    await prisma.mapping.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Mapping deleted' });
  } catch (err) {
    next(err);
  }
};
