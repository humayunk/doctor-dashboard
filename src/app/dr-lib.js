import { appTemplates, HDSModel, l, pryv } from "hds-lib-js";

/** The name of this application */
const APP_MANAGING_NAME = "HDS Dr App PoC";
/** The "base" stream for this App */
const APP_MANAGING_STREAMID = "app-dr-hds";
/** initialized during pryvAuthStateChange */
let appManaging;
/** Marked as "OLD" but still seems necessary */
let drConnection = null;
/** from common-lib.js */
let model;
/** unified data model */
const props = { forms: { summary: [] } };
/** following the APP GUIDELINES: https://api.pryv.com/guides/app-guidelines/ */
const serviceInfoUrl = "https://demo.datasafe.dev/reg/service/info";

/** all text is localizable strings */
const strings = {
  actions: { en: "Actions" },
  active: { en: "active" },
  backToForm: { en: "Back to Form Information" },
  consent: { en: "Consent" },
  copyToClipboard: { en: "Copy link to clipboard" },
  create: { en: "Create" },
  createSharingLink: { en: "Create Sharing Link" },
  createSharingLinkPlaceholder: { en: "Enter patient reference" },
  date: { en: "Date" },
  description: { en: "Description" },
  emailBody1: {
    en: "Hello,\n\nI am sending you a link to fill out a form.\nPlease click on the link below to access the form:\n\n",
  },
  emailBody2: { en: "\n\nBest regards,\nYour Doctor" },
  emailSubject: { en: "Invitation" },
  formDetails: { en: "Form Details" },
  forms: { en: "Forms" },
  help: { en: "Help" },
  label: { en: "Label" },
  logOut: { en: "Log Out" },
  openSidebar: { en: "Open sidebar" },
  patientReference: { en: "Patient Reference" },
  patients: { en: "Patients" },
  pending: { en: "pending" },
  permanent: { en: "permanent" },
  permissions: { en: "Permissions" },
  permissionsExplanation: {
    en: "Permissions are the authorizations that a patient will grant to you.",
  },
  read: { en: "Read" },
  readExplanation: {
    en: "You will be able to read the following data points:",
  },
  recurring: { en: "recurring" },
  refused: { en: "refused" },
  revoked: { en: "revoked" },
  search: { en: "Search" },
  section: { en: "Section:" },
  sendByEmail: { en: "Send by email" },
  status: { en: "Status" },
  submissionDate: { en: "Submission Date" },
  value: { en: "Value" },
  viewData: { en: "view data" },
};

/** from common-data-defs.js */
const v2 = {
  "questionary-x": {
    forms: {
      history: {
        itemKeys: ["fertility-ttc-tta", "body-weight"],
        key: "recurring-x",
        name: "History",
        type: "recurring",
      },
      profile: {
        itemKeys: [
          "profile-name",
          "profile-surname",
          "profile-sex",
          "family-children-count",
          "fertility-miscarriages-count",
        ],
        key: "profile-x",
        name: "Profile",
        type: "permanent",
      },
    },
    permissionsPreRequest: [{ streamId: "profile" }, { streamId: "fertility" }],
    title: "Demo with Profile and TTC-TTA 3",
  },
  "questionnary-basic": {
    forms: {
      history: {
        itemKeys: [
          "body-weight",
          "body-vulva-wetness-feeling",
          "body-vulva-mucus-inspect",
          "body-vulva-mucus-stretch",
          "fertility-cycles-start",
          "fertility-cycles-ovulation",
        ],
        key: "recurring-b",
        name: "History",
        type: "recurring",
      },
      profile: {
        itemKeys: ["profile-name", "profile-surname", "profile-date-of-birth"],
        key: "profile-b",
        name: "Profile",
        type: "permanent",
      },
    },
    permissionsPreRequest: [{ streamId: "profile" }],
    title: "Basic Profile and Cycle Information 3",
  },
};

/**
 * Return pryv.Connection with property HDSModel Loaded
 * @param {string} apiEndpoint
 * @returns
 */
async function connectAPIEndpoint(apiEndpoint) {
  const connection = new pryv.Connection(apiEndpoint);
  connection.hdsModel = await initHDSModel();
  return connection;
}

/**
 * exposes appManaging for the app
 */
function getAppManaging() {
  return appManaging;
}

