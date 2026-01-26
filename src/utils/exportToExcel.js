import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportProjectsToExcel(projects, fileName = "loyihalar.xlsx") {
  if (!projects?.length) {
    alert("Ma’lumot yo‘q");
    return;
  }

  const rows = projects.map((p, i) => ({
    "№": i + 1,
    "Loyiha nomi": p.loyiha_nomi ?? "",
    "Buyurtmachi": p.buyurtmachi ?? "",
    "Viloyat": p.viloyat ?? "",
    "Shartnoma raqami": p.shartnoma_raqam ?? "",
    "Boshlangan sana": p.boshlanish_sana ?? "",
    "Holati": p.object_holati ?? "",
    "Shartnoma summasi": p.shartnoma_summa ?? 0,
    "To‘langan": p.tolangan_summa ?? 0,
    "Qolgan": p.qolgan_summa ?? 0,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);

  /* ================= HEADER STYLE ================= */
  const headerCells = Object.keys(rows[0]);
  headerCells.forEach((_, c) => {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
    cell.s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      fill: { fgColor: { rgb: "2563EB" } }, // blue-600
      border: border(),
    };
  });

  /* ================= BODY STYLE ================= */
  const range = XLSX.utils.decode_range(ws["!ref"]);

  for (let r = 1; r <= range.e.r; r++) {
    for (let c = 0; c <= range.e.c; c++) {
      const ref = XLSX.utils.encode_cell({ r, c });
      if (!ws[ref]) continue;

      ws[ref].s = {
        alignment: {
          wrapText: true,
          vertical: "top",
          horizontal: c === 0 ? "center" : "left",
        },
        border: border(),
      };

      if (c >= 7) {
        ws[ref].z = "#,##0 [$so‘m-uz-UZ]";
        ws[ref].s.alignment.horizontal = "right";
      }
    }
  }

  /* ================= COLUMN WIDTH ================= */
  ws["!cols"] = [
    { wch: 5 },   // №
    { wch: 60 },  // Loyiha nomi (KATTA)
    { wch: 35 },
    { wch: 14 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  /* ================= ROW HEIGHT ================= */
  ws["!rows"] = Array(range.e.r + 1).fill({ hpx: 80 });
  ws["!rows"][0] = { hpx: 45 };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Loyihalar");

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  saveAs(
    new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    fileName
  );
}

function border() {
  return {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
}
