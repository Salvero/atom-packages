(function() {
  var Path, RailsRspec, Workspace;

  Path = require('path');

  Workspace = require('atom').Workspace;

  RailsRspec = require('../lib/rails-rspec');

  describe('RailsRspec', function() {
    var activationPromise, currentPath, toggleFile;
    activationPromise = null;
    currentPath = function() {
      return atom.workspace.getActiveTextEditor().getPath();
    };
    toggleFile = function(file) {
      var editor;
      atom.workspace.openSync(file);
      editor = atom.workspace.getActiveTextEditor();
      atom.commands.dispatch(atom.views.getView(editor), 'rails-rspec:toggle-spec-file');
      return waitsForPromise(function() {
        return activationPromise;
      });
    };
    beforeEach(function() {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'rails-rspec:toggle-spec-file');
      return activationPromise = atom.packages.activatePackage('rails-rspec');
    });
    return describe('when the rails-rspec:toggle-spec-file event is triggered', function() {
      return it('swtiches to spec file', function() {
        toggleFile('app/models/user.rb');
        return runs(function() {
          return expect(currentPath()).toBe(Path.join(__dirname, 'fixtures/spec/models/user_spec.rb'));
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcmFpbHMtcnNwZWMvc3BlYy9yYWlscy1yc3BlYy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyQkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQyxZQUFhLE9BQUEsQ0FBUSxNQUFSLEVBQWIsU0FERCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxvQkFBUixDQUZiLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsUUFBQSwwQ0FBQTtBQUFBLElBQUEsaUJBQUEsR0FBb0IsSUFBcEIsQ0FBQTtBQUFBLElBQ0EsV0FBQSxHQUFjLFNBQUEsR0FBQTthQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFvQyxDQUFDLE9BQXJDLENBQUEsRUFEWTtJQUFBLENBRGQsQ0FBQTtBQUFBLElBSUEsVUFBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1gsVUFBQSxNQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQWYsQ0FBd0IsSUFBeEIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBRFQsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixDQUF2QixFQUFtRCw4QkFBbkQsQ0FGQSxDQUFBO2FBR0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxrQkFEYztNQUFBLENBQWhCLEVBSlc7SUFBQSxDQUpiLENBQUE7QUFBQSxJQVdBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQXZCLEVBQTJELDhCQUEzRCxDQUFBLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsYUFBOUIsRUFGWDtJQUFBLENBQVgsQ0FYQSxDQUFBO1dBZUEsUUFBQSxDQUFTLDBEQUFULEVBQXFFLFNBQUEsR0FBQTthQUNuRSxFQUFBLENBQUcsdUJBQUgsRUFBNEIsU0FBQSxHQUFBO0FBQzFCLFFBQUEsVUFBQSxDQUFXLG9CQUFYLENBQUEsQ0FBQTtlQUVBLElBQUEsQ0FBSyxTQUFBLEdBQUE7aUJBQ0gsTUFBQSxDQUFPLFdBQUEsQ0FBQSxDQUFQLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLG1DQUFyQixDQUEzQixFQURHO1FBQUEsQ0FBTCxFQUgwQjtNQUFBLENBQTVCLEVBRG1FO0lBQUEsQ0FBckUsRUFoQnFCO0VBQUEsQ0FBdkIsQ0FKQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/salmanRT15/.atom/packages/rails-rspec/spec/rails-rspec-spec.coffee
