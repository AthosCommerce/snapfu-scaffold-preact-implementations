# Palette.jsx

Palettes typically used for facet display, but could be used for variants.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { Palette } from './components/palette/Palette';
```

### Component:
```javascript
<Palette ariaLabel={ariaLabel} layout={layout} moreOptions={moreOptions} previewOnFocus={previewOnFocus} scroll={scroll} showLabel={showLabel} values={values} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `ariaLabel` | For `aria-label` attribute. _Optional._ | `facet.label`, `customLabel` |
| `layout` | Determines if palette should be grid or list, with `grid` being the default. _Optional._ | `grid`, `list` |
| `moreOptions` | Used for result swatches if swatch display needs to be truncated. This value should be an object (see below). _Optional._ | `{}` |
| `previewOnFocus` | Used for Autocomplete and creates a focus / hover event. Defaults to `false`. _Optional._ | `true`, `false` |
| `scroll` | Determines whether or not container should have scrollbar. Defaults to `false`. _Optional._ | `true`, `false` |
| `showLabel` | Determines if the color label should show under the palette. Only applies to grid layout and defaults to `false`. _Optional._ | `true`, `false` |
| `type` | Enables different functionality for the palette. This makes the component work for facets, [dynamic-variants](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/add-ons/src/components/dynamic-variants), and [variants](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/add-ons/src/components/variants). It is expected that for this to work with dynamic-variants and variants, you must have those plugins and components loaded. | `facets`, `dynamic-variants`, `variants` |
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

Within the component, hex colors, gradients, and images can be mapped to values using the provided `scripts` > `utils.maps` object. The mapping uses `tools.handleize` for objects, so a value with the color of "Black and Gray" would need to have a mapped key of "black-and-gray".