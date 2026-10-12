# TaskFlow — Professional Kanban Task Manager

A polished, responsive Trello-like task management website built with **HTML, CSS and vanilla JavaScript**. It intentionally uses rule-based logic rather than AI.

## Features
- Responsive professional dashboard and four-column Kanban board
- Drag-and-drop tasks between To do, In progress, In review and Completed
- Create and edit tasks with descriptions, priorities, assignees and due dates
- Task dependency / blocker tracking
- Deadline drift signals: overdue and due-soon labels
- Workload pulse score based on overdue tasks, blockers and completed tasks (transparent rules, not AI)
- Search, priority/assignee filters, sorting, board/list view
- Local browser persistence with `localStorage`
- Export tasks as JSON
- Keyboard shortcuts: `Ctrl/Cmd + K` to search, `Escape` to close dialogs

## Run it
**Simplest method:** open `index.html` in your browser. No package installation required.

Recommended: use the VS Code **Live Server** extension and choose **Open with Live Server** for a smoother local workflow.

## Data and backend notes
This starter is frontend-first. Tasks persist in the current browser using `localStorage`; they are not shared across devices or users. The JSON export is a backup, not a cloud database.

An optional lightweight Node/Express API is included in `server/` if you want to learn basic server-side routes. It stores tasks in a local JSON file. It is a learning backend and is not production-secure; do not expose it publicly without authentication, validation and a real database.

## Suggested presentation of the unique features
1. **Blocker-aware task cards:** link a task to the task it depends on; cards show when the dependency is still open.
2. **Deadline Drift Radar:** clear visual signals for overdue and due-soon tasks.
3. **Transparent Project Pulse:** a rule-based score explains project health from overdue tasks, blockers and completed work—no AI or opaque predictions.
4. **Focus-friendly UI:** search, quick filters and a compact list view help users find work without navigating away.

## Folder structure
```text
TaskFlow_Professional_Web_Project/
├── index.html
├── styles.css
├── app.js
├── README.md
└── server/
    ├── package.json
    ├── server.js
    └── data/
        └── tasks.json
```

## Optional backend setup
Requires Node.js 18+:
```bash
cd server
npm install
npm start
```
Then open `http://localhost:3000/api/tasks` to test the API. The frontend currently runs independently and uses browser storage; the API is supplied as a separate learning extension.
