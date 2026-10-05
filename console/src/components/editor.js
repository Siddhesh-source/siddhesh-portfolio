import { h } from '../../../src/lib/dom.js';
import { byId } from '../data/files.js';
import * as store from '../lib/store.js';
import { readmeView, experienceView, projectView, inspectorView } from './views.js';

/** Renders the active file into the editor pane and the inspector, cleaning up the previous widgets. */
export function mountEditor(pane, inspector, app) {
  let cleanups = [];
  function render() {
    cleanups.forEach((fn) => typeof fn === 'function' && fn());
    cleanups = [];
    pane.replaceChildren(); inspector.replaceChildren();
    const f = byId(store.get().active);
    pane.setAttribute('aria-labelledby', `tab-${f.id}`);
    if (f.id === 'readme') cleanups.push(readmeView(pane, app));
    else if (f.id === 'exp') cleanups.push(experienceView(pane));
    else cleanups.push(projectView(pane, f.project));
    inspectorView(inspector, f, app);
    pane.scrollTop = 0;
  }
  let last = null;
  store.subscribe((s, p) => { if ('active' in p && s.active !== last) { last = s.active; render(); } });
  last = store.get().active;
  render();
}
