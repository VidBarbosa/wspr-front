export function isStandalone(): boolean {
  // iOS Safari: navigator.standalone, otros: display-mode
  // @ts-ignore
  if (typeof navigator !== "undefined" && navigator.standalone) return true;
  return window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
}
