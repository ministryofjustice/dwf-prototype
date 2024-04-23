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
            "appearances": [
                {
                    "court-case-ref": "63GD1757930",
                    "overall-case-outcome": "Remand before conviction",
                    "next-court-date-set": "Yes",
                    "next-hearing-type": "Court appearance",
                    "warrant-date-day": "12",
                    "warrant-date-month": "03",
                    "warrant-date-year": "2024",
                    "court-name": "Sheffield MC",
                    "next-court-date-day": "20",
                    "next-court-date-month": "04",
                    "next-court-date-year": "2024",
                    "next-court-time": "13:00",
                    "next-court-name": "Sheffield Crown Court",
                    "offences": [
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "CL77001"
                            ],
                            "offence-name": "CL77001 - Use violence to secure entry to premises",
                            "outcome": "Remand before conviction"
                        },
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "CL77001"
                            ],
                            "offence-name": "TH68023 - Robbery",
                            "outcome": "Remand before conviction"
                        },
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "TH68050"
                            ],
                            "offence-name": "TH68050 - Take a motor vehicle without the owners consent",
                            "outcome": "Remand before conviction"
                        }
                    ]
                },
                {
                    "court-case-ref": "63GD1758052",
                    "overall-case-outcome": "Remand before conviction",
                    "next-court-date-set": "Yes",
                    "next-hearing-type": "Court appearance",
                    "warrant-date-day": "20",
                    "warrant-date-month": "04",
                    "warrant-date-year": "2024",
                    "court-name": "Sheffield Crown Court",
                    "next-court-date-day": "21",
                    "next-court-date-month": "04",
                    "next-court-date-year": "2024",
                    "next-court-time": "09:00",
                    "next-court-name": "Sheffield Crown Court",
                    "offences": [
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "CL77001"
                            ],
                            "offence-name": "CL77001 - Use violence to secure entry to premises",
                            "outcome": "Remand before conviction"
                        },
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "CL77001"
                            ],
                            "offence-name": "TH68023 - Robbery",
                            "outcome": "Remand before conviction"
                        },
                        {
                            "offence-start-date-day": "25",
                            "offence-start-date-month": "02",
                            "offence-start-date-year": "2024",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "TH68050"
                            ],
                            "offence-name": "TH68050 - Take a motor vehicle without the owners consent",
                            "outcome": "Remand before conviction"
                        }
                    ]
                }
            ]
        },
        {
            "appearances": [
                {
                    "court-case-ref": "63GD1946270",
                    "overall-case-outcome": "Imprisonment",
                    "next-court-date-set": "No",
                    "warrant-date-day": "15",
                    "warrant-date-month": "11",
                    "warrant-date-year": "2023",
                    "court-name": "Darlington Crown Court",
                    "overall-sentence-length-years": "4",
                    "overall-sentence-length-months": "0",
                    "overall-sentence-length-weeks": "0",
                    "overall-sentence-length-days": "0",
                    "sentences": [
                        {
                            "count-number": "1",
                            "offence-start-date-day": "30",
                            "offence-start-date-month": "10",
                            "offence-start-date-year": "2023",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "CJ88001"
                            ],
                            "offence-name": "CJ88001 - Common assault",
                            "outcome": "Imprisonment",
                            "sentence-type": "SDS (Standard Determinate Sentence)",
                            "sentence-length-years": "2",
                            "sentence-length-months": "6",
                            "sentence-length-weeks": "0",
                            "sentence-length-days": "0",
                            "consecutive-concurrent" : "Forthwith"
                        },
                        {
                            "count-number": "2",
                            "offence-start-date-day": "30",
                            "offence-start-date-month": "10",
                            "offence-start-date-year": "2023",
                            "offence-end-date-day": "",
                            "offence-end-date-month": "",
                            "offence-end-date-year": "",
                            "offence-code": [
                                "I68403"
                            ],
                            "offence-name": "I68403 - Purchase/acquire prohibited weapon - rocket launcher",
                            "outcome": "Imprisonment",
                            "sentence-type": "SDS (Standard Determinate Sentence)",
                            "sentence-length-years": "4",
                            "sentence-length-months": "0",
                            "sentence-length-weeks": "0",
                            "sentence-length-days": "0",
                            "consecutive-concurrent" : "Concurrent"
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