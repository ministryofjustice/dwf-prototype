# Things to Do Pattern & Notification Badges

## Gherkin Specification

---

# Feature: Things to Do Pattern

## Scenario: Display Things to Do section with tasks

Given there are one or more outstanding tasks
When the user views a supported landing page
Then the Things to Do section should be displayed
And the section should appear in the right-aligned column
And the heading should display the number of outstanding tasks
And a task panel should be shown for each task

---

## Scenario: Update counter when tasks change (add)

Given the Things to Do section is visible
When a new task is created
Then the Things to Do counter should increment
And a new task panel should be displayed

## Scenario: Update counter when tasks change (complete)

Given the Things to Do section is visible
When a task is completed
Then the corresponding task panel should be removed
And the Things to Do counter should decrement

---

## Scenario: Empty state when no tasks exist

Given there are no outstanding tasks
When the user views a supported landing page
Then no task panels should be displayed
And the message "There are no tasks to complete." should be shown

---

## Scenario: Entering a task from a panel

Given a task panel is displayed
When the user selects the task panel
Then the user should be taken to the relevant task journey

---

# Feature: Notification Badges

## Scenario: Display notification badge when task exists

Given a task exists for a specific service
When the user views the service navigation
Then a notification badge should appear on the relevant service tab
And the badge should display the number of outstanding items

---

## Scenario: Increment notification badge

Given a notification badge is already visible on a service tab
When an additional task is created for that service
Then the notification badge count should increment

---

## Scenario: Decrement notification badge

Given a notification badge is visible on a service tab
When a task is completed
Then the notification badge count should decrement

---

## Scenario: Remove notification badge when no tasks remain

Given a notification badge is visible on a service tab
When all tasks for that service are completed
Then the notification badge should be removed

---

# Feature: Task Lifecycle Across Pattern and Badges

## Scenario: Full task lifecycle

Given a new task becomes required
When the task is created
Then a Things to Do task panel should appear
And the Things to Do counter should increment
And a notification badge should appear on the relevant service tab

When the user selects the task panel
And completes the task journey
Then the task panel should be removed
And the Things to Do counter should decrement
And the notification badge should decrement or disappear

---

# Feature: Remand Warrant Task

## Scenario: Remand warrant task appears

Given a remand warrant requires review
When the user enters the service
Then a Things to Do task panel for the remand warrant should be displayed
And the Things to Do counter should increment
And a notification badge should appear on the Court cases tab

---

## Scenario: Completing remand warrant task

Given the user is completing a remand warrant task
When the user reaches "/add-a-new-court-case/confirmation"
Then the task should be marked as complete
And the task panel should be removed
And the Things to Do counter should decrement
And the notification badge should update or be removed

---

# Feature: Documents (Unread Documents)

Note: Unread documents are **not** represented as task panels in the Things to Do section and do **not** contribute to the Things to Do counter. They are surfaced only via the notification badge on the Documents tab in the service navigation.

## Scenario: Display notification badge when unread documents exist

Given there are unread documents
When the user views the service navigation
Then a blue notification badge should appear on the Documents tab with the unread count
And no task panel should be displayed in the Things to Do section for documents
And the Things to Do counter should not include the document count

---

## Scenario: Mark document as read

Given a document is unread
When the user clicks on the document link
Then the document should be marked as read
And the notification badge count should decrement

---

## Scenario: All documents read

Given all documents have been opened
When the user returns to the landing page
Then the notification badge on the Documents tab should be removed

---

## Scenario: Documents do not block tasks

Given there are unread documents
When the user has other tasks to complete
Then unread documents should not prevent completion of other tasks
And unread documents should not block calculation tasks

---

# Feature: Perform a Calculation Rule

## Scenario: Calculation task appears after all tasks complete

Given there were outstanding tasks
And all tasks have been completed
When the user returns to the service
Then a "Perform a calculation" task should appear
And the Things to Do counter should increment
And a notification badge should appear on the Release dates tab

---

## Scenario: No calculation task if no prior tasks

Given there were no tasks initially
When the user views the service
Then no "Perform a calculation" task should appear

---

## Scenario: Enter calculation task

Given the "Perform a calculation" task is visible
When the user selects the task
Then the user should be taken to "calculate-release-dates/calculation-reason"

---

## Scenario: Complete calculation task

Given the user is completing a calculation
When the user reaches the confirmation screen in calculate-release-dates
Then the task should be marked as complete
And the task panel should be removed
And the Things to Do counter should decrement
And the notification badge should update or be removed
