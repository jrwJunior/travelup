import EXIF from 'exif-js';

export default class ExifOrentation {
	constructor(file) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext("2d");
		this.file = file;
	}

	getFile(url, callback) {
		EXIF.getData(this.file, () => {
			const orentation = this.file.exifdata.Orientation;
			this.render(url, orentation, callback)
		});
	}

	render(url, orentation, callback) {
		const img = new Image();

		img.addEventListener('load', () => {
			const width = img.width;
			const height = img.height;
	
			if (4 < orentation && orentation < 9) {
				this.canvas.width = height;
				this.canvas.height = width;
			} else {
				this.canvas.width = width;
				this.canvas.height = height;
			}
	
			switch (orentation) {
				case 2: this.ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 3: this.ctx.transform(-1, 0, 0, -1, width, height ); break;
				case 4: this.ctx.transform(1, 0, 0, -1, 0, height ); break;
				case 5: this.ctx.transform(0, 1, 1, 0, 0, 0); break;
				case 6: this.ctx.transform(0, 1, -1, 0, height , 0); break;
				case 7: this.ctx.transform(0, -1, -1, 0, height , width); break;
				case 8: this.ctx.transform(0, -1, 1, 0, 0, width); break;
				default: break;
			}
	
			this.ctx.drawImage(img, 0, 0);
			callback(this.canvas.toDataURL());
		})
		img.src = url;
	}
}