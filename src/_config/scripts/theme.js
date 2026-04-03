// import variables from sass
import * as themeExport from '../styles/themes/_theme.module.scss';
import * as customExport from '../styles/themes/_custom.module.scss';
import * as everestExport from '../styles/themes/_everest.module.scss';
import * as matterhornExport from '../styles/themes/_matterhorn.module.scss';
import * as pikeExport from '../styles/themes/_pike.module.scss';

// get default exports
const theme = themeExport.default;
const custom = customExport.default;
const everest = everestExport.default;
const matterhorn = matterhornExport.default;
const pike = pikeExport.default;

// set theme style
let style = custom;
if (theme.styleShared == 'everest') {
	style = everest;
} else if (theme.styleShared == 'matterhorn') {
	style = matterhorn;
} else if (theme.styleShared == 'pike') {
	style = pike;
}

export const themeConfig = {
	styles: {
		shared: checkSassVar(theme.styleShared),
		autocomplete: checkSassVar(theme.styleAutocomplete),
		components: checkSassVar(theme.styleComponents),
		recommendations: checkSassVar(theme.styleRecommendations),
		search: checkSassVar(theme.styleSearch),
	},
	bps: {
		bp01: checkSassVar(theme.bp01),
		bp02: checkSassVar(theme.bp02),
		bp03: checkSassVar(theme.bp03),
		bp04: checkSassVar(theme.bp04),
	},
	columns: {
		hidden: checkSassVar(theme.columnsHidden),
		sidebar: checkSassVar(theme.columnsSidebar),
		content: checkSassVar(theme.columnsContent),
	},
	slideout: {
		width: checkSassVar(theme.slideoutWidth),
		direction: checkSassVar(theme.slideoutDirection),
	},
	slider: {
		ticks: checkSassVar(theme.sliderTicks),
		stickyHandles: checkSassVar(theme.sliderStickyHandles),
	},
	colors: {
		color01: checkSassVar(style.color01),
		color02: checkSassVar(style.color02),
		color03: checkSassVar(style.color03),
		color04: checkSassVar(style.color04),
		color05: checkSassVar(style.color05),
		color06: checkSassVar(style.color06),
		color07: checkSassVar(style.color07),
		color08: checkSassVar(style.color08),
		color09: checkSassVar(style.color09),
		color10: checkSassVar(style.color10),
	},
	fonts: {
		family01: checkSassVar(style.family01),
		family02: checkSassVar(style.family02),
		weight01: checkSassVar(style.weight01),
		weight02: checkSassVar(style.weight02),
		style: checkSassVar(style.style),
		transform: checkSassVar(style.transform),
	},
	icons: {
		arrowLeft: checkSassVar(style.arrowLeft),
		arrowRight: checkSassVar(style.arrowRight),
		arrowDown: checkSassVar(style.arrowDown),
		arrowUp: checkSassVar(style.arrowUp),
		check: checkSassVar(style.check),
		close: checkSassVar(style.close),
		minus: checkSassVar(style.minus),
		plus: checkSassVar(style.plus),
		filter: checkSassVar(style.filter),
		sort: checkSassVar(style.sort),
	},
};

// ensure an empty or undefined sass value is false
function checkSassVar(value) {
	if (value) {
		if (value == 'true') {
			return true;
		} else if (value == 'false') {
			return false;
		} else {
			let formattedValue = isNaN(value * 1) ? value.replace(/\"/gi, "'") : value * 1;
			return formattedValue;
		}
	} else {
		return false;
	}
}
