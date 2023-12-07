//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Next court date route
router.post('/:prototypeVersion/next-court-date-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var nextCourtDateSelect = req.session.data['appearance']['next-court-date-set']
    // Check whether the variable matches a condition
    if (nextCourtDateSelect == "Yes") {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/next-hearing-type-select`)
    } else res.redirect(307, `/${prototypeVersion}/persist-appearance`)
})

// Next court name routes
router.post('/:prototypeVersion/next-hearing-court-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var nextCourtDateSelect = req.session.data['appearance']['next-hearing-court-select']
    // Check whether the variable matches a condition
    if (nextCourtDateSelect == "No") {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-name`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/check-answers`)
})

router.post('/:prototypeVersion/next-hearing-court-select-2', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var nextCourtDateSelect = req.session.data['appearance']['next-hearing-court-select']
    // Check whether the variable matches a condition
    if (nextCourtDateSelect == "No") {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/next-court-name`)
    } else
        req.session.data['appearance']['next-court-name'] = req.session.data['appearance']['court-name']
    res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/check-answers-2`)
})

// Next court date route for add first appearance
router.post('/:prototypeVersion/:appearancePath/next-court-date-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const appearancePath = req.params.appearancePath
    // Make a variable and give it the value 
    var nextCourtDateSelect = req.session.data['appearance']['next-court-date-set']
    // Check whether the variable matches a condition
    if (nextCourtDateSelect == "Yes") {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/${appearancePath}/next-hearing-type-select`)
    } else res.redirect(307, `/${prototypeVersion}/persist-appearance`)
})

// Offence code route
router.post('/:prototypeVersion/offence-code-known', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const warrantType = req.session.data.warrantType
    var offenceCodeKnown = req.session.data['offence-code-known']
    console.log(offenceCodeKnown)
    // Check whether the variable matches a condition
    if (offenceCodeKnown != null) {
        if (offenceCodeKnown.includes('None')) {
        if (warrantType == 'Sentencing') {
            res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/offence-name`)
        } else if (warrantType == 'Remand') {
            res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/offence-name`)
        }
    }
    } else {
        if (warrantType == 'Sentencing') {
            res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/confirm-offence`)
        } else if (warrantType == 'Remand') {
            res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/confirm-offence`)
        }
    }
})

//Lookup outcome routes
router.post('/:prototypeVersion/outcome-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var outcome = req.session.data.appearance['overall-case-outcome']
    console.log(outcome)
    // Check whether the variable matches a condition
    if (outcome.includes('lookup-another-outcome')) {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-first-court-appearance/lookup-outcome`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-first-court-appearance/next-court-date-select`)
})

router.post('/:prototypeVersion/outcome-select-2', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var outcome = req.session.data.appearance['overall-case-outcome']
    console.log(outcome)
    // Check whether the variable matches a condition
    if (outcome.includes('lookup-another-outcome')) {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/lookup-outcome`)
    } else if (prototypeVersion == 'v8') {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/outcome-apply-all`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-date-select`)
})

router.post('/:prototypeVersion/outcome-select-3', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var outcome = req.session.data.appearance['overall-case-outcome']
    console.log(outcome)
    // Check whether the variable matches a condition
    if (outcome.includes('lookup-another-outcome')) {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/lookup-outcome`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/outcome-apply-all`)
})

router.post('/:prototypeVersion/outcome-select-4', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    // Make a variable and give it the value 
    var outcome = req.session.data.offence['outcome']
    console.log(outcome)
    // Check whether the variable matches a condition
    if (outcome.includes('lookup-another-outcome')) {
        // Send user to next page
        res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/lookup-outcome`)
    } else res.redirect(307, `/${prototypeVersion}/persist-offence`)
})

router.post('/:prototypeVersion/new-court-case-ref', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = req.session.data.courtCaseIndex
    var caseRefSelect = req.session.data.appearance['case-ref-select']
    console.log("Case ref select:" + caseRefSelect)
    if (caseRefSelect.includes('Yes')) {
        req.session.data.appearance['court-case-ref'] = req.session.data.courtCases[courtCaseIndex].appearances.at(-1)['court-case-ref']
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/warrant-date`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number`)
})

