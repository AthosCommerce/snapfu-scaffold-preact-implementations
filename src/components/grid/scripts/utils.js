/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';
import { createHoverProps } from '@athoscommerce/snap-preact/components';

export const utils = {
	build: {
		grid: (controller, props) => {
			const { ariaLabel, moreOptions, previewOnFocus, scroll, type, values } = props;
			const custom = controller.store.custom;

			// set variantsConfig
			let variantsConfig = false;
			if (type == 'dynamic-variants') {
				variantsConfig = custom?.dynamicVariantsConfig ? custom.dynamicVariantsConfig : false;
			} else if (type == 'variants') {
				variantsConfig = custom?.variantsConfig ? custom.variantsConfig : false;
			}

			// build props for grid
			return {
				ariaLabel: ariaLabel ? ariaLabel : '',
				moreOptions: moreOptions?.remaining && moreOptions?.label && moreOptions?.url?.link ? moreOptions : false,
				previewOnFocus: typeof previewOnFocus != 'undefined' ? previewOnFocus : false,
				result: props?.result ? props.result : false,
				scroll: typeof scroll != 'undefined' ? scroll : false,
				selection: props?.selection ? props.selection : false,
				type: type ? type : 'facets',
				values: values && values.length !== 0 ? values : [],
				variantsConfig: variantsConfig,
			};
		},
		value: (value, index, props, lang) => {
			const { ariaLabel, layout, previewOnFocus, result, selection, showLabel, type, variantsConfig } = props;
			const { active, field, getData, swap } = variantsConfig;
			const actionClass = 'ss__grid__action';

			// set initial value props
			let valueProps = {
				active: value?.filtered ? value.filtered : false,
				attributes: false,
				available: true,
				count: value?.count ? value.count : false,
				handle: 'white',
				key: `grid-white-${index}`,
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
					class: `${actionClass} ss__grid__button`,
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
					class: `${actionClass} ss__grid__button`,
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
					class: `${actionClass} ss__grid__link`,
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
			valueProps.key = `grid-${valueLower}-${index}`;
			valueProps.value = valueLower;

			// build props for value
			return valueProps;
		},
	},
};
