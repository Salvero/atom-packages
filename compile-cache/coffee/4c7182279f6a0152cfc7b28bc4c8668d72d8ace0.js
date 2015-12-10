(function() {
  var Rails;

  Rails = require('./rails');

  module.exports = {
    config: {
      specSearchPaths: {
        type: 'array',
        "default": ['spec', 'fast_spec']
      },
      specDefaultPath: {
        type: 'string',
        "default": 'spec'
      }
    },
    activate: function(state) {
      return atom.commands.add('atom-text-editor', {
        'rails-rspec:toggle-spec-file': (function(_this) {
          return function(event) {
            return _this.toggleSpecFile();
          };
        })(this)
      });
    },
    toggleSpecFile: function() {
      var editor, file, root, specDefault, specPaths;
      editor = atom.workspace.getActiveTextEditor();
      specPaths = atom.config.get('rails-rspec.specSearchPaths');
      specDefault = atom.config.get('rails-rspec.specDefaultPath');
      root = atom.project.getPaths()[0];
      file = new Rails(root, specPaths, specDefault).toggleSpecFile(editor.getPath());
      if (file != null) {
        return atom.workspace.open(file);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcmFpbHMtcnNwZWMvbGliL3JhaWxzLXJzcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxLQUFBOztBQUFBLEVBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBQVIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sT0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLENBQUMsTUFBRCxFQUFTLFdBQVQsQ0FEVDtPQURGO0FBQUEsTUFHQSxlQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsTUFEVDtPQUpGO0tBREY7QUFBQSxJQVFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFDRTtBQUFBLFFBQUEsOEJBQUEsRUFBZ0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLEtBQUQsR0FBQTttQkFBVyxLQUFDLENBQUEsY0FBRCxDQUFBLEVBQVg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQztPQURGLEVBRFE7SUFBQSxDQVJWO0FBQUEsSUFZQSxjQUFBLEVBQWdCLFNBQUEsR0FBQTtBQUNkLFVBQUEsMENBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsQ0FBVCxDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDZCQUFoQixDQURaLENBQUE7QUFBQSxNQUVBLFdBQUEsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNkJBQWhCLENBRmQsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBYixDQUFBLENBQXdCLENBQUEsQ0FBQSxDQUgvQixDQUFBO0FBQUEsTUFJQSxJQUFBLEdBQVcsSUFBQSxLQUFBLENBQU0sSUFBTixFQUFZLFNBQVosRUFBdUIsV0FBdkIsQ0FBbUMsQ0FBQyxjQUFwQyxDQUFtRCxNQUFNLENBQUMsT0FBUCxDQUFBLENBQW5ELENBSlgsQ0FBQTtBQUtBLE1BQUEsSUFBNkIsWUFBN0I7ZUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsSUFBcEIsRUFBQTtPQU5jO0lBQUEsQ0FaaEI7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/salmanRT15/.atom/packages/rails-rspec/lib/rails-rspec.coffee
