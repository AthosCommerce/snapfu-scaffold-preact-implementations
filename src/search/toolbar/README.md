# Toolbar.jsx

Imports other elements and displays toolbars around results. 

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [pagination](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/pagination)
* [dropdown](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/dropdown)
* [slideout](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/slideout)

### Import _(path may need to change)_:
```javascript
import { Toolbar } from './search/toolbar/Toolbar';
```

### Component:
```javascript
<Toolbar isDesktop={isDesktop} location={location} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `isDesktop` | Determines if certain elements should load on desktop versus mobile. | `true`, `false` |
| `location` | Determines what content to show above or below the results. This can be customized as needed. | `top`, `bottom` |