import config from 'config';

export const getUserAgent = () => {
  return `apTC-patient/${config.appVersion}; ${config.appEditor} - ${config.appName}`;
};
