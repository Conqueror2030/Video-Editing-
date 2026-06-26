# OpenPencil MCP Skill Definition

## Intent
This skill exposes the OpenPencil (`op`) CLI tool enabling the OpenCode terminal agent to autonomously convert layout structures into functional HTML/Tailwind strings headlessly.

## Commands
*   `npm run video:design` -> Evaluates `./studio/canvas.json` and outputs responsive code implementations matching the `DESIGN.md` guidelines.

## Requirements
*   Uses Cloud API tokens to offload heavy visual reasoning logic from the local system CPU.
*   Enforces 8GB Memory hardware limits: All processes run under constrained threads.
