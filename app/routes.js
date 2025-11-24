//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const sessionDataDefaults = require("./data/session-sets/example");
const emptyData = require("./data/session-sets/empty-data");
const exampleData = require("./data/session-sets/example");
const example2Data = require('./data/session-sets/example2')
const router = govukPrototypeKit.requests.setupRouter();

router.post("/:prototypeVersion/next-court-date-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.warrantType;
  const route = req.session.data.route;
  var nextCourtDateSelect =
    req.session.data["appearance"]["next-court-date-set"];
  if (prototypeVersion == "v12" || prototypeVersion >= 13) {
    if (route == "appearance") {
      if (nextCourtDateSelect == "Yes") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/next-hearing-type-select`
        );
      } else {
        if (warrantType == "Remand") {
          res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers-next-appearance`
          );
        } else if (warrantType == "Sentencing") {
          res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers-next-appearance`
          );
        }
      }
    } else {
      if (nextCourtDateSelect == "Yes") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/next-hearing-type-select`
        );
      } else {
        if (warrantType == "Remand") {
          res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-case/check-answers-next-appearance`
          );
        } else if (warrantType == "Sentencing") {
          req.session.data.nextCourtAppearanceComplete = "Yes";
          res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
          );
        }
      }
    }
  } else {
    if (nextCourtDateSelect == "Yes") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/next-hearing-type-select`
      );
    } else res.redirect(307, `/${prototypeVersion}/persist-appearance`);
  }
});

router.post(
  "/:prototypeVersion/next-hearing-court-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var nextCourtDateSelect =
      req.session.data["appearance"]["next-hearing-court-select"];
    if (nextCourtDateSelect == "No") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-name`
      );
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers-next-appearance`
      );
    }
  }
);

router.post(
  "/:prototypeVersion/next-hearing-court-select-2",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var nextCourtDateSelect =
      req.session.data["appearance"]["next-hearing-court-select"];
    if (nextCourtDateSelect == "No") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/next-court-name`
      );
    } else
      req.session.data["appearance"]["next-court-name"] =
        req.session.data["appearance"]["court-name"];
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/check-answers-next-appearance`
    );
  }
);

router.post("/:prototypeVersion/offence-code-known", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.warrantType;
  const overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  var offenceCodeKnown = req.session.data["offence-code-known"];
  var offenceCode = "";
  if (req.session.data.sentence != null) {
    offenceCode = req.session.data.sentence["offence-code"];
  } else if (req.session.data.offence != null) {
    offenceCode = req.session.data.offence["offence-code"];
  } else {
    var offenceCode = "None";
  }
  var route = "";
  if (req.query.route != null) {
    route = req.query.route;
  } else {
    route = req.session.data.route;
    console.log("Route: " + route);
  }
  console.log("Offence code known: " + offenceCodeKnown);
  if (offenceCodeKnown != "None") {
    console.log("Offence code" + offenceCode);
    if (offenceCode.includes("TR06001")) {
      console.log("TEST");
      req.session.data.sentence["terror-related"] = "Yes";
      req.session.data.sentence["offence-name"] =
        "Publish / cause another to publish statement intending / reckless as to encouragement of terrorism - Terrorism Act 2006";
      req.session.data.sentence["cja-code"] = "066/53";
      req.session.data.sentence["legislation"] =
        "Contrary to section 2(1) and (11) of the Terrorism Act 2006";
    } else if (offenceCode.includes("TR06002")) {
      req.session.data.sentence["terror-related"] = "Yes";
      req.session.data.sentence["offence-name"] =
        "Distribute / circulate a terrorist publication - Terrorism Act 2006";
      req.session.data.sentence["cja-code"] = "066/54";
      req.session.data.sentence["legislation"] =
        "Contrary to section 2(1) and (11) of the Terrorism Act 2006";
    } else if (offenceCode.includes("TR06003")) {
      req.session.data.sentence["terror-related"] = "Yes";
      req.session.data.sentence["offence-name"] =
        "Give / sell / lend / offer for sale / loan a terrorist publication - Terrorism Act 2006";
      req.session.data.sentence["cja-code"] = "066/55";
      req.session.data.sentence["legislation"] =
        "Contrary to section 2(1) and (11) of the Terrorism Act 2006";
    } else if (offenceCode.includes("BL63016")) {
      req.session.data.sentence["offence-code"] = "BL63016";
      req.session.data.sentence["terror-related"] = "No";
      req.session.data.sentence["offence-name"] = "Betting in the street";
      req.session.data.sentence["offence-active"] = "inactive";
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/inactive-offence-error`
      );
    } else if (
      offenceCode.includes("CJ88001") &&
      overallCaseOutcomeApply == "No" &&
      warrantType == "Remand"
    ) {
      console.log("TEST");
      req.session.data.offence["offence-code"] = "CJ88001";
      req.session.data.offence["terror-related"] = "No";
      req.session.data.offence["offence-name"] = "Common assault";
      req.session.data.offence["cja-code"] = "105/01";
      req.session.data.offence["legislation"] =
        "Contrary to section 39 of the Criminal Justice Act 1988";
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
      );
    } else if (offenceCode.includes("CJ88001")) {
      req.session.data.sentence["offence-code"] = "CJ88001";
      req.session.data.sentence["terror-related"] = "No";
      req.session.data.sentence["offence-name"] = "Common assault";
      req.session.data.sentence["cja-code"] = "105/01";
      req.session.data.sentence["legislation"] =
        "Contrary to section 39 of the Criminal Justice Act 1988";
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`
      );
    }
  }
  if (offenceCodeKnown == "None") {
    if (offenceCodeKnown.includes("None")) {
      if (route == "remand-to-sentence") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/offence-name`
        );
      }
      if (warrantType == "Sentencing" && overallCaseOutcomeApply != "Yes") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/offence-name`
        );
      }
      if (warrantType == "Sentencing") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/offence-name`
        );
      }
      if (req.session.data.postSaveEdit == "true" && route == "sentence") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/offence-name`
        );
      }
      if (
        (req.session.data.postSaveEdit == "true" && route == "offence") ||
        route == "edit-appearance"
      ) {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/offence-name`
        );
      }
      if (route == "new-court-case") {
        if (warrantType == "Remand") {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-an-offence/offence-name`
          );
        } else {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-sentence/offence-name`
          );
        }
      }
    }
  } else {
    if (offenceCode == "TH68033A") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/invalid-offence-code`
      );
    }
    if (offenceCode == "TH68033C") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`
      );
    }
    if (warrantType == "Sentencing") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`
      );
    }
    if (req.session.data.postSaveEdit == "true" && route == "offence") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
      );
    }
    if (req.session.data.postSaveEdit == "true" && route == "sentence") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`
      );
    }
    if (route == "new-court-case") {
      if (warrantType == "Remand") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
        );
      } else if (warrantType == "Sentencing") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`
        );
      } else if (warrantType == "Remand") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
        );
      }
    }
  }
});

router.post("/:prototypeVersion/outcome-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  if (req.session.data.offence["outcome"]) {
    var outcome = req.session.data.offence["outcome"];
  } else {
    outcome = req.session.data.sentence["outcome"];
  }
  console.log("Offence outcome: " + outcome);
  if (outcome === "Imprisonment") {
    req.session.data.sentence["offence-start-date-day"] =
      req.session.data.offence["offence-start-date-day"];
    req.session.data.sentence["offence-start-date-month"] =
      req.session.data.offence["offence-start-date-month"];
    req.session.data.sentence["offence-start-date-year"] =
      req.session.data.offence["offence-start-date-year"];
    req.session.data.sentence["offence-end-date-day"] =
      req.session.data.offence["offence-end-date-day"];
    req.session.data.sentence["offence-end-date-month"] =
      req.session.data.offence["offence-end-date-month"];
    req.session.data.sentence["offence-end-date-year"] =
      req.session.data.offence["offence-end-date-year"];
    req.session.data.sentence["offence-name"] =
      req.session.data.offence["offence-name"];
    req.session.data.sentence["terror-related"] =
      req.session.data.offence["terror-related"];
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/count-number`
    );
  } else {
    return res.redirect(307, `/${prototypeVersion}/persist-offence`);
  }
});

router.post("/:prototypeVersion/outcome-select-2", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var outcome = req.session.data.appearance["overall-case-outcome"];
  console.log(outcome);
  if (outcome.includes("lookup-another-outcome")) {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/lookup-outcome`
    );
  } else if (prototypeVersion == "v8") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/outcome-apply-all`
    );
  } else
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-date-select`
    );
});

router.post("/:prototypeVersion/outcome-select-3", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var outcome = req.session.data.appearance["overall-case-outcome"];
  const route = req.session.data.route;
  console.log("Outcome: " + outcome);
  console.log("Route: " + route);
  if (outcome.includes("lookup-another-outcome")) {
    if (route == "appearance") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/lookup-outcome`
      );
    } else
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/lookup-outcome`
      );
  } else if (route == "appearance") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/outcome-apply-all`
    );
  } else
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/outcome-apply-all`
    );
});

router.post("/:prototypeVersion/outcome-select-4", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var outcome = req.session.data.offence["outcome"];
  console.log(outcome);
  if (outcome.includes("lookup-another-outcome")) {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/lookup-outcome`
    );
  } else return res.redirect(307, `/${prototypeVersion}/persist-offence`);
});

router.post("/:prototypeVersion/sentence-outcome-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var outcome = req.session.data.sentence["outcome"];
  const warrantType = req.session.data.appearance["warrant-type"];

  console.log("Outcome: " + outcome);
  console.log("Warrant type: " + warrantType);
  if (outcome == "Imprisonment") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-sentence/sentence-type`
    );
  } else return res.redirect(307, `/${prototypeVersion}/persist-offence`);
});

router.post("/:prototypeVersion/new-court-case-ref", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = req.session.data.courtCaseIndex;
  var caseRefSelect = req.session.data.appearance["case-ref-select"];
  const route = req.session.data['route'];
  console.log("Case ref select:" + caseRefSelect);
  if (caseRefSelect.includes("Yes")) {
    req.session.data.appearance["court-case-ref"] =
      req.session.data.courtCases[courtCaseIndex].appearances.at(-1)[
        "court-case-ref"
      ];
    if (route == "immediate-release") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/appearance-date`
      );
    } else
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/warrant-date`
      );
  } 
  if (route == "immediate-release") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/court-case-reference-number`
      );
    }
   else return res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number`);
});

