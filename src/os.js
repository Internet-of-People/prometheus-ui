export function openUrl(url) {
  try {
    /* eslint-disable import/no-unresolved, global-require */
    require('electron').shell.openExternal(url);
  } catch (err) {
    window.location = url;
  }
}

export default openUrl;
