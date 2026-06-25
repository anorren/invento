const assets = {
  mic: "assets/device-shure-sm58.jpg",
  mixer: "assets/device-mixer.jpg",
  speaker: "assets/device-speaker.jpg",
  wireless: "assets/device-wireless.jpg",
  headphones: "assets/device-headphones.jpg",
  recorder: "assets/device-recorder.jpg",
  stand: "assets/device-stand.jpg",
  dibox: "assets/device-di-box.jpg"
};

const categories = [
  "Mikrofone",
  "Mixer",
  "Lautsprecher",
  "Funkanlagen",
  "Kopfhörer",
  "Recorder",
  "Stative",
  "DI-Boxen",
  "LED PAR",
  "Moving Heads",
  "DMX / Steuerung",
  "Kabel"
];

const locations = [
  "Tontechnik-Sammlung",
  "Lichttechnik-Sammlung",
  "Großer Musiksaal",
  "Schulungsraumtechnik",
  "Kleiner Musiksaal"
];
const purchaseYears = Array.from({ length: 41 }, (_, index) => String(2000 + index));
const storageKey = "invento.inventory.v2";
const accessExpiresStorageKey = "invento.access.expiresAt.v1";
const accessSessionMs = 2 * 60 * 60 * 1000;
const supabaseTable = "inventory_items";

const inventoryIdRules = {
  category: {
    Mikrofone: { area: "AT", code: "MIC" },
    Mixer: { area: "AT", code: "MIX" },
    Lautsprecher: { area: "AT", code: "SPK" },
    Funkanlagen: { area: "AT", code: "WLS" },
    Kopfhörer: { area: "AT", code: "HPH" },
    Recorder: { area: "AT", code: "REC" },
    Stative: { area: "AT", code: "STD" },
    "DI-Boxen": { area: "AT", code: "DIB" },
    Kabel: { area: "AT", code: "CBL" },
    "LED PAR": { area: "LT", code: "PAR" },
    "Moving Heads": { area: "LT", code: "MH" },
    "DMX / Steuerung": { area: "LT", code: "DMX" }
  },
  ignoredProductWords: new Set([
    "SHURE",
    "YAMAHA",
    "JBL",
    "SENNHEISER",
    "AUDIO",
    "TECHNICA",
    "EUROLITE",
    "SHOWTEC",
    "ROLAND",
    "KLOTZ",
    "K&M",
    "LED",
    "PAR",
    "RGB",
    "PRO",
    "THE",
    "UND",
    "SET"
  ])
};

const initialDevices = [
  {
    id: "A12-0047",
    name: "Shure SM58",
    kind: "audio",
    category: "Mikrofone",
    location: "Raum A12",
    status: "done",
    condition: "Sehr gut",
    serial: "3BR12345678",
    accessory: "Zubehör vollständig",
    image: assets.mic,
    minutes: 1,
    lastService: "14.02.2024",
    nextServiceDays: 158,
    notes: "Funktionstest durchgeführt - einwandfrei. Windschutz vorhanden.",
    duplicate: {
      id: "AT-MIC-SM58-000",
      name: "Shure SM58",
      location: "Raum A12",
      seen: "12.05.2024",
      image: assets.mic
    },
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": false
    }
  },
  {
    id: "A12-0046",
    name: "Yamaha MG10XU",
    kind: "audio",
    category: "Mixer",
    location: "Raum A12",
    status: "done",
    condition: "Sehr gut",
    serial: "YMX10-77412",
    accessory: "Zubehör vollständig",
    image: assets.mixer,
    minutes: 3,
    lastService: "02.03.2024",
    nextServiceDays: 110,
    notes: "Netzteil und USB-Kabel im Case. Alle Kanäle kurz geprüft.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "A12-0045",
    name: "JBL EON615",
    kind: "audio",
    category: "Lautsprecher",
    location: "Aula",
    status: "done",
    condition: "Gebrauchsspuren",
    serial: "EON615-22A9",
    accessory: "Zubehör vollständig",
    image: assets.speaker,
    minutes: 5,
    lastService: "05.01.2024",
    nextServiceDays: 64,
    notes: "Leichte Kratzer am Gehäuse. Funktionsprüfung OK.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "A12-0044",
    name: "Sennheiser XSW-D",
    kind: "audio",
    category: "Funkanlagen",
    location: "Aula",
    status: "open",
    condition: "Gebrauchsspuren",
    serial: "XSWD-19340",
    accessory: "Zubehör teilweise",
    image: assets.wireless,
    minutes: 7,
    lastService: "18.11.2023",
    nextServiceDays: -12,
    notes: "Empfänger vorhanden. Bitte Akkulaufzeit erneut prüfen.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: false,
      "Zubehör / Notizen": false
    }
  },
  {
    id: "A12-0043",
    name: "Audio-Technica ATH-M50x",
    kind: "audio",
    category: "Kopfhörer",
    location: "Tonstudio",
    status: "done",
    condition: "Sehr gut",
    serial: "ATH50-88219",
    accessory: "Zubehör vollständig",
    image: assets.headphones,
    minutes: 9,
    lastService: "20.04.2024",
    nextServiceDays: 210,
    notes: "Kabel und Tasche vorhanden.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "A12-0042",
    name: "Zoom H4n Pro",
    kind: "audio",
    category: "Recorder",
    location: "Regieraum",
    status: "done",
    condition: "Sehr gut",
    serial: "ZH4N-44382",
    accessory: "Zubehör vollständig",
    image: assets.recorder,
    minutes: 11,
    lastService: "01.05.2024",
    nextServiceDays: 190,
    notes: "SD-Karte entfernt, Batteriefach sauber.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "A12-0041",
    name: "K&M Mikrofonständer",
    kind: "audio",
    category: "Stative",
    location: "Raum A12",
    status: "done",
    condition: "Sehr gut",
    serial: "KM210-0041",
    accessory: "Zubehör vollständig",
    image: assets.stand,
    minutes: 13,
    lastService: "10.04.2024",
    nextServiceDays: 230,
    notes: "Gewinde und Ausleger laufen sauber.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "A12-0040",
    name: "Roland DI-Box",
    kind: "audio",
    category: "DI-Boxen",
    location: "Tonstudio",
    status: "done",
    condition: "Sehr gut",
    serial: "RDI-20881",
    accessory: "Zubehör vollständig",
    image: assets.dibox,
    minutes: 15,
    lastService: "09.02.2024",
    nextServiceDays: 140,
    notes: "Klinke/XLR sauber, Ground-Lift geprüft.",
    duplicate: null,
    checklist: {
      "Foto erfasst": true,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": true
    }
  },
  {
    id: "L12-0039",
    name: "Eurolite LED PAR RGB",
    kind: "lighting",
    category: "LED PAR",
    location: "Lichtlager",
    status: "open",
    condition: "Sehr gut",
    serial: "EL-PAR-9318",
    accessory: "Zubehör vollständig",
    image: null,
    fixtureColor: "#1d4ed8",
    minutes: 18,
    lastService: "24.03.2024",
    nextServiceDays: 175,
    notes: "DMX-Adresse auf 001 zurückgesetzt.",
    duplicate: null,
    checklist: {
      "Foto erfasst": false,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": false
    }
  },
  {
    id: "L12-0038",
    name: "Showtec Phantom 50",
    kind: "lighting",
    category: "Moving Heads",
    location: "Bühne",
    status: "open",
    condition: "Gebrauchsspuren",
    serial: "PH50-7731",
    accessory: "Zubehör teilweise",
    image: null,
    fixtureColor: "#f59e0b",
    minutes: 21,
    lastService: "12.12.2023",
    nextServiceDays: -24,
    notes: "Omega-Bracket fehlt bei einem Gerät. Pan/Tilt prüfen.",
    duplicate: null,
    checklist: {
      "Foto erfasst": false,
      "Inventar-ID": true,
      Kategorie: true,
      Standort: true,
      Zustand: false,
      "Zubehör / Notizen": true
    }
  }
];