router.post("/:prototypeVersion/new-court-name", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = req.session.data.courtCaseIndex;
  const warrantType = req.session.data.appearance["warrant-type"];
  const route = req.session.data['route'];
  var newCourtName = req.session.data.appearance["court-name-select"];
  console.log("New court name:" + newCourtName);
  if (newCourtName.includes("Yes")) {
    req.session.data.appearance["court-name"] =
      req.session.data.courtCases[courtCaseIndex].appearances.at(-1)[
        "next-court-name"
      ];
    if (req.session.data.appearance["overall-case-outcome"] == "Imprisonment") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers`
      );
    } else if (route == "immediate-release") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/check-answers-appearance-info`
      );
    } else {
      if(prototypeVersion => 26){
        return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers`
      );
      } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/overall-case-outcome`
      );
    }
  }
  }
  if (route == "immediate-release") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/court-name`
      );
    }
   else return res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-name`);
});

router.post("/:prototypeVersion/change-offences-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = req.session.data.courtCaseIndex;
  var changeOffences = req.session.data.appearance["change-offences"];
  console.log("Change offences:" + changeOffences);
  if (changeOffences.includes("Yes")) {
    req.session.data.changeMade = 0;
    req.session.data.offenceDeleted = 0;
    req.session.data.offenceAdded = 0;
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`
    );
  } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-date-select`);
});

// Overall case outcome applies all offences
router.post("/:prototypeVersion/case-outcome-apply", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = req.session.data.courtCaseIndex;
  const appearanceIndex = req.session.data.appearanceIndex;
  var route = "";
  if (req.query.route) {
    route = req.query.route;
  } else {
    route = req.session.data.route;
  }
  console.log("Route: " + route);
  var warrantType = req.session.data.appearance["warrant-type"];
  console.log("Warrant type: " + warrantType);
  var overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  console.log("Overall case outcome applies: " + overallCaseOutcomeApply);
  if (overallCaseOutcomeApply == "Yes" && warrantType != "Sentencing") {
    req.session.data.appearance["overall-case-outcome-apply-all"] =
      overallCaseOutcomeApply;
    req.session.data.appearance.offences =
      req.session.data.appearance.offences.map((offence) => {
        offence.outcome = req.session.data.appearance["overall-case-outcome"];
        console.log("Offence outcome: " + offence["outcome"]);
        return offence;
      });
    if (route == "repeat-remand") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
      );
    }
    if (warrantType == "Sentencing") {
      return res.redirect(
        307,
        `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
      );
    }
    if (route == "edit-appearance") {
      res.redirect(`/${prototypeVersion}/court-cases/edit-appearance`);
    } else
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`
      );
  } else if (overallCaseOutcomeApply == "Yes" && warrantType == "Sentencing") {
    req.session.data.appearance["overall-case-outcome-apply-all"] =
      overallCaseOutcomeApply;
    req.session.data.appearance.sentences =
      req.session.data.appearance.sentences.map((sentence) => {
        sentence.outcome = req.session.data.appearance["overall-case-outcome"];
        return sentence;
      });
    if (prototypeVersion >= 23) {
      return res.redirect(
        307,
        `/${prototypeVersion}/court-cases/add-a-sentence/outcome`
      );
    } else {
      return res.redirect(
        307,
        `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
      );
    }
  } else if (warrantType == "Sentencing" && route == "edit-appearance") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/change-outcome`
    );
  } else if (warrantType == "Sentencing") {
    res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/outcome`);
  } else
    res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/outcome`);
});

// Overall conviction date applies to all offences
router.post(
  "/:prototypeVersion/overall-conviction-date-apply",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const courtCaseIndex = req.session.data.courtCaseIndex;
    const appearanceIndex = req.session.data.appearanceIndex;
    const route = req.query.route;
    console.log("Route: " + route);
    const warrantType = req.session.data.warrantType;
    var overallConvictionDateApply = "No";
    overallConvictionDateApply =
      req.session.data.appearance["overall-conviction-date-apply-all"];
    console.log(
      "Overall case conviction date applies to all offences: " +
        overallConvictionDateApply
    );
    console.log("Warrant type: " + warrantType);
    if (overallConvictionDateApply == "Yes" && warrantType == "Sentencing") {
      req.session.data.appearance["overall-conviction-date-apply-all"] =
        overallConvictionDateApply;
      req.session.data.sentence = {
        "conviction-date-day":
          req.session.data["appearance"]["overall-conviction-date-day"],
        "conviction-date-month":
          req.session.data["appearance"]["overall-conviction-date-month"],
        "conviction-date-year":
          req.session.data["appearance"]["overall-conviction-date-year"],
      };
      console.log(
        "Conviction date: " +
          req.session.data.sentence["conviction-date-day"] +
          "/" +
          req.session.data.sentence["conviction-date-month"] +
          "/" +
          req.session.data.sentence["conviction-date-year"]
      );
      req.session.data.overallQuestionsComplete = "Yes";
      console.log(
        "Overall questions complete " +
          req.session.data.overallQuestionsComplete
      );
      if (
        prototypeVersion == 18 ||
        (prototypeVersion >= 20 && prototypeVersion < 23)
      ) {
        if (route == "remand-to-sentence") {
          return res.redirect(
            307,
            `/${prototypeVersion}/court-cases/add-a-court-appearance/overall-conviction-date`
          );
        } else {
          return res.redirect(
            307,
            `/${prototypeVersion}/court-cases/add-a-sentence/overall-conviction-date`
          );
        }
      }
      if (prototypeVersion == 19) {
        if (route == "remand-to-sentence") {
          return res.redirect(
            307,
            `/${prototypeVersion}/court-cases/add-a-court-appearance/overall-conviction-date`
          );
        } else {
          return res.redirect(
            307,
            `/${prototypeVersion}/court-cases/add-a-court-case/overall-conviction-date`
          );
        }
      } else {
        return res.redirect(
          307,
          `/${prototypeVersion}/court-cases/add-a-sentence/overall-outcome-apply-all`
        );
      }
    }
  }
);

//Add court case
router.get("/:prototypeVersion/create-court-case", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  delete req.session.data.courtCaseIndex;
  delete req.session.data.courtCase;
  var appearanceDetailsComplete = 0;
  var courtDocumentsComplete = 0;
  var addSentenceInformationComplete = 0;
  var overallQuestionsComplete = "No";
  if (prototypeVersion == "v12" || prototypeVersion >= 13) {
    req.session.data.route = "new-court-case";
    console.log("Route: " + req.session.data.route);
    req.session.data.appearanceDetailsComplete = appearanceDetailsComplete;
    req.session.data.overallQuestionsComplete = overallQuestionsComplete;
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/warrant-type`
    );
  } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/court-case-reference-number`);
});

router.post("/:prototypeVersion/persist-court-case", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.warrantType;

  if (!req.session.data.courtCases) {
    req.session.data.courtCases = [];
  }

  if (req.session.data.courtCaseIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex] =
      req.session.data.courtCase;
  } else if (warrantType == "Sentencing") {
    const appearance = {
      ...req.session.data.appearance,
      sentences: [],
    };
    const courtCase = {
      ...req.session.data.courtCase,
      "court-case-num": req.session.data.courtCases.length - 1,
      appearances: [],
    };
    req.session.data.courtCases.push(courtCase);
    req.session.data.courtCase = courtCase;
    req.session.data.courtCaseIndex = req.session.data.courtCases.length - 1;
    req.session.data.appearance = appearance;
  } else if (warrantType != "Sentencing") {
    const appearance = {
      ...req.session.data.appearance,
      offences: [],
    };
    const courtCase = {
      ...req.session.data.courtCase,
      "court-case-num": req.session.data.courtCases.length - 1,
      appearances: [],
    };
    req.session.data.courtCases.push(courtCase);
    req.session.data.courtCase = courtCase;
    req.session.data.courtCaseIndex = req.session.data.courtCases.length - 1;
    req.session.data.appearance = appearance;
  }
  if (
    prototypeVersion == "v9" ||
    prototypeVersion == "v10" ||
    prototypeVersion == "v11"
  ) {
    if (warrantType == "Sentencing") {
      console.log("Redirecting to add sentence");
      return res.redirect(`/${prototypeVersion}/create-sentence`);
    } else {
      console.log("Redirecting to add offence");
      return res.redirect(`/${prototypeVersion}/create-offence`);
    }
  } else if (prototypeVersion == "v12" || prototypeVersion >= 13) {
    req.session.data.appearanceDetailsComplete = 1;
    console.log(
      "Appearance details complete: " +
        req.session.data.appearanceDetailsComplete
    );
    req.session.data.edit = "false";
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
    );
  } else return res.redirect(`/${prototypeVersion}/create-offence`);
});

router.get("/:prototypeVersion/update-appearance", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = req.query.courtCaseIndex;
  const appearanceIndex = req.query.appearanceIndex;
  console.log(
    "Court case index: " +
      courtCaseIndex +
      "\n" +
      "Appearance index: " +
      appearanceIndex
  );
  req.session.data.appearance =
    req.session.data.courtCases[courtCaseIndex].appearances[appearanceIndex];
  req.session.data.courtCaseIndex = courtCaseIndex;
  req.session.data.appearanceIndex = appearanceIndex;
  if ((prototypeVersion) => 22) {
    console.log("TEST");
    return res.redirect(`/${prototypeVersion}/court-cases/edit-appearance`);
  }
  res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
});

router.get("/:prototypeVersion/delete-court-case", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  req.session.data.courtCases.splice(index, 1);
  res.redirect(`/${prototypeVersion}/court-cases/court-cases-standalone`);
});

