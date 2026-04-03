# Results.jsx

Component that displays results (`Results`) and no results (`NoResults`) content. The `Results` component is where the main results loop starts.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [banners](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/banners)
* [toolbar](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/toolbar)
* [carousel](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/recommendations/carousel)
* [result](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/result)
* [contact](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/contact)

### Import _(path may need to change)_:
```javascript
import { Results, NoResults } from './search/results/Results';
```

### Component:
```javascript
{controller.store.pagination.totalResults !== 0 ? <Results isDesktop={isDesktop} /> : <NoResults isDesktop={isDesktop} />}
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `isDesktop` | Determines if certain elements should load on desktop versus mobile. | `true`, `false` |