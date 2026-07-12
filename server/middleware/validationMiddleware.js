const validatePayload = (schema) => (req, res, next) => {
  const errors = [];
  Object.entries(schema).forEach(([key, rule]) => {
    if (rule.required && req.body[key] == null) {
      errors.push(`${key} is required`);
    }
  });
  if (errors.length) return res.status(400).json({ errors });
  next();
};

module.exports = { validatePayload };
