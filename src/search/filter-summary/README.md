# FilterSummary.jsx

Component that displays a loop of selected facet options.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { FilterSummary } from './search/filter-summary/FilterSummary';
```

### Component:
```javascript
<FilterSummary layout={layout} inline={inline} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `layout` | Determines if summary should be grid or list, with grid being the default. _Optional._ | `grid`, `list` |
| `inline` | Determines if the filter summary options should always be inline or not. Inline is better on mobile views or when used with facet dropdowns. | `true`, `false` |