const accessPage = document.querySelector("#accessPage");
const accessForm = document.querySelector("#accessForm");
const accessEmailInput = document.querySelector("#accessEmailInput");
const accessPasswordInput = document.querySelector("#accessPasswordInput");
const accessSubmitButton = document.querySelector("#accessSubmitButton");
const accessError = document.querySelector("#accessError");
const landingPage = document.querySelector("#landingPage");
const inventoryApp = document.querySelector("#inventoryApp");
const addProductButton = document.querySelector("#addProductButton");
const editProductsButton = document.querySelector("#editProductsButton");
const landingScanButton = document.querySelector("#landingScanButton");
const openInventoryTopButton = document.querySelector("#openInventoryTopButton");
const addProductTopButton = document.querySelector("#addProductTopButton");
const logoutLandingButton = document.querySelector("#logoutLandingButton");
const landingTotalCount = document.querySelector("#landingTotalCount");
const landingCapturedCount = document.querySelector("#landingCapturedCount");
const landingAreaCount = document.querySelector("#landingAreaCount");
const brandHomeButton = document.querySelector("#brandHomeButton");
const homeButton = document.querySelector("#homeButton");
const addProductInventoryButton = document.querySelector("#addProductInventoryButton");
const logoutButton = document.querySelector("#logoutButton");
const queueList = document.querySelector("#queueList");
const queueCount = document.querySelector("#queueCount");
const queueTotalText = document.querySelector("#queueTotalText");
const filterStrip = document.querySelector("#filterStrip");
const filterButton = document.querySelector("#filterButton");
const densityButton = document.querySelector("#densityButton");
const clearDoneButton = document.querySelector("#clearDoneButton");
const pauseButton = document.querySelector("#pauseButton");
const runStateLabel = document.querySelector("#runStateLabel");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressPercent = document.querySelector("#progressPercent");
const devicePhoto = document.querySelector("#devicePhoto");
const captureState = document.querySelector("#captureState");
const manufacturerInput = document.querySelector("#manufacturerInput");
const productModelInput = document.querySelector("#productModelInput");
const assetIdInput = document.querySelector("#assetIdInput");
const categoryInput = document.querySelector("#categoryInput");
const locationInput = document.querySelector("#locationInput");
const serialInput = document.querySelector("#serialInput");
const purchaseYearInput = document.querySelector("#purchaseYearInput");
const purchaseCostInput = document.querySelector("#purchaseCostInput");
const accessoryInput = document.querySelector("#accessoryInput");
const notesInput = document.querySelector("#notesInput");
const notesCount = document.querySelector("#notesCount");
const checklist = document.querySelector("#checklist");
const checklistCount = document.querySelector("#checklistCount");
const duplicateCard = document.querySelector("#duplicateCard");
const duplicateImage = document.querySelector("#duplicateImage");
const duplicateId = document.querySelector("#duplicateId");
const duplicateName = document.querySelector("#duplicateName");
const duplicateMeta = document.querySelector("#duplicateMeta");
const lastService = document.querySelector("#lastService");
const serviceState = document.querySelector("#serviceState");
const nextService = document.querySelector("#nextService");
const saveNextButton = document.querySelector("#saveNextButton");
const deleteProductButton = document.querySelector("#deleteProductButton");
const markBrokenButton = document.querySelector("#markBrokenButton");
const backButton = document.querySelector("#backButton");
const manualIdButton = document.querySelector("#manualIdButton");
const photoButton = document.querySelector("#photoButton");
const qrCodeBox = document.querySelector("#qrCodeBox");
const qrAssetId = document.querySelector("#qrAssetId");
const qrDeviceName = document.querySelector("#qrDeviceName");
const qrMeta = document.querySelector("#qrMeta");
const downloadQrButton = document.querySelector("#downloadQrButton");
const printQrButton = document.querySelector("#printQrButton");
const printLabel = document.querySelector("#printLabel");
const toast = document.querySelector("#toast");

let storedState = null;
let devices = [];
let selectedId = "";
let activeFilter = "all";
let hideDone = false;
let paused = false;
let toastTimer = null;
let draftCounter = 1;
let supabaseClient = null;
let dataMode = "local";
let remoteSaveTimer = null;
let inventoryInitialized = false;

function isAccessSessionCurrent() {
  const expiresAt = Number(localStorage.getItem(accessExpiresStorageKey) || "0");
  if (!expiresAt || Date.now() > expiresAt) {
    localStorage.removeItem(accessExpiresStorageKey);
    return false;
  }

  return true;
}

function extendAccessSession() {
  localStorage.setItem(accessExpiresStorageKey, String(Date.now() + accessSessionMs));
}

async function hasAccess() {
  if (!supabaseClient) {
    return false;
  }

  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    return false;
  }

  if (!isAccessSessionCurrent()) {
    await supabaseClient.auth.signOut();
    return false;
  }

  return true;
}

function grantAccess() {
  extendAccessSession();
  accessError.textContent = "";
  accessPasswordInput.value = "";
  showLanding();
}

async function revokeAccess() {
  localStorage.removeItem(accessExpiresStorageKey);
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  inventoryInitialized = false;
  devices = [];
  selectedId = "";
  showAccess();
  showToast("Abgemeldet");
}

function createOption(value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  return option;
}

function loadStoredState() {
  try {
    const rawState = localStorage.getItem(storageKey);
    if (!rawState) {
      return null;
    }

    const parsedState = JSON.parse(rawState);
    if (!Array.isArray(parsedState.devices)) {
      return null;
    }

    return parsedState;
  } catch (error) {
    console.warn("Invento konnte lokale Inventardaten nicht laden.", error);
    return null;
  }
}

function saveStoredState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      version: 1,
      savedAt: new Date().toISOString(),
      devices,
      selectedId,
      activeFilter,
      hideDone,
      paused,
      draftCounter
    }));
  } catch (error) {
    console.warn("Invento konnte lokale Inventardaten nicht speichern.", error);
  }
}

function hasSupabaseConfig() {
  const config = window.INVENTO_SUPABASE || {};
  return Boolean(config.url && config.anonKey && window.supabase?.createClient);
}

function initializeSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!hasSupabaseConfig()) {
    dataMode = "local";
    return null;
  }

  const config = window.INVENTO_SUPABASE;
  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  dataMode = "supabase";
  return supabaseClient;
}

