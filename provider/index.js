'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('umanji-component:provider', {arguments: this.arguments}, { local: require.resolve('generator-umanji-component/provider') });
  }
});

module.exports = Generator;