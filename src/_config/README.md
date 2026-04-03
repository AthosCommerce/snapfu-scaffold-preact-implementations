# Config

In this directory, there are no components. Instead, there are scripts and Sass stylesheets which are used to create settings for all the other components, plugins, and Sass stylesheets. For JS and JSX files, these theme settings are imported into the controller through the `shared.js` plugin in the `scripts` folder.

### Scripts:
| Filename | Description |
| --- | --- |
| `config` | Joins most configurations from the above files, with the exception of the `shared.js` file.. |
| `currency` | An object where users can customize currency formats used on pricing. |
| `images` | An object containing image functionality and settings. |
| `shared` | A "global" plugin to set variables used througout the project. This plugin should be added in `index.js`. |
| `theme` | Exports values from Sass files. **Do not remove exports or project setup might break.** |

### Styles > shared:
| Filename | Description |
| --- | --- |
| `_custom` | Shared Custom styles. Added into `index.js`. |
| `_everest` | Shared Everest styles. Added into `index.js`. |
| `_matterhorn` | Shared Matterhorn styles. Added into `index.js`. |
| `_pike` | Shared Pike styles. Added into `index.js`. |

### Styles > themes:
| Filename | Description |
| --- | --- |
| `_custom` | Custom theme variables. |
| `_everest` | Everest theme variables. |
| `_matterhorn` | Matterhorn theme variables. |
| `_pike` | Pike theme variables. |
| `_theme` | Determines the overall theme style and shared settings between themes. Mobile breakpoints are set here for use in components, plugins, and Sass files. |

### Styles > utils:
| Filename | Description |
| --- | --- |
| `_functions` | A collection of Sass helper functions. |
| `_icons` | Contains Sass functionality and mixins to set SVGs as background images. |
| `_mixins` | A collection of Sass helper mixins. |