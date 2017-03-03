module.exports = function (env) {
  const configPath = `./config/webpack.${env}.js`;
  return require(configPath);
};
