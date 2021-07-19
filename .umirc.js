import { defineConfig } from 'dumi';

export default defineConfig({
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  title: 'inc-hooks',
  favicon:
    'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
  logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
  outputPath: 'docs-dist',
  outputPath: 'docs-dist',
  base: '/inc-hooks',
  publicPath: '/inc-hooks/',
  resolve: {
    includes: ['src'],
  },
  // more config: https://d.umijs.org/config
});
