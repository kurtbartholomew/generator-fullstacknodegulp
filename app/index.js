var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var wiredep = require('wiredep');

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
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore'));
    },
    packageJSON: function(){
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'));
    },
    bower: function(){
      var bowerJson = {
        name: "newapp",
        private: true,
        dependencies: {}
      };

      bowerJson.dependencies['normalize.css'] = "~3.0.3";

      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('_.bowerrc'),
        this.destinationPath('.bowerrc'));
    },
    client: function(){
      this.fs.copy(
        this.templatePath('client/src/app/app.js'),
        this.destinationPath('client/src/app/app.js'));
      this.fs.copy(
        this.templatePath('client/src/favicon.ico'),
        this.destinationPath('client/src/favicon.ico'));
      this.fs.copy(
        this.templatePath('client/src/robots.txt'),
        this.destinationPath('client/src/robots.txt'));
      this.fs.copy(
        this.templatePath('client/src/index.html'),
        this.destinationPath('client/src/index.html'));
      this.fs.copy(
        this.templatePath('client/src/assets/css/main.css'),
        this.destinationPath('client/src/assets/css/main.css'));
      this.fs.copy(
        this.templatePath('client/src/assets/js/main.js'),
        this.destinationPath('client/src/assets/js/main.js'));

      mkdirp('client/src/assets/fonts');
      mkdirp('client/src/assets/images');
      mkdirp('client/src/assets/lib');
      mkdirp('client/src/test');
    },
    e2e: function(){
      this.fs.copy(
        this.templatePath('e2e/main.spec.js'),
        this.destinationPath('e2e/main.spec.js'));
    },
    server: function(){
      this.fs.copy(
        this.templatePath('server/api/sample/sampleController.js'),
        this.destinationPath('server/api/sample/sampleController.js'));
      this.fs.copy(
        this.templatePath('server/api/sample/sampleRoutes.js'),
        this.destinationPath('server/api/sample/sampleRoutes.js'));
      this.fs.copy(
        this.templatePath('server/bin/www/index.js'),
        this.destinationPath('server/bin/www/index.js'));
      this.fs.copy(
        this.templatePath('server/config/environment/index.js'),
        this.destinationPath('server/config/environment/index.js'));
      this.fs.copy(
        this.templatePath('server/config/db.js'),
        this.destinationPath('server/config/db.js'));
      this.fs.copy(
        this.templatePath('server/config/middleware.js'),
        this.destinationPath('server/config/middleware.js'));
      this.fs.copy(
        this.templatePath('server/models/sampleModel.js'),
        this.destinationPath('server/models/sampleModel.js'));
      this.fs.copy(
        this.templatePath('server/test/sample.spec.js'),
        this.destinationPath('server/test/sample.spec.js'));
      this.fs.copy(
        this.templatePath('server/server.js'),
        this.destinationPath('server/server.js'));
      this.fs.copy(
        this.templatePath('server/.jshintrc'),
        this.destinationPath('server/.jshintrc'));

      mkdirp('server/views');
    }
  },

  install: function() {
    this.installDependencies();
  },

  end: function(){
    var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));

    wiredep({
      bowerJson: bowerJson,
      directory: 'client/src/assets/lib',
      exclude: ['bootstrap-sass', 'bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./,
      src: 'client/src/index.html'
    });
  }
});

