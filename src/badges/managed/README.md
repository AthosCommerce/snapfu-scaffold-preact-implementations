# Managed.jsx

Managed badges to add to results. This component is meant to be used for customer configured badges from the ["Badge Manager"](https://console.athoscommerce.net/visual-promotions/badges).

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { ManagedOverlay, ManagedCallout } from './badges/managed/Managed';
```

### Component (Overlay):
```javascript
<ManagedOverlay controller={controller} result={result} limit={3}>
	{/* child elements here */}
</ManagedOverlay>
```

**Note:** The overlay badge should wrap around an image, but not around a link. If wrapped around a link, this can make parts of the link unclickable.

### Component (Callout):
```javascript
<ManagedCallout controller={controller} result={result} limit={3} />
```

**Note:** Does not accept any child elements.

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `controller` | Details of the controller. | `controller` |
| `result` | Details of the result. | `result` |
| `limit` | Limit how many badges can appear. | `3`, `1`, etc. |