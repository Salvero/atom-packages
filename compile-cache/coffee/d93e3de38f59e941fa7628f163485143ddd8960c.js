(function() {
  var $, $$$, ChildProcess, EditorView, RSpecView, ScrollView, TextFormatter, path, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$$ = _ref.$$$, EditorView = _ref.EditorView, ScrollView = _ref.ScrollView;

  path = require('path');

  ChildProcess = require('child_process');

  TextFormatter = require('./text-formatter');

  module.exports = RSpecView = (function(_super) {
    __extends(RSpecView, _super);

    atom.deserializers.add(RSpecView);

    RSpecView.deserialize = function(_arg) {
      var filePath;
      filePath = _arg.filePath;
      return new RSpecView(filePath);
    };

    RSpecView.content = function() {
      return this.div({
        "class": 'rspec rspec-console',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'rspec-spinner'
          }, 'Starting RSpec...');
          return _this.pre({
            "class": 'rspec-output'
          });
        };
      })(this));
    };

    RSpecView.prototype.initialize = function() {
      RSpecView.__super__.initialize.apply(this, arguments);
      return this.on({
        'core:copy': (function(_this) {
          return function() {
            return _this.copySelectedText();
          };
        })(this)
      });
    };

    function RSpecView(filePath) {
      this.onClose = __bind(this.onClose, this);
      this.onStdErr = __bind(this.onStdErr, this);
      this.onStdOut = __bind(this.onStdOut, this);
      this.addOutput = __bind(this.addOutput, this);
      this.terminalClicked = __bind(this.terminalClicked, this);
      RSpecView.__super__.constructor.apply(this, arguments);
      console.log("File path:", filePath);
      this.filePath = filePath;
      this.output = this.find(".rspec-output");
      this.spinner = this.find(".rspec-spinner");
      this.output.on("click", this.terminalClicked);
    }

    RSpecView.prototype.serialize = function() {
      return {
        deserializer: 'RSpecView',
        filePath: this.getPath()
      };
    };

    RSpecView.prototype.copySelectedText = function() {
      var text;
      text = window.getSelection().toString();
      if (text === '') {
        return;
      }
      return atom.clipboard.write(text);
    };

    RSpecView.prototype.getTitle = function() {
      return "RSpec - " + (path.basename(this.getPath()));
    };

    RSpecView.prototype.getURI = function() {
      return "rspec-output://" + (this.getPath());
    };

    RSpecView.prototype.getPath = function() {
      return this.filePath;
    };

    RSpecView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = "The error message";
      return this.html($$$(function() {
        this.h2('Running RSpec Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      }));
    };

    RSpecView.prototype.terminalClicked = function(e) {
      var file, line, promise, _ref1;
      if ((_ref1 = e.target) != null ? _ref1.href : void 0) {
        line = $(e.target).data('line');
        file = $(e.target).data('file');
        console.log(file);
        file = "" + (atom.project.getPaths()[0]) + "/" + file;
        promise = atom.workspace.open(file, {
          searchAllPanes: true,
          initialLine: line
        });
        return promise.done(function(editor) {
          return editor.setCursorBufferPosition([line - 1, 0]);
        });
      }
    };

    RSpecView.prototype.run = function(lineNumber) {
      var command, options, projectPath, spawn, specCommand, terminal;
      if (atom.config.get("rspec.save_before_run")) {
        atom.workspace.saveAll();
      }
      this.spinner.show();
      this.output.empty();
      projectPath = atom.project.getPaths()[0];
      spawn = ChildProcess.spawn;
      specCommand = atom.config.get("rspec.command");
      options = " --tty";
      if (atom.config.get("rspec.force_colored_results")) {
        options += " --color";
      }
      command = "" + specCommand + " " + options + " " + this.filePath;
      if (lineNumber) {
        command = "" + command + ":" + lineNumber;
      }
      console.log("[RSpec] running: " + command);
      terminal = spawn("bash", ["-l"]);
      terminal.on('close', this.onClose);
      terminal.stdout.on('data', this.onStdOut);
      terminal.stderr.on('data', this.onStdErr);
      terminal.stdin.write("cd " + projectPath + " && " + command + "\n");
      return terminal.stdin.write("exit\n");
    };

    RSpecView.prototype.addOutput = function(output) {
      var formatter;
      formatter = new TextFormatter(output);
      output = formatter.htmlEscaped().colorized().fileLinked().text;
      this.spinner.hide();
      this.output.append("" + output);
      return this.scrollTop(this[0].scrollHeight);
    };

    RSpecView.prototype.onStdOut = function(data) {
      return this.addOutput(data);
    };

    RSpecView.prototype.onStdErr = function(data) {
      return this.addOutput(data);
    };

    RSpecView.prototype.onClose = function(code) {
      return console.log("[RSpec] exit with code: " + code);
    };

    return RSpecView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcnNwZWMvbGliL3JzcGVjLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtGQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBbUMsT0FBQSxDQUFRLHNCQUFSLENBQW5DLEVBQUMsU0FBQSxDQUFELEVBQUksV0FBQSxHQUFKLEVBQVMsa0JBQUEsVUFBVCxFQUFxQixrQkFBQSxVQUFyQixDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLFlBQUEsR0FBZ0IsT0FBQSxDQUFRLGVBQVIsQ0FGaEIsQ0FBQTs7QUFBQSxFQUdBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLGtCQUFSLENBSGhCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osZ0NBQUEsQ0FBQTs7QUFBQSxJQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsU0FBdkIsQ0FBQSxDQUFBOztBQUFBLElBRUEsU0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLElBQUQsR0FBQTtBQUNaLFVBQUEsUUFBQTtBQUFBLE1BRGMsV0FBRCxLQUFDLFFBQ2QsQ0FBQTthQUFJLElBQUEsU0FBQSxDQUFVLFFBQVYsRUFEUTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQUtBLFNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHFCQUFQO0FBQUEsUUFBOEIsUUFBQSxFQUFVLENBQUEsQ0FBeEM7T0FBTCxFQUFpRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQy9DLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFB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

//# sourceURL=/Users/salmanRT15/.atom/packages/rspec/lib/rspec-view.coffee
