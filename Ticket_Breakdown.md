# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Create customID column for Agents table in database

- Acceptance Criteria: As a Client in Facilities, when I generate reports for Agents, I should be able to add a customID to the Agent and pull reports by inputting the customID value into the UI.
- Information: In the database, create a column named `customID` in the Agents table in the database. It must be nullable, varchar data type with a max of 50 characters.
- Effort: 1 - should not take more than half a day after verifying the script to add column and testing it out on lower environment

2. Create a field in the UI for clients in Facilities to be able to input `customID` when creating an Agent or editing an Agent

- Acceptance Criteria: As a Client in Facilities, when I edit or create an Agent on the UI, I should be able to see the custom ID field and input the value I'd like to be able to pull reports given the custom ID
- Information: Add necessary validation around the customID field like no spaces, no special characters, and 50 characters or less. Upon creating or finishing editing an Agent, the backend code for `editAgent` or `createAgent` should handle the new custom ID field perfectly. To verify, please check the database upon creation or editing an Agent.
- Effort: 3 - should take about a day or day and a half to add validation, styling, possible frontend test cases that need to be modified

3. Modify the editAgent and createAgent endpoints in the backend code to handle the new customID field in the frontend

- Acceptance Criteria: Validation for the correct combination of characters are being sent in the payload: 50 characters or less, no special characters, no spaces, and nullable
  Information: This is to be completed BEFORE ticket #2. Add `customID` to the Agent model that can be nullable and a string. Add unit tests for the returned JSON object to include customID's for when the Agent is edited or created. Modify the query so that the Agents table will input the customID into the `customID` column in the database. Add logic that will make sure the `ID` and `customID` are NOT the same upon creating or editing an Agent.
- Effort: 5 - should take about 2 days to write the logic, modify the query, modify the model, add unit testing, modify existing unit testing, testing out the endpoints, adding validation, and additional logic to handle customID's vs. ID's for existing Agents.

4. Modify `getShiftsByFacility` so that the metadata can include the `customID` for the Agent

- Acceptance Criteria: As a Client in Facilities, when I retrieve shifts given the facility ID, I should be able to see the `customID` of the Agents that get pulled in.
- Information: This ticket can only be completed after Ticket #1 is completed. Modify the model for Shifts so that it includes the `customID` for the Agents' shifts that get retrieved. Modify the query that retrieves the information of the shifts so that it includes the `customID` as well. Add unit tests around the newly added code so that it includes the `customID` in the resulting payload
- Effort: 3 - should take about a day to add the new fields, add unit testing, and test out the endpoint
