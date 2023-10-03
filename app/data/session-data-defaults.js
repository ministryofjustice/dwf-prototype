/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
    courtCases:[
        {
            "court-case-ref": "1234",
            "warrant-date-day": "12",
            "warrant-date-month": "9",
            "warrant-date-year": "2023",
            "court-name": "Aldershot and Farnham County Court",
            "type-of-case": "Adult",
            "appearances": [
                {
                    "overall-case-outcome": "Remand before conviction",
                    "warrant-date-day": "12",
                    "warrant-date-month": "9",
                    "warrant-date-year": "2023",
                    "court-name": "Aldershot and Farnham County Court",
                    "next-court-date-set": "Yes",
                    "next-hearing-type": "Court appearance",
                    "next-court-date-day": "5",
                    "next-court-date-month": "10",
                    "next-court-date-year": "2023",
                    "next-court-time": "13:00",
                    "offences": [
                        {
                            "offence-start-date-day": "24",
                            "offence-start-date-month": "8",
                            "offence-start-date-year": "2023",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "45462"
                            ],
                            "offence-name": "Kidnap",
                            "outcome": "Remand before conviction"
                        }
                    ]
                }
            ]
        }
    ]
    // ,courtCase: {
    //     'court-case-ref': '123',
    //     'court-name': 'Birmingham Court',
    //     'warrant-date-day': '12',
    //     'warrant-date-month': '9',
    //     'warrant-date-year': '2023',
    //     'type-of-case': "Remand",
    //     'overall-case-outcome': "Remand before conviction",
    //     'next-court-date-set': "No",
    //      offences: []
    // } Example of what is stored in the session for submitting a court case

  // Insert values here

}
