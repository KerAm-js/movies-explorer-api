module.exports = (err, req, res, next) => {
  console.log(err);
  console.log(err.statusCode);
  console.log(err.code);
  console.log(err.name);
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Ошибка сервера' });
  next();
};
