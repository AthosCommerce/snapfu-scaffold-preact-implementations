# Carousel.jsx

Carousel recommendations template.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)
* [shared](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/recommendations/shared) (**Note:** contains shared functionality for recommendations.)

**Optional _(update as needed)_**
* [result](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/result)

### Component import via index.js _(path may need to change)_:
```javascript
instantiators: {
	recommendation: {
		components: {
			Carousel: async () => (await import('./recommendations/carousel/Carousel')).Carousel,
		},
	},
}
```