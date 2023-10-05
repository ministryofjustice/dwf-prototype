//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// Next court date route
router.post('/:prototypeVersion/next-court-date-select', function (req, res) {
  const prototypeVersion = req.params.prototypeVersion
  // Make a variable and give it the value 
  var nextCourtDateSelect = req.session.data['courtCase']['next-court-date-set']
  // Check whether the variable matches a condition
  if (nextCourtDateSelect == "Yes"){
    // Send user to next page
    res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/next-hearing-type-select`)
  } else res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/check-answers`)
})

// Next court date route for add first appearance
router.post('/:prototypeVersion/add-a-first-court-appearance/next-court-date-select', function (req, res) {
  const prototypeVersion = req.params.prototypeVersion
  // Make a variable and give it the value 
  var nextCourtDateSelect = req.session.data['appearance']['next-court-date-set']
  // Check whether the variable matches a condition
  if (nextCourtDateSelect == "Yes"){
    // Send user to next page
    res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-first-court-appearance/next-hearing-type-select`)
  } else res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-first-court-appearance/check-answers`)
})

// Offence code route
router.post('/:prototypeVersion/offence-code-known', function (req, res) {
  const prototypeVersion = req.params.prototypeVersion
// Make a variable and give it the value 
  var offenceCodeKnown = req.session.data.offence['offence-code']
console.log(offenceCodeKnown)
  // Check whether the variable matches a condition
  if (offenceCodeKnown.includes('None')){
    // Send user to next page
    res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/offence-name`)
  } else res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/confirm-offence`)

})

//Add court case

router.get('/:prototypeVersion/create-court-case', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  delete req.session.data.courtCaseIndex
  delete req.session.data.courtCase
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/court-case-reference-number`)
})

router.post('/:prototypeVersion/persist-court-case', function (req, res) {
  const prototypeVersion = req.params.prototypeVersion
  if(req.session.data.courtCaseIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex] = req.session.data.courtCase
  } else {
    req.session.data.courtCases.push({...req.session.data.courtCase, appearances: [ {
        'warrant-date-day': req.session.data.courtCase['warrant-date-day'],
        'warrant-date-month': req.session.data.courtCase['warrant-date-month'],
        'warrant-date-year': req.session.data.courtCase['warrant-date-year'],
        'court-name': req.session.data.courtCase['court-name'],
        offences: []
      }]})
    req.session.data.courtCaseIndex = req.session.data.courtCases.length -1
  }

  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/confirmation`)
})

router.get('/:prototypeVersion/update-court-case', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  const index = req.query.index
  req.session.data.courtCase = req.session.data.courtCases[index]
  req.session.data.courtCaseIndex = index
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/check-answers`)
})

router.get('/:prototypeVersion/delete-court-case', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  const index = req.query.index
  req.session.data.courtCases.splice(index, 1)
  res.redirect(`/${prototypeVersion}/court-cases-standalone/court-cases-standalone`)
})

//Add court appearance

router.get('/:prototypeVersion/create-appearance', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  delete req.session.data.appearanceIndex
  delete req.session.data.appearance
  const courtIndex = req.query.courtIndex
  if(courtIndex !== undefined) {
    req.session.data.courtCase = req.session.data.courtCases[courtIndex]
    req.session.data.courtCaseIndex = courtIndex
  }
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-first-court-appearance/overall-case-outcome`)
})



router.post('/:prototypeVersion/persist-appearance', function (req, res) {
  const prototypeVersion = req.params.prototypeVersion
  if(req.session.data.appearanceIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex].appearance[req.session.data.appearanceIndex] = req.session.data.appearance
  } else if(req.session.data.courtCases[req.session.data.courtCaseIndex].appearances.length === 1) {
    req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[0] = {...req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[0], ...req.session.data.appearance}
    req.session.data.appearanceIndex = 0
  } else {
    req.session.data.courtCases[req.session.data.courtCaseIndex].appearances.push({...req.session.data.appearance, offences: []})
    req.session.data.appearanceIndex = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances.length -1
  }

  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/offence-date`)
})

//Add offences

router.get('/:prototypeVersion/create-offence', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  delete req.session.data.offenceIndex
  delete  req.session.data.offence
  const appearanceIndex = req.query.appearanceIndex
  if(appearanceIndex !== undefined) {
    req.session.data.appearanceIndex = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[appearanceIndex]
    req.session.data.appearanceIndex = appearanceIndex
  }
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/offence-date`)
})

router.post('/:prototypeVersion/persist-offence', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  if(req.session.data.offenceIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[req.session.data.appearanceIndex].offences[req.session.data.offenceIndex] = req.session.data.offence
  } else {
    req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[req.session.data.appearanceIndex].offences.push(req.session.data.offence)
    req.session.data.offenceIndex = req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[req.session.data.appearanceIndex].offences.length - 1
  }
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/confirmation`)
})

router.get('/:prototypeVersion/update-offence', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  const index = req.query.index
  req.session.data.offence = req.session.data.courtCases[req.session.data.courtCaseIndex].appearance[req.session.data.appearanceIndex].offences[index]
  req.session.data.offenceIndex = index
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-a-court-case/check-answers`)
})

router.get('/:prototypeVersion/delete-offence', function(req, res) {
  const prototypeVersion = req.params.prototypeVersion
  const index = req.query.index
  req.session.data.courtCases[req.session.data.courtCaseIndex].appearances[req.session.data.appearanceIndex].offences.splice(index, 1)
  res.redirect(`/${prototypeVersion}/court-cases-standalone/add-an-offence/confirmation`)
})



