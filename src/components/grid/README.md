# Grid.jsx

Grid boxes typically used for facet display, but could be used for variants.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { Grid } from './components/grid/Grid';
```

### Component:
```javascript
<Grid ariaLabel={ariaLabel} moreOptions={moreOptions} previewOnFocus={previewOnFocus} scroll={scroll} values={values} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `ariaLabel` | For `aria-label` attribute. _Optional._ | `facet.label`, `customLabel` |
| `moreOptions` | Used for result swatches if swatch display needs to be truncated. This value should be an object (see below). _Optional._ | `{}` |
| `previewOnFocus` | Used for Autocomplete and creates a focus / hover event. Defaults to `false`. _Optional._ | `true`, `false` |
| `scroll` | Determines whether or not container should have scrollbar. Defaults to `false`. _Optional._ | `true`, `false` |
| `type` | Enables different functionality for the grid. This makes the component work for facets, [dynamic-variants](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/add-ons/src/components/dynamic-variants), and [variants](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/add-ons/src/components/variants). It is expected that for this to work with dynamic-variants and variants, you must have those plugins and components loaded. | `facets`, `dynamic-variants`, `variants` |
| `values` | Array of values to loop through. | `[]` |

### moreOptions example:
```javascript
let moreOptions = {
	limit: 6, // overall limit for values
 	remaining: 2, // dynamic value that changes
 	label: 'Show More',
 	url: {
		href: '',
 		link : {
 			href : '',
 			onClick: () => {
				// custom onClick function
			}
		}
 	}
};
```