function rowToDevice(row) {
  const payload = row.payload && typeof row.payload === "object" ? row.payload : {};
  return normalizeDeviceRecord({
    ...payload,
    dbId: row.id,
    id: row.asset_id,
    manufacturer: row.manufacturer,
    model: row.model,
    name: `${row.manufacturer} ${row.model}`.trim(),
    category: row.category,
    location: row.location,
    status: row.status,
    condition: row.condition,
    serial: row.serial,
    purchaseYear: row.purchase_year,
    purchaseCost: row.purchase_cost ?? "",
    accessory: row.accessory,
    notes: row.notes
  });
}

function deviceToRow(device) {
  const cost = normalizeCostValue(device.purchaseCost);
  const payload = {
    ...device,
    dbId: undefined
  };

  return {
    asset_id: device.id,
    manufacturer: device.manufacturer || "",
    model: device.model || "",
    category: device.category || "",
    location: device.location || "",
    status: device.status || "open",
    condition: device.condition || "",
    serial: device.serial || "",
    purchase_year: String(device.purchaseYear || ""),
    purchase_cost: cost ? Number.parseFloat(cost) : null,
    accessory: device.accessory || "",
    notes: device.notes || "",
    payload
  };
}

async function loadRemoteDevices() {
  if (!supabaseClient) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from(supabaseTable)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data.map(rowToDevice);
}

async function saveDeviceRemote(device) {
  if (!supabaseClient || !device?.id) {
    return;
  }

  const row = deviceToRow(device);
  let result;

  if (device.dbId) {
    result = await supabaseClient
      .from(supabaseTable)
      .update(row)
      .eq("id", device.dbId)
      .select("id")
      .single();
  } else {
    result = await supabaseClient
      .from(supabaseTable)
      .upsert(row, { onConflict: "asset_id" })
      .select("id")
      .single();
  }

  if (result.error) {
    throw result.error;
  }

  if (result.data?.id && !device.dbId) {
    devices = devices.map((item) => item.id === device.id ? { ...item, dbId: result.data.id } : item);
    saveStoredState();
  }
}

async function deleteDeviceRemote(device) {
  if (!supabaseClient || !device) {
    return;
  }

  const query = supabaseClient.from(supabaseTable).delete();
  const { error } = device.dbId
    ? await query.eq("id", device.dbId)
    : await query.eq("asset_id", device.id);

  if (error) {
    throw error;
  }
}

function queueRemoteSave(device = currentDevice()) {
  if (dataMode !== "supabase" || !device) {
    return;
  }

  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(async () => {
    try {
      await saveDeviceRemote(currentDevice());
      showToast("Mit Supabase synchronisiert");
    } catch (error) {
      console.warn("Invento konnte nicht mit Supabase synchronisieren.", error);
      showToast("Supabase-Sync fehlgeschlagen - lokal gespeichert");
    }
  }, 600);
}

async function initializeInventoryState() {
  initializeSupabaseClient();

  if (supabaseClient) {
    try {
      const remoteDevices = await loadRemoteDevices();
      if (Array.isArray(remoteDevices)) {
        devices = remoteDevices;
        selectedId = devices[0]?.id || "";
        saveStoredState();
        showToast(remoteDevices.length ? "Inventar aus Supabase geladen" : "Supabase-Inventar ist leer");
        return true;
      }
    } catch (error) {
      console.warn("Invento konnte Supabase-Daten nicht laden.", error);
      showToast("Supabase nicht erreichbar - lokaler Speicher aktiv");
      dataMode = "local";
    }
  }

  storedState = loadStoredState();

  if (storedState) {
    devices = structuredClone(storedState.devices).map(normalizeDeviceRecord);
    selectedId = devices.some((device) => device.id === storedState.selectedId)
      ? storedState.selectedId
      : devices[0]?.id || "";
    activeFilter = storedState.activeFilter || "all";
    hideDone = Boolean(storedState.hideDone);
    paused = Boolean(storedState.paused);
    draftCounter = Number.isInteger(storedState.draftCounter) ? storedState.draftCounter : 1;
    return true;
  }

  devices = [];
  selectedId = "";
  saveStoredState();
  return true;
}

async function prepareInventoryForSession() {
  if (inventoryInitialized) {
    return;
  }

  await initializeInventoryState();
  syncStoredUiState();
  render();
  inventoryInitialized = true;
}

function syncStoredUiState() {
  clearDoneButton.querySelector("span").textContent = hideDone ? "Alle Geräte anzeigen" : "Erledigte ausblenden";
  filterStrip.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
  runStateLabel.textContent = paused ? "Inventar pausiert" : "Inventar aktiv";
  pauseButton.querySelector("span").textContent = paused ? "Fortsetzen" : "Pause";
}

function seedSelects() {
  categories.forEach((category) => categoryInput.append(createOption(category)));
  locations.forEach((location) => locationInput.append(createOption(location)));
  purchaseYearInput.append(createOption(""));
  purchaseYears.forEach((year) => purchaseYearInput.append(createOption(year)));
}

function currentDevice() {
  return devices.find((device) => device.id === selectedId) || devices[0] || null;
}

function isNewCaptureDevice(device) {
  if (!device) {
    return false;
  }

  const legacyEmptyDraft = device.status !== "done"
    && device.manufacturer === "Neuer Hersteller"
    && device.model === "Neues Produkt"
    && device.lastService === "Heute";

  return Boolean(device.isDraft || legacyEmptyDraft);
}

function splitLegacyProductName(name) {
  const knownManufacturers = [
    "Audio-Technica",
    "Sennheiser",
    "Eurolite",
    "Showtec",
    "Yamaha",
    "Shure",
    "Roland",
    "Zoom",
    "JBL",
    "K&M"
  ];
  const cleanName = String(name || "").trim();
  const manufacturer = knownManufacturers.find((entry) => cleanName.toLowerCase().startsWith(`${entry.toLowerCase()} `));

  if (manufacturer) {
    return {
      manufacturer,
      model: cleanName.slice(manufacturer.length).trim() || cleanName
    };
  }

  const [first, ...rest] = cleanName.split(/\s+/);
  return {
    manufacturer: first || "Unbekannt",
    model: rest.join(" ") || cleanName || "Neues Produkt"
  };
}

function normalizeDeviceRecord(device) {
  const split = splitLegacyProductName(device.name);
  const manufacturer = device.manufacturer || split.manufacturer;
  const model = device.model || split.model;
  const displayName = `${manufacturer} ${model}`.trim();
  const location = locations.includes(device.location) ? device.location : locations[0];

  return {
    ...device,
    manufacturer,
    model,
    name: displayName,
    location,
    purchaseYear: purchaseYears.includes(String(device.purchaseYear || "")) ? String(device.purchaseYear) : "",
    purchaseCost: normalizeCostValue(device.purchaseCost),
    isDraft: Boolean(device.isDraft)
  };
}

function normalizeCostValue(value) {
  const normalized = String(value || "")
    .replace(/\s*€/g, "")
    .replace(",", ".")
    .replace(/[^0-9.]/g, "");

  if (!normalized) {
    return "";
  }

  const numericValue = Number.parseFloat(normalized);
  if (!Number.isFinite(numericValue)) {
    return "";
  }

  return String(Math.round(numericValue * 100) / 100);
}

