# Skidivay • frontend

> Live long and prosper, dear contributor 🖖

## How to start

- clone repository
- clean install packages: `npm ci`
- init husky: `npm run prepare`
- check your IDE, we recommend to use extensions: `eslint`, `prettier`, `conventional-commits`
- create a new branch like: `feat/new-feature`
- run vite: `npm run dev`
- code
- commit your code using: `npm run commit` (it'll run Commitizen)
- check that hook with linting and formatting is running during commit
- push your branch to GitHub
- go to GitHub and open pull request from your branch to `develop` and request review
- take coffee, you are awesome ✨

## Git

### Branches

#### Template

`[prefix]/[task]`

#### Prefix options:

- **feat**
- **fix**
- **refactor**
- **build**
- **docs**
- **chore**

#### Examples

- `feat/project-structure`
- `refactor/default-button`

### Commits

```bash
## Use conventional commits. Either with preinstalled commitizen:
npm run commit

## Or with IDE extension "conventioanl-commits"
```

Each commit shoud start with precommit script arranged by Husky. Precommit script works with staged files and includes: `eslint`, `prettier`.

### Pull-requests (PR) and merging

- PR name should be infomative
- All feature, refactor and fix PR's should be opened to the branch `develop`
- Code author should him/herself: **open PR**, **request review**, **merge PR** after passing review and **delete remote branch** after merge

## Files and directories naming

- Folders: `kebab-case`, for example: `default-button`, `user`
- Files: `PascalCase`, for example: `App.tsx`, `DefaultForm.tsx`, `Form.ts`

Be cautious with letters case.

## Components export

Reexport components from the upper level folders. Inside components use named exports and avoid using default export.

## Structure

> ⚠️ **Attention**
>
> According to FSD, code can be used in the same layer components or upper.

```
src
├── app // app layer
│   ├── (routes) // routes for Next.js App-router
│   │   ├── route-1
│   │   │   └── page.ts // here we import page from /views/[page name]
│   │   ├── route-2
│   │   ├── ...
│   │   ├── layout.tsx // root layout
│   │   └── page.tsx // root route
│   ├── providers
│   └── ...
├── views // page layouts
│   ├── page-1
│   │   ├── index.ts
│   │   ├── ui // or ui.ts if only one file needed
│   │   └── model
│   ├── page-2
│   └── ...
├── widgets
│   ├── widget-1
│   │   ├── index.ts
│   │   ├── ui
│   │   └── model
│   ├── widget-2
│   └── ...
├── features
│   ├── feature-1
│   │   ├── index.ts
│   │   ├── lib
│   │   ├── ui
│   │   ├── api
│   │   └── model
│   ├── feature-2
│   └── ...
├── shared // bottom level
│   ├── const
│   │   ├── index.ts
│   │   └── ...
│   ├── api
│   │   ├── index.ts
│   │   └── ...
│   ├── ui
│   │   ├── index.ts
│   │   └── ...
│   └── lib
│       ├── index.ts
│       └── ...
└── ...

```

## Deploymnet

### For project deploy:

```bash
## Production build
npm run build

## Development build (for testing locally)
npm run build-dev

## Build review
npm run preview
```

### For Storybook deploy:

```bash
## Build Storybook:
npm run predeploy

## Deploy storybook via GitHub Pages:
npm run deploy-storybook
```
