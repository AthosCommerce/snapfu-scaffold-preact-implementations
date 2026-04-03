export const images = {
	default: '//cdn.athoscommerce.net/snap/images/fallback.png',
	loading: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // 1x1 placeholder image (for lazyloading)
	isDefined: (image) => {
		// check if image is defined
		return image && typeof image != 'undefined' ? true : false;
	},
	createSrcset: (image, size) => {
		// function to create image srcset attribute
		// this will need to be modified for sizes

		if (image && image != images.default) {
			// srcset sizes to loop through
			const sizes = [200, 400, 800, 1000];

			// loop through sizes and replace images size to add new size
			let srcset = [];
			sizes.forEach((newSize) => {
				const imageReplace = new RegExp(size, 'g');
				srcset.push(`${image.replace(imageReplace, newSize)} ${newSize}w`);
			});
			return srcset.join(', ');
		} else {
			return image;
		}
	},
	addSize: (image, size) => {
		// add size to the end of the file name
		// this is similar to what we use for Shopify images
		if (image.includes(size)) {
			return image;
		} else if (image) {
			return image.replace(/(.+)(\.(?:jpg|jpeg|gif|png|svg|webp|avif|heic))/i, '$1' + size + '$2');
		} else {
			return images.default;
		}
	},
	replaceSize: (image, size, newSize) => {
		// function to replace sizes in images
		// could also be used to replace size
		if (image) {
			return image.includes(size) ? image.replace(size, newSize) : image;
		} else {
			return images.default;
		}
	},
	getErrorImage: (image) => {
		// placeholder image to ensure onError does not infinitely loop
		const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
		return image == images.default || image.includes(images.default) ? placeholder : images.default;
	},
	onError: (e) => {
		// image error handler function
		if (e.target.getAttribute('src')) {
			e.target.src = images.getErrorImage(e.target.src);
		}
		if (e.target.getAttribute('srcset')) {
			e.target.srcset = images.getErrorImage(e.target.srcset);
		}
	},
};
