import { profile } from './data/profile.js';
import { projects } from './data/projects.js';
import { renderHero } from './components/hero.js';
import { renderChapter } from './components/chapter.js';
import { renderClosing } from './components/closing.js';
import { mountRail } from './components/rail.js';
import { mountPalette } from './components/palette.js';
import { $ } from './lib/dom.js';

const root = $('#app');
const chapters = [renderHero(profile, projects), ...projects.map(renderChapter), renderClosing(profile)];
root.replaceChildren(...chapters);

mountRail(chapters);
mountPalette([
  ...chapters.map((c) => ({ label: `Go to ${c.getAttribute('aria-label')}`, kind: 'chapter', run: () => c.scrollIntoView({ behavior: 'smooth' }) })),
  ...projects.map((p) => ({ label: `${p.name} source`, kind: 'link', run: () => window.open(p.link.href, '_blank', 'noopener') })),
  ...profile.links.map((l) => ({ label: `Open ${l.label}`, kind: 'link', run: () => window.open(l.href, '_blank', 'noopener') })),
]);
