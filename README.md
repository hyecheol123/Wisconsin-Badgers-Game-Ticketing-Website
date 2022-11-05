# Wisconsin Badgers Game Ticketing Website

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This is a repository for the group project of INFO SYS 371 course of UW-Madison (Fall 2022).
With the consent of instructor, we decide to use React and MUI, not vanilla Javascript with Bulma (CSS Library) to build Wisconsin Badgers Game Ticketing Website.  

Note that this is not the official ticketing website for Wisdonsin Badgers.

Website: https://wisconsin-badgers-ticket.web.app/

## Milestones and Significant Due Dates

**Milestone 1** *(Sep. 28. 2022)*: Project Proposal
  - [x] Write Project Proposal
  - [x] Setup Milestone

**Milestone 2a** *(Oct. 21. 2022)*: Design/Locate React Components (Design Demo)  
  - [x] All Components are implemented (Including states)
  - [x] Routing

**Milestone 2b** *(Nov. 16. 2022)*: Functioning Demo with Demo Dataset  
  - [ ] Add demo dataset (a JSON file)
  - [ ] Display demo data accordingly
  - [ ] Interact with user's input
  - [ ] Optimize Loading - Lazy Loading

**Milestone 3** *(Dec. 07. 2022)*: Full Website  
  - [ ] Firebase database
  - [ ] Summary Report & Presentation
  - [ ] Publish

## Quick Start Guide

After clone this repository, you have to install dependencies by typing `npm install` (Assume that proper Node.js environment already setup).  

To run the scripts, type `npm run <script name>`.
Available scripts are described below.

## Contribution Guidelines

- Before you commit/push your code, run `lint` script to check whether all codes comply with the code style.
  - For automatic fix, run `lint:fix` script.
- The main branch is protected.
  The only way to modify codes in the main branch is use pull request.
  Therefore, you have to work in the other branch and submit pull request to merge your code to the main branch.
- Follow the feature branch rule which illustrates the issue number and the asignee of the task.
  - Branch name rule: `feature-<Issue Number>-<your name>` or `bugfix-<Issue Number>-<your name>`
  - e.g.) `feature-#1-jerry`
- All tasks are listed as issues.
  Please refer to the Issue tab of the repository or a [project board](https://github.com/users/hyecheol123/projects/3).
  - Once you start the task, move task to **In Progres**.
  - Once you finish writing the code and submit the pull request, make sure that you **link** the issue by indicating the issue number in the description of the pull request. Also, move the issue to **Pending Review** on the project board.

## Scripts

Here is the list for npm/yarn scripts.
These are used to lint, test, build, and run teh code.

1. `lint`: lint the code.
2. `lint:fix`: lint the code and try auto-fix.
3. `dev`: Run webpack dev server
4. `build`: Build website based on the `browserslint`. (destination: `dist` Directory)
5. `deploy`: Deploy website to Google Firebase Hosting

No tests are implemented.
To enforce code styling, inspect and lint the codes on commit and push.

## Dependencies/Environment

Developed and tested with `Ubuntu 20.04.5 LTS aarch64` and `Node v16.17.1`.  

TypeScript React Development environment is set up manually with `ESLint`, `Prettier`, `WebPack`, and `Babel`, rather than using other Boilerplate codes (such as `create-react-app`).
For code styling rules and deploy configurations, please refer to the setup files.  

Used `React 18.2.0` and `React Router 6.4.2`.
Also utilize `Material UI (MUI) Library v5.10.9` for elegant design.

Use `Google Firebase Hosting` to deploy this website.

## Database Structure & Schema

```
User: {
  email: string
  password: string (hashed?)
  name: string
  phoneNumber: string (optional)
}
```

**TODO: Tentative (Firebase) / UML**
