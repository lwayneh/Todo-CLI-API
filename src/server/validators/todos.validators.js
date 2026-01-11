export function validateCreateTodo(req, res, next) {
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      reason: 'Todo name is required',
    });
  }
  next();
}

export function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      reason: 'Invalid id',
    });
  }

  next();
}