function formatCostValue(value) {
  const normalized = normalizeCostValue(value);
  if (!normalized) {
    return "";
  }

  const numericValue = Number.parseFloat(normalized);
  const displayValue = Number.isInteger(numericValue)
    ? String(numericValue)
    : numericValue.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `${displayValue} €`;
}

function displayName(device) {
  return `${device.manufacturer || ""} ${device.model || device.name || ""}`.trim() || "Neues Produkt";
}

function normalizeIdPart(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ä/g, "AE")
    .replace(/Ö/g, "OE")
    .replace(/Ü/g, "UE")
    .replace(/ß/g, "SS")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function categoryRule(category) {
  return inventoryIdRules.category[category] || { area: "AT", code: "ACC" };
}

function kindFromCategory(category) {
  return categoryRule(category).area === "LT" ? "lighting" : "audio";
}

function productShortCode(model, category, manufacturer = "") {
  const normalized = normalizeIdPart(model);
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const meaningful = tokens.filter((token) => !inventoryIdRules.ignoredProductWords.has(token));
  const modelIndex = meaningful.findIndex((token) => /\d/.test(token));
  const fallbackModelIndex = tokens.findIndex((token) => /\d/.test(token));
  let source = meaningful.length ? meaningful.slice(0, 2) : tokens.slice(0, 2);

  if (modelIndex >= 0) {
    const modelToken = meaningful[modelIndex];
    source = /^\d+$/.test(modelToken) && meaningful[modelIndex - 1]
      ? [meaningful[modelIndex - 1], modelToken]
      : [modelToken];
  } else if (fallbackModelIndex >= 0) {
    const modelToken = tokens[fallbackModelIndex];
    source = /^\d+$/.test(modelToken) && tokens[fallbackModelIndex - 1]
      ? [tokens[fallbackModelIndex - 1], modelToken]
      : [modelToken];
  }

  const fallback = normalizeIdPart(manufacturer).split(/\s+/).filter(Boolean)[0] || categoryRule(category).code;

  return (source.join("") || fallback).slice(0, 12);
}

function inventoryIdBase(device) {
  const rule = categoryRule(device.category);
  return `${rule.area}-${rule.code}-${productShortCode(device.model || device.name, device.category, device.manufacturer)}`;
}

function rebuildGeneratedIds(selectedIndex = devices.findIndex((device) => device.id === selectedId)) {
  const counters = new Map();

  devices = devices.map((device) => {
    const base = inventoryIdBase(device);
    const next = (counters.get(base) || 0) + 1;
    counters.set(base, next);

    return {
      ...device,
      id: `${base}-${String(next).padStart(3, "0")}`,
      kind: kindFromCategory(device.category),
      checklist: {
        ...device.checklist,
        "Inventar-ID": true
      }
    };
  });

  const nextSelected = devices[selectedIndex] || devices[0];
  selectedId = nextSelected.id;
}

