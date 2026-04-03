/* local plugins */
import { config } from './config';

export const sharedPlugin = (controller, site, page) => {
	// add default "views" settings for results
	const views = {
		active: 'grid',
	};

	// create id based on controller
	let id = controller.id;
	if (controller.type == 'recommendation') {
		id = controller.id.replace('recommend_', '');
	}

	// set initial custom settings for project
	controller.store.custom = { ...controller.store.custom, config: config, site: site, page: page, views: views, id: id };

	controller.on('afterStore', async ({ controller }, next) => {
		const store = controller.store;
		const { merchandising, results, profile } = store;
		const hasTemplate = profile?.display?.template?.component ? true : false;
		const isEmail = hasTemplate && profile.display.template.component.toLowerCase().includes('email') ? true : false;

		// if we find a 'landing-page', update page details from merchandising.landingPage
		if (merchandising?.landingPage) {
			store.custom.page = merchandising.landingPage;
		}

		if (results && results.length !== 0) {
			results.forEach((result, index) => {
				// add result id (DO NOT CUSTOMIZE FOR EMAIL RECS!!)
				result.custom.id = `ss__result--${id}-${result.id}-${index}`;
				if (isEmail) {
					result.custom.id = `ss-emailrec${index}`;
				}

				if (result.type != 'banner') {
					const core = result.mappings.core;

					// make sure prices are set
					core.price = core.price ? core.price : 0;
					core.msrp = core.msrp ? core.msrp : 0;

					// set custom pricing variables
					const hasPrice = core.price !== 0;
					const hasSale = core.msrp > core.price;

					// ensure certain custom variables are observable
					result.custom = {
						...result.custom,
						hasPrice: hasPrice,
						hasSale: hasSale,
					};
				}
			});
		}

		await next();
	});
};