function getLineForEvent(event) {
  const line = {
    description: "",
    formLabel: "Unknown",
    formType: "Unknown",
    repeatable: "any",
    streamAndType: event.streamId + " - " + event.type,
    time: new Date(event.time * 1000).toISOString(),
    value: JSON.stringify(event.content),
  };

  const itemDef = model.itemsDefs.forEvent(event, false);
  if (itemDef) {
    line.streamId = event.streamIds[0];
    line.eventType = event.type;
    line.formLabel = itemDef.label;
    line.formType = itemDef.data.type;
    line.repeatable = itemDef.data.repeatable;
    if (line.formType === "date") {
      line.value = new Date(event.time * 1000).toISOString().split("T")[0];
    }
    if (line.formType === "select") {
      line.value = event.content;
      if (event.type === "ratio/generic") {
        line.value = event.content.value;
      }

      const selected = itemDef.data.options.find((o) => o.value === line.value);
      line.description = selected != null ? l(selected.label) : "-";
    }
    if (line.formType === "checkbox") {
      if (event.type === "activity/plain") {
        line.description = "Yes";
        line.value = "x";
      }
    }
    if (event.streamId === "body-weight") {
      const units = event.type.split("/").pop();
      line.value = `${line.value} ${units}`;
    }
  }
  return line;
}

async function getPatientData(invite) {
  const patientData = [];
  const queryParams = { limit: 10000 };
  function forEachEvent(event) {
    patientData.push(getLineForEvent(event));
  }

  await invite.connection.getEventsStreamed(queryParams, forEachEvent);
  return patientData;
}

async function getPatients(collector) {
  // check inbox for new incoming accepted requests
  const newCollectorInvites = await collector.checkInbox();
  console.log("## getPatients inbox ", newCollectorInvites);

  // get all patients
  const patients = await collector.getInvites();
  const activePatients = [];
  patients.sort((a, b) => b.dateCreation - a.dateCreation); // sort by creation date reverse
  for (const patient of patients) {
    if (patient.status === "active") {
      patient.viewLink = `/patients/${collector.streamId}/${patient.key}`;
      activePatients.push([collector.streamId, patient.key]);
    } else if (patient.status === "pending") {
      const inviteSharingData = await patient.getSharingData();
      const patientURL = "https://whatever.backloop.dev:4443/patient.html";
      patient.sharingLink = `${patientURL}?apiEndpoint=${inviteSharingData.apiEndpoint}&eventId=${inviteSharingData.eventId}`;
    }
  }
  console.log("## getPatients patients ", patients);

  activePatients.forEach(([collectorId, inviteKey]) =>
    showPatientDetails(collectorId, inviteKey),
  );

  return patients;
}

function hdsModel() {
  if (!model) {
    throw new Error("Initialize model with `initHDSModel()` first");
  }
  return model;
}

/**
 * Right after logging in:
 * Check if the account has the two forms
 * This step will be implemented in the doctor dashboard when the "create form" will be developed
 * */
async function initDemoAccount(apiEndpoint) {
  drConnection = await connectAPIEndpoint(apiEndpoint);
  const drConnectionInfo = await drConnection.accessInfo();
  console.log("## initDemoAccount - drConnectionInfo", drConnectionInfo);
  localStorage.setItem("user", drConnectionInfo.user.username);
  appManaging = await appTemplates.AppManagingAccount.newFromConnection(
    APP_MANAGING_STREAMID,
    drConnection,
  );

  // -- check current collectors (forms)
  const collectors = await appManaging.getCollectors();
  for (const [questionaryId, questionary] of Object.entries(v2)) {
    // check if collector exists
    const found = collectors.find((c) => c.name === questionary.title);
    if (found) {
      console.log("## initDemoAccount found", questionaryId, found);
      continue; // stop here if exists
    }
    console.log("## initDemoAccount creating collector for", questionary);
    const newCollector = await appManaging.createCollector(questionary.title);

    // create the request content
    // 1- get all items from the questionnaire sections
    const itemKeys = [];
    for (const formContent of Object.values(questionary.forms)) {
      itemKeys.push(...formContent.itemKeys);
    }
    // 2 - get the permissions with eventual preRequest
    const preRequest = questionary.permissionsPreRequest || [];
    const permissions = hdsModel().authorizations.forItemKeys(itemKeys, {
      preRequest,
    });

    const requestContent = {
      app: {
        data: {
          // will be used by patient app
          forms: questionary.forms,
        },
        id: "dr-form",
        url: "https://xxx.yyy",
      },
      consent: {
        en: "This is a consent message to be set",
      },
      description: {
        en: "Short Description to be updated: " + questionary.title,
      },
      permissions,
      requester: {
        name: "Username " + drConnectionInfo.user.username,
      },
      title: {
        en: questionary.title,
      },
      version: "0",
    };
    newCollector.statusData.requestContent = requestContent;
    await newCollector.save(); // save the data (done when the form is edited)
    await newCollector.publish();
    console.log("## initDemoAccount published", newCollector);
  }
  console.log("## initDemoAccount with", collectors);
}

async function initHDSModel() {
  if (!model) {
    const service = new pryv.Service(serviceInfoUrl);
    const serviceInfo = await service.info();
    model = new HDSModel(serviceInfo.assets["hds-model"]);
    console.log("## model", model);
    await model.load();
  }
  return model;
}

function logout() {
  localStorage.clear();
  console.log("## logout");
}

