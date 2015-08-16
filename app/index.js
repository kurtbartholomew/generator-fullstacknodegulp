var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  
  initializing: function(){
    this.pkg = require('../package.json');
  },

  writing: {
    gulpfile: function(){
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'));
    },
    git: function(){
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
    },
    packageJSON: function(){
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'));
    },
    bower: function(){
      this.fs.copy(
        this.templatePath('_.bowerrc'),
        this.destinationPath('.bowerrc'));
    },
    server: function(){
      // figure this out
    },
    client: function(){
      // figure this out
    }
  }
});

