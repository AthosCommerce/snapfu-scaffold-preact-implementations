/* external imports */
import { h, Fragment, Component } from 'preact';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* local scripts */
import { lang as contactLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Contact = withController((props) => {
	const { controller, show } = props;
	const store = controller.store;
	const { site } = store.custom;
	const lang = contactLang[site?.lang ? site.lang : 'en'];

	return (
		show &&
		(lang.cantFind || (lang.contact && lang.contact.length !== 0)) && (
			<div className="ss__contact">
				{lang.cantFind && <p className="ss__contact__cant-find" dangerouslySetInnerHTML={{ __html: lang.cantFind }}></p>}

				{lang.contact &&
					lang.contact.length !== 0 &&
					lang.contact.map((contact, index) => (
						<div className={`ss__contact__detail ss__contact__detail--${tools.handleize(contact.title)}`} key={`${contact.title}-${index}`}>
							<h4 className="ss__title">{contact.title}</h4>

							<p dangerouslySetInnerHTML={{ __html: contact.content }}></p>
						</div>
					))}
			</div>
		)
	);
});
