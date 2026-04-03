# Content.jsx

Search targeter for content injection. Best practice is to use `#athos-content` as a selector.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [banners](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/banners)
* [results](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/results)

### Plugin import via index.js _(path may need to change)_:
```javascript
import { contentPlugin } from './search/content/scripts/content';
```

### Controller plugin config via index.js _(path may need to change)_:
```javascript
plugins: [[contentPlugin]],
```

### Component import via index.js _(path may need to change)_:
```javascript
{
	selector: '#athos-content',
	component: async () => {
		return (await import('./search/content/Content')).Content;
	},
	hideTarget: true,
}
```