# Slideout.jsx

Component that serves as a slideout menu for displaying content like facets. Uses [Snap Slideout](https://athoscommerce.github.io/snap/packages/snap-preact/components/docs/?path=/docs/molecules-slideout--docs) and requires the [`Facets` component](https://athoscommerce.github.io/snap/packages/snap-preact/components/docs/?path=/docs/organisms-facets--docs). A slideout is usually for mobile menus, but can be used on desktop as well.

As mentioned above, by default this shows facets, but it could be modified to accept different content components as well. This could be accomplished by allowing the `SlideoutContent` component to accept different components and adding logic around `FacetsColumn`.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [facets-column](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/facets-column)

### Import _(path may need to change)_:
```javascript
import { Slideout } from './components/slideout/Slideout';
```

### Component:
```javascript
<Slideout />
```