function filteredDevices() {
  return devices.filter((device) => {
    if (hideDone && device.status === "done") {
      return false;
    }

    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "open") {
      return device.status !== "done";
    }

    return device.kind === activeFilter;
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}

function statusMark(device) {
  if (device.condition === "Defekt") {
    return '<span class="warning-dot" aria-label="Defekt"></span>';
  }

  if (device.status === "done") {
    return '<span class="done-dot" aria-label="Erfasst">✓</span>';
  }

  return '<span class="open-dot" aria-label="Offen"></span>';
}

function lightVisual(device) {
  const color = device.fixtureColor || "#f59e0b";
  return `
    <div class="light-thumb" style="--fixture-color:${color}">
      <span class="fixture-visual" aria-hidden="true"></span>
    </div>
  `;
}

function thumbMarkup(device) {
  if (device.image) {
    return `<img src="${device.image}" alt="">`;
  }

  return lightVisual(device);
}

function renderQueue() {
  const visible = filteredDevices();
  queueList.innerHTML = visible.length ? visible.map((device) => `
    <button class="queue-item ${device.id === selectedId ? "selected" : ""}" data-id="${device.id}" type="button">
      <span class="thumb">${thumbMarkup(device)}</span>
      <span class="queue-main">
        <strong>${displayName(device)}</strong>
        <span>${device.id}</span>
        <small>Vor ${device.minutes} Min.</small>
      </span>
      <span class="queue-state">
        ${statusMark(device)}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </span>
    </button>
  `).join("") : `
    <div class="empty-state">
      <strong>Noch keine Produkte</strong>
      <span>Lege auf der Startseite das erste Produkt an.</span>
    </div>
  `;

  queueCount.textContent = visible.length;
  queueTotalText.textContent = `${devices.length} ${devices.length === 1 ? "Gerät" : "Geräte"} gesamt`;
}

function setDeviceImage(device) {
  if (device.image) {
    devicePhoto.src = device.image;
    devicePhoto.alt = displayName(device);
    devicePhoto.parentElement.classList.remove("light-mode");
    return;
  }

  const color = encodeURIComponent(device.fixtureColor || "#f59e0b");
  const title = encodeURIComponent(displayName(device));
  devicePhoto.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 520'%3E%3Crect width='760' height='520' fill='%23f5f7fb'/%3E%3Crect x='0' y='370' width='760' height='150' fill='%23eef2f7'/%3E%3Cpath d='M340 228 L160 430 H600 L420 228 Z' fill='${color}' fill-opacity='.22'/%3E%3Crect x='300' y='130' width='160' height='120' rx='24' fill='%23111827'/%3E%3Ccircle cx='380' cy='190' r='44' fill='${color}' fill-opacity='.9'/%3E%3Ccircle cx='348' cy='170' r='10' fill='%23fff' fill-opacity='.55'/%3E%3Ccircle cx='412' cy='170' r='10' fill='%23fff' fill-opacity='.55'/%3E%3Cpath d='M322 252 C320 292 440 292 438 252' fill='none' stroke='%23374151' stroke-width='18' stroke-linecap='round'/%3E%3Ctext x='380' y='470' text-anchor='middle' font-family='Arial,sans-serif' font-size='32' font-weight='700' fill='%23111827'%3E${title}%3C/text%3E%3C/svg%3E`;
  devicePhoto.alt = displayName(device);
}

function renderForm() {
  const device = currentDevice();
  const formControls = [
    ...document.querySelectorAll("#deviceForm input, #deviceForm select, #deviceForm textarea, .condition"),
    photoButton,
    saveNextButton,
    deleteProductButton,
    markBrokenButton,
    downloadQrButton,
    printQrButton
  ];

  formControls.forEach((control) => {
    control.disabled = !device;
  });

  if (!device) {
    devicePhoto.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 520'%3E%3Crect width='760' height='520' fill='%23f5f7fb'/%3E%3Crect x='0' y='370' width='760' height='150' fill='%23eef2f7'/%3E%3Ccircle cx='380' cy='220' r='54' fill='%23d8e2f0'/%3E%3Cpath d='M352 220h56M380 192v56' stroke='%23697386' stroke-width='12' stroke-linecap='round'/%3E%3Ctext x='380' y='440' text-anchor='middle' font-family='Arial,sans-serif' font-size='28' font-weight='700' fill='%23697386'%3ENoch kein Produkt angelegt%3C/text%3E%3C/svg%3E";
    devicePhoto.alt = "Noch kein Produkt angelegt";
    captureState.textContent = "Leer";
    manufacturerInput.value = "";
    productModelInput.value = "";
    assetIdInput.value = "";
    categoryInput.value = categories[0] || "";
    locationInput.value = locations[0] || "";
    serialInput.value = "";
    purchaseYearInput.value = "";
    purchaseCostInput.value = "";
    accessoryInput.value = "Zubehör vollständig";
    notesInput.value = "";
    notesCount.textContent = "0";
    document.querySelectorAll(".condition").forEach((button) => button.classList.remove("active"));
    return;
  }

  setDeviceImage(device);
  captureState.textContent = device.status === "done" ? "Erfasst" : "Neu erfasst";
  manufacturerInput.value = device.manufacturer || "";
  productModelInput.value = device.model || "";
  assetIdInput.value = device.id;
  categoryInput.value = device.category;
  locationInput.value = device.location;
  serialInput.value = device.serial;
  purchaseYearInput.value = device.purchaseYear || "";
  purchaseCostInput.value = formatCostValue(device.purchaseCost);
  accessoryInput.value = device.accessory;
  notesInput.value = device.notes;
  notesCount.textContent = device.notes.length;

  document.querySelectorAll(".condition").forEach((button) => {
    button.classList.toggle("active", button.dataset.condition === device.condition);
  });
}

function renderChecklist() {
  const device = currentDevice();
  if (!device) {
    checklistCount.textContent = "0 / 0";
    checklist.innerHTML = `
      <div class="empty-state compact">
        <strong>Keine Checkliste</strong>
        <span>Erstelle zuerst ein Produkt.</span>
      </div>
    `;
    return;
  }

  const entries = Object.entries(device.checklist);
  const done = entries.filter(([, value]) => value).length;

  checklistCount.textContent = `${done} / ${entries.length}`;
  checklist.innerHTML = entries.map(([label, checked]) => `
    <button class="checklist-item ${checked ? "done" : ""}" data-check="${label}" type="button">
      <span class="check-circle">${checked ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>' : ""}</span>
      <span>${label}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
  `).join("");
}

function renderReview() {
  const device = currentDevice();
  if (!device) {
    duplicateCard.hidden = true;
    lastService.textContent = "-";
    serviceState.textContent = "Leer";
    serviceState.style.background = "#f0f3f8";
    serviceState.style.color = "#5b6575";
    nextService.textContent = "Noch keine Wartungsdaten vorhanden";
    return;
  }

  if (device.duplicate) {
    duplicateCard.hidden = false;
    duplicateImage.src = device.duplicate.image || device.image || "";
    duplicateImage.alt = device.duplicate.name;
    duplicateId.textContent = device.duplicate.id;
    duplicateName.textContent = device.duplicate.name;
    duplicateMeta.textContent = `${device.duplicate.location} · Gesehen: ${device.duplicate.seen}`;
  } else {
    duplicateCard.hidden = true;
  }

  lastService.textContent = device.lastService;
  if (device.nextServiceDays < 0 || device.condition === "Defekt") {
    serviceState.textContent = "Prüfen";
    serviceState.style.background = "var(--amber-soft)";
    serviceState.style.color = "#a45d00";
    nextService.textContent = `Wartung überfällig seit ${Math.abs(device.nextServiceDays)} Tagen`;
  } else {
    serviceState.textContent = "OK";
    serviceState.style.background = "var(--green-soft)";
    serviceState.style.color = "#07884d";
    nextService.textContent = `Nächste Wartung fällig in ${device.nextServiceDays} Tagen`;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeQrSvg(payload, options = {}) {
  const modules = createQrMatrix(payload);
  const quiet = options.quiet ?? 4;
  const moduleSize = options.moduleSize ?? 5;
  const size = modules.length + quiet * 2;
  const rects = [];

  modules.forEach((row, y) => {
    row.forEach((dark, x) => {
      if (dark) {
        rects.push(`<rect x="${(x + quiet) * moduleSize}" y="${(y + quiet) * moduleSize}" width="${moduleSize}" height="${moduleSize}"/>`);
      }
    });
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size * moduleSize} ${size * moduleSize}" shape-rendering="crispEdges" role="img" aria-label="QR-Code ${escapeHtml(payload)}"><rect width="100%" height="100%" fill="#fff"/><g fill="#111827">${rects.join("")}</g></svg>`;
}

function createQrMatrix(rawPayload) {
  const normalizedPayload = String(rawPayload || "UNBEKANNT").toUpperCase();
  const payload = normalizedPayload.slice(0, 32);
  const version = payload.length > 17 ? 2 : 1;
  const dataCapacity = version === 1 ? 19 : 34;
  const ecCapacity = version === 1 ? 7 : 10;
  const dataCodewords = makeQrDataCodewords(payload, dataCapacity);
  const ecCodewords = reedSolomonRemainder(dataCodewords, ecCapacity);
  const codewords = [...dataCodewords, ...ecCodewords];
  const size = 17 + version * 4;
  const matrix = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));

  function setModule(x, y, dark, isReserved = true) {
    if (x < 0 || y < 0 || x >= size || y >= size) {
      return;
    }
    matrix[y][x] = dark;
    if (isReserved) {
      reserved[y][x] = true;
    }
  }

  function finder(x, y) {
    for (let dy = -1; dy <= 7; dy += 1) {
      for (let dx = -1; dx <= 7; dx += 1) {
        const xx = x + dx;
        const yy = y + dy;
        const inFinder = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
        const dark = inFinder && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
        setModule(xx, yy, dark);
      }
    }
  }

  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);

  if (version === 2) {
    alignment(18, 18);
  }

  for (let i = 8; i < size - 8; i += 1) {
    setModule(i, 6, i % 2 === 0);
    setModule(6, i, i % 2 === 0);
  }

  setModule(8, size - 8, true);
  reserveFormatModules(reserved);
  placeDataBits(matrix, reserved, codewords.flatMap((codeword) => bitsOf(codeword, 8)));
  applyMask(matrix, reserved);
  drawFormatBits(matrix, reserved);

  return matrix;

  function alignment(centerX, centerY) {
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        setModule(centerX + dx, centerY + dy, distance !== 1);
      }
    }
  }
}

