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
  var nextCourtDateSelect = req.session.data['next-court-date-set']
console.log(nextCourtDateSelect)
  // Check whether the variable matches a condition
  if (nextCourtDateSelect == "Yes"){
    // Send user to next page
    res.redirect('/v4/court-cases-standalone/add-a-court-case/next-court-date')
  } else res.redirect('/v4/court-cases-standalone/add-a-court-case/check-answers')

})

// Offence code route
router.post('/offence-code-known', function (req, res) {
// Make a variable and give it the value 
  var offenceCodeKnown = req.session.data['offence-code']
console.log(offenceCodeKnown)
  // Check whether the variable matches a condition
  if (offenceCodeKnown.includes('None')){
    // Send user to next page
    res.redirect('/v4/court-cases-standalone/add-an-offence/offence-name')
  } else res.redirect('/v4/court-cases-standalone/add-an-offence/confirm-offence')

})


