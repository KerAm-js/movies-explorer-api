const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const urlRegex = /(https?:\/\/)(www\.)?([\da-z\.\-]+)\.([a-z\.]{2,6})(\/[\da-z\-\._~:\/?#\[\]@!$&'\(\)*+,;=])*#?/;

module.exports = {
  emailRegex,
  urlRegex,
};
