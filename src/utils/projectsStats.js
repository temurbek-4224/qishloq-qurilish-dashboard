export function calculateProjectsStats(projects) {
  let totalContract = 0;
  let totalPaid = 0;

  const regions = {};

  projects.forEach((p) => {
    const contract = Number(p.shartnoma_summa || 0);
    const paid = Number(p.tolangan_summa || 0);
    const remaining = contract - paid;
    const region = p.viloyat || "Noma'lum";

    totalContract += contract;
    totalPaid += paid;

    if (!regions[region]) {
      regions[region] = {
        count: 0,
        totalContract: 0,
        totalPaid: 0,
        totalRemaining: 0,
        projects: [],
      };
    }

    regions[region].count += 1;
    regions[region].totalContract += contract;
    regions[region].totalPaid += paid;
    regions[region].totalRemaining += remaining;
    regions[region].projects.push(p);
  });

  return {
    summary: {
      totalContract,
      totalPaid,
      totalRemaining: totalContract - totalPaid,
    },
    regions,
  };
}
