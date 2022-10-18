const path = require('path');
const supportedExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif'];

/**
 * @param {string} str
 * @return {string}
 */
const escapeFileName = str => {
  return `svg-${path.basename(str, '.svg')}`
    .split(/\W+/)
    .map(x => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
    .join('');
};

/**
 * @param {string} src
 * @param {string} filePath
 * @return {string|{code: string}}
 */
const transform = (src, filePath) => {
  const fileName = path.basename(filePath);
  const extension = path.extname(filePath);

  if (!supportedExtensions.includes(extension)) {
    return src;
  }

  if (extension === '.svg') {
    const componentName = escapeFileName(filePath);
    return {
      code: `
      const React = require('react');
      function ${componentName}(props) {
        return React.createElement(
          'svg', 
          Object.assign({}, props, {'data-file-name': ${JSON.stringify(fileName)}})
        );
      }
      module.exports = ${componentName};
    `
    };
  } else {
    return { code: `module.exports = ${JSON.stringify(fileName)};` };
  }
};

module.exports = {
  process: transform
};
