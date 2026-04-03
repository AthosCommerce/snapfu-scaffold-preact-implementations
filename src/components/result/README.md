# Result.jsx

Result component typically used for main results loop or recommendations.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [managed](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/badges/managed)
* [image](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/image)
* [pricing](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/pricing)

### Import _(path may need to change)_:
```javascript
import { Result } from './components/result/Result';
```

### Component:
```javascript
<Result result={result} isCompact={false} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `result` | Contains result data used to build item display. | `result` |
| `isCompact` | Determines if the result card display should be small or not. _Optional._ | `true`, `false` |