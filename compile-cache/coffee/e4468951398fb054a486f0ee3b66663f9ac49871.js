(function() {
  var RSpecView, url;

  url = require('url');

  RSpecView = require('./rspec-view');

  module.exports = {
    configDefaults: {
      command: "rspec",
      spec_directory: "spec",
      force_colored_results: true,
      save_before_run: false
    },
    activate: function(state) {
      if (state != null) {
        this.lastFile = state.lastFile;
        this.lastLine = state.lastLine;
      }
      atom.config.setDefaults("atom-rspec", {
        command: this.configDefaults.command,
        spec_directory: this.configDefaults.spec_directory,
        save_before_run: this.configDefaults.save_before_run,
        force_colored_results: this.configDefaults.force_colored_results
      });
      atom.commands.add('atom-workspace', {
        'rspec:run': (function(_this) {
          return function() {
            return _this.run();
          };
        })(this),
        'rspec:run-for-line': (function(_this) {
          return function() {
            return _this.runForLine();
          };
        })(this),
        'rspec:run-last': (function(_this) {
          return function() {
            return _this.runLast();
          };
        })(this),
        'rspec:run-all': (function(_this) {
          return function() {
            return _this.runAll();
          };
        })(this)
      });
      return atom.workspace.addOpener(function(uriToOpen) {
        var pathname, protocol, _ref;
        _ref = url.parse(uriToOpen), protocol = _ref.protocol, pathname = _ref.pathname;
        if (protocol !== 'rspec-output:') {
          return;
        }
        return new RSpecView(pathname);
      });
    },
    rspecView: null,
    deactivate: function() {
      return this.rspecView.destroy();
    },
    serialize: function() {
      return {
        rspecViewState: this.rspecView.serialize(),
        lastFile: this.lastFile,
        lastLine: this.lastLine
      };
    },
    openUriFor: function(file, lineNumber) {
      var previousActivePane, uri;
      this.lastFile = file;
      this.lastLine = lineNumber;
      previousActivePane = atom.workspace.getActivePane();
      uri = "rspec-output://" + file;
      return atom.workspace.open(uri, {
        split: 'right',
        activatePane: false,
        searchAllPanes: true
      }).done(function(rspecView) {
        if (rspecView instanceof RSpecView) {
          rspecView.run(lineNumber);
          return previousActivePane.activate();
        }
      });
    },
    runForLine: function() {
      var cursor, editor, line;
      console.log("Starting runForLine...");
      editor = atom.workspace.getActiveTextEditor();
      console.log("Editor", editor);
      if (editor == null) {
        return;
      }
      cursor = editor.getLastCursor();
      console.log("Cursor", cursor);
      line = cursor.getBufferRow() + 1;
      console.log("Line", line);
      return this.openUriFor(editor.getPath(), line);
    },
    runLast: function() {
      if (this.lastFile == null) {
        return;
      }
      return this.openUriFor(this.lastFile, this.lastLine);
    },
    run: function() {
      var editor;
      console.log("RUN");
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      return this.openUriFor(editor.getPath());
    },
    runAll: function() {
      var project;
      project = atom.project;
      if (project == null) {
        return;
      }
      return this.openUriFor(project.getPaths()[0] + "/" + atom.config.get("atom-rspec.spec_directory"), this.lastLine);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcnNwZWMvbGliL3JzcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUZaLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxPQUFUO0FBQUEsTUFDQSxjQUFBLEVBQWdCLE1BRGhCO0FBQUEsTUFFQSxxQkFBQSxFQUF1QixJQUZ2QjtBQUFBLE1BR0EsZUFBQSxFQUFpQixLQUhqQjtLQURGO0FBQUEsSUFNQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUcsYUFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxLQUFLLENBQUMsUUFBbEIsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxLQUFLLENBQUMsUUFEbEIsQ0FERjtPQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsWUFBeEIsRUFDRTtBQUFBLFFBQUEsT0FBQSxFQUF1QixJQUFDLENBQUEsY0FBYyxDQUFDLE9BQXZDO0FBQUEsUUFDQSxjQUFBLEVBQXVCLElBQUMsQ0FBQSxjQUFjLENBQUMsY0FEdkM7QUFBQSxRQUVBLGVBQUEsRUFBdUIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxlQUZ2QztBQUFBLFFBR0EscUJBQUEsRUFBdUIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxxQkFIdkM7T0FERixDQUpBLENBQUE7QUFBQSxNQVVBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixn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

//# sourceURL=/Users/salmanRT15/.atom/packages/rspec/lib/rspec.coffee
