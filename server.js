const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const rootDir = __dirname;
const port = Number(process.env.PORT || 8788);

app.use(express.json({ limit: "256kb" }));
app.use(express.static(rootDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/emulate", (req, res) => {
  const payload = req.body || {};
  const scriptPath = path.join(rootDir, "scripts", "playwright-emulate.mjs");

  const child = spawn(process.execPath, [scriptPath, JSON.stringify(payload)], {
    cwd: rootDir,
    detached: true,
    stdio: "ignore",
  });

  child.unref();
  res.status(202).json({ ok: true });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Frame My Screen server listening on http://localhost:${port}`);
});
