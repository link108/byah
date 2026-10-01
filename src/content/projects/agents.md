---
title: agents
status: active
summary: CLI and local server that run a coding agent through fixed phases (plan, implement, verify, review, push) in an isolated container.
stack:
  - TypeScript
  - tsx
  - React
  - Dev Containers
links:
  - label: Source
    url: https://github.com/link108/agents
featured: false
---

`agents` takes a task, either a markdown spec or a ticket found in Notion, and runs a
coding agent through the same sequence every time:

```text
workspace_setup -> plan -> implement -> verify -> review (round 1)
  -> review (round 2) -> final_verify -> push -> complete
```

Each task gets its own git workspace and branch, and the agent works inside the
target repo's devcontainer. The phase order is enforced by a small state machine, so
a task can't jump from implement to push without going through verify and both
review rounds. After the push there are commands for the parts that come next:
`task-pr-comments` hands GitHub review comments back to the agent, and there's also
`task-amend`, `task-rebase`, and `task-resume`.

The CLI is thin. A local server owns the jobs, and the terminal UI (React via Ink)
just watches them, with logs streamed live. Workers used to be child processes of the
server, so restarting the server killed every running task and left their containers
running with nothing driving them. Now workers are detached processes, job state is on
disk, and the server reattaches to whatever was running when it comes back up.

The agent inside the container uses the subscription login from my Mac instead of an
API key. On macOS that token lives in the Keychain, which a Linux container can't
read, so a preflight step exports it to a file the container can mount.