router.post('/:prototypeVersion/new-court-name', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = req.session.data.courtCaseIndex
    var newCourtName = req.session.data.appearance['court-name-select']
    console.log("New court name:" + newCourtName)
    if (newCourtName.includes('Yes')) {
        req.session.data.appearance['court-name'] = req.session.data.courtCases[courtCaseIndex].appearances.at(-1)['court-name']
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/overall-case-outcome`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-name`)
})

router.post('/:prototypeVersion/change-offences-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = req.session.data.courtCaseIndex
    var changeOffences = req.session.data.appearance['change-offences']
    console.log("Change offences:" + changeOffences)
    if (changeOffences.includes('Yes')) {
        req.session.data.changeMade = 0
        req.session.data.offenceDeleted = 0
        req.session.data.offenceAdded = 0
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/next-court-date-select`)
})

// Overall case outcome applies all offences
router.post('/:prototypeVersion/case-outcome-apply', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = req.session.data.courtCaseIndex
    const appearanceIndex = req.session.data.appearanceIndex
    const route = req.query.route
    const warrantType = req.session.data.warrantType
    var overallCaseOutcomeApply = 'No'
    overallCaseOutcomeApply = req.session.data.appearance['overall-case-outcome-apply-all']
    console.log("Overall case outcome applies: " + overallCaseOutcomeApply)
    console.log("Warrant type: " + warrantType)
    if (overallCaseOutcomeApply == 'Yes' && warrantType != 'Sentencing') {
        req.session.data.appearance['overall-case-outcome-apply-all'] = overallCaseOutcomeApply
        req.session.data.appearance.offences = req.session.data.appearance.offences
            .map(offence => {
                offence.outcome = req.session.data.appearance['overall-case-outcome']
                return offence
            })
        if (route == 'repeat-remand') {
            return res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/review-offences`)
        }
        if (warrantType == 'Sentencing') {
            return res.redirect(307, `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`)
        } else
        return res.redirect(307, `/${prototypeVersion}/persist-offence`)
    } else if (overallCaseOutcomeApply == 'Yes' && warrantType == 'Sentencing') {
        req.session.data.appearance['overall-case-outcome-apply-all'] = overallCaseOutcomeApply
        req.session.data.appearance.sentences = req.session.data.appearance.sentences
            .map(sentence => {
                sentence.outcome = req.session.data.appearance['overall-case-outcome']
                return sentence
            })
        return res.redirect(307, `/${prototypeVersion}/court-cases/add-a-sentence/sentence-type`)
    } else if (warrantType == 'Sentencing') {
        res.redirect(`/${prototypeVersion}/court-cases/add-an-sentence/outcome`)
    } else res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/outcome`)
})

//Add court case
router.get('/:prototypeVersion/create-court-case', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    delete req.session.data.courtCaseIndex
    delete req.session.data.courtCase
    res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/court-case-reference-number`)
})

router.post('/:prototypeVersion/persist-court-case', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const warrantType = req.session.data.warrantType
    if (req.session.data.courtCaseIndex !== undefined) {
        req.session.data.courtCases[req.session.data.courtCaseIndex] = req.session.data.courtCase
    } else if (warrantType == 'Sentencing') {
                const appearance = {
            ...req.session.data.appearance,
            sentences: []
        }
        const courtCase = { ...req.session.data.courtCase,
            'court-case-num': req.session.data.courtCases.length - 1,
            appearances: []
        }
        req.session.data.courtCases.push(courtCase)
        req.session.data.courtCase = courtCase
        req.session.data.courtCaseIndex = req.session.data.courtCases.length - 1
        req.session.data.appearance = appearance
    } else if (warrantType != 'Sentencing') {
        const appearance = {
            ...req.session.data.appearance,
            offences: []
        }
        const courtCase = { ...req.session.data.courtCase,
            'court-case-num': req.session.data.courtCases.length - 1,
            appearances: []
        }
        req.session.data.courtCases.push(courtCase)
        req.session.data.courtCase = courtCase
        req.session.data.courtCaseIndex = req.session.data.courtCases.length - 1
        req.session.data.appearance = appearance
        }
    if (prototypeVersion == 'v9') {
        if (warrantType == 'Sentencing') {
            console.log('Redirecting to add sentence')
            res.redirect(`/${prototypeVersion}/create-sentence`)
        } else 
        console.log('Redirecting to add offence')
        res.redirect(`/${prototypeVersion}/create-offence`)
    } else
        res.redirect(`/${prototypeVersion}/create-offence`)
})

