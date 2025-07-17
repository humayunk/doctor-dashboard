import { props } from "@/app/data.js";
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
/** following the APP GUIDELINES: https://api.pryv.com/guides/app-guidelines/ */
const serviceInfoUrl = "https://demo.datasafe.dev/reg/service/info";
/** from common-data-defs.js */
const v2 = {
  "questionary-x": {
    title: "Demo with Profile and TTC-TTA 3",
    permissionsPreRequest: [{ streamId: "profile" }, { streamId: "fertility" }],
    forms: {
      profile: {
        type: "permanent",
        key: "profile-x",
        name: "Profile",
        itemKeys: [
          "profile-name",
          "profile-surname",
          "profile-sex",
          "family-children-count",
          "fertility-miscarriages-count",
        ],
      },
      history: {
        type: "recurring",
        key: "recurring-x",
        name: "History",
        itemKeys: ["fertility-ttc-tta", "body-weight"],
      },
    },
  },
  "questionnary-basic": {
    title: "Basic Profile and Cycle Information 3",
    permissionsPreRequest: [{ streamId: "profile" }],
    forms: {
      profile: {
        type: "permanent",
        key: "profile-b",
        name: "Profile",
        itemKeys: ["profile-name", "profile-surname", "profile-date-of-birth"],
      },
      history: {
        type: "recurring",
        key: "recurring-b",
        name: "History",
        itemKeys: [
          "body-weight",
          "body-vulva-wetness-feeling",
          "body-vulva-mucus-inspect",
          "body-vulva-mucus-stretch",
          "fertility-cycles-start",
          "fertility-cycles-ovulation",
        ],
      },
    },
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

async function getPatientsData(collector) {
  const requestContent = collector.statusData.requestContent;
  console.log("## collector requestContent", requestContent);
  // static headers
  const headers = {
    status: "Status",
    inviteName: "Invite",
    username: "Username",
    createdAt: "Date",
  };
  // headers from first form
  const firstForm = Object.values(requestContent.app.data.forms)[0];
  const itemDefs = [];
  for (const itemKey of firstForm.itemKeys) {
    const itemDef = model.itemsDefs.forKey(itemKey);
    itemDefs.push(itemDef);
    headers[itemDef.key] = l(itemDef.data.label);
  }

  // add lines (1 per patient)
  const invites = await collector.getInvites();
  const activeInvites = invites.filter((i) => i.status === "active");

  // fetch patient data
  const patientPromises = activeInvites.map((invite) =>
    getPatientDetails(invite, itemDefs),
  );
  const patientsData = await Promise.all(patientPromises);
  patientsData.sort((a, b) => b.dateCreation - a.dateCreation); // sort by creation date reverse
  console.log("## patientsResults", patientsData);

  return { headers, patientsData };
}

async function getPatientDetails(invite, itemDefs) {
  const patient = {
    invite,
    status: invite.status,
    username: null,
    inviteName: invite.displayName,
    createdAt: invite.dateCreation.toLocaleString(),
    dateCreation: invite.dateCreation, // keep it as a date for sorting
  };
  console.log(
    "## getPatientDetails.invite",
    invite,
    invite.status,
    invite.eventData.streamIds,
  );

  // --
  // const patientInfo = await invite.checkAndGetAccessInfo();
  // if (patientInfo === null) return patient;
  return patient;
  patient.username = patientInfo.user.username;

  // -- get data

  // get the last value of each itemKey
  const apiCalls = itemDefs.map((itemDef) => {
    return {
      method: "events.get",
      params: {
        streams: [itemDef.data.streamId],
        types: itemDef.eventTypes,
        limit: 1,
      },
    };
  });

  const profileEventsResults = await invite.connection.api(apiCalls);
  for (const profileEventRes of profileEventsResults) {
    const profileEvent = profileEventRes?.events?.[0];
    if (!profileEvent) continue;
    const field = dataFieldFromEvent(profileEvent);
    patient[field.key] = field.value != null ? field.value : "";
  }
  return patient;
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
  console.log("*** initDemoAccount - drConnectionInfo ***", drConnectionInfo);
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
      console.log("*** initDemoAccount found ***", found);
      continue; // stop here if exists
    }
    console.log("*** initDemoAccount creating collector for ***", questionary);
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
      version: "0",
      title: {
        en: questionary.title,
      },
      requester: {
        name: "Username " + drConnectionInfo.user.username,
      },
      description: {
        en: "Short Description to be updated: " + questionary.title,
      },
      consent: {
        en: "This is a consent message to be set",
      },
      permissions,
      app: {
        id: "dr-form",
        url: "https://xxx.yyy",
        data: {
          // will be used by patient app
          forms: questionary.forms,
        },
      },
    };
    newCollector.statusData.requestContent = requestContent;
    await newCollector.save(); // save the data (done when the form is edited)
    await newCollector.publish();
    console.log("*** initDemoAccount published ***", newCollector);
  }
  console.log("*** initDemoAccount with ***", collectors);
}

async function initHDSModel() {
  if (!model) {
    const service = new pryv.Service(serviceInfoUrl);
    const serviceInfo = await service.info();
    model = new HDSModel(serviceInfo.assets["hds-model"]);
    console.log("*** model ***", model);
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
    href: `/forms/${c.id}/data`,
    id: c.id,
    name: c.name,
  }));
  console.log("## forms", props.form.forms);
  localStorage.setItem("props", JSON.stringify(props));
}

function showLoginButton(loginSpanId, stateChangeCallBack) {
  const authSettings = {
    spanButtonID: loginSpanId, // div id the DOM that will be replaced by the Service specific button
    onStateChange: pryvAuthStateChange, // event Listener for Authentication steps
    authRequest: {
      // See: https://api.pryv.com/reference/#auth-request
      requestingAppId: APP_MANAGING_STREAMID, // to customize for your own app
      requestedPermissions: [
        {
          streamId: APP_MANAGING_STREAMID,
          defaultName: APP_MANAGING_NAME,
          level: "manage",
        },
      ],
      clientData: {
        "app-web-auth:ensureBaseStreams": [
          // this is handled by custom app web Auth3 (might be migrated in permission request)
          { id: "applications", name: "Applications" },
          {
            id: APP_MANAGING_STREAMID,
            name: APP_MANAGING_NAME,
            parentId: "applications",
          },
        ],
        "app-web-auth:description": {
          type: "note/txt",
          content:
            "This app allows to send invitation links to patients and visualize and export answers.",
        },
      },
    },
  };

  pryv.Browser.setupAuth(authSettings, serviceInfoUrl);

  async function pryvAuthStateChange(state) {
    // called each time the authentication state changes
    console.log("*** pryvAuthStateChange ***", state);
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
  props.form.title = l(requestContent.title);

  const { headers, patientsData } = await getPatientsData(collector);
  props.form.columns = Object.entries(headers).map(([key, value]) => value);
  // props.patientsData = patientsData;
  console.log("## columns", props.form.columns);
  console.log("## patientsData", patientsData);

  localStorage.setItem("props", JSON.stringify(props));
}

export { logout, setQuestionnaries, showLoginButton, showQuestionnary };
