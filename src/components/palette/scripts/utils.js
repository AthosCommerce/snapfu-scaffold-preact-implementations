/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';
import { createHoverProps } from '@athoscommerce/snap-preact/components';

/* shared palette functionality for all of the layouts */
const sets = {
	borders: ['white', 'ivory', 'clear', 'transparent'], // values that should have borders by default
	rainbow: ['#2857da', '#28da46', '#f5e418', '#f28500', '#da2848'], // rainbow gradient colors
};

const buildGradient = (colors) => {
	if (colors && colors.length != 0) {
		// variables for calculating colors for gradients
		const length = colors.length;
		const divider = (100 / length).toFixed(2) * 1;

		// store gradients in array
		const gradients = [];

		// loop through colors and process gradient rule
		colors.forEach((color, index) => {
			const percentage = index === 0 ? (index + 1) * divider : index * divider;
			if (index === 0) {
				gradients.push(`${color} ${percentage}%`);
			} else {
				gradients.push(`${color} ${percentage}%`);
				gradients.push(index == length - 1 ? color : `${color} ${percentage + divider}%`);
			}
		});

		// join gradients and process css rule
		const gradientsString = gradients.join(', ');
		return `background-color: ${colors[0]}; background-image: -webkit-linear-gradient(${gradientsString}); background-image: -o-linear-gradient(${gradientsString}); background-image: -moz-linear-gradient(${gradientsString}); background-image: linear-gradient(${gradientsString})`;
	}
};

export const utils = {
	maps: {
		colors: {
			brown: '#845329',
			purple: '#7c368e',
		},
		gradients: {
			multi: buildGradient(sets.rainbow),
			multicolor: buildGradient(sets.rainbow),
			rainbow: buildGradient(sets.rainbow),
		},
		images: {},
	},
	sets: sets,
	styles: {
		backgrounds: (handle) => {
			const maps = utils.maps;
			const color = maps.colors[handle] ? maps.colors[handle] : handle;

			// generate background styles based on values and maps]
			let styles = { 'background-color': color };
			if (maps.gradients[handle]) {
				styles = maps.gradients[handle];
			} else if (maps.images[handle]) {
				styles['background-repeat'] = 'no-repeat';
				styles['background-size'] = 'cover';
				styles['background-image'] = `url('${maps.images[handle]}')`;
			}
			return styles;
		},
	},
	build: {
		palette: (controller, props) => {
			const { ariaLabel, layout, moreOptions, previewOnFocus, scroll, showLabel, type, values } = props;
			const custom = controller.store.custom;

			// set variantsConfig
			let variantsConfig = false;
			if (type == 'dynamic-variants') {
				variantsConfig = custom?.dynamicVariantsConfig ? custom.dynamicVariantsConfig : false;
			} else if (type == 'variants') {
				variantsConfig = custom?.variantsConfig ? custom.variantsConfig : false;
			}

			// build props for palette
			return {
				ariaLabel: ariaLabel ? ariaLabel : '',
				layout: layout && (layout == 'grid' || layout == 'list') ? layout : 'grid',
				moreOptions: moreOptions?.remaining && moreOptions?.label && moreOptions?.url?.link ? moreOptions : false,
				previewOnFocus: typeof previewOnFocus != 'undefined' ? previewOnFocus : false,
				result: props?.result ? props.result : false,
				scroll: typeof scroll != 'undefined' ? scroll : false,
				selection: props?.selection ? props.selection : false,
				showLabel: typeof showLabel != 'undefined' ? showLabel : false,
				type: type ? type : 'facets',
				values: values && values.length !== 0 ? values : [],
				variantsConfig: variantsConfig,
			};
		},
		value: (value, index, props, lang) => {
			const { ariaLabel, layout, previewOnFocus, result, selection, showLabel, type, variantsConfig } = props;
			const { active, field, getData, swap } = variantsConfig;
			const actionClass = 'ss__palette__action';

			// set initial value props
			let valueProps = {
				active: value?.filtered ? value.filtered : false,
				attributes: false,
				available: true,
				count: value?.count ? value.count : false,
				handle: 'white',
				key: `palette-white-${index}`,
				label: value?.label ? value.label : 'White',
				layout: layout,
				preview: false,
				showLabel: showLabel,
				url: false,
				value: value?.value ? value.value : 'White',
			};

			if (type == 'dynamic-variants') {
				// grab selected and variant data
				const selectedData = getData(result?.custom?.dynamicVariants?.selected, active.variant);
				const variantData = getData(value, active.variant);

				// ensure label and value are
				valueProps.label = value[field.simple] ? value[field.simple] : valueProps.value;
				valueProps.value = valueProps.label;

				// check if value is active and available
				valueProps.active = active.check(selectedData, variantData);

				// basic logic below, but can be adjusted as needed
				if (value.available) {
					if (typeof value.available == 'number') {
						valueProps.available = value.available > 0 ? true : false;
					} else if (typeof value.available == 'boolean') {
						valueProps.available = value.available;
					}
				}

				// update attributes
				valueProps.attributes = {
					ariaLabel: lang.ariaLabelResult(ariaLabel, valueProps.label),
					class: `${actionClass} ss__palette__button`,
				};

				// update link
				valueProps.url = {
					link: {
						onClick: () => {
							if (valueProps.available) {
								swap(result, value);
							}
						},
					},
				};
			} else if (type == 'variants') {
				// grab selected and variant data
				const variants = result.custom.variants;
				const selectedData = variants?.selected?.options ? getData(variants.selected.options[selection.field], active.variant) : false;
				const variantData = getData(value, active.variant);

				// ensure label and value are
				valueProps.label = value[field.simple] ? value[field.simple] : valueProps.value;
				valueProps.value = valueProps.label;

				// check if value is active and available
				valueProps.active = active.check(selectedData, variantData);
				valueProps.available = value.available;

				// update attributes
				valueProps.attributes = {
					ariaLabel: lang.ariaLabelResult(ariaLabel, valueProps.label),
					class: `${actionClass} ss__palette__button`,
				};

				// update link
				valueProps.url = {
					link: {
						onClick: () => {
							if (valueProps.available) {
								swap(result, selection, value);
							}
						},
					},
				};
			} else {
				// update attributes
				valueProps.attributes = {
					ariaLabel: lang.ariaLabelFacet(valueProps.active, ariaLabel, valueProps.label),
					class: `${actionClass} ss__palette__link`,
				};

				// update link
				valueProps.url = value.url;

				if (previewOnFocus && value?.preview) {
					// update preview
					valueProps.preview = {
						onFocus: previewOnFocus,
						preview: value.preview,
					};

					// update attributes to add hover props
					valueProps.attributes = {
						...valueProps.attributes,
						...createHoverProps(() => {
							value.preview();
						}),
					};
				}
			}

			// update other valueProps
			const valueLower = valueProps.value.toLowerCase();
			valueProps.handle = tools.handleize(valueLower);
			valueProps.key = `palette-${valueLower}-${index}`;
			valueProps.value = valueLower;

			// build props for value
			return valueProps;
		},
	},
};
