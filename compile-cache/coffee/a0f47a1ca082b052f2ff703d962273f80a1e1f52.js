(function() {
  var RspecView;

  RspecView = require('../lib/rspec-view');

  describe("RspecView", function() {
    beforeEach(function() {
      return this.rspecView = new RspecView('example_spec.rb');
    });
    return describe('addOutput', function() {
      it('adds output', function() {
        this.rspecView.addOutput('foo');
        return expect(this.rspecView.output.html()).toBe('foo');
      });
      return it('corectly formats complex output', function() {
        var output;
        output = '[31m# ./foo/bar_spec.rb:123:in `block (3 levels) in <top (required)>[0m';
        this.rspecView.addOutput(output);
        return expect(this.rspecView.output.html()).toBe('<p class="rspec-color tty-31">' + '# <a href="./foo/bar_spec.rb" data-line="123" data-file="./foo/bar_spec.rb">' + './foo/bar_spec.rb:123' + '</a>' + ':in `block (3 levels) in &lt;top (required)&gt;' + '</p>');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3NhbG1hblJUMTUvLmF0b20vcGFja2FnZXMvcnNwZWMvc3BlYy9yc3BlYy12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFNBQUE7O0FBQUEsRUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLG1CQUFSLENBQVosQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFNBQUEsR0FBQTtBQUNwQixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLFNBQUEsQ0FBVSxpQkFBVixFQURSO0lBQUEsQ0FBWCxDQUFBLENBQUE7V0FHQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsTUFBQSxFQUFBLENBQUcsYUFBSCxFQUFrQixTQUFBLEdBQUE7QUFDaEIsUUFBQSxJQUFDLENBQUEsU0FBUyxDQUFDLFNBQVgsQ0FBcUIsS0FBckIsQ0FBQSxDQUFBO2VBQ0EsTUFBQSxDQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQWxCLENBQUEsQ0FBUCxDQUFnQyxDQUFDLElBQWpDLENBQXNDLEtBQXRDLEVBRmdCO01BQUEsQ0FBbEIsQ0FBQSxDQUFBO2FBSUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUNwQyxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyx5RUFBVCxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLFNBQVgsQ0FBcUIsTUFBckIsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQWxCLENBQUEsQ0FBUCxDQUFnQyxDQUFDLElBQWpDLENBQXNDLGdDQUFBLEdBQ3BDLDhFQURvQyxHQUVwQyx1QkFGb0MsR0FHcEMsTUFIb0MsR0FJcEMsaURBSm9DLEdBS3BDLE1BTEYsRUFIb0M7TUFBQSxDQUF0QyxFQUxvQjtJQUFBLENBQXRCLEVBSm9CO0VBQUEsQ0FBdEIsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/salmanRT15/.atom/packages/rspec/spec/rspec-view-spec.coffee
