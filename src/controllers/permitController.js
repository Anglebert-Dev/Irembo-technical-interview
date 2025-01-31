const asyncHandler = require('express-async-handler');
const Permit = require('../models/Permit');
const emailService = require('../services/emailService');

const createPermit = asyncHandler(async (req, res) => {
  const permit = new Permit(req.body);
  await permit.save();

  if (permit.businessOwner.emailAddress) {
    await emailService.sendPermitEmail(permit);
  }

  res.status(201).json({
    success: true,
    data: permit
  });
});

const getPermit = asyncHandler(async (req, res) => {
  const permit = await Permit.findById(req.params.id);
  if (!permit) {
    res.status(404);
    throw new Error('Permit not found');
  }
  res.json({
    success: true,
    data: permit
  });
});

module.exports = {
  createPermit,
  getPermit
};
