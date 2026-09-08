# testing-playwright-langchain-agents

This is a repo to test the playwright integration of creating regression tests
of live urls.

Regression specs are authored by the NexAI SDET agent from a live-URL request
and delivered here as a branch, commit, and pull request. They land under
[`tests/regression/`](tests/regression/) and run automatically in CI on every
push and pull request against `main`.

## Running locally

```bash
npm ci
npx playwright install --with-deps
npm test               # everything
npm run test:regression  # regression specs only
npm run test:report    # open the last HTML report
```
