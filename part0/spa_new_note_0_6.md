```mermaid
sequenceDiagram
    participant browser
    participant server
    participant notes_spa.json

    browser ->> server : POST : https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    browser ->> browser : Update the DOM and add new note
    server ->> notes_spa.json : Add new note
    server -->> browser : 201 Created
    deactivate server
```
