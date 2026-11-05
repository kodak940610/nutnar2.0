/**
 * 水生植物探險隊｜Google Apps Script 後端
 * 使用方式：貼到 Apps Script，部署為網頁應用程式。
 * 執行身分：我；存取權：任何人。
 */
const SPREADSHEET_ID = ""; // 若由試算表「擴充功能 > Apps Script」建立，可留空自動使用綁定試算表
const SHEET_NAMES = {
  students: "學生資料",
  observations: "AR觀察紀錄",
  assessments: "個別評量"
};
function getBook_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error("找不到試算表。請從目標 Google 試算表的「擴充功能 > Apps Script」建立，或填入 SPREADSHEET_ID。");
  return active;
}
function ensureSheet_(name, headers) {
  const ss = getBook_();
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(headers);
  return sh;
}
function setup() {
  ensureSheet_(SHEET_NAMES.students, ["時間", "姓名或代號", "班級", "小組"]);
  ensureSheet_(SHEET_NAMES.observations, ["時間", "姓名或代號", "班級", "小組", "植物代碼", "植物類型", "事件", "觀察內容"]);
  ensureSheet_(SHEET_NAMES.assessments, ["時間", "姓名或代號", "班級", "小組", "得分", "總題數", "作答紀錄"]);
  return "資料表建立完成";
}
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:"Aquatic Plants Learning API",message:"API is ready"}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);
    const now = data.timestamp ? new Date(data.timestamp) : new Date();
    const student = data.student || {};
    // 每次收到資料時同步更新學生資料，避免只在首頁儲存而漏掉
    if (student.name) {
      ensureSheet_(SHEET_NAMES.students, ["時間", "姓名或代號", "班級", "小組"])
        .appendRow([now, student.name || "", student.className || "", student.team || ""]);
    }
    if (data.type === "observation") {
      ensureSheet_(SHEET_NAMES.observations, ["時間", "姓名或代號", "班級", "小組", "植物代碼", "植物類型", "事件", "觀察內容"])
        .appendRow([now, student.name || "", student.className || "", student.team || "", data.plant || "", data.plantName || "", data.event || "markerFound", data.note || "完成 AR 植物觀察"]);
    } else if (data.type === "assessment") {
      ensureSheet_(SHEET_NAMES.assessments, ["時間", "姓名或代號", "班級", "小組", "得分", "總題數", "作答紀錄"])
        .appendRow([now, student.name || "", student.className || "", student.team || "", data.score || 0, data.total || 0, JSON.stringify(data.answers || [])]);
    } else {
      throw new Error("不支援的資料類型：" + data.type);
    }
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
