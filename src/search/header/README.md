# Header.jsx

Search targeter for header injection. This is usually only used on a search page, which means prefixing the selector with a page specific class (`.ss-shop`).

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Component import via index.js _(path may need to change)_:
```javascript
{
	selector: '.ss-shop .title-selector',
	component: async () => {
		return (await import('./search/header/Header')).Header;
	},
	hideTarget: true,
}
```

This _can_ be used on category or collection pages, but the `page.title` value would need to be customized to conditionally pull in the title from that page. This value is initially set in index.js.

### Component import via index.js _(path may need to change)_:
```javascript
/* check for search pages */
const windowLower = window.location.href.toLowerCase();
const searchPages = ['/shop', '/mockup', '/lighthouse'];
const searchFound = searchPages.filter((page) => {
	return windowLower.includes(page);
});

/* set up page details config */
const isSearch = searchFound && searchFound.length > 0 ? true : false;
let page = {
	id: isSearch ? 'shop' : 'other',
	title: isSearch ? 'Search Results' : 'Other Page',
	type: isSearch ? 'search' : 'other',
};

if (!isSearch && isCategory) {
	// update page details when on category
	page = {
		id: 'category-id',
		title: 'Category Title',
		type: 'category',
	};
}
```