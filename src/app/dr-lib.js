import { appTemplates, HDSModel, l, pryv } from "hds-lib-js";

import { props } from "@/app/data.js";

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
/** following the APP GUIDELINES: https://api.pryv.com/guides/app-guidelines/ */
const serviceInfoUrl = "https://demo.datasafe.dev/reg/service/info";
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

async function getPatients(collector) {
  // check inbox for new incoming accepted requests
  const newCollectorInvites = await collector.checkInbox();
  console.log("## refreshInviteList inbox ", newCollectorInvites);

  // get all patients
  const patients = await collector.getInvites();
  patients.sort((a, b) => b.dateCreation - a.dateCreation); // sort by creation date reverse
  for (const patient of patients) {
    if (patient.status === "pending") {
      const inviteSharingData = await patient.getSharingData();
      const patientURL = "https://whatever.backloop.dev:4443/patient.html";
      patient.sharingLink = `${patientURL}?apiEndpoint=${inviteSharingData.apiEndpoint}&eventId=${inviteSharingData.eventId}`;
    }
  }
  console.log("## getPatients patients ", patients);

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
  const appManaging = getAppManaging();
  const collectors = await appManaging.getCollectors();
  props.form.forms = collectors.map((c) => ({
    href: `/forms/${c.id}/patients`,
    id: c.id,
    name: c.name,
  }));
  console.log("## forms", props.form.forms);
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
      showQuestionnary("app-dr-hds-nhsns8v");
    }
    if (state.id === pryv.Browser.AuthStates.INITIALIZED) {
      drConnection = null;
      appManaging = null;
      stateChangeCallBack("loggedOUT");
    }
  }
}

async function showQuestionnary(questionaryId) {
  console.log("## showQuestionnaryId", questionaryId);

  const appManaging = getAppManaging();
  const collector = await appManaging.getCollectorById(questionaryId);
  await collector.init(); // load controller data only when needed
  // show details
  const { requestContent } = collector.statusData;
  props.form.consent = l(requestContent.consent);
  props.form.requester = requestContent.requester.name;
  props.form.description = l(requestContent.description);
  props.form.permissions = {};
  props.form.permissions.read = requestContent.permissions
    .filter((p) => p.level === "read")
    .map((p) => p.defaultName);
  props.form.title = l(requestContent.title);

  const patients = await getPatients(collector);
  props.form.data = patients.map((x) => ({
    date: x.dateCreation.toLocaleString(),
    reference: x.displayName || x.inviteName,
    sharingLink: x.sharingLink,
    status: x.status,
  }));

  localStorage.setItem("props", JSON.stringify(props));
}

export { logout, setQuestionnaries, showLoginButton, showQuestionnary };