//Add an appearance
router.get("/:prototypeVersion/create-appearance", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  delete req.session.data.appearanceIndex;
  delete req.session.data.appearance;
  const courtIndex = req.query.courtIndex;
  const route = req.query.route;
  console.log("Route: " + route)
  if (courtIndex !== undefined) {
    req.session.data.courtCase = req.session.data.courtCases[courtIndex];
    req.session.data.courtCaseIndex = courtIndex;
    console.log("Court case" + req.session.data.courtCase)
  }
  const lastAppearance = req.session.data.courtCase.appearances.at(-1);
  req.session.data.appearance = {
    offences: lastAppearance.offences,
    "court-name": lastAppearance["next-court-name"],
    "warrant-date-day": lastAppearance["next-court-date-day"],
    "warrant-date-month": lastAppearance["next-court-date-month"],
    "warrant-date-year": lastAppearance["next-court-date-year"],
  };
  if (
    prototypeVersion == "v8" ||
    prototypeVersion == "v9" ||
    prototypeVersion == "v10" ||
    prototypeVersion == "v11"
  ) {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number-select`
    );
  } else if (
    prototypeVersion == "v12" ||
    (prototypeVersion >= 13 && prototypeVersion < 25)
  ) {
    req.session.data.appearanceDetailsComplete = 0;
    req.session.data.courtDocumentsComplete = 0;
    req.session.data.offencesComplete = 0;
    req.session.data.nextCourtAppearanceComplete = "No";
    req.session.data.edit = "false";
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/warrant-type`
    );
  } else if (prototypeVersion >= 25) {
    req.session.data.appearanceDetailsComplete = 0;
    req.session.data.courtDocumentsComplete = 0;
    req.session.data.offencesComplete = 0;
    req.session.data.nextCourtAppearanceComplete = "No";
    req.session.data.edit = "false";
    if (route == "immediate-release"){
      return res.redirect(
      `/${prototypeVersion}/court-cases/record-an-immediate-release/reason-for-release`
    );
    } else
      if(prototypeVersion >= 26){
        return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/warrant-type`
    );
      } else {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/warrant-type`
    );
  }
  }
   else {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number`
    );
  }
});
router.get("/:prototypeVersion/overall-case-outcome", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;

  // Safeguards
  req.session.data = req.session.data || {};
  req.session.data.appearance = req.session.data.appearance || {};

  const outcomeRaw = req.session.data.appearance["overall-case-outcome"];
  const outcome = typeof outcomeRaw === "string" ? outcomeRaw.trim() : outcomeRaw;

  if (outcome) {
    // Sentencing outcomes
    const SENTENCING = new Set([
      "Imprisonment",
      "Detention and training order (DTO)",
      "Imprisonment in default of a fine",
    ]);

    // Remand outcomes
    const REMAND = new Set([
      "Remand in Custody (Bail Refused)",
      "Remand in custody",
      "Send to Crown Court for trial",
      "Convicted awaiting sentence",
      "Commit to Crown Court for sentence in custody",
      "Remittal for sentence in custody",
      "Commit to Crown Court for sentence",
      "Remittal for trial in custody",
    ]);

    // Non-custodial outcomes
    const NON_CUSTODIAL = new Set([
      "Lie on file",
      "Community Order",
      "Adjournment",
      "Dismissed",
      "No Evidence Offered - Dismissed",
      "Discontinuance",
      "Commit/Transfer/Send to Crown Court for Trial in Custody",
      "Detention and Training Order",
      "Commit to Crown Court for Trial (Summary / Either Way Offences)",
      "Guilty",
      "Sentence Postponed",
      "Fine",
      "Proceedings Stayed",
      "Discharged",
      "Withdrawn - Final",
      "Not guilty",
      "Bail",
      "Suspended imprisonment",
      "No separate penalty",
      "Withdrawn",
    ]);

    let warrantType = "Non-custodial"; // default

    if (SENTENCING.has(outcome)) {
      warrantType = "Sentencing";
    } else if (REMAND.has(outcome)) {
      warrantType = "Remand";
    } else if (NON_CUSTODIAL.has(outcome)) {
      warrantType = "Non-custodial";
    }

    req.session.data.appearance["warrant-type"] = warrantType;

    // ✔ Custom routing for Remand AND Non-custodial
    if (warrantType === "Remand" || warrantType === "Non-custodial") {
      const route = req.session.data.route; // ensure this exists in session

      if (route === "appearance") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
        );
      } else if (route === "new-court-case") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
        );
      } else {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/overall-case-outcome`
        );
      }
    }
  }

  // ✔ Sentencing follows existing behaviour
  return res.redirect(307, `/${prototypeVersion}/warrant-type-select`);
});


router.post("/:prototypeVersion/persist-appearance", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;

  // --- Safely reconstruct the working appearance + indices ---
  const cases = req.session.data.courtCases || [];
  let courtCaseIndex = req.session.data.courtCaseIndex;
  let appearanceIndex = req.session.data.appearanceIndex;

  // Try to recover indices if missing
  if (courtCaseIndex == null) {
    courtCaseIndex = cases.length ? cases.length - 1 : 0;
    req.session.data.courtCaseIndex = courtCaseIndex;
  }
  const appearances = cases[courtCaseIndex]?.appearances || [];
  if (appearanceIndex == null) {
    appearanceIndex = appearances.length ? appearances.length - 1 : 0;
    req.session.data.appearanceIndex = appearanceIndex;
  }

  // Current appearance from session or persisted array
  let currentAppearance =
    req.session.data.appearance || appearances[appearanceIndex] || {};
  // Ensure session appearance exists for downstream code
  req.session.data.appearance = currentAppearance;

  let appearanceDetailsComplete = 0;
  const route = req.session.data.route;
  const warrantType = currentAppearance?.["warrant-type"];
  console.log("Route: " + route);

  // --- Persist appearance back to the array safely ---
  if (req.session.data.appearanceIndex !== undefined) {
    if (!cases[courtCaseIndex]) cases[courtCaseIndex] = { appearances: [] };
    if (!cases[courtCaseIndex].appearances)
      cases[courtCaseIndex].appearances = [];
    cases[courtCaseIndex].appearances[appearanceIndex] =
      req.session.data.appearance;
  } else if (req.query.isFirst) {
    if (!cases[courtCaseIndex]) cases[courtCaseIndex] = { appearances: [] };
    if (!cases[courtCaseIndex].appearances)
      cases[courtCaseIndex].appearances = [];
    cases[courtCaseIndex].appearances[0] = {
      ...(cases[courtCaseIndex].appearances[0] || {}),
      ...req.session.data.appearance,
    };
    req.session.data.appearanceIndex = 0;
  } else {
    if (!cases[courtCaseIndex]) cases[courtCaseIndex] = { appearances: [] };
    if (!cases[courtCaseIndex].appearances)
      cases[courtCaseIndex].appearances = [];
    cases[courtCaseIndex].appearances.push(req.session.data.appearance);
    req.session.data.appearanceIndex =
      cases[courtCaseIndex].appearances.length - 1;
    console.log("Appearance index: " + req.session.data.appearanceIndex);
  }
  req.session.data.courtCases = cases;

  // Post-save edit shortcut
  if (
    req.session.data.addCountNumbersOtherSentence == true &&
    req.session.data.postSaveEditComplete == "true"
  ) {
    var savedIndex = req.session.data.savedIndex;
    console.log("Saved index: " + savedIndex);
    req.session.data.courtCaseIndex = savedIndex[0];
    req.session.data.appearanceIndex = savedIndex[1];
    console.log("Court case index: " + req.session.data.courtCaseIndex);
    console.log("Appearance index: " + req.session.data.appearanceIndex);
    req.session.data.appearance =
      req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[
        req.session.data.appearanceIndex
      ];
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
    );
  }

  // ===== EARLY SHORT-CIRCUIT FOR NON-CUSTODIAL =====
  if (route === "immediate-release" && prototypeVersion == 25) {
    if (req.query.appearanceComplete === "true") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/confirmation`
      );
    }
    appearanceDetailsComplete = 1;
    req.session.data.appearanceDetailsComplete = appearanceDetailsComplete;
    console.log("Appearance details complete: " + appearanceDetailsComplete);
    return res.redirect(
      `/${prototypeVersion}/court-cases/record-an-immediate-release/task-list`
    );
  }
  // =================================================

  if (route == "repeat-remand") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers`
    );
  } else if (route == "add-a-court-case") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/confirmation`
    );
  } else if (route == "appearance" || warrantType == "Non-custodial") {
    appearanceDetailsComplete = 1;
    req.session.data.appearanceDetailsComplete = appearanceDetailsComplete;
    console.log("Appearance details complete: " + appearanceDetailsComplete);

    if (req.session.data.saveCourtCase == "true") {
      req.session.data.appearance["status"] = ["draft"];
      console.log(
        "Appearance status: " + req.session.data.appearance["status"]
      );
      return res.redirect(`/${prototypeVersion}/court-cases/`);
    }
    if (req.query.appearanceComplete == "true") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/confirmation`
      );
    }
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
    );
  } else if (route == "new-court-case") {
    if (req.query.saveCourtCase == "true") {
      req.session.data.appearance["status"] = ["draft"];
      console.log(
        "Appearance status: " + req.session.data.appearance["status"]
      );
      return res.redirect(`/${prototypeVersion}/court-cases/`);
    } else {
      req.session.data.appearance["status"] = ["complete"];
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/confirmation`
      );
    }
  } else if (route == "edit-appearance") {
    if (req.session.data.saveCourtCase == "true") {
      req.session.data.appearance["status"] = ["draft"];
      console.log(
        "Appearance status: " + req.session.data.appearance["status"]
      );
      return res.redirect(`/${prototypeVersion}/court-cases/`);
    } else if (req.session.data.postSaveEdit == "true") {
      return res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
    } else if (req.session.data.postSaveEditComplete == "true") {
      return res.redirect(`/${prototypeVersion}/court-cases/confirmation-edit`);
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/confirmation`
      );
    }
  }

  // Absolute fallback
  return res.redirect(
    `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
  );
});


router.get("/:prototypeVersion/close-success-message", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var displaySuccess = 0;
  req.session.data.appearanceSuccess = displaySuccess;
  res.redirect(`/${prototypeVersion}/court-cases/`);
});

//Add offences

router.get("/:prototypeVersion/create-offence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  delete req.session.data.offenceIndex;
  delete req.session.data.offence;
  const appearanceIndex = req.query.appearanceIndex;
  const route = req.session.data.route;
  const path = req.query.path;
  const overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  req.session.data.newOffence = 1;
  console.log("Route: " + route);
  if (appearanceIndex !== undefined) {
    req.session.data.appearance =
      req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[
        appearanceIndex
      ];
    req.session.data.appearanceIndex = appearanceIndex;
  }
  if (req.session.data.appearance["overall-case-outcome-apply-all"] === "Yes") {
    req.session.data.offence = {
      outcome: req.session.data.appearance["overall-case-outcome"],
    };
  }
  if (prototypeVersion >= 22) {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/offence-date`
    );
  }
  if (path == "cta" || prototypeVersion >= 19) {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/offence-code`
    );
  } else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/check-answers`
    );
  }
});

