(function() {
  var Path, Rails, fs, specAppPathsReg, specLibPathsReg, supportedPathsReg;

  fs = require('fs');

  Path = require('path');

  supportedPathsReg = function(paths) {
    return new RegExp("^\/(app|lib|" + (paths.join('|')) + ")\/", 'i');
  };

  specLibPathsReg = function(paths) {
    return new RegExp("^\/(" + (paths.join('|')) + ")\/lib\/", 'i');
  };

  specAppPathsReg = function(paths) {
    return new RegExp("^\/(" + (paths.join('|')) + ")\/", 'i');
  };

  module.exports = Rails = (function() {
    function Rails(root, specPaths, specDefault) {
      this.root = root;
      this.specPaths = specPaths;
      this.specDefault = specDefault;
    }

    Rails.prototype.toggleSpecFile = function(file) {
      var relativePath;
      relativePath = file.substring(this.root.length);
      if (!relativePath.match(supportedPathsReg(this.specPaths))) {
        return null;
      }
      if (relativePath.match(/_spec\.rb$/)) {
        return this.getRubyFile(relativePath);
      } else {
        return this.findSpecFile(relativePath);
      }
    };

    Rails.prototype.getRubyFile = function(path) {
      if (path.match(/^\/spec\/views/i)) {
        path = path.replace(/_spec\.rb$/, '');
      } else {
        path = path.replace(/_spec\.rb$/, '.rb');
      }
      path = path.replace(specLibPathsReg(this.specPaths), '/lib/');
      path = path.replace(specAppPathsReg(this.specPaths), '/app/');
      return Path.join(this.root, path);
    };

    Rails.prototype.findSpecFile = function(path) {
      var file, specPath, _i, _len, _ref;
      _ref = this.specPaths;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        specPath = _ref[_i];
        file = this.getSpecFile(path, specPath);
        if (fs.existsSync(file)) {
          return file;
        }
      }
      return this.getSpecFile(path, this.specDefault);
    };

    Rails.prototype.getSpecFile = function(path, specPath) {
      var newPath;
      if (path.match(/\.rb$/)) {
        path = path.replace(/\.rb$/, '_spec.rb');
      } else {
        path = path + '_spec.rb';
      }
      if (path.match(/^\/app\//)) {
        newPath = path.replace(/^\/app\//, "/" + specPath + "/");
      } else {
        newPath = path.replace(/^\/lib\//, "/" + specPath + "/lib/");
      }
      return Path.join(this.root, newPath);
    };

    return Rails;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcmFpbHMtcnNwZWMvbGliL3JhaWxzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvRUFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsaUJBQUEsR0FBb0IsU0FBQyxLQUFELEdBQUE7V0FDZCxJQUFBLE1BQUEsQ0FBUSxjQUFBLEdBQWEsQ0FBQyxLQUFLLENBQUMsSUFBTixDQUFXLEdBQVgsQ0FBRCxDQUFiLEdBQThCLEtBQXRDLEVBQTRDLEdBQTVDLEVBRGM7RUFBQSxDQUhwQixDQUFBOztBQUFBLEVBTUEsZUFBQSxHQUFrQixTQUFDLEtBQUQsR0FBQTtXQUNaLElBQUEsTUFBQSxDQUFRLE1BQUEsR0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBWCxDQUFELENBQUwsR0FBc0IsVUFBOUIsRUFBeUMsR0FBekMsRUFEWTtFQUFBLENBTmxCLENBQUE7O0FBQUEsRUFTQSxlQUFBLEdBQWtCLFNBQUMsS0FBRCxHQUFBO1dBQ1osSUFBQSxNQUFBLENBQVEsTUFBQSxHQUFLLENBQUMsS0FBSyxDQUFDLElBQU4sQ0FBVyxHQUFYLENBQUQsQ0FBTCxHQUFzQixLQUE5QixFQUFvQyxHQUFwQyxFQURZO0VBQUEsQ0FUbEIsQ0FBQTs7QUFBQSxFQVlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLGVBQUUsSUFBRixFQUFTLFNBQVQsRUFBcUIsV0FBckIsR0FBQTtBQUFtQyxNQUFsQyxJQUFDLENBQUEsT0FBQSxJQUFpQyxDQUFBO0FBQUEsTUFBM0IsSUFBQyxDQUFBLFlBQUEsU0FBMEIsQ0FBQTtBQUFBLE1B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

//# sourceURL=/Users/salmanRT15/.atom/packages/rails-rspec/lib/rails.coffee
