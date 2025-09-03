import { appTemplates, l, pryv, initHDSModel, getHDSModel } from "hds-lib-js";

/** The name of this application */
const APP_MANAGING_NAME = "HDS Dr App PoC";
/** The "base" stream for this App */
const APP_MANAGING_STREAMID = "app-dr-hds";
/** initialized during pryvAuthStateChange */
let appManaging: appTemplates.AppManagingAccount | null;

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
 * exposes appManaging to the app
 */
function getAppManaging(): appTemplates.AppManagingAccount | null {
  return appManaging;
}

export function getLineForEvent(event: pryv.Event) {
  const line = {
    formLabel: "Unknown",
    formType: "Unknown",
    repeatable: "any",
    streamAndType: event.streamId + " - " + event.type,
    time: new Date(event.time * 1000).toLocaleString(),
    value: JSON.stringify(event.content),
    streamId: event.streamIds[0],
    eventType: event.type,
  };

  const itemDef = getHDSModel().itemsDefs.forEvent(event, false);

  if (itemDef) {
    line.formLabel = itemDef.label;
    line.formType = itemDef.data.type;
    line.repeatable = itemDef.data.repeatable;
    if (line.formType === "date") {
      line.value = new Date(event.time * 1000).toISOString().split("T")[0];
    }
    if (line.formType === "select") {
      line.value = event.content;
      let valueForSelect = event.content;
      if (event.type === "ratio/generic") {
        line.value = event.content.value + "/" + event.content.relativeTo;
        valueForSelect = event.content.value;
      }

      console.log("ItemDef Options", itemDef.data.options, event.content);
      const selected = itemDef.data.options.find(
        (o) => o.value === valueForSelect,
      );
      line.value = selected != null ? l(selected.label) : "-";
    }
    if (line.formType === "checkbox") {
      if (event.type === "activity/plain") {
        line.value = "Yes";
      }
    }
    if (event.streamId === "body-weight" && event.type.startsWith("mass/")) {
      const units = event.type.split("/").pop();
      line.value = `${line.value} ${units}`;
    }
  }
  return line;
}

/**
 * Right after logging in:
 * Check if the account has the two forms
 * This step will be implemented in the doctor dashboard when the "create form" will be developed
 * */
async function initDemoAccount() {
  if (appManaging == null) {
    throw new Error("appManaging is null");
  }
  const drConnectionInfo = await appManaging.connection.accessInfo();

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
    const permissions = getHDSModel().authorizations.forItemKeys(itemKeys, {
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

function logout() {
  console.log("## logout");
}

function showLoginButton(loginSpanId, stateChangeCallBack) {
  const authSettings = {
    authRequest: {
      returnURL: "self#",
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
      if (appManaging == null) {
        await initHDSModel(); // hds model needs to be initialized
        appManaging = await appTemplates.AppManagingAccount.newFromApiEndpoint(
          APP_MANAGING_STREAMID,
          state.apiEndpoint,
          APP_MANAGING_NAME,
        );
        await initDemoAccount();
      } else {
        console.log("!!!! AppManaging already initialized");
      }
      stateChangeCallBack("loggedIN");
    }
    if (state.id === pryv.Browser.AuthStates.INITIALIZED) {
      appManaging = null;
      stateChangeCallBack("loggedOUT");
    }
  }
}

export { getAppManaging, showLoginButton };
