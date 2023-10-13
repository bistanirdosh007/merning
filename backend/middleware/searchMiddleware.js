// searchMiddleware.js
const asyncHandler = require("express-async-handler");

const searchMiddleware = (model, searchFields) => {
  return asyncHandler(async (req, res, next) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return next();
    }

    const query = {};
    searchFields.forEach((field) => {
      query[field] = { $regex: searchQuery, $options: "i" };
    });

    const filteredResults = await model.find(query);

    res.locals.filteredResults = filteredResults;
    next();
  });
};

module.exports = searchMiddleware;
