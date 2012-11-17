Hooks.addMenuItem("Text/Move Up", "ctrl-shift-up", function () {
	Recipe.run(function(d) {
		var lines = d.rangeOfLinesInRange(d.selection);
		var content = d.textInRange(lines);
		
		if (lines.min() < 1) {
			return;
		}
		
		if (lines.max() == d.length) {
			// FIXME: Moving last line does not work properly.
		}
		
		var above = d.rangeOfLinesInRange(new Range(lines.min() - 1, 0));
		
		d.deleteTextInRange(lines, false);
		d.insertTextAtLocation(above.min(), content, false);
		d.selection = new Range(above.min(), content.length);
	});
});
Hooks.addMenuItem("Text/Move Down", "ctrl-shift-down", function () {
	Recipe.run(function(d) {
		var lines = d.rangeOfLinesInRange(d.selection);
		var content = d.textInRange(lines);
		
		d.deleteTextInRange(lines, false);
		
		var offset = 0;
		var below = d.rangeOfLinesInRange(new Range(lines.min(), 0));
		
		if (below.max() == d.length) {
			offset++;
			d.insertTextAtLocation(below.max(), "\n", false);
			content = content.replace(/\r?\n?$/,'');
		}
		
		d.insertTextAtLocation(below.max() + offset, content, false);
		d.selection = new Range(below.max() + offset, content.length);
	});
});