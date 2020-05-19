# cables
something something cables
.

how to behave: https://github.com/pandrr/cables/wiki/Checklist---Creating-new-ops---A-new-op-version---how-to-changelog

how to don't get binary merge conflicts:
`git config --global merge.ours.driver true`


### docs

#### build gitbook doc:

```
cd doc/gitbook/
npx gitbook build
```
static html outut: _book/

#### build jsdoc

```
cd doc/jsdoc/
npx documentation build ../../../cables/src/core/index.js -f html -o out --theme theme
```
static html outut: out/

### Internal libraries
If you want to create a library, there are some steps you need to consider:

1. Libraries can be found in `src/core/libs`
2. The folder they are in defines their namespace.
3. The subfolder they are in defines their classname.
4. If a file ist at root level (directly in the `libs` folder), the namespace will be `CABLES`.
5. The resulting filename will have the structure `namespace_classname.min/max.js`.
6. If a file is at root level, the resulting filename will be `filename.js`
7. Every namespace library needs an `index.js` as the main entry point.
#### Example:

Input structure:
```bash
libs
├── cgl
│   ├── cubemap
│   │   └── index.js
│   └── light
│       ├── createShaders.js
│       └── index.js
└── vargetset.js
```

Output structure:
```bash
libs
├── cgl_cubemap.max.js
├── cgl_cubemap.min.js
├── cgl_light.max.js
├── cgl_light.min.js
├── vargetset.max.js
└── vargetset.min.js
```
#### Working with internal libraries
Take a look at the input structure of `light`. We have two files: `createShaders.js` and `index.js`.

`createShaders.js` includes utility functions for our main class, defined in `index.js`.

Let's take a closer look at `index.js`:

```javascript
import {
    getShadowPassVertexShader,
    getShadowPassFragmentShader,
    getBlurPassVertexShader,
    getBlurPassFragmentShader
} from "./createShaders";
/* ... */
function Light(cgl, config)
{
/* ... */
};

Light.prototype.getShadowPassVertexShader = getShadowPassVertexShader;

export { Light };
```

As you can see, files from `createShaders.js` are being imported to `index.js`. `index.js` exports the main class to be used.

When the library is built, the resulting class will be `CGL.Light`, to be found in `cgl_light.max/min.js`.

#### Namespace libraries
1. Only 1 export per `index.js` file. Only the first exported entity will be considered as the exported class.
2. The second export will be put into the resulting file, but not accessible via code.
3. It's good practice to split functionality into different files. Just make sure to import them in your `index.js`.
4. Webpack is configured to read [**named**](https://stackoverflow.com/a/41283945) exports.
Using default exports will not work.

    Bad:
~~`export default Light`~~

    Good: **`export { Light }`**

#### Root level libraries
