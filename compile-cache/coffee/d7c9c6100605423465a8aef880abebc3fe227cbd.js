(function() {
  var CompositeDisposable, Point, RowMap, createElementsForGuides, getGuides, styleGuide, _, _ref, _ref1;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Point = _ref.Point;

  _ = require('lodash');

  _ref1 = require('./indent-guide-improved-element'), createElementsForGuides = _ref1.createElementsForGuides, styleGuide = _ref1.styleGuide;

  getGuides = require('./guides.coffee').getGuides;

  RowMap = require('./row-map.coffee');

  module.exports = {
    activate: function(state) {
      var handleEvents, msg, updateGuide;
      this.currentSubscriptions = [];
      atom.config.set('editor.showIndentGuide', false);
      if (!atom.config.get('editor.useShadowDOM')) {
        msg = 'To use indent-guide-improved package, please check "Use Shadow DOM" in Settings.';
        atom.notifications.addError(msg, {
          dismissable: true
        });
        return;
      }
      updateGuide = function(editor, editorElement) {
        var basePixelPos, getIndent, guides, lineHeightPixel, rowMap, scrollLeft, scrollTop, visibleRange, visibleScreenRange;
        visibleScreenRange = editor.getVisibleRowRange();
        basePixelPos = editorElement.pixelPositionForScreenPosition(new Point(visibleScreenRange[0], 0)).top;
        visibleRange = visibleScreenRange.map(function(row) {
          return editor.bufferPositionForScreenPosition(new Point(row, 0)).row;
        });
        getIndent = function(row) {
          if (editor.lineTextForBufferRow(row).match(/^\s*$/)) {
            return null;
          } else {
            return editor.indentationForBufferRow(row);
          }
        };
        scrollTop = editor.getScrollTop();
        scrollLeft = editor.getScrollLeft();
        rowMap = new RowMap(editor.displayBuffer.rowMap.getRegions());
        guides = getGuides(visibleRange[0], visibleRange[1], editor.getLastBufferRow(), editor.getCursorBufferPositions().map(function(point) {
          return point.row;
        }), getIndent);
        lineHeightPixel = editor.getLineHeightInPixels();
        return createElementsForGuides(editorElement, guides.map(function(g) {
          return function(el) {
            return styleGuide(el, g.point.translate(new Point(visibleRange[0], 0)), g.length, g.stack, g.active, editor, rowMap, basePixelPos, lineHeightPixel, visibleScreenRange[0], scrollTop, scrollLeft);
          };
        }));
      };
      handleEvents = (function(_this) {
        return function(editor, editorElement) {
          var subscriptions, up, update;
          up = function() {
            return updateGuide(editor, editorElement);
          };
          update = _.throttle(up, 30);
          subscriptions = new CompositeDisposable;
          subscriptions.add(editor.onDidChangeCursorPosition(update));
          subscriptions.add(editor.onDidChangeScrollTop(update));
          subscriptions.add(editor.onDidChangeScrollLeft(update));
          subscriptions.add(editor.onDidStopChanging(update));
          subscriptions.add(editor.onDidDestroy(function() {
            _this.currentSubscriptions.splice(_this.currentSubscriptions.indexOf(subscriptions), 1);
            return subscriptions.dispose();
          }));
          return _this.currentSubscriptions.push(subscriptions);
        };
      })(this);
      return atom.workspace.observeTextEditors(function(editor) {
        var editorElement;
        editorElement = atom.views.getView(editor);
        return handleEvents(editor, editorElement);
      });
    },
    deactivate: function() {
      this.currentSubscriptions.forEach(function(s) {
        return s.dispose();
      });
      return atom.workspace.getTextEditors().forEach(function(te) {
        var v;
        v = atom.views.getView(te);
        if (!v) {
          return;
        }
        return Array.prototype.forEach.call(v.querySelectorAll('.indent-guide-improved'), function(e) {
          return e.parentNode.removeChild(e);
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvaW5kZW50LWd1aWRlLWltcHJvdmVkL2xpYi9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtHQUFBOztBQUFBLEVBQUEsT0FBK0IsT0FBQSxDQUFRLE1BQVIsQ0FBL0IsRUFBQywyQkFBQSxtQkFBRCxFQUFzQixhQUFBLEtBQXRCLENBQUE7O0FBQUEsRUFDQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FESixDQUFBOztBQUFBLEVBR0EsUUFBd0MsT0FBQSxDQUFRLGlDQUFSLENBQXhDLEVBQUMsZ0NBQUEsdUJBQUQsRUFBMEIsbUJBQUEsVUFIMUIsQ0FBQTs7QUFBQSxFQUlDLFlBQWEsT0FBQSxDQUFRLGlCQUFSLEVBQWIsU0FKRCxDQUFBOztBQUFBLEVBS0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxrQkFBUixDQUxULENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLDhCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsb0JBQUQsR0FBd0IsRUFBeEIsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHdCQUFoQixFQUEwQyxLQUExQyxDQUhBLENBQUE7QUFLQSxNQUFBLElBQUEsQ0FBQSxJQUFXLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUJBQWhCLENBQVA7QUFDRSxRQUFBLEdBQUEsR0FBTSxrRkFBTixDQUFBO0FBQUEsUUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLEdBQTVCLEVBQWlDO0FBQUEsVUFBQyxXQUFBLEVBQWEsSUFBZDtTQUFqQyxDQURBLENBQUE7QUFF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

//# sourceURL=/Users/salmanRT15/.atom/packages/indent-guide-improved/lib/indent-guide-improved.coffee
