const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('unique', function(arr, field) {
    return [...new Set(arr.map(obj => obj[field]))]
})