const STORAGE_KEY = "frame-my-screen-state";
const SCENE_WIDTH = 3800;
const SCENE_HEIGHT = 2600;
const FRAME_X = 1120;
const FRAME_Y = 220;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

const DEVICE_LIBRARY = [
  { id: "iphone-se", label: "iPhone SE", type: "phone", width: 375, height: 667, emulationKey: "iPhone SE" },
  { id: "iphone-13-mini", label: "iPhone 13 mini", type: "phone", width: 375, height: 812, emulationKey: "iPhone 13 Mini" },
  { id: "iphone-15", label: "iPhone 15", type: "phone", width: 393, height: 852, emulationKey: "iPhone 14" },
  { id: "iphone-15-pro", label: "iPhone 15 Pro", type: "phone", width: 393, height: 852, emulationKey: "iPhone 15 Pro" },
  { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", type: "phone", width: 430, height: 932, emulationKey: "iPhone 15 Pro Max" },
  { id: "iphone-16", label: "iPhone 16", type: "phone", width: 402, height: 874, emulationKey: "iPhone 14 Pro" },
  { id: "iphone-16-pro", label: "iPhone 16 Pro", type: "phone", width: 402, height: 874, emulationKey: "iPhone 15 Pro" },
  { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", type: "phone", width: 440, height: 956, emulationKey: "iPhone 15 Pro Max" },
  { id: "pixel-7", label: "Pixel 7", type: "phone", width: 412, height: 915, emulationKey: "Pixel 7" },
  { id: "pixel-8", label: "Pixel 8", type: "phone", width: 412, height: 915, emulationKey: "Pixel 7" },
  { id: "pixel-8-pro", label: "Pixel 8 Pro", type: "phone", width: 448, height: 998, emulationKey: "Pixel 7" },
  { id: "pixel-9-pro-xl", label: "Pixel 9 Pro XL", type: "phone", width: 448, height: 998, emulationKey: "Pixel 7" },
  { id: "galaxy-s23", label: "Galaxy S23", type: "phone", width: 360, height: 780, emulationKey: "Galaxy S9+" },
  { id: "galaxy-s24", label: "Galaxy S24", type: "phone", width: 384, height: 854, emulationKey: "Galaxy S9+" },
  { id: "galaxy-s24-ultra", label: "Galaxy S24 Ultra", type: "phone", width: 412, height: 915, emulationKey: "Galaxy S9+" },
  { id: "surface-duo", label: "Surface Duo", type: "phone", width: 540, height: 720, emulationKey: "Surface Duo" },
  { id: "ipad-mini", label: "iPad mini", type: "tablet", width: 744, height: 1133, emulationKey: "iPad Mini" },
  { id: "ipad-10th", label: "iPad 10.9", type: "tablet", width: 820, height: 1180, emulationKey: "iPad (gen 7)" },
  { id: "ipad-air-11", label: "iPad Air 11", type: "tablet", width: 834, height: 1194, emulationKey: "iPad Pro 11" },
  { id: "ipad-air-13", label: "iPad Air 13", type: "tablet", width: 1024, height: 1366, emulationKey: "iPad Pro 12.9" },
  { id: "ipad-pro-11", label: "iPad Pro 11", type: "tablet", width: 834, height: 1194, emulationKey: "iPad Pro 11" },
  { id: "ipad-pro-13", label: "iPad Pro 13", type: "tablet", width: 1032, height: 1376, emulationKey: "iPad Pro 12.9" },
  { id: "galaxy-tab-s9", label: "Galaxy Tab S9", type: "tablet", width: 800, height: 1280, emulationKey: "Galaxy Tab S4" },
  { id: "galaxy-tab-s9-plus", label: "Galaxy Tab S9+", type: "tablet", width: 1104, height: 1752, emulationKey: "Galaxy Tab S4 landscape" },
  { id: "surface-pro", label: "Surface Pro", type: "tablet", width: 912, height: 1368, emulationKey: "Desktop Chrome HiDPI" },
  { id: "small-laptop", label: "Laptop 13\"", type: "desktop", width: 1280, height: 800, emulationKey: "Desktop Chrome" },
  { id: "macbook-air-13", label: "MacBook Air 13", type: "desktop", width: 1440, height: 900, emulationKey: "Desktop Chrome" },
  { id: "macbook-pro-14", label: "MacBook Pro 14", type: "desktop", width: 1512, height: 982, emulationKey: "Desktop Chrome HiDPI" },
  { id: "macbook-pro-16", label: "MacBook Pro 16", type: "desktop", width: 1728, height: 1117, emulationKey: "Desktop Chrome HiDPI" },
  { id: "surface-laptop", label: "Surface Laptop", type: "desktop", width: 1504, height: 1003, emulationKey: "Desktop Edge HiDPI" },
  { id: "wxga", label: "WXGA", type: "desktop", width: 1280, height: 800, emulationKey: "Desktop Chrome" },
  { id: "hd", label: "HD 720p", type: "desktop", width: 1366, height: 768, emulationKey: "Desktop Chrome" },
  { id: "full-hd", label: "Full HD", type: "desktop", width: 1920, height: 1080, emulationKey: "Desktop Chrome HiDPI" },
  { id: "qhd", label: "QHD", type: "desktop", width: 2560, height: 1440, emulationKey: "Desktop Chrome HiDPI" },
  { id: "4k", label: "4K UHD", type: "desktop", width: 3840, height: 2160, emulationKey: "Desktop Chrome HiDPI" },
  { id: "ultrawide", label: "Ultrawide", type: "desktop", width: 3440, height: 1440, emulationKey: "Desktop Chrome HiDPI" },
];

const DEFAULT_STATE = {
  url: "https://example.com",
  width: 1440,
  height: 900,
  mode: "Desktop",
  framed: true,
  deviceFilter: "all",
  deviceSort: "name",
  deviceQuery: "",
  selectedDeviceId: "macbook-air-13",
  autoSyncPopup: true,
  zoom: 0.75,
};

const DEFAULT_PANEL_LAYOUTS = [
  { top: 180, left: 80, width: 380 },
  { top: 180, left: 3300, width: 340 },
];

const els = {
  stage: document.querySelector("#stage"),
  canvasScaler: document.querySelector("#canvas-scaler"),
  canvasScene: document.querySelector("#canvas-scene"),
  zoomOut: document.querySelector("#zoom-out"),
  zoomReset: document.querySelector("#zoom-reset"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomReadout: document.querySelector("#zoom-readout"),
  urlForm: document.querySelector("#url-form"),
  urlInput: document.querySelector("#url-input"),
  sizeForm: document.querySelector("#size-form"),
  widthInput: document.querySelector("#width-input"),
  heightInput: document.querySelector("#height-input"),
  previewFrame: document.querySelector("#preview-frame"),
  viewportFrame: document.querySelector("#viewport-frame"),
  viewportShell: document.querySelector("#viewport-shell"),
  sizeReadout: document.querySelector("#size-readout"),
  modeReadout: document.querySelector("#mode-readout"),
  previewModeReadout: document.querySelector("#preview-mode-readout"),
  orientationToggle: document.querySelector("#orientation-toggle"),
  fitStage: document.querySelector("#fit-stage"),
  centerPanels: document.querySelector("#center-panels"),
  deviceFrameToggle: document.querySelector("#device-frame-toggle"),
  autoSyncPopupToggle: document.querySelector("#auto-sync-popup-toggle"),
  openExternal: document.querySelector("#open-external"),
  openPopup: document.querySelector("#open-popup"),
  syncPopup: document.querySelector("#sync-popup"),
  openEmulation: document.querySelector("#open-emulation"),
  toastTemplate: document.querySelector("#toast-template"),
  resizeHandles: [...document.querySelectorAll(".resize-handle")],
  panels: [...document.querySelectorAll("[data-panel]")],
  deviceList: document.querySelector("#device-list"),
  deviceSearch: document.querySelector("#device-search"),
  deviceSort: document.querySelector("#device-sort"),
  filterChips: [...document.querySelectorAll(".filter-chip")],
};

let state = loadState();
let resizeSession = null;
let loadedUrl = "";
let popupWindow = null;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeUrl(input) {
  if (!input) {
    return DEFAULT_STATE.url;
  }
  if (/^https?:\/\//i.test(input)) {
    return input;
  }
  if (/^localhost[:/]|^127\.0\.0\.1[:/]/.test(input)) {
    return `http://${input}`;
  }
  return `https://${input}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getTypeLabel(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getSelectedDevice() {
  return DEVICE_LIBRARY.find((device) => device.id === state.selectedDeviceId) || null;
}

function getFilteredDevices() {
  const query = state.deviceQuery.trim().toLowerCase();
  let devices = DEVICE_LIBRARY.filter((device) => {
    const matchesFilter = state.deviceFilter === "all" || device.type === state.deviceFilter;
    const matchesQuery =
      !query ||
      device.label.toLowerCase().includes(query) ||
      `${device.width}x${device.height}`.includes(query) ||
      `${device.width} × ${device.height}`.includes(query);
    return matchesFilter && matchesQuery;
  });

  if (state.deviceSort === "width-desc") {
    devices = devices.sort((a, b) => b.width - a.width || a.label.localeCompare(b.label));
  } else if (state.deviceSort === "height-desc") {
    devices = devices.sort((a, b) => b.height - a.height || a.label.localeCompare(b.label));
  } else {
    devices = devices.sort((a, b) => a.label.localeCompare(b.label));
  }

  return devices;
}

function renderDeviceList() {
  const devices = getFilteredDevices();
  els.deviceList.innerHTML = "";

  if (!devices.length) {
    const empty = document.createElement("p");
    empty.className = "device-empty";
    empty.textContent = "No devices match this filter.";
    els.deviceList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  devices.forEach((device) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "device-card";
    if (state.selectedDeviceId === device.id) {
      button.classList.add("is-active");
    }

    button.innerHTML = `
      <span class="device-card-top">
        <strong>${device.label}</strong>
        <span class="device-type">${getTypeLabel(device.type)}</span>
      </span>
      <span class="device-dimensions">${device.width} × ${device.height}</span>
    `;

    button.addEventListener("click", () => {
      applyState({
        width: device.width,
        height: device.height,
        mode: device.label,
        selectedDeviceId: device.id,
      });
    });

    fragment.appendChild(button);
  });

  els.deviceList.appendChild(fragment);
}

function applyCanvasZoom() {
  const zoom = clamp(Number(state.zoom) || DEFAULT_STATE.zoom, ZOOM_MIN, ZOOM_MAX);
  state.zoom = zoom;
  els.canvasScene.style.transform = `scale(${zoom})`;
  els.canvasScaler.style.width = `${SCENE_WIDTH * zoom}px`;
  els.canvasScaler.style.height = `${SCENE_HEIGHT * zoom}px`;
  els.zoomReadout.textContent = `${Math.round(zoom * 100)}%`;
  els.zoomReset.textContent = `${Math.round(zoom * 100)}%`;
}

function centerViewport() {
  const zoom = state.zoom;
  const targetLeft = FRAME_X * zoom - (els.stage.clientWidth - state.width * zoom) / 2;
  const targetTop = FRAME_Y * zoom - (els.stage.clientHeight - state.height * zoom) / 2;
  els.stage.scrollTo({
    left: Math.max(targetLeft, 0),
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}

function resetPanels() {
  els.panels.forEach((panel, index) => {
    const fallback = DEFAULT_PANEL_LAYOUTS[index] || DEFAULT_PANEL_LAYOUTS[0];
    panel.style.top = `${fallback.top}px`;
    panel.style.left = `${fallback.left}px`;
    panel.style.right = "auto";
    panel.style.width = `${fallback.width}px`;
  });
}

function isPopupOpen() {
  return Boolean(popupWindow && !popupWindow.closed);
}

function getPopupFeatures() {
  const width = clamp(state.width + 24, 240, 4200);
  const height = clamp(state.height + 96, 240, 4200);
  return `popup=yes,width=${width},height=${height},left=80,top=80,resizable=yes,scrollbars=yes`;
}

function reopenPopupWindow({ focus = false } = {}) {
  const reopened = window.open(state.url, "frame-my-screen-popup", getPopupFeatures());
  if (!reopened) {
    showToast("Popup blocked. Allow popups for this site.");
    return false;
  }
  popupWindow = reopened;
  if (focus) {
    popupWindow.focus();
  }
  els.previewModeReadout.textContent = "Popup Mode Active";
  return true;
}

function syncPopupWindow({ focus = false } = {}) {
  if (!isPopupOpen()) {
    showToast("Open the popup preview first.");
    return;
  }
  try {
    const beforeWidth = popupWindow.outerWidth;
    const beforeHeight = popupWindow.outerHeight;
    popupWindow.resizeTo(state.width + 24, state.height + 96);
    window.setTimeout(() => {
      if (!isPopupOpen()) {
        return;
      }
      const widthUnchanged = Math.abs((popupWindow.outerWidth || 0) - beforeWidth) < 8;
      const heightUnchanged = Math.abs((popupWindow.outerHeight || 0) - beforeHeight) < 8;
      if (widthUnchanged && heightUnchanged) {
        const reopened = reopenPopupWindow({ focus });
        if (reopened) {
          showToast("Popup reopened at the new size.");
        }
      }
    }, 160);
    if (focus) {
      popupWindow.focus();
    }
    els.previewModeReadout.textContent = "Popup Mode Active";
  } catch {
    const reopened = reopenPopupWindow({ focus });
    showToast(reopened ? "Browser blocked direct resize. Reopened popup at the new size." : "Browser blocked popup resize control.");
  }
}

function openPopupPreview() {
  if (isPopupOpen()) {
    try {
      popupWindow.location.href = state.url;
      syncPopupWindow({ focus: true });
      return;
    } catch {
      popupWindow = null;
    }
  }
  if (reopenPopupWindow({ focus: true })) {
    window.setTimeout(() => syncPopupWindow({ focus: true }), 120);
  }
}

function maybeSyncPopup() {
  if (state.autoSyncPopup && isPopupOpen()) {
    syncPopupWindow();
  }
}

async function openDeviceEmulation() {
  const selectedDevice = getSelectedDevice();
  const payload = {
    url: state.url,
    width: state.width,
    height: state.height,
    deviceId: selectedDevice?.id || "",
    deviceLabel: selectedDevice?.label || state.mode,
    emulationKey: selectedDevice?.emulationKey || "",
    type: selectedDevice?.type || "desktop",
  };

  if (window.frameDesktop?.openDeviceEmulation) {
    try {
      await window.frameDesktop.openDeviceEmulation(payload);
      showToast(`Opened emulation for ${payload.deviceLabel}.`);
      return;
    } catch (error) {
      showToast(error?.message || "Unable to launch device emulation.");
      return;
    }
  }

  showToast("Device emulation runs from the local Electron app. Static deploys support responsive and popup modes only.");
}

function updateViewport() {
  const width = clamp(Number(state.width) || DEFAULT_STATE.width, 120, 4000);
  const height = clamp(Number(state.height) || DEFAULT_STATE.height, 120, 4000);

  state.width = width;
  state.height = height;
  applyCanvasZoom();

  els.viewportShell.style.left = `${FRAME_X}px`;
  els.viewportShell.style.top = `${FRAME_Y}px`;
  els.viewportFrame.style.width = `${width}px`;
  els.viewportFrame.style.height = `${height}px`;

  if (loadedUrl !== state.url) {
    els.previewFrame.src = state.url;
    loadedUrl = state.url;
  }

  els.urlInput.value = state.url;
  els.widthInput.value = String(width);
  els.heightInput.value = String(height);
  els.sizeReadout.textContent = `${width} × ${height}`;
  els.modeReadout.textContent = state.mode;
  els.previewModeReadout.textContent = isPopupOpen() ? "Popup Mode Active" : "Embed Mode";
  els.deviceFrameToggle.checked = state.framed;
  els.autoSyncPopupToggle.checked = state.autoSyncPopup;
  els.viewportFrame.classList.toggle("is-raw", !state.framed);
  els.deviceSearch.value = state.deviceQuery;
  els.deviceSort.value = state.deviceSort;

  els.filterChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.filter === state.deviceFilter);
  });

  renderDeviceList();
  persistState();
  maybeSyncPopup();
}

function applyState(patch) {
  state = { ...state, ...patch };
  updateViewport();
}

function showToast(message) {
  const node = els.toastTemplate.content.firstElementChild.cloneNode(true);
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 2200);
}

function onResizePointerDown(event) {
  const direction = event.target.dataset.resize;
  if (!direction) {
    return;
  }

  resizeSession = {
    direction,
    startX: event.clientX,
    startY: event.clientY,
    startWidth: state.width,
    startHeight: state.height,
  };

  window.addEventListener("pointermove", onResizePointerMove);
  window.addEventListener("pointerup", onResizePointerUp);
}

function onResizePointerMove(event) {
  if (!resizeSession) {
    return;
  }

  const deltaX = (event.clientX - resizeSession.startX) / state.zoom;
  const deltaY = (event.clientY - resizeSession.startY) / state.zoom;
  const next = { mode: "Custom", selectedDeviceId: "" };

  if (resizeSession.direction.includes("e")) {
    next.width = clamp(resizeSession.startWidth + deltaX, 120, 4000);
  }
  if (resizeSession.direction.includes("s")) {
    next.height = clamp(resizeSession.startHeight + deltaY, 120, 4000);
  }
  if (resizeSession.direction.includes("n")) {
    next.height = clamp(resizeSession.startHeight - deltaY, 120, 4000);
  }

  applyState(next);
}

function onResizePointerUp() {
  resizeSession = null;
  window.removeEventListener("pointermove", onResizePointerMove);
  window.removeEventListener("pointerup", onResizePointerUp);
}

function initPanelDragging() {
  els.panels.forEach((panel) => {
    const handle = panel.querySelector("[data-drag-handle]");
    if (!handle) {
      return;
    }

    handle.addEventListener("pointerdown", (event) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        return;
      }

      const rect = panel.getBoundingClientRect();
      const sceneRect = els.canvasScene.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / state.zoom;
      const offsetY = (event.clientY - rect.top) / state.zoom;
      const panelWidth = rect.width / state.zoom;
      const panelHeight = rect.height / state.zoom;

      handle.setPointerCapture(event.pointerId);

      function move(moveEvent) {
        const nextLeft = clamp((moveEvent.clientX - sceneRect.left) / state.zoom - offsetX, 8, SCENE_WIDTH - panelWidth - 8);
        const nextTop = clamp((moveEvent.clientY - sceneRect.top) / state.zoom - offsetY, 80, SCENE_HEIGHT - panelHeight - 8);
        panel.style.left = `${nextLeft}px`;
        panel.style.top = `${nextTop}px`;
        panel.style.right = "auto";
      }

      function up() {
        handle.releasePointerCapture(event.pointerId);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      }

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  });
}

els.urlForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyState({ url: normalizeUrl(els.urlInput.value.trim()) });
  if (isPopupOpen()) {
    try {
      popupWindow.location.href = state.url;
    } catch {
      popupWindow = null;
    }
  }
});

els.sizeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyState({
    width: Number(els.widthInput.value),
    height: Number(els.heightInput.value),
    mode: "Custom",
    selectedDeviceId: "",
  });
});

els.orientationToggle.addEventListener("click", () => {
  applyState({
    width: state.height,
    height: state.width,
    mode: `${state.mode} Rotated`,
    selectedDeviceId: "",
  });
});

els.fitStage.addEventListener("click", centerViewport);
els.centerPanels.addEventListener("click", resetPanels);

els.zoomOut.addEventListener("click", () => applyState({ zoom: clamp(state.zoom - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX) }));
els.zoomReset.addEventListener("click", () => applyState({ zoom: 1 }));
els.zoomIn.addEventListener("click", () => applyState({ zoom: clamp(state.zoom + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX) }));

els.deviceFrameToggle.addEventListener("change", (event) => {
  applyState({ framed: event.target.checked });
});

els.autoSyncPopupToggle.addEventListener("change", (event) => {
  applyState({ autoSyncPopup: event.target.checked });
});

els.deviceSearch.addEventListener("input", (event) => {
  applyState({ deviceQuery: event.target.value });
});

els.deviceSort.addEventListener("change", (event) => {
  applyState({ deviceSort: event.target.value });
});

els.filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    applyState({ deviceFilter: chip.dataset.filter });
  });
});

els.openExternal.addEventListener("click", () => {
  window.open(state.url, "_blank", "noopener,noreferrer");
});

els.openPopup.addEventListener("click", openPopupPreview);
els.syncPopup.addEventListener("click", () => syncPopupWindow({ focus: true }));
els.openEmulation.addEventListener("click", openDeviceEmulation);

els.previewFrame.addEventListener("load", () => {
  try {
    showToast(`Loaded ${new URL(state.url).host}`);
  } catch {
    showToast("Preview loaded.");
  }
});

els.previewFrame.addEventListener("error", () => {
  showToast("This URL could not be previewed in the iframe.");
});

els.resizeHandles.forEach((handle) => {
  handle.addEventListener("pointerdown", onResizePointerDown);
});

window.addEventListener("beforeunload", () => {
  if (isPopupOpen()) {
    popupWindow.close();
  }
});

initPanelDragging();
resetPanels();
updateViewport();
window.setTimeout(centerViewport, 80);
