function svgToImage(svgNodeOriginal, width, height, type, callback) {
	//ADD width, height attribtutes, otherwise firefox won't render svg into Canvas
	var svgNode = svgNodeOriginal.cloneNode(true);
	svgNode.setAttribute('width', width + 'px')
	svgNode.setAttribute('height', height + 'px')

	var svgString = new XMLSerializer().serializeToString(svgNode);
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	//var DOMURL = self.URL || self.webkitURL || self;
	var img = new Image();
	// var svg = new Blob([svgString], {
	// 	type: 'image/svg+xml;charset=utf-8'
	// });
	//var url = DOMURL.createObjectURL(svg);
	img.onload = function () {
		ctx.drawImage(img, 0, 0, width, height);
		var output = canvas.toDataURL('image/' + type);
		callback(output);
	};
	//img.src = url;
	img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgString)));
	//img.src = "data:image/svg+xml;charset=utf-8," + window.btoa(unescape(encodeURIComponent(svgString)));
}