async function setQuestionnaries() {
  const am = getAppManaging();
  const collectors = await am.getCollectors();
  for (const collector of collectors) {
    props.forms.summary.push({
      href: `/forms/${collector.id}/patients`,
      id: collector.id,
      name: collector.name,
    });
    await showQuestionnary(collector.id);
  }
  localStorage.setItem("props", JSON.stringify(props));
}

function showLoginButton(loginSpanId, stateChangeCallBack) {
  const authSettings = {
    authRequest: {
      clientData: {
        "app-web-auth:description": {
          content:
            "This app allows to send invitation links to patients and visualize and export answers.",
          type: "note/txt",
        },
        "app-web-auth:ensureBaseStreams": [
          // this is handled by custom app web Auth3 (might be migrated in permission request)
          { id: "applications", name: "Applications" },
          {
            id: APP_MANAGING_STREAMID,
            name: APP_MANAGING_NAME,
            parentId: "applications",
          },
        ],
      },
      requestedPermissions: [
        {
          defaultName: APP_MANAGING_NAME,
          level: "manage",
          streamId: APP_MANAGING_STREAMID,
        },
      ],
      // See: https://api.pryv.com/reference/#auth-request
      requestingAppId: APP_MANAGING_STREAMID, // to customize for your own app
    },
    onStateChange: pryvAuthStateChange, // event Listener for Authentication steps
    spanButtonID: loginSpanId, // div id the DOM that will be replaced by the Service specific button
  };

  pryv.Browser.setupAuth(authSettings, serviceInfoUrl);

  async function pryvAuthStateChange(state) {
    // called each time the authentication state changes
    console.log("## pryvAuthStateChange", state);
    if (state.id === pryv.Browser.AuthStates.AUTHORIZED) {
      await initDemoAccount(state.apiEndpoint);
      stateChangeCallBack("loggedIN");
    }
    if (state.id === pryv.Browser.AuthStates.INITIALIZED) {
      drConnection = null;
      appManaging = null;
      stateChangeCallBack("loggedOUT");
    }
  }
}

async function showPatientDetails(collectorId, inviteKey) {
  // get app from state management
  const am = getAppManaging();
  const collector = await am.getCollectorById(collectorId);
  const invite = await collector.getInviteByKey(inviteKey);
  console.log("## loaded with invite", invite);

  const lines = await getPatientData(invite);
  const entries = Object.entries(lines);
  props[inviteKey] = {
    columns: [l(strings.date), l(strings.label), l(strings.value)],
  };
  props[inviteKey].data = entries
    .filter(([, v]) => v.repeatable !== "none")
    .map(([, v]) => ({
      date: v.time,
      label: v.formLabel,
      value: (v.description || v.value).replace(/"/g, ""),
    }));
  props[inviteKey].info = entries
    .filter(([, v]) => v.repeatable === "none")
    .map(([, v]) => ({
      label: v.formLabel,
      value: (v.description || v.value).replace(/"/g, ""),
    }));
  console.log("## props", props);
  localStorage.setItem("props", JSON.stringify(props));
}

async function showQuestionnary(questionaryId) {
  const form = (props.forms[questionaryId] = {});

  const am = getAppManaging();
  const collector = await am.getCollectorById(questionaryId);
  await collector.init(); // load controller data only when needed
  // show details
  const { requestContent } = collector.statusData;
  form.consent = l(requestContent.consent);
  form.requester = requestContent.requester.name;
  form.description = l(requestContent.description);
  form.permissions = {};
  form.permissions.read = requestContent.permissions
    .filter((p) => p.level === "read")
    .map((p) => p.defaultName);
  form.title = l(requestContent.title);

  const patients = await getPatients(collector);
  form.data = patients.map((x) => ({
    date: x.dateCreation.toLocaleString(),
    reference: x.displayName || x.inviteName,
    sharingLink: x.sharingLink,
    status: x.status,
    viewLink: x.viewLink,
  }));

  let tabs = [
    { href: "patients", label: l(strings.patients) },
    { href: "details", label: l(strings.formDetails) },
  ];

  const keyTitles = { itemKeys: "ItemKeys", name: "Name", type: "Type" };
  const forms = Object.values(requestContent.app.data.forms);
  for (const [key] of Object.entries(keyTitles)) {
    for (const f of forms) {
      const id = f.key;
      const title = f.name;
      if (key === "itemKeys") {
        form[id] = { title: title };
        switch (f.type) {
          case "permanent":
            form[id].type = l(strings.permanent);
            break;
          case "recurring":
            form[id].type = l(strings.recurring);
            break;
          default:
            form[id].type = f.type;
        }
        form[id].itemDefs = f.itemKeys.map((itemKey) => {
          const itemDef = model.itemsDefs.forKey(itemKey);
          return itemDef.data;
        });
      } else if (key === "name") {
        tabs.push({
          href: `section-${id}`,
          label: `${l(strings.section)} ${title}`,
        });
      }
    }
  }

  form.tabs = tabs;
}

export { logout, setQuestionnaries, showLoginButton, strings };
