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
    console.log("Trace ID:", event.contexts?.trace?.trace_id);
    console.log("Span ID:", event.contexts?.trace?.span_id);
    console.log("Parent Span ID:", event.contexts?.trace?.parent_span_id);
    console.log("Origin:", event.contexts?.trace?.data?.["sentry.origin"]);
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