function reserveFormatModules(reserved) {
  const size = reserved.length;
  for (let i = 0; i <= 8; i += 1) {
    if (i !== 6) {
      reserved[8][i] = true;
      reserved[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i += 1) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
}

function makeQrDataCodewords(payload, dataCapacity) {
  const bytes = [...new TextEncoder().encode(payload)];
  const bits = [
    ...bitsOf(0b0100, 4),
    ...bitsOf(bytes.length, 8),
    ...bytes.flatMap((byte) => bitsOf(byte, 8))
  ];

  const capacityBits = dataCapacity * 8;
  const terminator = Math.min(4, capacityBits - bits.length);
  bits.push(...Array(terminator).fill(0));
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const codewords = [];
  for (let i = 0; i < bits.length; i += 8) {
    codewords.push(Number.parseInt(bits.slice(i, i + 8).join(""), 2));
  }

  const pads = [0xec, 0x11];
  let padIndex = 0;
  while (codewords.length < dataCapacity) {
    codewords.push(pads[padIndex % 2]);
    padIndex += 1;
  }

  return codewords;
}

function bitsOf(value, length) {
  return Array.from({ length }, (_, index) => (value >> (length - index - 1)) & 1);
}

function placeDataBits(matrix, reserved, bits) {
  const size = matrix.length;
  let bitIndex = 0;
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right -= 1;
    }

    for (let vertical = 0; vertical < size; vertical += 1) {
      const y = upward ? size - 1 - vertical : vertical;
      for (let offset = 0; offset < 2; offset += 1) {
        const x = right - offset;
        if (reserved[y][x]) {
          continue;
        }

        const bit = bits[bitIndex] || 0;
        matrix[y][x] = Boolean(bit);
        bitIndex += 1;
      }
    }

    upward = !upward;
  }
}

function applyMask(matrix, reserved) {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      if (!reserved[y][x] && (x + y) % 2 === 0) {
        matrix[y][x] = !matrix[y][x];
      }
    }
  }
}

function drawFormatBits(matrix, reserved) {
  const format = formatBits(1, 0);
  const size = matrix.length;
  const first = [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]];
  const second = [
    ...Array.from({ length: 8 }, (_, index) => [size - 1 - index, 8]),
    ...Array.from({ length: 7 }, (_, index) => [8, size - 7 + index])
  ];

  first.forEach(([x, y], index) => {
    matrix[y][x] = Boolean((format >> index) & 1);
    reserved[y][x] = true;
  });

  second.forEach(([x, y], index) => {
    matrix[y][x] = Boolean((format >> index) & 1);
    reserved[y][x] = true;
  });
}

function formatBits(eccLevel, mask) {
  let data = (eccLevel << 3) | mask;
  let value = data << 10;
  const generator = 0b10100110111;

  for (let bit = 14; bit >= 10; bit -= 1) {
    if ((value >> bit) & 1) {
      value ^= generator << (bit - 10);
    }
  }

  return (((data << 10) | value) ^ 0b101010000010010) & 0x7fff;
}

function reedSolomonRemainder(data, degree) {
  const generator = reedSolomonGenerator(degree);
  const result = Array(degree).fill(0);

  data.forEach((value) => {
    const factor = value ^ result.shift();
    result.push(0);
    generator.forEach((coefficient, index) => {
      result[index] ^= gfMultiply(coefficient, factor);
    });
  });

  return result;
}

function reedSolomonGenerator(degree) {
  let generator = [1];
  for (let i = 0; i < degree; i += 1) {
    generator = polynomialMultiply(generator, [1, gfPow(2, i)]);
  }
  return generator.slice(1);
}

function polynomialMultiply(left, right) {
  const result = Array(left.length + right.length - 1).fill(0);
  left.forEach((leftValue, leftIndex) => {
    right.forEach((rightValue, rightIndex) => {
      result[leftIndex + rightIndex] ^= gfMultiply(leftValue, rightValue);
    });
  });
  return result;
}

function gfPow(value, exponent) {
  let result = 1;
  for (let i = 0; i < exponent; i += 1) {
    result = gfMultiply(result, value);
  }
  return result;
}

function gfMultiply(left, right) {
  let result = 0;
  let a = left;
  let b = right;
  while (b > 0) {
    if (b & 1) {
      result ^= a;
    }
    a <<= 1;
    if (a & 0x100) {
      a ^= 0x11d;
    }
    b >>= 1;
  }
  return result;
}

function renderQrLabel() {
  const device = currentDevice();
  if (!device) {
    qrCodeBox.innerHTML = "";
    qrAssetId.textContent = "Noch kein Produkt";
    qrDeviceName.textContent = "QR-Code wird nach dem Anlegen generiert";
    qrMeta.textContent = "Keine Kategorie · kein Standort";
    printLabel.innerHTML = "";
    return;
  }

  const payload = (assetIdInput.value || device.id || "UNBEKANNT").toUpperCase().slice(0, 32);
  const svg = makeQrSvg(payload);

  qrCodeBox.innerHTML = svg;
  qrAssetId.textContent = payload;
  qrDeviceName.textContent = displayName(device);
  qrMeta.textContent = `${device.category} · ${device.location}`;
  printLabel.innerHTML = `
    <div class="print-label-inner">
      ${svg}
      <div class="print-label-copy">
        <strong>${escapeHtml(payload)}</strong>
        <span>${escapeHtml(displayName(device))}</span>
        <small>${escapeHtml(device.category)} · ${escapeHtml(device.location)}</small>
      </div>
    </div>
  `;
}

function currentQrSvg() {
  const device = currentDevice();
  const payload = (assetIdInput.value || device?.id || "UNBEKANNT").toUpperCase().slice(0, 32);
  return makeQrSvg(payload, { moduleSize: 8 });
}

function downloadCurrentQrPng() {
  const device = currentDevice();
  if (!device) {
    showToast("Erstelle zuerst ein Produkt");
    return;
  }

  const payload = (assetIdInput.value || device.id || "UNBEKANNT").toUpperCase().slice(0, 32);
  const svg = currentQrSvg();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const size = 640;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

  image.onload = () => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    context.drawImage(image, 0, 0, size, size);
    URL.revokeObjectURL(url);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `invento-qr-${payload}.png`;
    link.click();
    showToast(`QR-Code für ${payload} erstellt`);
  };

  image.src = url;
}

function printCurrentQrLabel() {
  if (!currentDevice()) {
    showToast("Erstelle zuerst ein Produkt");
    return;
  }

  renderQrLabel();
  window.print();
}

function renderProgress() {
  const doneCount = devices.filter((device) => device.status === "done").length;
  const total = devices.length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;
  progressText.textContent = `${doneCount} von ${total} Geräten`;
  progressPercent.textContent = `${percent} %`;
  progressFill.style.width = `${percent}%`;
  landingTotalCount.textContent = total;
  landingCapturedCount.textContent = doneCount;
  landingAreaCount.textContent = new Set(devices.map((device) => categoryRule(device.category).area)).size;
}

function render() {
  renderQueue();
  renderForm();
  renderChecklist();
  renderReview();
  renderQrLabel();
  renderProgress();
}

function showLanding() {
  accessPage.hidden = true;
  inventoryApp.hidden = true;
  landingPage.hidden = false;
  document.body.classList.remove("inventory-active");
}

async function showInventory(message) {
  if (!await hasAccess()) {
    showAccess();
    return;
  }

  await prepareInventoryForSession();
  accessPage.hidden = true;
  landingPage.hidden = true;
  inventoryApp.hidden = false;
  document.body.classList.add("inventory-active");
  render();

  if (message) {
    showToast(message);
  }
}

function showAccess() {
  accessPage.hidden = false;
  landingPage.hidden = true;
  inventoryApp.hidden = true;
  document.body.classList.remove("inventory-active");
  accessError.textContent = "";
  setTimeout(() => accessEmailInput.focus(), 0);
}

