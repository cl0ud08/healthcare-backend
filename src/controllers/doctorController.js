const prisma = require('../config/db');

exports.createDoctor = async (req, res, next) => {
  try {
    const { name, specialty } = req.body;
    const doctor = await prisma.doctor.create({ data: { name, specialty } });
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: Number(req.params.id) } });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const { name, specialty } = req.body;
    const doctorExists = await prisma.doctor.findUnique({ where: { id: Number(req.params.id) } });
    if (!doctorExists) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const doctor = await prisma.doctor.update({
      where: { id: Number(req.params.id) },
      data: { name, specialty },
    });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: Number(req.params.id) } });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    await prisma.doctor.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    next(err);
  }
};
