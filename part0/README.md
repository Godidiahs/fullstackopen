# Part 0 — Fundamentals of Web apps

Exercises 0.1, 0.2 and 0.3 were reading exercises (MDN tutorials on HTML, CSS and HTML forms) and are not submitted as files, as stated in the course material.

Exercises 0.4, 0.5 and 0.6 are the sequence diagrams below, made with Mermaid syntax in GitHub Markdown.

## 0.4: New note diagram

The user creates a new note on https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking Save (traditional web application).

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Form data is the note text the user wrote
    Note right of server: Server creates a new note and adds it to the notes array
    server-->>browser: HTTP 302 redirect to /exampleapp/notes
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: CSS file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: JavaScript file
    Note right of browser: Browser executes the JavaScript code, which fetches the notes data
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: JSON data including the new note
    Note right of browser: Browser renders the notes, including the new note, to the page
```

## 0.5: Single page app diagram

The user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: HTML document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: CSS file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: JavaScript file
    Note right of browser: Browser executes the JavaScript code, which fetches the notes data
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: JSON data
    Note right of browser: Browser renders the notes to the page
```

## 0.6: New note in Single page app diagram

The user creates a new note using the single-page version of the app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server
    Note right of browser: User writes a note and clicks Save
    Note right of browser: The submit handler prevents the default form submission
    Note right of browser: The handler creates a new note, adds it to the list and re-renders the page
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: JSON data with the note content and date
    Note right of server: Server adds the new note to the notes array
    server-->>browser: HTTP 201 Created
    Note right of browser: Browser stays on the same page, the new note is already shown
```
