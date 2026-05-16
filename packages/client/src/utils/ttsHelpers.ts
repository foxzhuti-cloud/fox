export function speedToEdgeRate(rate: number): string {
  const pct = Math.round((rate - 1) * 100)
  return `${pct >= 0 ? '+' : ''}${pct}%`
}

export function hzToEdgePitch(hz: number): string {
  return `${hz >= 0 ? '+' : ''}${hz}Hz`
}
