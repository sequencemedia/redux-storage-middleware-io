const presets = [
  [
    '@babel/env',
    {
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
  [
    '@babel/react',
    {
      runtime: 'automatic'
    }
  ]
]

const plugins = [
  [
    'minify-dead-code-elimination',
    {
      optimizeRawSize: true
    }
  ]
]

module.exports = {
  presets,
  plugins
}