router.post("/:prototypeVersion/persist-offence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const route = req.session.data.route;
  const edit = req.session.data.edit;
  offenceIndex = req.session.data.offenceIndex;
  req.session.data.offence["status"] = "complete";
  console.log("Offence index:" + offenceIndex);
  console.log("Route: " + route);
  console.log("Edit: " + edit);
  if (edit == "true") {
    console.log("Saving edits");
    req.session.data.appearance.offences[req.session.data.offenceIndex] =
      req.session.data.offence;
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/edit-an-offence`
    );
  }
  if (req.session.data.postSaveEdit == "true") {
    req.session.data["change-made"] = req.query.changeMade;
    req.session.data["variable-name"] = req.query.variableName;
    req.session.data["value"] = req.query.value;
    req.session.data.appearance.offences[req.session.data.offenceIndex] =
      req.session.data.offence;
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/edit-an-offence`
    );
  }
  if (req.session.data.offenceIndex !== undefined) {
    req.session.data.appearance.offences[req.session.data.offenceIndex] =
      req.session.data.offence;
  } else {
    if (req.session.data.appearance.offences == undefined) {
      req.session.data.appearance.offences = [];
    }
    req.session.data.appearance.offences.push(req.session.data.offence);
    req.session.data.offenceIndex =
      req.session.data.appearance.offences.length - 1;
  }
  if (route == "repeat-remand") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`
    );
  } else if (route == "remand-to-sentence") {
    req.session.data.changeMade = 0;
    req.session.data.offenceDeleted = 0;
    req.session.data.offenceAdded = 1;
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
    );
  } else if (route == "edit-appearance") {
    return res.redirect(`/${prototypeVersion}/court-cases/edit-appearance`);
  } else if (req.session.data.appearance["warrant-type"] == "Sentencing") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
    );
  } else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/check-answers`
    );
  }
});

router.get("/:prototypeVersion/update-offence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  console.log("Appearance index: " + req.session.data.appearanceIndex);
  const route = req.query.route;
  req.session.data.route = route;
  console.log("Edit route:" + route);
  req.session.data.offence = req.session.data.appearance.offences[index];
  req.session.data.offenceIndex = index;
  req.session.data.changeMade = 1;
  req.session.data.offenceDeleted = 0;
  req.session.data.offenceAdded = 0;
  if (
    prototypeVersion == "v10" ||
    prototypeVersion == "v11" ||
    prototypeVersion == "v12" ||
    prototypeVersion >= 13
  ) {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-an-offence/edit-an-offence`
    );
  }
  if (route == "remand-to-sentence") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
    );
  } else res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/offence-code`);
});

router.get("/:prototypeVersion/update-sentence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  console.log("Appearance index: " + req.session.data.appearanceIndex);
  const warrantType = req.session.data.appearance["warrant-type"];
  const route = req.query.route;
  req.session.data.route = route;
  console.log("Edit route:" + route);
  req.session.data.sentence = req.session.data.appearance.sentences[index];
  console.log("Sentence:" + req.session.data.sentence["offence-name"]);
  req.session.data.sentenceIndex = index;
  req.session.data.edit = true;
  return res.redirect(
    `/${prototypeVersion}/court-cases/add-a-sentence/edit-a-sentence`
  );
});

router.get("/:prototypeVersion/confirm-delete", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  req.session.data.index = req.query.index;
  req.session.data.route = req.query.route;
  const warrantType = req.session.data.appearance["warrant-type"];
  const route = req.session.data.route;
  console.log("Offence index" + req.session.data.index);
  if (warrantType == "Sentencing") {
    if (route == "remand-to-sentence") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/confirm-delete`
      );
    } else
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/confirm-delete`
      );
  } else if (req.query.postSaveEdit == "true" && route == "sentence") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/confirm-delete`
    );
  }
  return res.redirect(
    `/${prototypeVersion}/court-cases/add-an-offence/confirm-delete`
  );
});

router.get(
  "/:prototypeVersion/add-an-offence-to-appearance",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    req.session.data.route = req.query.route;
    console.log("Route: " + req.session.data.route);
    req.session.data.offenceAdded = 1;
    req.session.data.changeMade = 0;
    req.session.data.offenceDeleted = 0;
    res.redirect(307, `/${prototypeVersion}/create-offence`);
  }
);

router.get("/:prototypeVersion/delete-offence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  const route = req.session.data.route;
  if (req.session.data.confirmDeleteOffence == "Yes") {
    req.session.data.appearance.offences.splice(index, 1);
    if (req.session.data.postSaveEdit == "true") {
      res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
    } else if (route == "repeat-remand") {
      req.session.data.changeMade = 0;
      req.session.data.offenceDeleted = 1;
      req.session.data.offenceAdded = 0;
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`
      );
    } else if (route == "remand-to-sentence") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
      );
    } else if (route != "repeat-remand") {
      req.session.data.changeMade = 0;
      req.session.data.offenceDeleted = 1;
      req.session.data.offenceAdded = 0;
      res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/check-answers`
      );
    }
  } else if (req.session.data.confirmDeleteOffence == "No") {
    if (req.session.data.postSaveEdit == "true") {
      res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
    } else if (route == "repeat-remand") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`
      );
    } else if (route == "remand-to-sentence") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
      );
    } else if (route != "repeat-remand") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/check-answers`
      );
    }
  }
});

router.get("/:prototypeVersion/check-delete", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = parseInt(req.query.index);
  console.log("Index: " + index);
  const route = req.query.route;
  req.session.data.route = route;
  const sentence = req.session.data.appearance.sentences[index];
  req.session.data.sentence = sentence;
  console.log("Consecutive from: " + sentence["consecutive-from"]);
  if (sentence["consecutive-from"]) {
    // Redirect to the page that warns about breaking a chain
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/confirm-delete-break-chain?index=${index}&route=${route}`
    );
  } else {
    // Redirect to the normal confirm-delete page
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/confirm-delete?index=${index}&route=${route}`
    );
  }
});

router.get("/:prototypeVersion/delete-sentence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = Number(req.query.index);
  const route = req.session.data.route;
  const sentences = req.session.data.appearance.sentences;
  const sentenceToDelete = sentences[index];

  if (req.session.data.confirmDeleteSentence === "Yes") {
    const deletedCountNumber = sentenceToDelete["count-number"];
    const consecutiveTo = sentenceToDelete["consecutive-to"];

    if (consecutiveTo) {
      const target = sentences.find((s) => s["count-number"] === consecutiveTo);
      if (target) {
        if (Array.isArray(target["consecutive-from"])) {
          target["consecutive-from"] = target["consecutive-from"].filter(
            (from) => from !== deletedCountNumber
          );
          if (target["consecutive-from"].length === 0) {
            target["consecutive-from"] = null;
          }
        } else if (target["consecutive-from"] == deletedCountNumber) {
          target["consecutive-from"] = null;
        }
      }
    }

    sentences.forEach((s) => {
      if (s["consecutive-to"] === deletedCountNumber) {
        s["consecutive-to"] = "none";
      }
      if (s["consecutive-from"] === deletedCountNumber) {
        s["consecutive-from"] = null;
      }
    });

    sentences.splice(index, 1);

    const redirectUrl =
      req.session.data.postSaveEdit === "true"
        ? `/${prototypeVersion}/court-cases/appearance-detail`
        : `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`;

    return res.redirect(redirectUrl);
  }

  res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/check-answers`);
});

// Add sentences

router.get("/:prototypeVersion/create-sentence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  delete req.session.data.sentenceIndex;
  delete req.session.data.sentence;
  const appearanceIndex = req.query.appearanceIndex;
  const route = req.session.data.route;
  const path = req.query.path;
  const overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  req.session.data.path = path;
  req.session.data.newSentence = 1;
  console.log("Route: " + route);
  req.session.data.edit = "false";
  if (appearanceIndex !== undefined) {
    req.session.data.appearance =
      req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[
        appearanceIndex
      ];
    req.session.data.appearanceIndex = appearanceIndex;
  }
  if (req.session.data.appearance["overall-case-outcome-apply-all"] === "Yes") {
    req.session.data.sentence = {
      outcome: req.session.data.appearance["overall-case-outcome"],
    };
  }
  if (route == "edit-appearance") {
    req.session.data.forthwithSelected = "Yes";
  }
  if (req.session.data.appearance["over-two-offences"] == "no") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/offence-date`
    );
  }
  if (overallCaseOutcomeApply == "No") {
    res.redirect(307, `/${prototypeVersion}/create-offence`);
  } else {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/offence-date`
    );
  }
});

