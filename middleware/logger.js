const logger = (req, res, next) => {
  const log = {
    request_method: req.method,
    request_url: req.originalUrl,
    timestamp: Date.now()
  };

  console.info(log);
  next();
};

module.exports = logger;
