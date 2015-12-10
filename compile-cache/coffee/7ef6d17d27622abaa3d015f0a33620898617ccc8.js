(function() {
  var CompositeDisposable, Speckjs, allowUnsafeEval, speckjs, supportedFWS;

  allowUnsafeEval = require('loophole').allowUnsafeEval;

  speckjs = allowUnsafeEval(function() {
    return require('speckjs');
  });

  CompositeDisposable = require('atom').CompositeDisposable;

  supportedFWS = {
    tape: true,
    jasmine: true
  };

  module.exports = Speckjs = {
    config: {
      testFramework: {
        type: 'string',
        "default": 'tape'
      }
    },
    speckjsView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'speckjs:build': (function(_this) {
          return function() {
            return _this.build();
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    serialize: function() {},
    build: function() {
      var editor, file;
      console.log('Speckjs was toggled!');
      editor = atom.workspace.getActivePaneItem();
      file = editor != null ? editor.buffer.file : void 0;
      return file.read().then(function(res) {
        var build, options;
        file = {
          name: file.path,
          content: res
        };
        options = {
          testFW: atom.config.get('speckjs.testFramework')
        };
        if (!supportedFWS[options.testFW]) {
          return atom.notifications.addError(options.testFW + " not supported");
        } else {
          build = speckjs.build(file, options);
          return atom.workspace.open().then(function(editor) {
            editor.setGrammar(atom.grammars.grammarForScopeName('source.js'));
            editor.setText(build);
            return atom.notifications.addSuccess("Boom! Your " + options.testFW + " spec file is ready");
          });
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvc3BlY2tqcy9saWIvc3BlY2tqcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0VBQUE7O0FBQUEsRUFBQyxrQkFBbUIsT0FBQSxDQUFRLFVBQVIsRUFBbkIsZUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO1dBQUcsT0FBQSxDQUFRLFNBQVIsRUFBSDtFQUFBLENBQWhCLENBRFYsQ0FBQTs7QUFBQSxFQUdDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFIRCxDQUFBOztBQUFBLEVBS0EsWUFBQSxHQUNFO0FBQUEsSUFBQSxJQUFBLEVBQU0sSUFBTjtBQUFBLElBQ0EsT0FBQSxFQUFTLElBRFQ7R0FORixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBQSxHQUNmO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxNQURUO09BREY7S0FERjtBQUFBLElBSUEsV0FBQSxFQUFhLElBSmI7QUFBQSxJQUtBLFVBQUEsRUFBWSxJQUxaO0FBQUEsSUFNQSxhQUFBLEVBQWUsSUFOZjtBQUFBLElBUUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBRVIsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7YUFHQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztBQUFBLFFBQUEsZUFBQSxFQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsS0FBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQjtPQUFwQyxDQUFuQixFQUxRO0lBQUEsQ0FSVjtBQUFBLElBZUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBRFU7SUFBQSxDQWZaO0FBQUEsSUFrQkEsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQWxCWDtBQUFBLElBb0JBLEtBQUEsRUFBTyxTQUFBLEdBQUE7QUFDTCxVQUFBLFlBQUE7QUFBQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFFQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBLENBRlQsQ0FBQTtBQUFBLE1BR0EsSUFBQSxvQkFBTyxNQUFNLENBQUUsTUFBTSxDQUFDLGFBSHRCLENBQUE7YUFLQSxJQUFJLENBQUMsSUFBTCxDQUFBLENBQVcsQ0FBQyxJQUFaLENBQWlCLFNBQUMsR0FBRCxHQUFBO0FBQ2YsWUFBQSxjQUFBO0FBQUEsUUFBQSxJQUFBLEdBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFJLENBQUMsSUFBWDtBQUFBLFVBQ0EsT0FBQSxFQUFTLEdBRFQ7U0FERixDQUFBO0FBQUEsUUFHQSxPQUFBLEdBQ0U7QUFBQSxVQUFBLE1BQUEsRUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUJBQWhCLENBQVI7U0FKRixDQUFBO0FBTUEsUUFBQSxJQUFHLENBQUEsWUFBaUIsQ0FBQSxPQUFPLENBQUMsTUFBUixDQUFwQjtpQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLGdCQUE3QyxFQURGO1NBQUEsTUFBQTtBQUdFLFVBQUEsS0FBQSxHQUFRLE9BQU8sQ0FBQyxLQUFSLENBQWMsSUFBZCxFQUFvQixPQUFwQixDQUFSLENBQUE7aUJBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLE1BQUQsR0FBQTtBQUNKLFlBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxXQUFsQyxDQUFuQixDQUFBLENBQUE7QUFBQSxZQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBZixDQURBLENBQUE7bUJBRUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFuQixDQUE4QixhQUFBLEdBQWdCLE9BQU8sQ0FBQyxNQUF4QixHQUFpQyxxQkFBL0QsRUFISTtVQUFBLENBRE4sRUFKRjtTQVBlO01BQUEsQ0FBakIsRUFOSztJQUFBLENBcEJQO0dBVkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/salmanRT15/.atom/packages/speckjs/lib/speckjs.coffee
