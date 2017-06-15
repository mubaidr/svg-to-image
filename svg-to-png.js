function svgToPNG(svg, width, height, callback) {
	var svgString = new XMLSerializer().serializeToString(svg);
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	var DOMURL = self.URL || self.webkitURL || self;
	var img = new Image();
	var svg = new Blob([svgString], {
		type: "image/svg+xml;charset=utf-8"
	});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function () {
		ctx.drawImage(img, 0, 0, width, height);
		var png = canvas.toDataURL("image/png");
		if (callback) {
			callback(png);
		}
	};
	img.src = url;
}
