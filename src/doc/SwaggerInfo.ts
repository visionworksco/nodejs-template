/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore:next-line
import packageJson from '../../package.json';

export default {
  openapi: '3.0.3',
  info: {
    title: packageJson.name, // REQUIRED
    version: packageJson.version, // REQUIRED
    description: packageJson.description,
    contact: {
      name: packageJson.author,
      url: packageJson.repository.url,
    },
    license: {
      name: packageJson.license, // REQUIRED
    },
  },
};
