# Dropdown.jsx

Dropdown menus mostly for sort and per page options. If using this component, "List Option" should _probably_ be set to `true` in \_config/styles/shared/_${style}.scss. Uses [Snap Dropdown](https://athoscommerce.github.io/snap/packages/snap-preact/components/docs/?path=/docs/atoms-dropdown--docs).

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { Dropdown } from './components/dropdown/Dropdown';
```

### Component:
```javascript
<Dropdown type={type} buttonLabel={buttonLabel} activeLabel={activeLabel} values={values} customContent={customContent} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `type` | Used to determine what content renders on dropdown. | `sort`, `perpage`, `customValue` |
| `buttonLabel` | Label that appears next to `activeLabel`. | `Sort By:`, `Per Page:`, `customLabel` |
| `activeLabel` | Active label when something has been selected. _Optional._ | `sorting?.current?.label`, `pagination.pageSize`, `false` |
| `values` | Array of values. Can be `false` if using `customContent`. | `sorting.options`, `pagination.pageSizeOptions`, `[]`, `false` |
| `customContent` | Custom component to add to dropdown content instead of using `values`. | `<CustomDropdownComponent />` |

This component can be used for other dropdowns by utilizing the `customContent` prop.

### Custom component:
```javascript
<Dropdown type={'custom'} buttonLabel={'Custom Label:'} activeLabel={false} values={false} customContent={<CustomDropdownComponent />} />
``` 