// Registry: project id -> widget module with mount(host) and run(args, print) for the terminal.
import * as whispr from './whispr.js';
import * as nexus from './nexus.js';
import * as ccml from './ccml.js';
import * as flash from './flash.js';
import * as quat from './quat.js';
import * as trade from './trade.js';

export const widgets = { whispr, nexus, ccml, flash, quat, trade };
