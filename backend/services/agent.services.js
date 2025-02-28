const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
const chatModel = require("../models/chat.model");
const { registerMsg, getCurrentDateTime } = require("./messages.services");
const timestamp = new Date().toISOString();
// Optimized JSON extraction
function extractJSON(text) {
  if (typeof text !== "string") return null;
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match && match[1] ? JSON.parse(match[1]) || null : null;
}

// Basic Gemini query function
async function querySomethingToGemini({ text, chatId, user }) {
  if (!text || typeof text !== "string") {
    return { error: "Please provide a valid text string" };
  }

  const response = await gemini.generateContent({
    contents: [{ parts: [{ text }] }],
  });

  const result = response?.response?.text();
  if (!result) {
    console.error("Invalid Gemini API response:", response);
    return { error: "Invalid response from Gemini API" };
  }

  const chatIdFinal = chatId || (await chatModel.create({ user }))._id;


  return {
    user,
    type: "ai",
    chatId: chatIdFinal,
    createAt: timestamp,
    updatedAt: timestamp,
    msg: result,
  };
}

// Tool registry (fixed registerMsg to be a function reference)
const Tools = {
  getTodaysPlans: (args) => `Today's plans: ${args?.date || "today"}`,
  registerMsg, // Keep as reference to the imported function
  getCurrentDateTime,
  querySomethingToGemini
  // Add more tools as needed
};

// Agent function with dynamic tool execution
async function querySomethingToGemini_AGENT({ text, chatId, user, image }) {
  if (!text || typeof text !== "string") {
    return { error: "Please provide a valid text string" };
  }

  const chatIdFinal = chatId || (await chatModel.create({ user }))._id;
  const prompt = `
    You are an AI Assistant. Analyze the user’s input and return a JSON response with a plan to execute an action using available tools if needed.

    **User Input:** "${text.trim()}"

    user : ${user}
    chatId : ${chatIdFinal}
    currenttime : ${new Date().toISOString()},
    image : ${image}

    **Instructions:**
    1. Analyze the intent of the user’s input.
    2. Decide if a tool is required. Available tools:
       - **getTodaysPlans({ date })**: Fetches plans for a given date (JS date string, e.g., "2025-02-26"). Use if asking about plans.
       - **registerMsg({ user, msg, image, remindTime, chatId })**: Registers a reminder. Requires:
         - user: User ID (string, use "${user}" if not specified).
         - msg: Reminder message (string, extract from input).
         - image: Image URL (string, optional, null if not provided).
         - remindTime: JS date string (e.g., "2025-02-26T12:00:00Z"), infer from input or set to null if unclear.
         - chatId: Chat ID (string, use "${chatIdFinal}").
       - **getCurrentDateTime()**: Returns current date/time (no args needed).
       - **querySomethingToGemini({ text, chatId, user })**: Queries Gemini API with text input and returns the response.
    3. If a tool is needed, specify it in the JSON under "function" with its name and populate "args" with the required parameters.
    4. Return a valid JSON object: { type: "ai", function: { [toolName]: null }, args: {}, msg: "response" }.

    **Rules:**
    - If no tool is needed, set "function" to {} and provide a direct "msg".
    - If the request is unclear, set "msg" to "Please clarify your request".
    - Ensure "args" matches the tool’s required parameters.

    **instruction:**
    - when your setting reminder then make sure that you generate a msg which is a reminder message.
    - when your setting reminder then make sure that you generate a remindTime which is a JS date string.
    - when your setting reminder then make sure that you generate a user which is a user ID.
    - when your setting reminder then make sure that you generate a chatId which is a chat ID.
    - when your setting reminder then make sure that you predicts the remindTime from the input use currenttime for reference.

    **Examples:**
    - Input: "What’s my plan for today?"
      Response: json
      '{ "type": "ai", "function": { "getTodaysPlans": null }, "args": { "date": "2025-02-26" }, "msg": "Fetching today’s plans" }'
  `;

  const response = await gemini.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
  });
  const result = response?.response?.text();
  if (!result) {
    console.error("Invalid Gemini API response:", response);
    return { error: "Invalid response from Gemini API" };
  }

  console.log(result)

  const jsonResult = extractJSON(result);
  if (!jsonResult || !jsonResult.function) {
    console.error("No valid JSON or function in response:", result);
    return {
      type: "ai",
      chatId: chatIdFinal,
      msg: result, // Fallback to raw text
    };
  }

  const functionName = Object.keys(jsonResult.function)[0];
  if (!functionName) {
    return {
      type: "ai",
      chatId: chatIdFinal,
      user,
      createAt: timestamp,
      updatedAt: timestamp,
      msg: jsonResult.msg || "Please clarify your request",
    };
  }



  const fn = Tools[functionName];
  const args = jsonResult.args || {};

  console.log(`Executing tool: ${functionName} with args:`, args);

  if (fn) {
    const toolResult = await Promise.resolve(fn(args)); // Ensure async compatibility
    jsonResult.msg = toolResult || jsonResult.msg;
    return { type: "ai", ...toolResult }; // Use tool result or keep original msg
  } else {
    console.warn(`Tool ${functionName} not found`);
    jsonResult.msg = "Tool not available; here’s the raw response: " + jsonResult.msg;
  }

  return null;
}

// Exports
module.exports = {
  querySomethingToGemini,
  querySomethingToGemini_AGENT,
};