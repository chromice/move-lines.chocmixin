Recipe.prototype.swapRangeContent = function (a, b) {
	var aContent = this.textInRange(a),
		bContent = this.textInRange(b);
	this.replaceTextInRange(b, aContent, false);
	this.replaceTextInRange(a, bContent, false);
};

Hooks.addMenuItem("Text/Move Up", "ctrl-shift-up", function () {
	Recipe.run(function(doc) {
		var selected = doc.contentRangeOfLinesInRange(doc.selection);
		
		if (selected.min() === 0) {
			return;
		}
		
		var above = doc.contentRangeOfLinesInRange(new Range(selected.min() - 1,0));
		
		doc.swapRangeContent(above, selected);
		
		doc.selection = new Range(above.min(), selected.max() - selected.min());
	});
});

Hooks.addMenuItem("Text/Move Down", "ctrl-shift-down", function () {
	Recipe.run(function(doc) {
		var selected = doc.contentRangeOfLinesInRange(doc.selection),
			selectedLines = doc.rangeOfLinesInRange(doc.selection);
		
		if (selectedLines.max() >= doc.length) {
			return;
		}
		
		var below = doc.contentRangeOfLinesInRange(new Range(selectedLines.max(), 0));
		
		doc.swapRangeContent(selected, below);
		
		doc.selection = new Range(selected.min() + below.max() - below.min() + 1, selected.max() - selected.min());
	});
});