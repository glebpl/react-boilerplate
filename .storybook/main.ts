// module.exports = {
//   core: {
//     builder: 'webpack5'
//   },
//   stories: ['../src/**/*.story.@(ts|tsx)'],
//   addons: ['@storybook/addon-actions', '@storybook/addon-controls'],
//   webpackFinal: (config: any) => {
//     const babelLoaderPath = require.resolve('babel-loader');
//     return {
//       ...config,
//       module: {
//         ...config.module,
//         rules: config.module.rules
//           .filter((rule: any) => {
//             const use = rule.use || [];
//             return !use.some((it: any) => (it.loader || '') === babelLoaderPath);
//           })
//           .concat({
//             test: /\.(tsx?)$/,
//             use: [
//               {
//                 loader: require.resolve('ts-loader'),
//                 options: {
//                   transpileOnly: true
//                 }
//               }
//             ],
//             exclude: /node_modules/
//           })
//       }
//     };
//   }
// };

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-controls'
  ],
  framework: '@storybook/react'
};
