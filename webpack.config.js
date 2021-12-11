module.exports = {
  mode: "development",
  devtool:"source-map",
  target:"nwjs",
  entry: `./src/index.js`,
  externals:{
    photoshop:"require('photoshop')",
    uxp:"require('uxp')",
  },
  output: {
    path: `${__dirname}/plugin`,
    filename: "main.js"
  },
  context:__dirname,
};