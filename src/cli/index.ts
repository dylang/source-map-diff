#!/usr/bin/env node

import { cli } from './cli.js';

cli().catch((err) => console.error(err.message));