router.post("/:prototypeVersion/persist-sentence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const route = req.session.data.route;
  const edit = req.query.edit || req.body.edit || req.session.data.edit;
  const sentenceIndex =
    req.query.sentenceIndex || req.session.data.sentenceIndex;
  const path = req.session.data.path;
  req.session.data.newSentence = 0;

  if (req.session.data.progressSaved !== true) {
    req.session.data.sentence["status"] = "complete";
  }

  req.session.data.sentence["outcome"] = "Imprisonment";

  if (prototypeVersion > "13") {
    if (
      req.session.data.sentence["consecutive-concurrent"] === "Consecutive" ||
      req.session.data.sentence["consecutive-concurrent"] === "Forthwith"
    ) {
      req.session.data.appearance["total-sentence-length-years"] += parseInt(
        req.session.data.sentence["sentence-length-years"],
        10
      );
      req.session.data.appearance["total-sentence-length-months"] += parseInt(
        req.session.data.sentence["sentence-length-months"],
        10
      );
      req.session.data.appearance["total-sentence-length-weeks"] += parseInt(
        req.session.data.sentence["sentence-length-weeks"],
        10
      );
      req.session.data.appearance["total-sentence-length-days"] += parseInt(
        req.session.data.sentence["sentence-length-days"],
        10
      );
    }

    if (req.session.data.sentence["consecutive-concurrent"] === "Concurrent") {
      let newYears = parseInt(
        req.session.data.sentence["sentence-length-years"],
        10
      );
      let newMonths = parseInt(
        req.session.data.sentence["sentence-length-months"],
        10
      );

      if (
        newYears > req.session.data.appearance["total-sentence-length-years"] ||
        (newYears ===
          req.session.data.appearance["total-sentence-length-years"] &&
          newMonths >
            req.session.data.appearance["total-sentence-length-months"])
      ) {
        req.session.data.appearance["total-sentence-length-years"] = newYears;
        req.session.data.appearance["total-sentence-length-months"] = newMonths;
      }
    }

    req.session.data.appearance["total-sentence-length-months"] += Math.floor(
      req.session.data.appearance["total-sentence-length-weeks"] / 4
    );
    req.session.data.appearance["total-sentence-length-weeks"] %= 4;

    req.session.data.appearance["total-sentence-length-years"] += Math.floor(
      req.session.data.appearance["total-sentence-length-months"] / 12
    );
    req.session.data.appearance["total-sentence-length-months"] %= 12;

    req.session.data.appearance["total-sentence-length-weeks"] += Math.floor(
      req.session.data.appearance["total-sentence-length-days"] / 7
    );
    req.session.data.appearance["total-sentence-length-days"] %= 7;
  }

  if (
    req.session.data.appearance["overall-conviction-date-apply-all"] === "Yes"
  ) {
    req.session.data.sentence["conviction-date-day"] =
      req.session.data.appearance["overall-conviction-date-day"];
    req.session.data.sentence["conviction-date-month"] =
      req.session.data.appearance["overall-conviction-date-month"];
    req.session.data.sentence["conviction-date-year"] =
      req.session.data.appearance["overall-conviction-date-year"];
  }

  console.log("Edit:", edit);
  console.log("Sentence index:", sentenceIndex);

  if (edit === "true" && sentenceIndex !== undefined) {
    const original = req.session.data.appearance.sentences[sentenceIndex];
    const oldConsecutiveTo = original["consecutive-to"];
    const newConsecutiveTo = req.session.data.sentence["consecutive-to"];
    const newType = req.session.data.sentence["consecutive-concurrent"];

    if (
      oldConsecutiveTo &&
      (oldConsecutiveTo !== newConsecutiveTo || newType !== "Consecutive")
    ) {
      const target = req.session.data.appearance.sentences.find(
        (s) => s["count-number"] === oldConsecutiveTo
      );
      if (target) {
        if (Array.isArray(target["consecutive-from"])) {
          target["consecutive-from"] = target["consecutive-from"].filter(
            (from) => from !== original["count-number"]
          );
          if (target["consecutive-from"].length === 0) {
            target["consecutive-from"] = null;
          }
        } else if (target["consecutive-from"] == original["count-number"]) {
          target["consecutive-from"] = null;
        }
      }
    }
  }

  if (req.session.data.sentence["consecutive-to"]) {
    const consecutiveToCount = req.session.data.sentence["consecutive-to"];
    const allSentences = req.session.data.appearance.sentences;

    const targetSentence = allSentences.find(
      (s) => s["count-number"] === consecutiveToCount
    );

    if (targetSentence) {
      if (!targetSentence["consecutive-from"]) {
        targetSentence["consecutive-from"] = [];
      }

      if (
        !targetSentence["consecutive-from"].includes(
          req.session.data.sentence["count-number"]
        )
      ) {
        targetSentence["consecutive-from"].push(
          req.session.data.sentence["count-number"]
        );
      }
    }
  }

  if (edit === true || edit === "true") {
    req.session.data.appearance.sentences[sentenceIndex] =
      req.session.data.sentence;
    if (req.query.editConsecutiveConcurrent) {
      req.session.data.editConsecutiveConcurrent =
        req.query.editConsecutiveConcurrent;
    }
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/confirm-edit-consecutive-concurrent`
    );
  }

  if (req.session.data.postSaveEdit === "true") {
    req.session.data.appearance.sentences[sentenceIndex] =
      req.session.data.sentence;
    return res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
  }

  if (sentenceIndex !== undefined) {
    req.session.data.appearance.sentences[sentenceIndex] =
      req.session.data.sentence;
  } else {
    req.session.data.appearance.sentences.push(req.session.data.sentence);
    req.session.data.sentenceIndex =
      req.session.data.appearance.sentences.length - 1;
  }

  if (route === "edit-appearance") {
    req.session.data.appearance.sentences[sentenceIndex] =
      req.session.data.sentence;
    return res.redirect(`/${prototypeVersion}/court-cases/edit-appearance`);
  }

  if (route === "update-consec-concurr") {
    req.session.data.appearance.sentences[sentenceIndex]["consecutive-to"] =
      req.session.data.sentence["consecutive-to"];
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
    );
  }

  if (route === "remand-to-sentence") {
    req.session.data.sentence = {
      ...req.session.data.sentence,
      "outcome-changed": "true",
    };
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
    );
  }

  return res.redirect(
    `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
  );
});

router.get("/:prototypeVersion/view-court-case-detail", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const courtCaseIndex = Number(req.query.courtCaseIndex) + 1;
  console.log("Court case index: " + courtCaseIndex);
  res.redirect(`/${prototypeVersion}/court-cases/court-case-detail`);
});

router.get("/:prototypeVersion/view-appearance-detail", function (req, res) {
  const { appearanceIndex, courtCaseIndex } = req.query;
  const prototypeVersion = req.params.prototypeVersion;
  if (courtCaseIndex) {
    req.session.data.courtCaseIndex = courtCaseIndex;
  }
  if (appearanceIndex) {
    req.session.data.appearanceIndex = appearanceIndex;
  }
  res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`);
});

router.get("/:prototypeVersion/warrant-type-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.appearance["warrant-type"];
  req.session.data.warrantType = warrantType;
  var route = "";
  if (req.session.data.route != undefined) {
    route = req.session.data.route;
  } else {
    route = req.query.route;
  }
  console.log("Warrant type: " + warrantType);
  console.log("Route: " + route);
  if (warrantType == "Remand") {
    if (route == "appearance") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
      );
    } else if (route == "new-court-case") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
      );
    } else {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/overall-case-outcome`
      );
    }
  } else if (warrantType == "Sentencing") {
    if (prototypeVersion >= 13) {
      req.session.data.appearance["total-sentence-length-years"] = 0;
      req.session.data.appearance["total-sentence-length-months"] = 0;
      req.session.data.appearance["total-sentence-length-weeks"] = 0;
      req.session.data.appearance["total-sentence-length-days"] = 0;
      req.session.data.appearance["concurrent-sentences-years"] = 0;
      req.session.data.appearance["concurrent-sentences-months"] = 0;
      req.session.data.appearance["concurrent-sentences-weeks"] = 0;
      req.session.data.appearance["concurrent-sentences-days"] = 0;
      req.session.data.appearance["overall-case-outcome"] = "Imprisonment";
    }
    if (route == "appearance") {
      req.session.data.appearance.sentences = [];
      if (prototypeVersion == "v12" || prototypeVersion >= 13) {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
        );
      } else
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/tagged-bail`
        );
    } else if (prototypeVersion == "v12" || prototypeVersion >= 13) {
      if (route == "new-court-case") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
        );
      }
    } else
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/tagged-bail`
      );
  } else if (warrantType == "Non-custodial") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/overall-case-outcome`
    );
  }
});

router.get("/:prototypeVersion/consecutive-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const consecutive = req.session.data.consecutiveSelect;
  console.log("Consecutive sentences: " + consecutive);
  if (consecutive == "Yes") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/select-consecutive-sentences`
    );
  } else if (consecutive == "No") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/confirmation`
    );
  }
});

router.post("/:prototypeVersion/submitConsecutive", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const consecutiveSentences = req.session.data.consecutiveSentences.map(
    (sentenceIndex) => {
      const sentence = req.session.data.appearance.sentences[sentenceIndex];
      return { sentenceIndex, ...sentence };
    }
  );
  req.session.data.consecutiveSentences = consecutiveSentences;
  if (consecutiveSentences.length) {
    const consecutiveSentenceIndex = 0;
    req.session.data.consecutiveSentenceIndex = consecutiveSentenceIndex;
    req.session.data.currentConsecutiveSentence =
      consecutiveSentences[consecutiveSentenceIndex];
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to`
    );
  }
  return res.redirect(`/${prototypeVersion}/<change for some other page>`);
});

router.post(
  "/:prototypeVersion/submitConsecutiveSentence",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const consecutiveSentences = req.session.data.consecutiveSentences;
    const sentences = req.session.data.appearance.sentences;
    let consecutiveSentenceIndex = req.session.data.consecutiveSentenceIndex;
    const currentConsecutiveSentence =
      req.session.data.currentConsecutiveSentence;
    const consecutiveTo =
      req.session.data.currentConsecutiveSentence["consecutive-to"];
    console.log(
      "Current consecutive sentence: " +
        currentConsecutiveSentence["count-number"]
    );
    console.log("Consecutive to: " + consecutiveTo);
    consecutiveSentences[consecutiveSentenceIndex]["consecutive-to"] =
      currentConsecutiveSentence["consecutive-to"];
    req.session.data.appearance.consecutiveSentences = consecutiveSentences;
    for (var i = sentences.length - 1; i >= 0; i--) {
      if (
        sentences[i]["count-number"] ==
        currentConsecutiveSentence["count-number"]
      ) {
        sentences[i]["consecutive"] = "Yes";
      }
      if (
        sentences[i]["count-number"] ==
        consecutiveSentences[consecutiveSentenceIndex]["consecutive-to"]
      ) {
        sentences[i]["has-consecutive"] = "Yes";
      }
      sentences[i];
    }
    req.session.data.appearance.sentences = sentences;
    console.log(
      "consecutiveSentences[consecutiveSentenceIndex][consecutive-to]: " +
        consecutiveSentences[consecutiveSentenceIndex]["consecutive-to"]
    );
    // const consecutiveTo = req.session.data.currentConsecutiveSentence['consecutive-to']
    // console.log('Consecutive to: ' + consecutiveTo)
    // req.session.data.appearance.sentences[consecutiveSentenceIndex]['consecutive-to'] = consecutiveTo
    // console.log('Count ' + req.session.data.appearance.sentences[sentenceIndex]['count-number'] + ' consecutive to: ' + 'Count ' + req.session.data.appearance.sentences[sentenceIndex]['consecutive-to'])
    consecutiveSentenceIndex++;
    if (consecutiveSentences.length > consecutiveSentenceIndex) {
      req.session.data.consecutiveSentenceIndex = consecutiveSentenceIndex;
      req.session.data.currentConsecutiveSentence =
        consecutiveSentences[consecutiveSentenceIndex];
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to`
      );
    }
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/check-answers-2`
    );
  }
);

