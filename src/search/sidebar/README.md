# Sidebar.jsx

Search targeter for sidebar injection. Best practice is to use `#athos-sidebar` as a selector.

### Requirements:

**Base**
* [_config](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/_config)

**Optional _(update as needed)_**
* [facets-column](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/search/facets-column)
* [contact](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/tree/production/src/components/contact)

### Component import via index.js _(path may need to change)_:
```javascript
{
	selector: '#athos-sidebar',
	component: async () => {
		return (await import('./search/sidebar/Sidebar')).Sidebar;
	},
	hideTarget: true,
}
```