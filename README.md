# agent-client-disable-repro

Reproduces how LangChain's `_INTERNAL_skipAiProviderWrapping` globally disables OpenAI client-level instrumentation, even for direct OpenAI SDK calls unrelated to LangChain.

## Setup

```bash
yarn install
```

Add a `.env` file:

```
SENTRY_DSN=your-sentry-dsn
OPENAI_API_KEY=your-openai-api-key
```

## Run

```bash
yarn start
```
