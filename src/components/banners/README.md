# Banners.jsx

Contains merchandising banner elements.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { Banner, InlineBanner } from './components/contact/Contact';
```

### Component:
```javascript
<Banner type={type} />
<InlineBanner result={result} wrapper={true} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `type` | For `Banner` elements, a `type` must be defined. The `header` and `banner` types are usually above results, while `footer` appears below results. The `left` banner appears below filters such as in a sidebar, but can be ommited if the site has dropdown filters. | `header`, `banner`, `footer`, `left` |
| `result` | For `InlineBanner`, `result` data must be passed down. | `result` |
| `wrapper` | For `InlineBanner`, adds a wrapper around the inline banner. This can be customized as needed. | `true`, `false`. |