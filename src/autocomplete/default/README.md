# Default.jsx

Default Autocomplete design with terms, facets, and results. Uses [Snap Autocomplete](https://athoscommerce.github.io/snap/packages/snap-preact/components/docs/?path=/docs/organisms-autocomplete--docs).

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)
* [shared](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/autocomplete/shared) (**Note:** contains shared functionality for Autocomplete.)

### Component import via index.js _(path may need to change)_:
```javascript
{
	name: 'main',
	selector: '.ss__autocomplete__input',
	component: async () => {
		return (await import('./autocomplete/default/Default')).Default;
	},
	hideTarget: true,
}
```

To change the results layout and the number of items, the `settings.results` function can be utilized. An example of the function looks like this:
```javascript
results: settings.results(3, 2),
```

The first parameter is columns and the second parameter is rows. So, in the above, the results would be in a grid layout with six results total, three columns, and two rows. If you want a list layout, there is a third optional parameter, so the function can be changed as such:
```javascript
results: settings.results(4, 1, 'list'),
```

With this change, the results would be in a list layout with four results total, one column, and four rows. The first and second parameter will be multipled to determine the number of results. Keep in mind that the results are capped at six, so if you would like to increase that, it should be changed in index.js. The recommendation is to keep this number under 20, as Autocomplete is not meant to function as a search page.

```javascript
globals: {
	pagination: {
		pageSize: 6, // change this global number for autocomplete only
	},
},
```

Additionally, slots ("content areas") can cutomized by importing elements from `shared` > `Shared.jsx`. 

### Import _(path may need to change)_:
```javascript
import { AutocompleteContent } from './autocomplete/shared/Shared';
```

### Slot implementation:
```javascript
<LibraryAutocomplete {...acProps} contentSlot={<AutocompleteContent contentProps={acProps} />} />
```