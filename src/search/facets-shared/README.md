# FacetsShared.jsx

This module contains common components, styles, and functionality shared between facets. The components are:

* FacetOptions
* FacetHierarchy
* FacetList

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [grid](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/grid)
* [palette](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/palette)

### Import _(path may need to change)_:
```javascript
import { componentName } from './search/facets-shared/FacetsShared';
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `valueLimits` | Set limits for values within facets. This should be formatted as an object. | See example below. |

```javascript
const valueLimits = {
	grid: 12,
	palette: 12,
	default: 10,
};
```
