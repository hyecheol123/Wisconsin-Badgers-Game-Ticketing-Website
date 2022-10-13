module.exports = {
  presets: [
    ['@babel/preset-react'],
    ['@babel/preset-env', { debug: true, modules: false }],
    ['@babel/typescript'],
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    process.env.NODE_ENV !== 'production' && 'react-refresh/babel',
  ].filter(Boolean),
  comments: false,
};
