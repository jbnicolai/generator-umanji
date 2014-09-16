'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('umanji-component:service', {arguments: this.arguments}, { local: require.resolve('generator-umanji-component/service') });
  }
});

module.exports = Generator;