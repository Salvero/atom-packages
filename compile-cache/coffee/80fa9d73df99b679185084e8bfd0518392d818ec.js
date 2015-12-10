(function() {
  var $, $$$, EditorView, ScrollView, TextFormatter, _ref;

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$$ = _ref.$$$, EditorView = _ref.EditorView, ScrollView = _ref.ScrollView;

  TextFormatter = (function() {
    function TextFormatter(text) {
      this.text = text;
    }

    TextFormatter.prototype.htmlEscaped = function() {
      return new TextFormatter($('<div/>').text(this.text).html());
    };

    TextFormatter.prototype.fileLinked = function() {
      var text;
      text = this.text.replace(/([\\\/.][^\s]*:[0-9]+)([^\d]|$)/g, (function(_this) {
        return function(match) {
          var file, fileAndLine, fileLineEnd, line, matchWithoutFileAndLine;
          file = match.split(":")[0];
          line = match.split(":")[1].replace(/[^\d]*$/, '');
          fileLineEnd = file.length + line.length;
          fileAndLine = "" + file + ":" + line;
          matchWithoutFileAndLine = match.substr(fileLineEnd + 1);
          return ("<a href=\"" + file + "\" data-line=\"" + line + "\" data-file=\"" + file + "\">") + ("" + fileAndLine + "</a>" + matchWithoutFileAndLine);
        };
      })(this));
      return new TextFormatter(text);
    };

    TextFormatter.prototype.colorized = function() {
      var colorEndCount, colorStartCount, i, replaceCount, text, _i, _ref1, _ref2;
      text = this.text;
      colorStartCount = ((_ref1 = text.match(/\[3[0-7]m/g)) != null ? _ref1.length : void 0) || 0;
      colorEndCount = ((_ref2 = text.match(/\[0m/g)) != null ? _ref2.length : void 0) || 0;
      replaceCount = colorStartCount;
      if (colorEndCount < colorStartCount) {
        replaceCount = colorEndCount;
      }
      for (i = _i = 0; 0 <= replaceCount ? _i <= replaceCount : _i >= replaceCount; i = 0 <= replaceCount ? ++_i : --_i) {
        text = text.replace(/\[(3[0-7])m/, (function(_this) {
          return function(match, colorCode) {
            return "<p class=\"rspec-color tty-" + colorCode + "\">";
          };
        })(this));
        text = text.replace(/\[0m/g, '</p>');
      }
      return new TextFormatter(text);
    };

    return TextFormatter;

  })();

  module.exports = TextFormatter;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcnNwZWMvbGliL3RleHQtZm9ybWF0dGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtREFBQTs7QUFBQSxFQUFBLE9BQW1DLE9BQUEsQ0FBUSxzQkFBUixDQUFuQyxFQUFDLFNBQUEsQ0FBRCxFQUFJLFdBQUEsR0FBSixFQUFTLGtCQUFBLFVBQVQsRUFBcUIsa0JBQUEsVUFBckIsQ0FBQTs7QUFBQSxFQUVNO0FBQ1MsSUFBQSx1QkFBRSxJQUFGLEdBQUE7QUFBUSxNQUFQLElBQUMsQ0FBQSxPQUFBLElBQU0sQ0FBUjtJQUFBLENBQWI7O0FBQUEsNEJBRUEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUNQLElBQUEsYUFBQSxDQUFlLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLElBQUMsQ0FBQSxJQUFsQixDQUF1QixDQUFDLElBQXhCLENBQUEsQ0FBZixFQURPO0lBQUEsQ0FGYixDQUFBOztBQUFBLDRCQUtBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxrQ0FBZCxFQUFrRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7QUFDdkQsY0FBQSw2REFBQTtBQUFBLFVBQUEsSUFBQSxHQUFPLEtBQUssQ0FBQyxLQUFOLENBQVksR0FBWixDQUFpQixDQUFBLENBQUEsQ0FBeEIsQ0FBQTtBQUFBLFVBQ0EsSUFBQSxHQUFPLEtBQUssQ0FBQyxLQUFOLENBQVksR0FBWixDQUFpQixDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXBCLENBQTRCLFNBQTVCLEVBQXVDLEVBQXZDLENBRFAsQ0FBQTtBQUFBLFVBR0EsV0FBQSxHQUFjLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBSSxDQUFDLE1BSGpDLENBQUE7QUFBQSxVQUlBLFdBQUEsR0FBYyxFQUFBLEdBQUcsSUFBSCxHQUFRLEdBQVIsR0FBVyxJQUp6QixDQUFBO0FBQUEsVUFLQSx1QkFBQSxHQUEwQixLQUFLLENBQUMsTUFBTixDQUFhLFdBQUEsR0FBYyxDQUEzQixDQUwxQixDQUFBO2lCQU9BLENBQUMsWUFBQSxHQUFZLElBQVosR0FBaUIsaUJBQWpCLEdBQWtDLElBQWxDLEdBQXVDLGlCQUF2QyxHQUF3RCxJQUF4RCxHQUE2RCxLQUE5RCxDQUFBLEdBQ0EsQ0FBQSxFQUFBLEdBQUcsV0FBSCxHQUFlLE1BQWYsR0FBcUIsdUJBQXJCLEVBVHVEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEQsQ0FBUCxDQUFBO2FBVUksSUFBQSxhQUFBLENBQWMsSUFBZCxFQVhNO0lBQUEsQ0FMWixDQUFBOztBQUFBLDRCQWtCQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSx1RUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxJQUFSLENBQUE7QUFBQSxNQUVBLGVBQUEsc0RBQTBDLENBQUUsZ0JBQTFCLElBQW9DLENBRnRELENBQUE7QUFBQSxNQUdBLGFBQUEsaURBQW1DLENBQUUsZ0JBQXJCLElBQStCLENBSC9DLENBQUE7QUFBQSxNQU1BLFlBQUEsR0FBZSxlQU5mLENBQUE7QUFPQSxNQUFBLElBQWdDLGFBQUEsR0FBZ0IsZUFBaEQ7QUFBQSxRQUFBLFlBQUEsR0FBZSxhQUFmLENBQUE7T0FQQTtBQVNBLFdBQVMsNEdBQVQsR0FBQTtBQUNFLFFBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsYUFBYixFQUE0QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsS0FBRCxFQUFRLFNBQVIsR0FBQTttQkFDaEMsNkJBQUEsR0FBNkIsU0FBN0IsR0FBdUMsTUFEUDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLENBQVAsQ0FBQTtBQUFBLFFBRUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QixDQUZQLENBREY7QUFBQSxPQVRBO2FBY0ksSUFBQSxhQUFBLENBQWMsSUFBZCxFQWZLO0lBQUEsQ0FsQlgsQ0FBQTs7eUJBQUE7O01BSEYsQ0FBQTs7QUFBQSxFQXNDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQXRDakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/salmanRT15/.atom/packages/rspec/lib/text-formatter.coffee
