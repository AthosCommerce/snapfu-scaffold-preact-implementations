# Image.jsx

Image component to standardize image functionality and design across implementation.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Import _(path may need to change)_:
```javascript
import { Image } from './components/image/Image';
```

### Component:
```javascript
<Image type={type} image={image} title={title} lazy={lazy} enableHover={enableHover} />
```

### Props:
| Prop | Description | Values |
| --- | --- | --- |
| `type` | Determines logic for different image types. | `result`, `hover`, `customValue` |
| `image` | Image url. | `core.thumbnailImageUrl`, `core.imageUrl`, `attributes.ss_image_hover`, `customValue` |
| `title` | Text for `alt` and `title` attributes. _Optional._ | `core.name`, `customValue` |
| `lazy` | Enable or disable `loading="lazy"` attribute. _Optional._ | `true`, `false` |
| `enableHover` | Enable hover image. Additionally `type` prop needs to be set to `hover` for hover image. If some results have no hover images, this value should be conditional. _Optional._ | `true`, `false` |

### Hover implementation:
```javascript
<Image type={'result'} image={core.thumbnailImageUrl} title={core.name} lazy={true} enableHover={hasHover} />

{hasHover && (
	<Image type={'hover'} image={attributes.ss_image_hover} title={core.name} lazy={true} enableHover={true} />
)}
```