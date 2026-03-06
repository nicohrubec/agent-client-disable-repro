require("dotenv").config();
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  debug: true,

  beforeSendTransaction(event) {
    console.log("\n========== Transaction ==========");
    console.log("Transaction:", event.transaction);
    console.log("Spans:");
    for (const span of event.spans || []) {
      console.log(
        `  [${span.op}] ${span.description} (${span.status || "ok"})`,
      );
    }
    console.log("=================================\n");
    // Send the event to Sentry
    return event;
  },
});