router.post("/:prototypeVersion/sentence-length-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var sentenceType = req.session.data["sentence"]["sentence-type"];
  if (
    sentenceType ==
    "SOPC (Special Custodial Sentence for Certain Offenders of Particular Concern)"
  ) {
    req.session.data["sentence"]["licence-period-years"] = "1";
    req.session.data["sentence"]["licence-period-months"] = "0";
    req.session.data["sentence"]["licence-period-weeks"] = "0";
    req.session.data["sentence"]["licence-period-days"] = "0";
  }
  if (sentenceType == "Automatic life") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/tariff-length`
    );
  }
  if (sentenceType == "BOTUS (Breach of top up supervision)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/term-length`
    );
  }
  if (sentenceType == "Civil imprisonment") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/term-length`
    );
  }
  if (sentenceType == "Adult discretionary life") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/tariff-length`
    );
  }
  if (sentenceType == "Adult mandatory life") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/tariff-length`
    );
  }
  if (sentenceType == "SOPC (offenders of a particular concern)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/sentence-length`
    );
  }
  if (sentenceType == "EDS (Extended Determinate Sentence)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/overall-sentence-length-individual`
    );
  }
  if (sentenceType == "STS (Serious terrorism sentence)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/overall-sentence-length-individual`
    );
  }
  if (sentenceType == "VOO (Violent offender order)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-concurrent`
    );
  }
  if (sentenceType == "Imprisonment in default of a fine") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/term-length`
    );
  } else if ((prototypeVersion >= "v11") | (prototypeVersion > 13)) {
    res.redirect(`court-cases/add-a-sentence/sentence-length`);
  } else res.redirect(307, `/${prototypeVersion}/persist-sentence`);
});

router.post("/:prototypeVersion/term-length-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var sentenceType = req.session.data["sentence"]["sentence-type"];
  if (sentenceType == "Imprisonment in default of a fine") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/fine-amount`
    );
  } else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/consecutive-concurrent`
    );
  }
});

router.post("/:prototypeVersion/sentence-length-select-2", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var sentenceType = req.session.data["sentence"]["sentence-type"];
  if (
    sentenceType ==
    "SOPC (Special Custodial Sentence for Certain Offenders of Particular Concern)"
  ) {
    req.session.data["sentence"]["licence-period-years"] = "1";
    req.session.data["sentence"]["licence-period-months"] = "0";
    req.session.data["sentence"]["licence-period-weeks"] = "0";
    req.session.data["sentence"]["licence-period-days"] = "0";
  }
  if (sentenceType == "EDS (Extended Determinate Sentence)") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/licence-period`
    );
  } else if (
    (prototypeVersion >= "v11") |
    (prototypeVersion > 13 && prototypeVersion < 20)
  ) {
    if (req.session.data.appearance["no-count-numbers"] == "true") {
      req.session.data.sentence["consecutive-concurrent"] = "Concurrent";
      res.redirect(307, `/${prototypeVersion}/persist-sentence`);
    } else {
      res.redirect(`court-cases/add-a-sentence/consecutive-concurrent`);
    }
  } else if (prototypeVersion >= 20) {
    res.redirect(`court-cases/add-a-sentence/consecutive-concurrent`);
  } else {
    res.redirect(307, `/${prototypeVersion}/persist-sentence`);
  }
});

router.post("/:prototypeVersion/offence-to-sentence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const offences = req.session.data.appearance.offences;
  if (req.session.data["selected-for-sentencing"]) {
    req.session.data.appearance.sentences = req.session.data[
      "selected-for-sentencing"
    ].map((offenceIndex) => req.session.data.appearance.offences[offenceIndex]);
    req.session.data["selected-for-sentencing"] = [];
  }
  res.redirect(
    `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
  );
});

router.post("/:prototypeVersion/add-sentence-information", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var index = "";
  if (req.query.index) {
    index = req.query.index;
  } else {
    index = req.session.data.appearanceIndex;
  }
  const outcome = req.session.data["offence"]["outcome"];
  console.log("Index: " + index);
  console.log("Outcome: " + outcome);
  const route = req.query.route;
  req.session.data.route = route;
  console.log("Route:" + route);
  if (
    (route == "edit-appearance" && outcome == "Imprisonment") ||
    (route == "edit-appearance" && outcome == "Imprisonment in default")
  ) {
    req.session.data.sentence = req.session.data.offence;
    req.session.data.forthwithSelected = "Yes";
  } else if (
    outcome == "Imprisonment" ||
    outcome == "Imprisonment in default"
  ) {
    req.session.data.sentence = req.session.data.appearance.offences[index];
  }
  if (
    (route == "remand-to-sentence" && outcome != "Imprisonment") ||
    (route == "remand-to-sentence" && outcome != "Imprisonment in default") ||
    route == "immediate-release"
  ) {
    req.session.data.appearance.offences[index]["outcome"] = outcome
    req.session.data.appearance.offences[index]["outcome-changed"] = "true";
  }
  if (outcome == "Imprisonment") {
    req.session.data.appearance.offences.splice(index, 1);
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/count-number`
    );
  } else if (route == "edit-appearance") {
    return res.redirect(307, `/${prototypeVersion}/persist-offence`);
  }
  if (route == "new-court-case") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
    );
  } else if (route == "edit-appearance") {
    return res.redirect(`/${prototypeVersion}/court-cases/edit-appearance`);
  } else if (route == "immediate-release")
    res.redirect(
      `/${prototypeVersion}/court-cases/record-an-immediate-release/update-offence-outcomes`
    );
  else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
    );
  }
});

router.post("/:prototypeVersion/offence-name-same", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var route = req.session.data.route;
  const offenceNameSame = req.session.data["sentence"]["offence-name-same"];
  console.log("Route: " + route);
  console.log("Offence name same: " + offenceNameSame);
  if (offenceNameSame == "Yes") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/terror-related`
    );
  } else res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/offence-code`);
});

router.post(
  "/:prototypeVersion/consecutive-concurrent-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var route = req.session.data.route;
    const consecConcur = req.session.data["sentence"]["consecutive-concurrent"];
    var forthwithSelected = req.session.data.forthwithSelected;
    console.log("Route: " + route);
    console.log("Consecutive or concurrent: " + consecConcur);
    console.log("Forthwith selected: " + forthwithSelected);
    console.log(
      "Count number: " + req.session.data["sentence"]["count-number"]
    );
    if (consecConcur == "Consecutive") {
      if (
        req.session.data.courtCases.length === 1 &&
        req.session.data.appearance.sentences < 1
      ) {
        req.session.data["sentence"]["consecutive-to"] = "none";
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/no-other-sentences`
        );
      }
      if (req.session.data["sentence"]["count-number"] == "") {
        req.session.data.appearance["no-count-numbers"] = "true";
        console.log("No count numbers");
        if (prototypeVersion >= 20) {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to`
          );
        } else {
          req.session.data["sentence"]["consecutive-to"] =
            req.session.data.appearance.sentences[0]["offence-name"];
          return res.redirect(307, `/${prototypeVersion}/persist-sentence`);
        }
      }
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to`
      );
    } else if (consecConcur == "Forthwith" && forthwithSelected != "Yes") {
      forthwithSelected = "Yes";
      req.session.data["sentence"]["consecutive-concurrent"] = "Forthwith";
      req.session.data.forthwithSelected = forthwithSelected;
      res.redirect(307, `/${prototypeVersion}/persist-sentence`);
    } else if (consecConcur == "Concurrent" && forthwithSelected == "Yes") {
      res.redirect(307, `/${prototypeVersion}/persist-sentence`);
    }
  }
);

router.post(
  "/:prototypeVersion/consecutive-to-case-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var route = req.session.data.route;
    const consecToCase = req.session.data["sentence"]["consecutive-to-case"];
    console.log("Route: " + route);
    console.log("Consecutive to another case: " + consecToCase);
    if (consecToCase == "yes") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/select-consecutive-case`
      );
    } else if (consecToCase == "no") {
      if (
        req.session.data.appearance["no-count-numbers"] == "true" &&
        req.session.data.appearance.sentences.length >= 2
      ) {
        if (
          req.session.data.sentence["consecutive-concurrent"] == "Consecutive"
        ) {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-sentence/no-count-numbers-error`
          );
        }
      } else {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to`
        );
      }
    }
  }
);

router.post(
  "/:prototypeVersion/select-consecutive-case-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var route = req.session.data.route;
    var consecToCaseRef =
      req.session.data["sentence"]["consecutive-to-case-ref"];
    console.log("Route: " + route);
    console.log("Consecutive to another case: " + consecToCaseRef);
    var splitArr = consecToCaseRef.split(",");
    console.log(splitArr);
    req.session.data["sentence"]["consecutive-to-case-ref-index"] = splitArr[0];
    req.session.data["sentence"]["consecutive-to-case-ref"] = splitArr[1];
    console.log(req.session.data["sentence"]["consecutive-to-case-ref-index"]);
    console.log(req.session.data["sentence"]["consecutive-to-case-ref"]);
    const consecCourtCase =
      req.session.data.courtCases[
        req.session.data["sentence"]["consecutive-to-case-ref-index"]
      ];
    console.log(
      "Consec court case: " +
        consecCourtCase.appearances[consecCourtCase.appearances.length - 1][
          "court-case-ref"
        ]
    );
    const consecAppearance = consecCourtCase.appearances.length - 1;
    console.log("Consec appearance: " + consecAppearance);
    if (
      consecCourtCase.appearances[consecAppearance].sentences[0][
        "count-number"
      ] == ""
    ) {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/no-count-numbers-other-case-error`
      );
    } else {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-to-another-case`
      );
    }
  }
);

router.post(
  "/:prototypeVersion/add-overall-warrant-information-complete",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const route = req.session.data.route;
    var additionalInformationComplete = 1;
    req.session.data.additionalInformationComplete =
      additionalInformationComplete;
    if (route == "appearance") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
      );
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
      );
    }
  }
);

router.post(
  "/:prototypeVersion/add-sentence-information-complete",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const warrantType = req.session.data.warrantType;
    const route = req.session.data.route;

    // Helper: find offences that still need outcome updates
    const offences = req.session.data.appearance?.offences || [];
    const incompleteOffences = offences.filter(
      (o) =>
        o?.sentence?.["sentence-type"] == null &&
        String(o?.["outcome-changed"]) !== "true"
    );

    const hasIncomplete = incompleteOffences.length > 0;

    // If they’re trying to complete, but some outcomes aren’t updated yet,
    // send them back to the page to finish
    if (hasIncomplete) {
      req.session.data.addSentenceInformationError = {
        message: "One or more offence outcomes need updating",
        count: incompleteOffences.length,
      };
      if (warrantType == "immediate-release"){
        return res.redirect(
        `/${prototypeVersion}/court-cases/record-an-immediate-release/update-offence-outcomes`
      );
      } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
      );
    }
    }

    // --- Existing logic below (with || fixes) ---

    var addSentenceInformationComplete = 1;
    var offencesComplete = 1;

    if (req.session.data.appearance.offences) {
      console.log("Offences: " + req.session.data.appearance.offences.length);
    }
    if (req.session.data.appearance.sentences) {
      console.log("Sentences: " + req.session.data.appearance.sentences.length);
    }

    if (route == "new-court-case") {
      if (warrantType == "Remand") {
        req.session.data.offencesComplete = offencesComplete;
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
        );
      } else if (warrantType == "Sentencing") {
        if (req.session.data.appearance["finished-adding-sentences"] == "yes") {
          req.session.data.addSentenceInformationComplete =
            addSentenceInformationComplete;
        }
        req.session.data.sentenceAdded = 0;
        req.session.data.sentencesAdded = 1;

        if (
          req.session.data.appearance["total-sentence-length-years"] !=
            req.session.data.appearance["overall-sentence-length-years"] ||
          req.session.data.appearance["total-sentence-length-months"] !=
            req.session.data.appearance["overall-sentence-length-months"] ||
          req.session.data.appearance["total-sentence-length-weeks"] !=
            req.session.data.appearance["overall-sentence-length-weeks"]
        ) {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-case/sentence-length-mismatch`
          );
        } else {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
          );
        }
      }
    } else {
      if (warrantType == "Remand") {
        if (req.session.data.appearance["finished-adding-offences"] == "yes") {
          req.session.data.offencesComplete = offencesComplete;
        }
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
        );
      } else if (prototypeVersion == 25 && route == "immediate-release") {
        req.session.data.addSentenceInformationComplete =
            addSentenceInformationComplete;
        return res.redirect(
          `/${prototypeVersion}/court-cases/record-an-immediate-release/task-list`
        );
      } else if (prototypeVersion > 25 && warrantType == "Non-custodial") {
        req.session.data.offencesComplete =
            addSentenceInformationComplete;
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
        );
      } else if (warrantType == "Sentencing") {
        if (req.session.data.appearance["finished-adding-offences"] == "yes") {
          req.session.data.addSentenceInformationComplete =
            addSentenceInformationComplete;
        }

        if (
          req.session.data.appearance["total-sentence-length-years"] !=
            req.session.data.appearance["overall-sentence-length-years"] ||
          req.session.data.appearance["total-sentence-length-months"] !=
            req.session.data.appearance["overall-sentence-length-months"] ||
          req.session.data.appearance["total-sentence-length-weeks"] !=
            req.session.data.appearance["overall-sentence-length-weeks"]
        ) {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/sentence-length-mismatch`
          );
        } else {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
          );
        }
      }
    }
  }
);