router.get('/:prototypeVersion/update-court-case', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const index = req.query.index
    req.session.data.courtCase = req.session.data.courtCases[index]
    req.session.data.courtCaseIndex = index
    res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/check-answers`)
})

router.get('/:prototypeVersion/delete-court-case', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const index = req.query.index
    req.session.data.courtCases.splice(index, 1)
    res.redirect(`/${prototypeVersion}/court-cases/court-cases-standalone`)
})

//Add an appearance
router.get('/:prototypeVersion/create-appearance', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    delete req.session.data.appearanceIndex
    delete req.session.data.appearance
    const courtIndex = req.query.courtIndex
    if (courtIndex !== undefined) {
        req.session.data.courtCase = req.session.data.courtCases[courtIndex]
        req.session.data.courtCaseIndex = courtIndex
    }
    const lastAppearance = req.session.data.courtCase.appearances.at(-1)
    req.session.data.appearance = {
        offences: lastAppearance.offences,
        'court-name': lastAppearance['next-court-name'],
        'warrant-date-day': lastAppearance['next-court-date-day'],
        'warrant-date-month': lastAppearance['next-court-date-month'],
        'warrant-date-year': lastAppearance['next-court-date-year']
    }
    if (prototypeVersion == 'v8') {
        return res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number-select`)
    } else {
        return res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/court-case-reference-number`)
    }
})

router.post('/:prototypeVersion/persist-appearance', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    var displaySuccess = 0
    const route = req.query.route
    if (req.session.data.appearanceIndex !== undefined) {
        req.session.data.courtCases[req.session.data.courtCaseIndex].appearance[req.session.data.appearanceIndex] = req.session.data.appearance
    } else if (req.query.isFirst) {
        req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[0] = { ...req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[0], ...req.session.data.appearance }
        req.session.data.appearanceIndex = 0
    } else {
        req.session.data.courtCases[req.session.data.courtCaseIndex].appearances.push(req.session.data.appearance)
        req.session.data.appearanceIndex = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances.length - 1
        console.log('Appearance index: ' + req.session.data.appearanceIndex)
    }
    displaySuccess = 1
    req.session.data.appearanceSuccess = displaySuccess
    if (route == "repeat-remand") {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/confirmation`)
    } else if (route == "add-a-court-case") {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/confirmation`)
    }
})

router.get('/:prototypeVersion/close-success-message', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    var displaySuccess = 0
    req.session.data.appearanceSuccess = displaySuccess
    res.redirect(`/${prototypeVersion}/court-cases/`)
})

//Add offences

router.get('/:prototypeVersion/create-offence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    delete req.session.data.offenceIndex
    delete req.session.data.offence
    const appearanceIndex = req.query.appearanceIndex
    const route = req.session.data.route
    console.log('Route: ' + route)
    if (appearanceIndex !== undefined) {
        req.session.data.appearance = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[appearanceIndex]
        req.session.data.appearanceIndex = appearanceIndex
    }
    if (req.session.data.appearance['overall-case-outcome-apply-all'] === 'Yes') {
        req.session.data.offence = {
            outcome: req.session.data.appearance['overall-case-outcome']
        }
    }
    res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/offence-code`)
})

router.post('/:prototypeVersion/persist-offence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const route = req.session.data.route
    console.log("Route: " + route)
    if (req.session.data.offenceIndex !== undefined) {
        req.session.data.appearance.offences[req.session.data.offenceIndex] = req.session.data.offence
    } else {
        req.session.data.appearance.offences.push(req.session.data.offence)
        req.session.data.offenceIndex = req.session.data.appearance.offences.length - 1
    }
    if (route == 'repeat-remand') {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`)
    } else
        req.session.data.changeMade = 0
    req.session.data.offenceDeleted = 0
    req.session.data.offenceAdded = 1
    res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/check-answers`)
})

