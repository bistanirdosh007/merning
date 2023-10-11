const asyncHandler = require("express-async-handler");
const paginationMiddleware = require("../middleware/paginationMiddleware");
const Municipality = require("../models/municipalityModel");

const getMunicipality = paginationMiddleware(Municipality);

module.exports = { getMunicipality };