router.post("/:prototypeVersion/court-documents-complete", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var courtDocumentsComplete = 1;
  const route = req.session.data.route;
  req.session.data.courtDocumentsComplete = courtDocumentsComplete;
  console.log("Court documents complete: " + courtDocumentsComplete);
  if (route == "new-court-case") {
    res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/task-list`);
  } else if (route == "immediate-release" && prototypeVersion == 25) {
    res.redirect(`/${prototypeVersion}/court-cases/record-an-immediate-release/task-list`);
  } 
  else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`);
});

router.post("/:prototypeVersion/add-court-document", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var documentIndex = req.session.data.appearance.documentIndex;
  const route = req.session.data.route;
  var currentDate = new Date();
  if (req.session.data.appearance.documents == undefined) {
    const documents = [];
    req.session.data.appearance.documents = documents;
  }
  const documentPrefix =
    req.session.data.appearance["document-type"] !== "Other"
      ? req.session.data.appearance["document-type"]
      : req.session.data.appearance["other-document-name"];
  const documentUploadTime =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " at " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes();
  if (documentIndex != undefined) {
    req.session.data.appearance.documents[documentIndex]["document-type"] =
      documentPrefix;
    console.log(
      "Document name: " + documentPrefix + " uploaded on " + documentUploadTime
    );
  } else {
    documentIndex = req.session.data.appearance.documents.filter(
      (documentName) => documentName.startsWith(documentPrefix)
    ).length;
    req.session.data.appearance.documents.push(documentPrefix);
    console.log(
      "Document name: " + documentPrefix + " uploaded on " + documentUploadTime
    );
  }
  if (route == "new-court-case") {
    if (req.session.data.appearance["warrant-type"] == "Sentencing") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/additional-documents`
      );
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/court-documents`
      );
    }
  }
  if (req.session.data.appearance["warrant-type"] == "Sentencing") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/additional-documents`
    );
  } else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-appearance/court-documents`
    );
  }
});

router.post("/:prototypeVersion/tagged-bail-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.warrantType;
  const route = req.session.data.route;
  console.log("Route: " + route);
  console.log("Warrant type: " + warrantType);
  if (warrantType == "Remand") {
    if (route == "new-court-case") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/check-answers`
      );
    }
  } else if (warrantType == "Sentencing") {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/overall-sentence-length`
    );
  }
});

router.post(
  "/:prototypeVersion/next-court-appearance-complete",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var nextCourtAppearanceComplete = "Yes";
    const route = req.session.data.route;
    req.session.data.nextCourtAppearanceComplete = nextCourtAppearanceComplete;
    console.log(
      "Next court appearance complete: " + nextCourtAppearanceComplete
    );
    if (route == "new-court-case") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
      );
    } else
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
      );
  }
);

router.post(
  "/:prototypeVersion/sentence-length-mismatch-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const route = req.session.data.route;
    const sentenceLengthMismatch =
      req.session.data.appearance["sentence-length-mismatch"];
    console.log("Sentence length mismatch: " + sentenceLengthMismatch);
    if (prototypeVersion >= 22) {
      if (route == "new-court-case") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
        );
      } else if (route == "remand-to-sentence") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
        );
      }
    } else {
      if (route == "new-court-case") {
        if (sentenceLengthMismatch == "yes") {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
          );
        } else {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-sentence/check-answers`
          );
        }
      }
      if (route == "remand-to-sentence") {
        if (sentenceLengthMismatch == "yes") {
          return res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
          );
        } else {
          res.redirect(
            `/${prototypeVersion}/court-cases/add-a-court-appearance/add-sentence-information`
          );
        }
      }
    }
  }
);

router.post("/:prototypeVersion/save-court-case", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const progressSaved = true;
  var url = req.get("Referer");
  console.log("URL saved from: " + url);
  req.session.data.progressSaved = progressSaved;
  req.session.data.savedURL = url;
  console.log(
    "Progress saved:" +
      req.session.data.progressSaved +
      "\n" +
      "Saved URL: " +
      req.session.data.savedURL +
      "\n" +
      "Overall questions complete:" +
      req.session.data.overallQuestionsComplete
  );
  if (req.session.data.newSentence == 1) {
    req.session.data.sentence["status"] = "draft";
    req.session.data.sentence["saved-from"] = url;
    if (req.session.data.sentenceIndex !== undefined) {
      req.session.data.appearance.sentences[req.session.data.sentenceIndex] =
        req.session.data.sentence;
    } else {
      req.session.data.appearance.sentences.push(req.session.data.sentence);
      req.session.data.sentenceIndex =
        req.session.data.appearance.sentences.length - 1;
    }
    res.redirect(`/${prototypeVersion}/court-cases/save-court-case`);
  }
  if (req.session.data.newOffence == 1) {
    req.session.data.offence["status"] = "draft";
    req.session.data.offence["saved-from"] = url;
    if (req.session.data.offenceIndex !== undefined) {
      req.session.data.appearance.offence[req.session.data.offenceIndex] =
        req.session.data.offence;
    } else {
      req.session.data.appearance.offences.push(req.session.data.offence);
      req.session.data.offenceIndex =
        req.session.data.appearance.offences.length - 1;
    }
    res.redirect(`/${prototypeVersion}/court-cases/save-court-case`);
  }
  if (req.session.data.route == "remand-to-sentence") {
    console.log("Saved from remand to sentence");
    if (req.session.sentenceAdded == 1) {
      req.session.data.sentence["status"] = "draft";
      req.session.data.route = "remand-to-sentence";
      req.session.data.sentence["saved-from"] = url;
      return res.redirect(307, `/${prototypeVersion}/persist-sentence`);
    } else {
      req.session.data.offence["status"] = "draft";
      req.session.data.route = "remand-to-sentence";
      req.session.data.offence["saved-from"] = url;
    }
    res.redirect(`/${prototypeVersion}/court-cases/save-court-case`);
  } else {
    res.redirect(`/${prototypeVersion}/court-cases/save-court-case`);
  }
});

router.get("/:prototypeVersion/terror-related-offence", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  var offenceName = req.session.data.sentence["offence-name"];
  if (
    offenceName.includes("TR06001") ||
    offenceName.includes("TR06002") ||
    offenceName.includes("TR06003")
  ) {
    req.session.data.sentence["terror-related"] = "Yes";
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
    );
  } else {
    res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/terror-related`
    );
  }
});

router.get("/:prototypeVersion/count-number", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const sentenceIndex = req.session.data.appearance.sentences.length + 1;
  const overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  const route = req.session.data.route;
  const path = req.session.data.path;
  const overallConvictionDateApply =
    req.session.data.appearance["overall-conviction-date-apply-all"];
  console.log("Path: " + path);
  console.log("SentenceIndex: " + sentenceIndex);
  console.log("Edit: " + req.query.edit);
  console.log("Overall case outcome apply all" + overallCaseOutcomeApply);
  console.log(
    "Overall conviction date apply all:  " + overallConvictionDateApply
  );
  if (req.query.postSaveEdit == "true") {
    return res.redirect(307, `/${prototypeVersion}/persist-sentence`);
  }
  if (req.query.edit == "true") {
    return res.redirect(307, `/${prototypeVersion}/persist-sentence`);
  }
  if (overallConvictionDateApply == "No") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/conviction-date`
    );
  }
  if (overallConvictionDateApply == "Yes") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
    );
  }
  if (route == "remand-to-sentence" && path == "rts-new-offence") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/offence-date`
    );
  }
  if (route == "remand-to-sentence" || route == "edit-appearance") {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
    );
  } else {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`
    );
  }
});

router.get("/:prototypeVersion/document-type", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const warrantType = req.session.data.appearance["warrant-type"];
  const route = req.session.data.route;
  console.log("Warrant type: " + warrantType);
  if (warrantType == "Sentencing") {
    req.session.data.appearance["document-type"] = "sentencing warrant";
    if (route == "appearance" || route == "remand-to-sentence") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/upload-document`
      );
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/upload-document`
      );
    }
  } else {
    req.session.data.appearance["document-type"] = "remand warrant";
    if (route == "appearance") {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/upload-document`
      );
    } else {
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/upload-document`
      );
    }
  }
});

router.get(
  "/:prototypeVersion/additional-document-select",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    const warrantType = req.session.data.appearance["warrant-type"];
    console.log("Warrant type: " + warrantType);
    if (warrantType == "Sentencing") {
      req.session.data.appearance["document-type"] = "sentencing warrant";
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/upload-document`
      );
    } else {
      req.session.data.appearance["document-type"] = "remand warrant";
      return res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/upload-document`
      );
    }
  }
);

router.get("/:prototypeVersion/additional-documents", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const route = req.session.data.route;
  const warrantType = req.session.data.appearance["warrant-type"];
  const additionalDocs = req.session.data.appearance["additional-documents"];
  console.log("Additional documents:" + additionalDocs);
  if (additionalDocs == "yes") {
    if (req.session.data.appearance["doc-index"] == undefined) {
      req.session.data.appearance["doc-index"] = 0;
      console.log("Doc index:" + req.session.data.appearance["doc-index"]);
      console.log(
        "Additional documents:" +
          req.session.data.appearance["additional-documents-list"]
      );
      if (route == "appearance" || route == "remand-to-sentence") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/upload-additional-document`
        );
      } else {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/upload-additional-document`
        );
      }
    } else if (
      req.session.data.appearance["doc-index"] <
      req.session.data.appearance["additional-documents"].length - 1
    ) {
      req.session.data.appearance["doc-index"] =
        req.session.data.appearance["doc-index"] + 1;
      console.log("Doc index:" + req.session.data.appearance["doc-index"]);
      if (route == "appearance") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/upload-additional-document`
        );
      } else {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/upload-additional-document`
        );
      }
    } else {
      if (route == "appearance" || route == "remand-to-sentence") {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-appearance/court-documents`
        );
      } else {
        return res.redirect(
          `/${prototypeVersion}/court-cases/add-a-court-case/court-documents`
        );
      }
    }
  } else {
    return res.redirect(
      `/${prototypeVersion}/court-cases/add-a-court-case/court-documents`
    );
  }
});

