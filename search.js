// search.js
import "cross-fetch/dist/node-polyfill.js";
import { FormData } from "formdata-polyfill/esm.min.js";
import OpenAI from "openai";
import "dotenv/config.js";
import { readFileSync } from "fs";
import { cosineSimilarity } from "./similarity.js";

// Polyfill FormData globally
globalThis.FormData = FormData;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const query = process.argv.slice(2).join(" ");
  if (!query) {
    console.error('Usage: node search.js "your question here"');
    process.exit(1);
  }

  const model = "text-embedding-3-small";

  // 1) Embed the query
  const res = await client.embeddings.create({
    model,
    input: query,
  });

  const queryEmbedding = res.data[0].embedding;

  // 2) Load vector store
  const vectorStore = JSON.parse(readFileSync("vectors.json", "utf8"));

  // 3) Compute similarity
  const scored = vectorStore.map((item) => {
    const score = cosineSimilarity(queryEmbedding, item.embedding);
    return { ...item, score };
  });

  // 4) Sort by similarity descending
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  console.log("\nQuery:");
  console.log(query);

  console.log("\nBest match:");
  console.log(`Score: ${best.score.toFixed(4)}`);
  console.log(`Text:  ${best.text}`);
  console.log("Metadata:", best.metadata);

  // Optional: show top 3
  console.log("\nTop 3 results:");
  for (const item of scored.slice(0, 3)) {
    console.log(`- (${item.score.toFixed(4)}) ${item.text}`);
  }
}

main().catch(console.error);


// try
// node search.js "How long do I have to request a refund?"
// node search.js "When is support available?"
// node search.js "How fast is shipping?"
