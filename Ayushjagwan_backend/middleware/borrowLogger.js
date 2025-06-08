
const borrowLogger = (req, res, next) => {
  if (req.method === 'POST' && req.path.includes('/borrow')) {
    console.log(`[${new Date().toISOString()}] User ${req.user.id} is borrowing book ${req.params.id}`);
  }
  next();
};

export default borrowLogger;
