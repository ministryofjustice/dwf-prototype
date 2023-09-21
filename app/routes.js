//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// Next court date route
router.post('/next-court-date-select', function (req, res) {

  // Make a variable and give it the value 
  var nextCourtDateSelect = req.session.data['courtCase']['next-court-date-set']
console.log(nextCourtDateSelect)
  // Check whether the variable matches a condition
  if (nextCourtDateSelect == "Yes"){
    // Send user to next page
    res.redirect('/v5/court-cases-standalone/add-a-court-case/next-hearing-type-select')
  } else res.redirect('/v5/court-cases-standalone/add-a-court-case/check-answers')

})



// Offence code route
router.post('/offence-code-known', function (req, res) {
// Make a variable and give it the value 
  var offenceCodeKnown = req.session.data.offence['offence-code']
console.log(offenceCodeKnown)
  // Check whether the variable matches a condition
  if (offenceCodeKnown.includes('None')){
    // Send user to next page
    res.redirect('/v5/court-cases-standalone/add-an-offence/offence-name')
  } else res.redirect('/v5/court-cases-standalone/add-an-offence/confirm-offence')

})

router.get('/create-court-case', function(req, res) {
  delete req.session.data.courtCaseIndex
  delete req.session.data.courtCase
  res.redirect('/v5/court-cases-standalone/add-a-court-case/court-case-reference-number')
})

router.post('/persist-court-case', function (req, res) {
  if(req.session.data.courtCaseIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex] = req.session.data.courtCase
  } else {
    req.session.data.courtCases.push({...req.session.data.courtCase, offences: []})
    req.session.data.courtCaseIndex = req.session.data.courtCases.length -1
  }

  res.redirect('/v5/court-cases-standalone/add-a-court-case/confirmation')
})

router.get('/update-court-case', function(req, res) {
  const index = req.query.index
  req.session.data.courtCase = req.session.data.courtCases[index]
  req.session.data.courtCaseIndex = index
  res.redirect('/v5/court-cases-standalone/add-a-court-case/check-answers')
})

router.get('/delete-court-case', function(req, res) {
  const index = req.query.index
  req.session.data.courtCases.splice(index, 1)
  res.redirect('/v5/court-cases-standalone/court-cases-standalone')
})

router.get('/create-offence', function(req, res) {
  delete req.session.data.offenceIndex
  delete  req.session.data.offence
  res.redirect('/v5/court-cases-standalone/add-an-offence/offence-date')
})

router.post('/persist-offence', function(req, res) {
  if(req.session.data.offenceIndex !== undefined) {
    req.session.data.courtCases[req.session.data.courtCaseIndex].offences[req.session.data.offenceIndex] = req.session.data.offence
  } else {
    req.session.data.courtCases[req.session.data.courtCaseIndex].offences.push(req.session.data.offence)
    req.session.data.offenceIndex = req.session.data.courtCases[req.session.data.courtCaseIndex].offences.length - 1
  }
  res.redirect('/v5/court-cases-standalone/add-an-offence/confirmation')
})

router.get('/update-offence', function(req, res) {
  const index = req.query.index
  req.session.data.offence = req.session.data.courtCases[req.session.data.courtCaseIndex].offences[index]
  req.session.data.offenceIndex = index
  res.redirect('/v5/court-cases-standalone/add-a-court-case/check-answers')
})

router.get('/delete-offence', function(req, res) {
  const index = req.query.index
  req.session.data.courtCases[req.session.data.courtCaseIndex].offences.splice(index, 1)
  res.redirect('/v5/court-cases-standalone/add-an-offence/confirmation')
})


