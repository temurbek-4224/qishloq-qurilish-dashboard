const API_URL =
  "https://script.google.com/macros/s/AKfycbzE7_amO7hdKBWBcOD26kC_SP4Bl_4x22Igb9GCQlPFN89AxTbRWrof_GuqVrQEoIMU/exec";

export async function getProjects() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("API dan ma'lumot olishda xatolik");
  }

  const json = await res.json();

  // 🔴 MUHIM JOY
  // API array emas, object qaytaryapti
  // shuning uchun .data ni qaytaramiz
  return Array.isArray(json) ? json : json.data;
}
