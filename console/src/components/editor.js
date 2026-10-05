import { h } from '../../../src/lib/dom.js';
import { byId } from '../data/files.js';
import * as store from '../lib/store.js';
import { readmeView, experienceView, projectView, inspectorView } from './views.js';
import { aboutView, skillsView, moreView, dsaView, nowView, contactView } from './profile-views.js';

const VIEWS = { readme: readmeView, about: aboutView, skills: skillsView, exp: experienceView, contact: contactView, more: moreView, dsa: dsaView, now: nowView };

/** Renders the active file into the editor pane and the inspector, cleaning up the previous widgets. */
export function mountEditor(pane, inspector, app) {
  let cleanups = [];
  function render() {
    cleanups.forEach((fn) => typeof fn === 'function' && fn());
    cleanups = [];
    pane.replaceChildren(); inspector.replaceChildren();
    const f = byId(store.get().active);
    pane.setAttribute('aria-labelledby', `tab-${f.id}`);
    if (f.project) cleanups.push(projectView(pane, f.project));
    else cleanups.push(VIEWS[f.view](pane, app));
    inspectorView(inspector, f, app);
    pane.scrollTop = 0;
  }
  let last = null;
  store.subscribe((s, p) => { if ('active' in p && s.active !== last) { last = s.active; render(); } });
  last = store.get().active;
  render();
}
