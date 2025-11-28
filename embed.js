// embed.js
import "cross-fetch/dist/node-polyfill.js";
import { FormData } from "formdata-polyfill/esm.min.js";
import OpenAI from "openai";
import "dotenv/config.js";
import { writeFileSync } from "fs";
import { documents } from "./data.js";

// Polyfill FormData globally
globalThis.FormData = FormData;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const model = "text-embedding-3-small"; // cheap + good for search :contentReference[oaicite:2]{index=2}

  const vectorStore = [];

  for (const doc of documents) {

    // use batch embeddings for cost optimization
    //Batch requests: Pass multiple inputs in one call (up to 2048 inputs per request).
    const res = await client.embeddings.create({
      model,
      input: doc.text,
      dimensions: 1536, // Optional: adjust dimensions (default: 1536 for small, 3072 for large)
      // Common values: 256, 512, 768, 1024, 1536, 2048, etc.
      // Lower dimensions = less storage/memory, potentially slightly lower accuracy
      // Higher dimensions = more storage/memory, potentially better accuracy
    });

    const embedding = res.data[0].embedding;
    vectorStore.push({
      id: doc.id,
      text: doc.text,
      metadata: doc.metadata,
      embedding,
    });

    console.log(`Embedded doc ${doc.id}`);
  }

  writeFileSync("vectors.json", JSON.stringify(vectorStore, null, 2));
  console.log("Saved vectors to vectors.json");
}

main().catch(console.error);
