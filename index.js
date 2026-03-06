require("./instrument");

const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage } = require("@langchain/core/messages");
const OpenAI = require("openai");
const Sentry = require("@sentry/node");

async function main() {
  // 1. LangChain call (uses OpenAI under the hood)
  const langchainModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const response = await langchainModel.invoke([
    new HumanMessage("Say hello in one word"),
  ]);
  console.log("LangChain response:", response.content);

  // 2. Direct OpenAI SDK call
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Say goodbye in one word" }],
  });
  console.log("OpenAI response:", completion.choices[0].message.content);

  // Flush to ensure spans are sent
  await Sentry.flush(5000);
}

main().catch(console.error);