function createDraftProduct() {
  const suffix = String(draftCounter).padStart(2, "0");
  draftCounter += 1;

  return {
    id: `DRAFT-${suffix}`,
    manufacturer: "Neuer Hersteller",
    model: "Neues Produkt",
    name: "Neuer Hersteller Neues Produkt",
    kind: "audio",
    category: "Mikrofone",
    location: locations[0],
    status: "open",
    isDraft: true,
    condition: "Sehr gut",
    serial: "",
    purchaseYear: "",
    purchaseCost: "",
    accessory: "Zubehör vollständig",
    image: null,
    fixtureColor: "#1463f3",
    minutes: 0,
    lastService: "Heute",
    nextServiceDays: 180,
    notes: "",
    duplicate: null,
    checklist: {
      "Foto erfasst": false,
      "Inventar-ID": false,
      Kategorie: true,
      Standort: true,
      Zustand: true,
      "Zubehör / Notizen": false
    }
  };
}

function addDraftAndOpen() {
  const draft = createDraftProduct();
  devices = [draft, ...devices];
  selectedId = draft.id;
  rebuildGeneratedIds(0);
  activeFilter = "all";
  hideDone = false;
  clearDoneButton.querySelector("span").textContent = "Erledigte ausblenden";
  filterStrip.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === "all");
  });
  saveStoredState();
  showInventory("Neues Produkt angelegt");
}

function scanProductAndOpen() {
  const matchedDevice = devices.find((device) => device.status === "done") || devices[0];
  if (!matchedDevice) {
    showToast("Noch kein Produkt zum Scannen vorhanden");
    showInventory();
    return;
  }

  selectedId = matchedDevice.id;
  devices = devices.map((device) => device.id === selectedId ? {
    ...device,
    checklist: {
      ...device.checklist,
      "Inventar-ID": true
    }
  } : device);
  saveStoredState();
  showInventory(`QR-Code erkannt: ${matchedDevice.id}`);
}

function updateDevice(patch, options = {}) {
  if (!currentDevice()) {
    return;
  }

  const selectedIndex = devices.findIndex((device) => device.id === selectedId);
  devices = devices.map((device) => device.id === selectedId ? { ...device, ...patch } : device);

  if (options.regenerateId) {
    rebuildGeneratedIds(selectedIndex);
  }

  saveStoredState();
  queueRemoteSave();
  render();
}

function updateChecklist(label, value) {
  const device = currentDevice();
  if (!device) {
    return;
  }

  updateDevice({
    checklist: {
      ...device.checklist,
      [label]: value
    }
  });
}

function selectNextDevice(direction = 1) {
  if (!devices.length) {
    selectedId = "";
    saveStoredState();
    render();
    return;
  }

  const visible = filteredDevices();
  const index = visible.findIndex((device) => device.id === selectedId);
  const next = visible[index + direction] || visible[0] || devices[0];
  selectedId = next.id;
  saveStoredState();
  render();
}

async function saveCurrentAndNext() {
  const device = currentDevice();
  if (!device) {
    showToast("Erstelle zuerst ein Produkt");
    return;
  }
  const shouldPrepareNextProduct = isNewCaptureDevice(device);

  const checklistPatch = {
    ...device.checklist,
    "Inventar-ID": Boolean(device.id),
    Kategorie: Boolean(categoryInput.value),
    Standort: Boolean(locationInput.value),
    Zustand: Boolean(device.condition),
    "Zubehör / Notizen": Boolean(accessoryInput.value && notesInput.value.trim())
  };

  devices = devices.map((item) => item.id === selectedId ? {
    ...item,
    manufacturer: manufacturerInput.value.trim() || item.manufacturer,
    model: productModelInput.value.trim() || item.model,
    name: `${manufacturerInput.value.trim() || item.manufacturer} ${productModelInput.value.trim() || item.model}`.trim(),
    category: categoryInput.value,
    kind: kindFromCategory(categoryInput.value),
    location: locationInput.value,
    serial: serialInput.value,
    purchaseYear: purchaseYearInput.value,
    purchaseCost: normalizeCostValue(purchaseCostInput.value),
    accessory: accessoryInput.value,
    notes: notesInput.value,
    status: "done",
    isDraft: false,
    checklist: checklistPatch
  } : item);

  rebuildGeneratedIds(devices.findIndex((device) => device.id === selectedId));
  const savedDevice = currentDevice();

  if (dataMode === "supabase") {
    try {
      await saveDeviceRemote(savedDevice);
    } catch (error) {
      console.warn("Invento konnte das Produkt nicht in Supabase speichern.", error);
      showToast("Supabase-Sync fehlgeschlagen - lokal gespeichert");
    }
  }

  if (shouldPrepareNextProduct) {
    const nextDraft = createDraftProduct();
    devices = [...devices, nextDraft];
    selectedId = nextDraft.id;
    rebuildGeneratedIds(devices.length - 1);
    activeFilter = "all";
    hideDone = false;
    syncStoredUiState();
  }

  saveStoredState();
  render();
  showToast(dataMode === "supabase"
    ? "Gerät in Supabase gespeichert"
    : shouldPrepareNextProduct ? "Gerät gespeichert - neues Produkt bereit" : "Änderungen gespeichert");
}

async function deleteCurrentProduct() {
  const device = currentDevice();
  if (!device) {
    showToast("Kein Produkt zum Löschen ausgewählt");
    return;
  }

  if (dataMode === "supabase") {
    try {
      await deleteDeviceRemote(device);
    } catch (error) {
      console.warn("Invento konnte das Produkt nicht aus Supabase löschen.", error);
      showToast("Supabase-Löschung fehlgeschlagen");
      return;
    }
  }

  const visibleBeforeDelete = filteredDevices();
  const visibleIndex = visibleBeforeDelete.findIndex((item) => item.id === selectedId);

  devices = devices.filter((item) => item.id !== selectedId);

  const visibleAfterDelete = filteredDevices();
  const nextDevice = visibleAfterDelete[visibleIndex]
    || visibleAfterDelete[visibleIndex - 1]
    || visibleAfterDelete[0]
    || devices[0]
    || null;

  selectedId = nextDevice?.id || "";
  saveStoredState();
  render();
  showToast(`${displayName(device)} gelöscht`);
}

async function startInvento() {
  seedSelects();
  initializeSupabaseClient();

  if (await hasAccess()) {
    await prepareInventoryForSession();
    showLanding();
  } else {
    showAccess();
  }
}

startInvento();

accessForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = accessEmailInput.value.trim();
  const password = accessPasswordInput.value;

  if (!email || !password) {
    accessError.textContent = "Bitte E-Mail und Passwort eingeben.";
    return;
  }

  initializeSupabaseClient();
  if (!supabaseClient) {
    accessError.textContent = "Supabase ist noch nicht konfiguriert.";
    return;
  }

  accessSubmitButton.disabled = true;
  accessError.textContent = "";

  try {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }

    grantAccess();
    await prepareInventoryForSession();
    showLanding();
    showToast("Angemeldet");
  } catch (error) {
    accessError.textContent = "Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort.";
    accessPasswordInput.select();
  } finally {
    accessSubmitButton.disabled = false;
  }
});

