/* external imports */
import { h, Fragment, Component } from 'preact';
import classnames from 'classnames';

/* snap imports */
import { Dropdown as LibraryDropdown, Icon, withController } from '@athoscommerce/snap-preact/components';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Dropdown = (props) => {
	const { type, buttonLabel, activeLabel, values, customContent } = props;
	const dropdownClass = 'ss__dropdown--theme';

	// set up dropdownProps
	let dropdownProps = {
		className: dropdownClass,
		button: <DropdownButton buttonLabel={buttonLabel} activeLabel={activeLabel} />,
		content: customContent ? customContent : <DropdownContent values={values} type={type} />,
	};

	// extra class for facet dropdowns
	if (type == 'facet') {
		dropdownProps.className = `${dropdownClass} ss__block__section`;
	}

	return <LibraryDropdown {...dropdownProps} />;
};

export const DropdownButton = withController((props) => {
	const { controller, buttonLabel, activeLabel } = props;
	const config = controller.store.custom.config;

	return (
		<>
			<span className="ss__dropdown__label">
				{buttonLabel && (
					<>
						<strong>{buttonLabel}</strong>{' '}
					</>
				)}
				{activeLabel && <span className="ss__dropdown__selected">{activeLabel}</span>}
			</span>
			<span className="ss__icon__wrapper">
				<Icon icon={config.theme.icons.arrowDown} />
			</span>
		</>
	);
});

export const DropdownContent = (props) => {
	const { values, toggleOpen } = props;

	return (
		<div className="ss__list">
			{values.map((value) => (
				<div className={classnames('ss__list__option', { ss__active: value.active })} key={value.value || value.label}>
					<a
						className="ss__list__link ss__pointer"
						href={value.url.link.href}
						onClick={(e) => {
							value.url.link.onClick(e);
							toggleOpen();
						}}
					>
						{value.label}
					</a>
				</div>
			))}
		</div>
	);
};