router.get("/:prototypeVersion/enter-count-number", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  req.session.data["no-count"] = "true";
  res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/count-number`);
});

router.post(
  "/:prototypeVersion/add-count-numbers-other-offence",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    var appearanceIndex = 0;
    if (req.session.data.appearanceIndex != undefined) {
      appearanceIndex = req.session.data.appearanceIndex;
    }
    const savedIndex = [req.session.data.courtCaseIndex, appearanceIndex];
    req.session.data.savedIndex = savedIndex;
    req.session.data.addCountNumbersOtherSentence = true;
    console.log(
      "Adding count numbers to another offence:" +
        req.session.data.addCountNumbersOtherSentence
    );
    console.log("Saved index: " + savedIndex);
    req.session.data.consecCourtCase =
      req.session.data["sentence"]["consecutive-to-case-ref-index"];
    console.log("Consec to case " + req.session.data.consecCourtCase);
    req.session.data.consecAppearance =
      req.session.data.courtCases[req.session.data.consecCourtCase].appearances
        .length - 1;
    console.log("Appearance " + req.session.data.consecAppearance);
    if (req.session.data.newSentence == 1) {
      req.session.data.sentence["status"] = "draft";
      req.session.data.sentence["saved-from"] =
        "/${prototypeVersion}/court-cases/consecutive-to-case";
      if (req.session.data.sentenceIndex !== undefined) {
        req.session.data.appearance.sentences[req.session.data.sentenceIndex] =
          req.session.data.sentence;
      } else {
        req.session.data.appearance.sentences.push(req.session.data.sentence);
        req.session.data.sentenceIndex =
          req.session.data.appearance.sentences.length - 1;
      }
      res.redirect(307, `/${prototypeVersion}/persist-appearance`);
    } else {
      res.redirect(307, `/${prototypeVersion}/persist-appearance`);
    }
  }
);

router.get(
  "/:prototypeVersion/additional-information-complete",
  function (req, res) {
    const prototypeVersion = req.params.prototypeVersion;
    req.session.data.additionalInformationComplete = 1;
    if (req.session.data.route == "appearance") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-appearance/task-list`
      );
    } else {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-court-case/task-list`
      );
    }
  }
);

router.get("/:prototypeVersion/merged-cases-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const route = req.session.data.route;
  console.log("Route: " + route);
  const warrantType = req.session.data.appearance["warrant-type"];
  console.log("Warrant type: " + warrantType);
  const mergedCases = req.session.data.appearance["merged-cases"];
  console.log("Merged cases: " + mergedCases);
  if (prototypeVersion < 22)
    if (mergedCases == "Yes") {
      res.redirect(
        `/${prototypeVersion}/court-cases/additional-information/select-merged-cases`
      );
    } else {
      res.redirect(
        `/${prototypeVersion}/court-cases/additional-information/check-answers`
      );
    }
  else if (prototypeVersion >= 22) {
    if (mergedCases == "Yes") {
      if (warrantType == "Remand") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/select-merged-cases`
        );
      } else {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/select-merged-cases`
        );
      }
    } else {
      if (warrantType == "Remand") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-an-offence/offence-date`
        );
      } else if (warrantType == "Sentencing" && route == "appearance") {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/check-answers-additional-information`
        );
      } else {
        res.redirect(
          `/${prototypeVersion}/court-cases/add-a-sentence/check-answers-additional-information`
        );
      }
    }
  }
});

router.post("/:prototypeVersion/select-merged-cases", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const mergedFrom = req.session.data.appearance["merged-from"];
  console.log("Merged cases: " + mergedFrom.length);

  req.session.data.courtCases[mergedFrom]["status"] = "inactive";
  req.session.data.courtCases[mergedFrom]["merged-with"] =
    req.session.data.appearance["court-case-ref"] +
    " at " +
    req.session.data.appearance["court-name"] +
    " on " +
    req.session.data.appearance["warrant-date-day"] +
    "/" +
    req.session.data.appearance["warrant-date-month"] +
    "/" +
    req.session.data.appearance["warrant-date-year"];

  req.session.data.appearance["merged-from-case"] =
    req.session.data.courtCases[mergedFrom].appearances[
      req.session.data.courtCases[mergedFrom].appearances.length - 1
    ]["court-case-ref"];

  console.log(req.session.data.courtCases[mergedFrom]["status"]);
  console.log(req.session.data.courtCases[mergedFrom]["merged-with"]);
  console.log(
    "Merged from case: " + req.session.data.appearance["merged-from-case"]
  );

  for (let i = 0; i < mergedFrom.length; i++) {
    let mergedCourtCase = req.session.data.courtCases[mergedFrom[i]];
    let lastAppearance =
      mergedCourtCase.appearances[mergedCourtCase.appearances.length - 1];

    if (lastAppearance.offences && lastAppearance.offences.length > 0) {
      for (let j = 0; j < lastAppearance.offences.length; j++) {
        if (!req.session.data.appearance.offences) {
          req.session.data.appearance.offences = [];
        }

        // Copy offence to avoid modifying original reference
        let offenceToAdd = { ...lastAppearance.offences[j] };

        if (!offenceToAdd["merged-from"]) {
          offenceToAdd["merged-from"] = [];
        }

        offenceToAdd["merged-from"] =
          lastAppearance["court-name"] +
          " on " +
          lastAppearance["warrant-date-day"] +
          "/" +
          lastAppearance["warrant-date-month"] +
          "/" +
          lastAppearance["warrant-date-year"];

        req.session.data.appearance.offences.push(offenceToAdd);
      }
    }

    if (lastAppearance.sentences && lastAppearance.sentences.length > 0) {
      if (!req.session.data.appearance.sentences) {
        req.session.data.appearance.sentences = [];
      }

      for (let j = 0; j < lastAppearance.sentences.length; j++) {
        let sentenceToAdd = { ...lastAppearance.sentences[j] };

        sentenceToAdd["merged-from"] =
          lastAppearance["court-name"] +
          " on " +
          lastAppearance["warrant-date-day"] +
          "/" +
          lastAppearance["warrant-date-month"] +
          "/" +
          lastAppearance["warrant-date-year"];

        req.session.data.appearance.sentences.push(sentenceToAdd);
      }
    }
  }

  console.log(
    "Final Offence List:",
    JSON.stringify(req.session.data.appearance.offences, null, 2)
  );

  if (prototypeVersion < 22) {
    res.redirect(
      `/${prototypeVersion}/court-cases/additional-information/check-answers`
    );
  } else if (prototypeVersion >= 22) {
    if (req.session.data.appearance["warrant-type"] == "Remand") {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-an-offence/check-answers-additional-information`
      );
    } else {
      res.redirect(
        `/${prototypeVersion}/court-cases/add-a-sentence/check-answers-additional-information`
      );
    }
  }
});

router.get("/:prototypeVersion/update-outcome", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  const edit = req.query.edit;
  req.session.index = index;
  req.session.edit = edit;
  console.log(req.session.data.appearance.offences[index]);
  if (req.query.clearError === "true") {
    req.session.data.addSentenceInformationError = null;
  }

  res.redirect(
    `/${prototypeVersion}/court-cases/add-a-court-appearance/change-outcome`
  );
});

router.get("/:prototypeVersion/add-offences-select", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  req.session.index = index;
  const route = req.session.route;
  console.log("Route: " + route);
  const overallCaseOutcomeApply =
    req.session.data.appearance["overall-case-outcome-apply-all"];
  console.log("Overall case outcome apply all: " + overallCaseOutcomeApply);
  if (overallCaseOutcomeApply == "No") {
    res.redirect(
      307,
      `/${prototypeVersion}/create-offence?route=new-court-case`
    );
  } else {
    res.redirect(
      307,
      `/${prototypeVersion}/create-sentence?route=new-court-case`
    );
  }
});

router.get("/:prototypeVersion/update-consec-concurr", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const index = req.query.index;
  console.log("Index: " + req.session.data.index);
  const warrantType = req.session.data.appearance["warrant-type"];
  const route = req.query.route;
  req.session.data.route = route;
  console.log("Edit route:" + route);
  req.session.data.sentence = req.session.data.appearance.sentences[index];
  console.log("Sentence:" + req.session.data.sentence["offence-name"]);
  req.session.data.sentenceIndex = index;
  return res.redirect(
    `/${prototypeVersion}/court-cases/add-a-sentence/consecutive-concurrent`
  );
});

router.get("/:prototypeVersion/select-court-case", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const { courtIndex, route } = req.query;
  req.session.data.route = route;
  req.session.data.courtIndex = courtIndex;

  return res.redirect(
    307,
    `/${prototypeVersion}/create-appearance?route=${route}&courtIndex=${courtIndex}`
  );
});


router.get("/:prototypeVersion/launch-prototype", function (req, res) {
  const prototypeVersion = req.params.prototypeVersion;
  const dataset = req.query.data || "example";

  let sessionData;
  switch (dataset) {
    case "empty":
      sessionData = emptyData;
      break;
    case "example":
      sessionData = exampleData;
      break;
    case "example2":
      sessionData = example2Data;
  }

  req.session.regenerate(function () {
    req.session.data = JSON.parse(JSON.stringify(sessionData));
    req.session.data.prototypeVersion = prototypeVersion;
    console.log(
      `Launching prototype version: ${prototypeVersion} with dataset: ${dataset}`
    );
    res.redirect(`/${prototypeVersion}/court-cases/`);
  });
});




module.exports = router;
