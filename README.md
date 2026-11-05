# 水生植物探險隊｜AR 互動學習平台

正式網站網址：https://kodak940610.github.io/aquatic-plants/

## 本版本功能
- 學生首頁：探險家資料、四種水生植物探索、任務說明、學習進度。
- 四種獨立 QR Code：分別開啟挺水性、浮葉性、沉水性、漂浮性 AR 頁面。
- AR.js 自訂 Pattern Marker：四種植物共用一張辨識標記卡。
- A-Frame 互動示意模型：可自動旋轉、停止旋轉、重設視角，點擊模型構造顯示說明。
- 學習挑戰：五題分類評量，提供逐題回饋與分數。
- GAS 後端：記錄 AR 標記辨識、模型構造點擊與個別評量。
- Google 試算表：自動建立「學生資料」「AR觀察紀錄」「個別評量」工作表。

## GitHub Pages 部署
1. 下載並解壓縮本專案 ZIP。
2. 開啟 GitHub Repository `aquatic-plants`。
3. 將 ZIP 內 `aquatic-plants/` 資料夾中的所有檔案與資料夾上傳到 Repository 根目錄（不是把整個資料夾再包一層）。
4. 若 GitHub 詢問覆蓋，請更新 `index.html`、`ar.html`、`assets/`；也可保留舊版備份。
5. 到 Settings → Pages，確認部署來源為 `main` 分支、`/(root)`。
6. 等待部署後開啟 https://kodak940610.github.io/aquatic-plants/。

## Google Apps Script 設定
1. 建立一份 Google 試算表，名稱可設為「水生植物探險隊學習紀錄」。
2. 在試算表選「擴充功能 → Apps Script」。
3. 將 `gas/Code.gs` 全部內容貼到 Apps Script 的 `Code.gs`，取代預設程式碼。
4. 儲存後，先在函式選單選 `setup` 並執行一次，授權存取試算表。
5. 選「部署 → 新增部署 → 網頁應用程式」。
6. 執行身分選「我」；誰可以存取選「任何人」。
7. 部署後複製 `/exec` 結尾的網址。
8. 回到學生網站首頁，在「教師資料連線（GAS 網址）」貼上 `/exec` 網址，並儲存探險家資料。
9. 學生完成 AR 觀察或測驗後，資料會送到試算表。

若 Apps Script 不是由目標試算表內開啟，請在 `Code.gs` 最上方 `SPREADSHEET_ID` 填入試算表 ID。

## QR Code 目的地
- 挺水性：https://kodak940610.github.io/aquatic-plants/ar.html?plant=emergent
- 浮葉性：https://kodak940610.github.io/aquatic-plants/ar.html?plant=floating-leaf
- 沉水性：https://kodak940610.github.io/aquatic-plants/ar.html?plant=submerged
- 漂浮性：https://kodak940610.github.io/aquatic-plants/ar.html?plant=free-floating

## 列印與使用 AR
- 列印 `assets/markers/shared-marker-card.png`，建議標記圖案寬 12–15 公分。
- 列印四張 `assets/cards/` 任務卡，學生掃描 QR Code 進入指定植物。
- AR 頁面啟動相機後，將鏡頭對準共用辨識標記。
- 保持光線充足、避免反光；標記須完整進入相機畫面。
- 網站為 HTTPS，可供手機瀏覽器申請相機權限。若相機無法啟動，請檢查瀏覽器權限及校園網路是否封鎖 CDN。

## 技術與限制
- 前端：HTML、CSS、JavaScript、A-Frame 1.4.2、AR.js 3.4.7。
- 後端：Google Apps Script Web App。
- 資料：Google 試算表；學生端另以 localStorage 暫存姓名與進度。
- 不使用 Firebase 或其他資料庫。
- 目前植物模型是程式組成的低多邊形教學示意模型，並非實際植物掃描模型；若需更精細模型，可日後替換成 GLB/GLTF。
- 本套件已產生 `.patt` 與對應列印標記，但尚未在你的實際手機、平板與校園網路環境完成端到端測試。上線後請先用教師帳號測試一筆觀察與一筆測驗，再讓全班使用。
- 因前端使用 `fetch` 的 `no-cors` 模式，瀏覽器不會回傳可讀取的後端回應；請以試算表是否新增資料列作為送出成功的確認方式。
