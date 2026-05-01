// Forge — Feature Flags. Sticky-bucket percentage rollouts.

import { createHash } from 'node:crypto';

export type FlagValue = boolean | number | string | object;

export interface Flag {
  key: string;
  default: FlagValue;
  rules?: Array<{
    if?: { attr: string; op: 'eq' | 'in'; value: unknown };
    rolloutPct?: number; // 0..100
    value: FlagValue;
  }>;
}

export function evaluate(
  flag: Flag,
  ctx: { userId: string; attrs?: Record<string, unknown> },
): FlagValue {
  for (const rule of flag.rules ?? []) {
    if (rule.if) {
      const a = ctx.attrs?.[rule.if.attr];
      if (rule.if.op === 'eq' && a !== rule.if.value) continue;
      if (rule.if.op === 'in' && !(Array.isArray(rule.if.value) && rule.if.value.includes(a))) continue;
    }
    if (rule.rolloutPct !== undefined) {
      const h = createHash('sha1').update(`${flag.key}:${ctx.userId}`).digest();
      const bucket = h.readUInt32BE(0) % 100;
      if (bucket >= rule.rolloutPct) continue;
    }
    return rule.value;
  }
  return flag.default;
}
