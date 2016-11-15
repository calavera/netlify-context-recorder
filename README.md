# Netlify Context Recorder for Webpack.

This [Webpack](https://webpack.github.io) plugin saves Netlify's context information into a JSON file.
You can use this file to display information about the build context, like the git sha used to build the site.

Netlify Context Recorder is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).

## Usage

Add the plugin to your webpack configuration:

```js
plugins: [
  ...
  new NetlifyContextRecorder()
],
```

## Options

- `options.contextFilePath`: path to save the context file within the distribution dir, by default "netlify-context.json".
- `options.enabledFor`: array with context names the recorder is enabled for, by default ["deploy-preview", "branch-deploy"].
