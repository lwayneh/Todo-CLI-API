export function sendServiceResult(res, result, { successStatus = 200 } = {}) {
  if (result.success) {
    return res.status(successStatus).json(result);
  }

  const isNotFound = result.reason?.includes('not found');
  return res.status(isNotFound ? 404 : 400).json(result);
}