router.get('/:prototypeVersion/update-offence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const index = req.query.index
    console.log('Appearance index: ' + req.session.data.appearanceIndex)
    const route = req.query.route
    req.session.data.route = route
    console.log('Edit route:' + route)
    req.session.data.offence = req.session.data.appearance.offences[index]
    req.session.data.offenceIndex = index
    req.session.data.changeMade = 1
    req.session.data.offenceDeleted = 0
    req.session.data.offenceAdded = 0
    res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/offence-code`)
})


router.get('/:prototypeVersion/confirm-delete', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    req.session.data.index = req.query.index
    req.session.data.route = req.query.route
    const route = req.session.data.route
    console.log('Offence index' + req.session.data.index)
    res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/confirm-delete`)
})

router.get('/:prototypeVersion/add-an-offence-to-appearance', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    req.session.data.route = req.query.route
    console.log('Route: ' + req.session.data.route)
    req.session.data.offenceAdded = 1
    req.session.data.changeMade = 0
    req.session.data.offenceDeleted = 0
    res.redirect(307, `/${prototypeVersion}/create-offence`)
})

router.get('/:prototypeVersion/delete-offence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const index = req.query.index
    const route = req.session.data.route
    if (req.session.data.confirmDeleteOffence == 'Yes') {
        req.session.data.appearance.offences.splice(index, 1)
        if (route == "repeat-remand") {
            req.session.data.changeMade = 0
            req.session.data.offenceDeleted = 1
            req.session.data.offenceAdded = 0
            res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`)
        } else if (route != "repeat-remand") {
            req.session.data.changeMade = 0
            req.session.data.offenceDeleted = 1
            req.session.data.offenceAdded = 0
            res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/check-answers`)
        }
    } else if (req.session.data.confirmDeleteOffence == 'No') {
        if (route == 'repeat-remand') {
            res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`)
        } else if (route != "repeat-remand") {
            res.redirect(`/${prototypeVersion}/court-cases/add-an-offence/check-answers`)
        }
    }
})


// Add sentences

router.get('/:prototypeVersion/create-sentence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    delete req.session.data.sentenceIndex
    delete req.session.data.sentence
    const appearanceIndex = req.query.appearanceIndex
    const route = req.session.data.route
    console.log('Route: ' + route)
    if (appearanceIndex !== undefined) {
        req.session.data.appearance = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[appearanceIndex]
        req.session.data.appearanceIndex = appearanceIndex
    }
    if (req.session.data.appearance['overall-case-outcome-apply-all'] === 'Yes') {
        req.session.data.sentence = {
            outcome: req.session.data.appearance['overall-case-outcome']
        }
    }
    res.redirect(`/${prototypeVersion}/court-cases/add-a-sentence/offence-code`)
})

router.post('/:prototypeVersion/persist-sentence', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const route = req.session.data.route
    console.log("Route: " + route)
    if (req.session.data.sentenceIndex !== undefined) {
        req.session.data.appearance.sentences[req.session.data.sentenceIndex] = req.session.data.sentence
    } else {
        req.session.data.appearance.sentence.push(req.session.data.sentence)
        req.session.data.sentenceIndex = req.session.data.appearance.sentences.length - 1
    }
    if (route == 'repeat-remand') {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-appearance/change-offences`)
    } else
    req.session.data.changeMade = 0
    req.session.data.sentneceDeleted = 0
    req.session.data.sentenceAdded = 1
    res.redirect(`/${prototypeVersion}/court-cases/add-an-sentence/check-answers`)
})

router.get('/:prototypeVersion/view-court-case-detail', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = Number(req.query.courtCaseIndex) + 1
    console.log('Court case index: ' + courtCaseIndex)
    res.redirect(`/${prototypeVersion}/court-cases/court-case-detail`)
})

router.get('/:prototypeVersion/view-appearance-detail', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    const courtCaseIndex = req.session.data.courtCaseIndex
    const appearanceIndex = Number(req.query.appearanceIndex)
    console.log('Court case index: ' + courtCaseIndex)
    res.redirect(`/${prototypeVersion}/court-cases/appearance-detail`)
})

router.get('/:prototypeVersion/warrant-type-select', function(req, res) {
    const prototypeVersion = req.params.prototypeVersion
    req.session.data.warrantType = req.session.data.appearance['warrant-type']
    warrantType = req.session.data.warrantType
    console.log('Warrant type: ' + warrantType)
    if (warrantType == 'Remand') {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/overall-case-outcome`)
    } else if (warrantType == 'Sentencing') {
        res.redirect(`/${prototypeVersion}/court-cases/add-a-court-case/overall-case-outcome-sentencing`)
    }
})