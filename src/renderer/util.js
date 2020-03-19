export function modifierString(mod) {
  return (mod >= 0 ? "+" : "") + mod;
}

export function calculateModifier(score) {
  return Math.floor((score - 10) / 2);
}
