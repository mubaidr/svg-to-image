/**
 * SVG TO Image
 * 
 * @param {any} svgNodeOriginal SVG Element
 * @param {any} width Width of final Image
 * @param {any} height Height of final Image
 * @param {any} type Types of Image ('jpeg', 'png')
 * @param {any} callback Callback function with Image DATAURL as only argument
 */
function svgToImage(svgNodeOriginal, width, height, type, callback) {
	//add width, height attribtutes, otherwise firefox won't render svg into Canvas
	var svgNode = svgNodeOriginal.cloneNode(true);
	svgNode.setAttribute('width', width + 'px')
	svgNode.setAttribute('height', height + 'px')

	var svgString = new XMLSerializer().serializeToString(svgNode);
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');

	//disable black backgorund for tranpsarent area	
	if (type === 'jpeg' || type === 'jpg') {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		ctx.drawImage(img, 0, 0, width, height);
		var output = canvas.toDataURL('image/' + type);
		callback(output);
	};
	img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgString)));
}
