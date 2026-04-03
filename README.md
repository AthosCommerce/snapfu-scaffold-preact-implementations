# {{snapfu.name}}

Snap SDK packages and components built with Preact.

The following directories within this repo will allow a person to use Athos styled themes. The `custom` variant should be used most of the time, unless a client wants to use a Athos theme. The theme selection will typically be made when using Snapfu.

Within the SCSS files (if on `custom`), a lot of style blocks are turned off by default with variable logic to avoid adding CSS where we may not need CSS. To turn these style blocks on, you can change these `false` values to `true`.

For more information on how these files and theme settings are connected, please see the theme directory [README](https://github.com/athoscommerce/snapfu-scaffold-preact-implementations/blob/production/src/_config/README.md).

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

### Build

```bash
npm run build
```
Files are output to `./dist`

## Resources
https://preactjs.com/guide/v10/getting-started  
https://athoscommerce.github.io/snap/snap-overview  
