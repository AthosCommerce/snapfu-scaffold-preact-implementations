# Breadcrumbs.jsx

Search targeter for breadcrumb injection. This should only be used on a search page, which means prefixing the selector with a page specific class (`.ss-shop`).

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

### Base requirements:

### Component import via index.js _(path may need to change)_:
```javascript
{
	selector: '.ss-shop .breadcrumbs-selector',
	component: async () => {
		return (await import('./search/breadcrumbs/Breadcrumbs')).Breadcrumbs;
	},
	hideTarget: true,
}
```