addProductButton.addEventListener("click", addDraftAndOpen);

addProductTopButton.addEventListener("click", addDraftAndOpen);

addProductInventoryButton.addEventListener("click", addDraftAndOpen);

landingScanButton.addEventListener("click", scanProductAndOpen);

editProductsButton.addEventListener("click", () => {
  selectedId = devices.find((device) => !device.model?.startsWith("Neues Produkt"))?.id || devices[0]?.id || "";
  saveStoredState();
  showInventory(devices.length ? "Produktliste geöffnet" : "Noch keine Produkte vorhanden");
});

openInventoryTopButton.addEventListener("click", () => {
  saveStoredState();
  showInventory(devices.length ? "Inventar geöffnet" : "Noch keine Produkte vorhanden");
});

[brandHomeButton, homeButton].forEach((button) => {
  button.addEventListener("click", () => {
    showLanding();
  });
});

logoutButton.addEventListener("click", revokeAccess);

logoutLandingButton.addEventListener("click", revokeAccess);

queueList.addEventListener("click", (event) => {
  const item = event.target.closest(".queue-item");
  if (!item) {
    return;
  }

  selectedId = item.dataset.id;
  saveStoredState();
  render();
});

filterStrip.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) {
    return;
  }

  activeFilter = button.dataset.filter;
  filterStrip.querySelectorAll("button").forEach((filterButton) => {
    filterButton.classList.toggle("active", filterButton === button);
  });

  const visible = filteredDevices();
  if (!visible.some((device) => device.id === selectedId) && visible[0]) {
    selectedId = visible[0].id;
  }

  saveStoredState();
  render();
});

document.querySelector(".condition-group").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-condition]");
  const device = currentDevice();
  if (!button || !device) {
    return;
  }

  const condition = button.dataset.condition;
  updateDevice({
    condition,
    status: condition === "Defekt" ? "open" : device.status,
    checklist: {
      ...device.checklist,
      Zustand: true
    }
  });
});

checklist.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-check]");
  if (!button) {
    return;
  }

  const device = currentDevice();
  const label = button.dataset.check;
  updateChecklist(label, !device.checklist[label]);
});

[categoryInput, locationInput, accessoryInput].forEach((input) => {
  input.addEventListener("change", () => {
    const patch = {};
    const options = {};
    const device = currentDevice();
    if (!device) {
      return;
    }

    if (input === categoryInput) {
      patch.category = input.value;
      patch.kind = kindFromCategory(input.value);
      patch.checklist = { ...device.checklist, Kategorie: true };
      options.regenerateId = true;
    }
    if (input === locationInput) {
      patch.location = input.value;
      patch.checklist = { ...device.checklist, Standort: true };
    }
    if (input === accessoryInput) {
      patch.accessory = input.value;
    }
    updateDevice(patch, options);
  });
});

manufacturerInput.addEventListener("input", () => {
  if (!currentDevice()) {
    return;
  }

  const manufacturer = manufacturerInput.value.trim() || "Neuer Hersteller";
  const model = currentDevice().model || "Neues Produkt";
  updateDevice({ manufacturer, name: `${manufacturer} ${model}`.trim() }, { regenerateId: true });
});

productModelInput.addEventListener("input", () => {
  if (!currentDevice()) {
    return;
  }

  const manufacturer = currentDevice().manufacturer || "Neuer Hersteller";
  const model = productModelInput.value.trim() || "Neues Produkt";
  updateDevice({ model, name: `${manufacturer} ${model}`.trim() }, { regenerateId: true });
});

assetIdInput.addEventListener("input", () => {
  if (currentDevice()) {
    renderQrLabel();
  }
});

serialInput.addEventListener("input", () => {
  if (!currentDevice()) {
    return;
  }
  updateDevice({ serial: serialInput.value });
});

purchaseYearInput.addEventListener("change", () => {
  if (!currentDevice()) {
    return;
  }
  updateDevice({ purchaseYear: purchaseYearInput.value });
});

purchaseCostInput.addEventListener("input", () => {
  const device = currentDevice();
  if (!device) {
    return;
  }

  devices = devices.map((item) => item.id === selectedId ? {
    ...item,
    purchaseCost: normalizeCostValue(purchaseCostInput.value)
  } : item);
  saveStoredState();
  queueRemoteSave();
});

purchaseCostInput.addEventListener("focus", () => {
  purchaseCostInput.value = normalizeCostValue(purchaseCostInput.value);
});

purchaseCostInput.addEventListener("blur", () => {
  if (!currentDevice()) {
    return;
  }

  updateDevice({ purchaseCost: normalizeCostValue(purchaseCostInput.value) });
});

notesInput.addEventListener("input", () => {
  if (!currentDevice()) {
    return;
  }

  notesCount.textContent = notesInput.value.length;
  const device = currentDevice();
  devices = devices.map((item) => item.id === selectedId ? {
    ...item,
    notes: notesInput.value,
    checklist: {
      ...device.checklist,
      "Zubehör / Notizen": Boolean(notesInput.value.trim() && accessoryInput.value)
    }
  } : item);
  saveStoredState();
  queueRemoteSave();
  renderChecklist();
});

clearDoneButton.addEventListener("click", () => {
  hideDone = !hideDone;
  clearDoneButton.querySelector("span").textContent = hideDone ? "Alle Geräte anzeigen" : "Erledigte ausblenden";
  const visible = filteredDevices();
  if (!visible.some((device) => device.id === selectedId) && visible[0]) {
    selectedId = visible[0].id;
  }
  saveStoredState();
  render();
});

filterButton.addEventListener("click", () => {
  document.body.classList.toggle("filters-hidden");
});

densityButton.addEventListener("click", () => {
  document.body.classList.toggle("compact-density");
});

pauseButton.addEventListener("click", () => {
  paused = !paused;
  runStateLabel.textContent = paused ? "Inventar pausiert" : "Inventar aktiv";
  pauseButton.querySelector("span").textContent = paused ? "Fortsetzen" : "Pause";
  saveStoredState();
  showToast(paused ? "Inventar pausiert" : "Inventar aktiv");
});

photoButton.addEventListener("click", () => {
  updateChecklist("Foto erfasst", true);
  showToast("Foto wurde dem Inventar zugeordnet");
});

downloadQrButton.addEventListener("click", downloadCurrentQrPng);

printQrButton.addEventListener("click", printCurrentQrLabel);

manualIdButton.addEventListener("click", () => {
  window.open("Inventar-ID-Regeln.md", "_blank");
  showToast("Inventar-ID-Regeln geöffnet");
});

saveNextButton.addEventListener("click", saveCurrentAndNext);

deleteProductButton.addEventListener("click", deleteCurrentProduct);

markBrokenButton.addEventListener("click", () => {
  const device = currentDevice();
  if (!device) {
    showToast("Erstelle zuerst ein Produkt");
    return;
  }

  updateDevice({
    condition: "Defekt",
    status: "open",
    checklist: {
      ...device.checklist,
      Zustand: true
    }
  });
  showToast("Gerät als defekt markiert");
});

backButton.addEventListener("click", () => {
  selectNextDevice(-1);
});
