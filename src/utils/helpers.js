export function calculateTotalSum(projects) {
  return projects.reduce(
    (sum, p) => sum + Number(p.shartnoma_summa || 0),
    0
  );
}

export function countProjects(projects) {
  return projects.length;
}

export function countDelayedProjects(projects) {
  return projects.filter(
    (p) => p.object_holati === "Expertiza"
  ).length;
}

export function countByStatus(projects) {
  return projects.reduce((acc, p) => {
    acc[p.object_holati] = (acc[p.object_holati] || 0) + 1;
    return acc;
  }, {});
}

export function calcQolganSumma(shartnoma, tolangan) {
  return (shartnoma || 0) - (tolangan || 0);
}

export function formatMoney(num) {
  if (!num) return "0 so‘m";
  return num.toLocaleString("uz-UZ") + " ";
}

export function truncate(text, max = 60) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

