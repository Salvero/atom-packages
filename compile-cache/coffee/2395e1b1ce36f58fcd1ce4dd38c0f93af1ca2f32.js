(function() {
  var TextFormatter;

  TextFormatter = require('../lib/text-formatter');

  describe('htmlEscaped', function() {
    return it('escapes html tags', function() {
      var formatter;
      formatter = new TextFormatter('<b>bold</b> text');
      return expect(formatter.htmlEscaped().text).toBe('&lt;b&gt;bold&lt;/b&gt; text');
    });
  });

  describe('fileLinked', function() {
    it('adds atom hyperlinks on files with line numbers', function() {
      var formatter, text;
      text = '# ./foo/bar_spec.rb:123:in `block (3 levels) in <top (required)>';
      formatter = new TextFormatter(text);
      return expect(formatter.fileLinked().text).toBe('# <a href="./foo/bar_spec.rb" ' + 'data-line="123" data-file="./foo/bar_spec.rb">./foo/bar_spec.rb:123</a>' + ':in `block (3 levels) in <top (required)>');
    });
    it('adds links when line number is at the end of line', function() {
      var formatter, text;
      text = './foo/bar_spec.rb:123\n';
      formatter = new TextFormatter(text);
      return expect(formatter.fileLinked().text).toBe('<a href="./foo/bar_spec.rb" ' + 'data-line="123" data-file="./foo/bar_spec.rb">./foo/bar_spec.rb:123</a>\n');
    });
    it('adds links when file paths is wrapped with color marks', function() {
      var formatter, text;
      text = '[31m./foo/bar_spec.rb:123[0m';
      formatter = new TextFormatter(text);
      return expect(formatter.fileLinked().text).toBe('[31m<a href="./foo/bar_spec.rb" ' + 'data-line="123" data-file="./foo/bar_spec.rb">./foo/bar_spec.rb:123</a>[0m');
    });
    return it('adds links when file path is absolute', function() {
      var formatter, text;
      text = '/foo/bar_spec.rb:123';
      formatter = new TextFormatter(text);
      return expect(formatter.fileLinked().text).toBe('<a href="/foo/bar_spec.rb" ' + 'data-line="123" data-file="/foo/bar_spec.rb">/foo/bar_spec.rb:123</a>');
    });
  });

  describe('colorized', function() {
    return it('corretly sets colors to fail/pass marks', function() {
      var formatter;
      formatter = new TextFormatter("[31mF[0m[31mF[0m[31mF[0m[33m*[0m[33m*[0m[31mF[0m");
      return expect(formatter.colorized().text).toBe('<p class="rspec-color tty-31">F</p>' + '<p class="rspec-color tty-31">F</p>' + '<p class="rspec-color tty-31">F</p>' + '<p class="rspec-color tty-33">*</p>' + '<p class="rspec-color tty-33">*</p>' + '<p class="rspec-color tty-31">F</p>');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcnNwZWMvc3BlYy90ZXh0LWZvcm1hdHRlci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsdUJBQVIsQ0FBaEIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxhQUFULEVBQXdCLFNBQUEsR0FBQTtXQUN0QixFQUFBLENBQUcsbUJBQUgsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFVBQUEsU0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFnQixJQUFBLGFBQUEsQ0FBYyxrQkFBZCxDQUFoQixDQUFBO2FBQ0EsTUFBQSxDQUFPLFNBQVMsQ0FBQyxXQUFWLENBQUEsQ0FBdUIsQ0FBQyxJQUEvQixDQUFvQyxDQUFDLElBQXJDLENBQTBDLDhCQUExQyxFQUZzQjtJQUFBLENBQXhCLEVBRHNCO0VBQUEsQ0FBeEIsQ0FGQSxDQUFBOztBQUFBLEVBT0EsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLElBQUEsRUFBQSxDQUFHLGlEQUFILEVBQXNELFNBQUEsR0FBQTtBQUNwRCxVQUFBLGVBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxrRUFBUCxDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQWdCLElBQUEsYUFBQSxDQUFjLElBQWQsQ0FEaEIsQ0FBQTthQUVBLE1BQUEsQ0FBTyxTQUFTLENBQUMsVUFBVixDQUFBLENBQXNCLENBQUMsSUFBOUIsQ0FBbUMsQ0FBQyxJQUFwQyxDQUF5QyxnQ0FBQSxHQUN2Qyx5RUFEdUMsR0FFdkMsMkNBRkYsRUFIb0Q7SUFBQSxDQUF0RCxDQUFBLENBQUE7QUFBQSxJQVFBLEVBQUEsQ0FBRyxtREFBSCxFQUF3RCxTQUFBLEdBQUE7QUFDdEQsVUFBQSxlQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8seUJBQVAsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFnQixJQUFBLGFBQUEsQ0FBYyxJQUFkLENBRGhCLENBQUE7YUFFQSxNQUFBLENBQU8sU0FBUyxDQUFDLFVBQVYsQ0FBQSxDQUFzQixDQUFDLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsOEJBQUEsR0FDdkMsMkVBREYsRUFIc0Q7SUFBQSxDQUF4RCxDQVJBLENBQUE7QUFBQSxJQWNBLEVBQUEsQ0FBRyx3REFBSCxFQUE2RCxTQUFBLEdBQUE7QUFDM0QsVUFBQSxlQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sOEJBQVAsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFnQixJQUFBLGFBQUEsQ0FBYyxJQUFkLENBRGhCLENBQUE7YUFFQSxNQUFBLENBQU8sU0FBUyxDQUFDLFVBQVYsQ0FBQSxDQUFzQixDQUFDLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsa0NBQUEsR0FDdkMsNEVBREYsRUFIMkQ7SUFBQSxDQUE3RCxDQWRBLENBQUE7V0FvQkEsRUFBQSxDQUFHLHVDQUFILEVBQTRDLFNBQUEsR0FBQTtBQUMxQyxVQUFBLGVBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxzQkFBUCxDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQWdCLElBQUEsYUFBQSxDQUFjLElBQWQsQ0FEaEIsQ0FBQTthQUVBLE1BQUEsQ0FBTyxTQUFTLENBQUMsVUFBVixDQUFBLENBQXNCLENBQUMsSUFBOUIsQ0FBbUMsQ0FBQyxJQUFwQyxDQUF5Qyw2QkFBQSxHQUN2Qyx1RUFERixFQUgwQztJQUFBLENBQTVDLEVBckJxQjtFQUFBLENBQXZCLENBUEEsQ0FBQTs7QUFBQSxFQWtDQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7V0FDcEIsRUFBQSxDQUFHLHlDQUFILEVBQThDLFNBQUEsR0FBQTtBQUM1QyxVQUFBLFNBQUE7QUFBQSxNQUFBLFNBQUEsR0FBZ0IsSUFBQSxhQUFBLENBQWMsa0RBQWQsQ0FBaEIsQ0FBQTthQUNBLE1BQUEsQ0FBTyxTQUFTLENBQUMsU0FBVixDQUFBLENBQXFCLENBQUMsSUFBN0IsQ0FBa0MsQ0FBQyxJQUFuQyxDQUNFLHFDQUFBLEdBQ0EscUNBREEsR0FFQSxxQ0FGQSxHQUdBLHFDQUhBLEdBSUEscUNBSkEsR0FLQSxxQ0FORixFQUY0QztJQUFBLENBQTlDLEVBRG9CO0VBQUEsQ0FBdEIsQ0FsQ0EsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/salmanRT15/.atom/packages/rspec/spec/text-formatter-spec.coffee
