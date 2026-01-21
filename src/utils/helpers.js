export function calculateTotalSum(projects) {
  return projects.reduce(
    (sum, p) => sum + Number(p.shartnoma_summa || 0),
    0
  );
}

export function countProjects(projects) {
  return projects.length;
}

// export function countDelayedProjects(projects) {
//   return projects.filter(
//     (p) => p.object_holati === "Expertiza"
//   ).length;
// }

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

export function formatDate(dateStr) {
  if (!dateStr) return "-";

  // ISO format
  if (dateStr.includes("T")) {
    return new Date(dateStr).toISOString().split("T")[0];
  }

  // DD/MM/YYYY format
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  return "-";
}

// 🔒 SANA XAVFSIZ PARSE
export function parseDateSafe(dateStr) {
  if (!dateStr) return null;

  // ISO yoki YYYY-MM-DD
  if (dateStr.includes("-")) {
    const d = new Date(dateStr);
    return isNaN(d) ? null : d;
  }

  // DD/MM/YYYY yoki MM/DD/YYYY
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    // agar oxiri 4 xonali bo‘lsa — YYYY
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];

    const d = new Date(`${year}-${month}-${day}`);
    return isNaN(d) ? null : d;
  }

  return null;
}

// ⏰ BITTA LOYIHA KECHIKKANMI?
export function isDelayedProject(project) {
  const today = new Date();

  const deadline = parseDateSafe(project.muddat_sana);
  if (!deadline) return false;

  // ❗ faqat sana bilan solishtiramiz
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  return today > deadline;
}

// 🔢 HAMMASIDAN NECHTASI KECHIKKAN
export function countDelayedProjects(projects = []) {
  return projects.filter(isDelayedProject).length;
}


