const { BABEL_ENV } = process.env;

module.exports = function generateConfig(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 version', 'ie >= 11'],
          },
          useBuiltIns: 'usage',
          modules: BABEL_ENV === 'production' ? false : 'auto',
          corejs: 3,
          loose: false
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    ignore: ['__mocks__'],
    plugins: [
      ...(BABEL_ENV === 'production'
        ? ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }]
        : []),
      'babel-plugin-lodash',
      'babel-plugin-styled-components',
      'babel-plugin-react-docgen',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: false
        }
      ],
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-pipeline-operator',
        {
          proposal: 'minimal',
        },
      ],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-do-expressions',
      '@babel/plugin-transform-runtime',
      'dev-expression',
    ],
    env: {
      test: {
        plugins: ['require-context-hook'],
      },
    },
  };
};
