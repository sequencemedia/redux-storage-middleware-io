const presets = [
  [
    '@babel/env', {
      targets: {
        node: 'current',
        browsers: [
          'last 2 versions'
        ]
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ],
  '@babel/react'
]

const plugins = [
  '@babel/transform-runtime',
  '@babel/proposal-export-default-from',
  '@babel/proposal-export-namespace-from',
  [
    '@babel/proposal-class-properties',
    {
      loose: false
    }
  ],
  [
    'minify-dead-code-elimination',
    {
      optimizeRawSize: true
    }
  ],
  [
    'module-resolver', {
      root: ['.'],
      cwd: 'babelrc',
      alias: {
        'redux-storage-middleware-io': './'
      }
    }
  ]
]

module.exports = {
  presets,
  plugins
}
