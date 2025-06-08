// This file helps transition from Jest to Vitest by providing
// compatibility for jest.mock() calls

import { vi } from 'vitest';

// Make jest global available for backward compatibility
(global as any).jest = {
    mock: vi.mock,
    fn: vi.fn,
    spyOn: vi.spyOn
};

// Make sure describe, test, expect are globally available
(global as any).describe = describe;
(global as any).test = test;
(global as any).expect = expect;
