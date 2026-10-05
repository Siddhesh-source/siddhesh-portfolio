// Registry: project id -> lazy widget module. Add one line per new widget.
export const widgets = {
  whispr: () => import('./whispr.js'),
  nexus: () => import('./nexus.js'),
  ccml: () => import('./ccml.js'),
  flash: () => import('./flash.js'),
  quat: () => import('./quat.js'),
  trade: () => import('./trade.js'),
};
