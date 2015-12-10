(function() {
  var CompositeDisposable, ERB_BLOCKS, ERB_CLOSER_REGEX, ERB_OPENER_REGEX, ERB_REGEX, Range;

  Range = require('atom').Range;

  CompositeDisposable = require('atom').CompositeDisposable;

  ERB_BLOCKS = [['<%=', '%>'], ['<%', '%>'], ['<%#', '%>']];

  ERB_REGEX = '<%(=?|-?|#?)\s{2}(-?)%>';

  ERB_OPENER_REGEX = '<%[\\=\\#]?';

  ERB_CLOSER_REGEX = "%>";

  module.exports = {
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', 'rails-snippets:toggleErb', (function(_this) {
        return function() {
          return _this.toggleErb();
        };
      })(this)));
    },
    toggleErb: function() {
      var delegate, editor, hasTextSelected, selectedText, selection, _i, _len, _ref, _results;
      editor = atom.workspace.getActiveTextEditor();
      _ref = editor.getSelections();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i += 1) {
        selection = _ref[_i];
        hasTextSelected = !selection.isEmpty();
        selectedText = selection.getText();
        delegate = this;
        _results.push(editor.transact(function() {
          var closer, currentCursor, opener, textToRestoreRange, _ref1;
          selection.deleteSelectedText();
          currentCursor = selection.cursor;
          _ref1 = delegate.findSorroundingBlocks(editor, currentCursor), opener = _ref1[0], closer = _ref1[1];
          if ((opener != null) && (closer != null)) {
            delegate.replaceErbBlock(editor, opener, closer, currentCursor);
          } else {
            delegate.insertErbBlock(editor, currentCursor);
          }
          if (hasTextSelected) {
            textToRestoreRange = editor.getBuffer().insert(currentCursor.getBufferPosition(), selectedText);
            return selection.setBufferRange(textToRestoreRange);
          }
        }));
      }
      return _results;
    },
    findSorroundingBlocks: function(editor, currentCursor) {
      var closer, containingLine, foundClosers, foundOpeners, leftRange, opener, rightRange;
      opener = closer = null;
      containingLine = currentCursor.getCurrentLineBufferRange();
      leftRange = new Range(containingLine.start, currentCursor.getBufferPosition());
      rightRange = new Range(currentCursor.getBufferPosition(), containingLine.end);
      foundOpeners = [];
      editor.getBuffer().scanInRange(new RegExp(ERB_OPENER_REGEX, 'g'), leftRange, function(result) {
        return foundOpeners.push(result.range);
      });
      if (foundOpeners) {
        opener = foundOpeners[foundOpeners.length - 1];
      }
      foundClosers = [];
      editor.getBuffer().scanInRange(new RegExp(ERB_CLOSER_REGEX, 'g'), rightRange, function(result) {
        return foundClosers.push(result.range);
      });
      if (foundClosers) {
        closer = foundClosers[0];
      }
      return [opener, closer];
    },
    insertErbBlock: function(editor, currentCursor) {
      var closingBlock, defaultBlock, desiredPosition, openingTag;
      defaultBlock = ERB_BLOCKS[0];
      desiredPosition = null;
      openingTag = editor.getBuffer().insert(currentCursor.getBufferPosition(), defaultBlock[0] + ' ');
      desiredPosition = currentCursor.getBufferPosition();
      closingBlock = editor.getBuffer().insert(currentCursor.getBufferPosition(), ' ' + defaultBlock[1]);
      return currentCursor.setBufferPosition(desiredPosition);
    },
    replaceErbBlock: function(editor, opener, closer, currentCursor) {
      var closingBracket, nextBlock, openingBracket;
      openingBracket = editor.getBuffer().getTextInRange(opener);
      closingBracket = editor.getBuffer().getTextInRange(closer);
      nextBlock = this.getNextErbBlock(editor, openingBracket, closingBracket);
      editor.getBuffer().setTextInRange(closer, nextBlock[1]);
      return editor.getBuffer().setTextInRange(opener, nextBlock[0]);
    },
    getNextErbBlock: function(editor, openingBracket, closingBracket) {
      var block, i, _i, _len;
      for (i = _i = 0, _len = ERB_BLOCKS.length; _i < _len; i = ++_i) {
        block = ERB_BLOCKS[i];
        if (JSON.stringify([openingBracket, closingBracket]) === JSON.stringify(block)) {
          if ((i + 1) >= ERB_BLOCKS.length) {
            return ERB_BLOCKS[0];
          } else {
            return ERB_BLOCKS[i + 1];
          }
        }
      }
      return ERB_BLOCKS[0];
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcmFpbHMtc25pcHBldHMvbGliL3JhaWxzLXNuaXBwZXRzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxxRkFBQTs7QUFBQSxFQUFDLFFBQVMsT0FBQSxDQUFRLE1BQVIsRUFBVCxLQUFELENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxDQUFDLENBQUMsS0FBRCxFQUFRLElBQVIsQ0FBRCxFQUFnQixDQUFDLElBQUQsRUFBTyxJQUFQLENBQWhCLEVBQThCLENBQUMsS0FBRCxFQUFRLElBQVIsQ0FBOUIsQ0FKYixDQUFBOztBQUFBLEVBS0EsU0FBQSxHQUFZLHlCQUxaLENBQUE7O0FBQUEsRUFPQSxnQkFBQSxHQUFtQixhQVBuQixDQUFBOztBQUFBLEVBU0EsZ0JBQUEsR0FBbUIsSUFUbkIsQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLDBCQUFwQyxFQUFnRSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxTQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhFLENBQW5CLEVBRlE7SUFBQSxDQUFWO0FBQUEsSUFJQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxv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

//# sourceURL=/Users/salmanRT15/.atom/packages/rails-snippets/lib/rails-snippets.coffee
