module.exports = (model) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;

      const totalCount = await model.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      const results = await model.find().skip(skip).limit(pageSize);

      res.locals.pagination = {
        page,
        pageSize,
        totalCount,
        totalPages,
        results,
      };
      res.status(200).json({ results });
      next();
    } catch (error) {
      console.error("Pagination middleware error:", error);
      // throw new Error("Internal server error");
    }
  };
};
