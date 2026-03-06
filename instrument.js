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
    console.log("Op:", event.contexts?.trace?.op);
    console.log("Data:", JSON.stringify(event.contexts?.trace?.data, null, 2));
    console.log("Spans:");
    for (const span of event.spans || []) {
      console.log(
        `  [${span.op}] ${span.description} (${span.status || "ok"})`,
      );
      if (span.data) console.log("    data:", JSON.stringify(span.data, null, 2));
    }
    console.log("=================================\n");
    // Send the event to Sentry
    return event;
  },
});
