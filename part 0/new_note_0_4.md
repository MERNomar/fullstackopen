```mermaid
sequenceDiagram
    participant browser
    participant server
    participant notes.json


    browser ->> server : POST : https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server ->> notes.json : Add new note
    server -->> browser : HTML document
    deactivate server
```
