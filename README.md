# GenAI Embeddings Similarity Search

A Node.js application demonstrating semantic similarity search using OpenAI embeddings and cosine similarity. This project shows how to convert text documents into vector embeddings and perform similarity searches to find the most relevant content based on semantic meaning.

## Features

- 🔍 **Semantic Search**: Find documents based on meaning, not just keywords
- 📊 **Vector Embeddings**: Convert text to high-dimensional vectors using OpenAI
- 🎯 **Cosine Similarity**: Calculate similarity between query and documents
- 💾 **Vector Storage**: Store and retrieve embeddings from JSON files
- 🚀 **Simple API**: Easy-to-use scripts for embedding and searching

## Project Structure

```
genai_embddings_similarity_search/
├── embed.js          # Generate embeddings for documents
├── search.js         # Perform similarity search on queries
├── similarity.js     # Cosine similarity calculation
├── data.js           # Sample documents to embed
├── vectors.json      # Generated vector store (after running embed.js)
├── package.json      # Dependencies and project config
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd genai_embddings_similarity_search
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Step 1: Generate Embeddings

First, generate embeddings for your documents:

```bash
node embed.js
```

This will:
- Read documents from `data.js`
- Generate embeddings using OpenAI's `text-embedding-3-small` model
- Save the embeddings to `vectors.json`

### Step 2: Perform Similarity Search

Search for similar documents using a query:

```bash
node search.js "How long do I have to request a refund?"
```

Or try other queries:
```bash
node search.js "When is support available?"
node search.js "How fast is shipping?"
```

The search will:
- Embed your query
- Compare it against all document embeddings
- Return the most similar documents ranked by similarity score

## How It Works

### 1. Embedding Generation (`embed.js`)

- Reads documents from `data.js`
- Converts each document's text into a vector embedding using OpenAI's API
- Stores embeddings along with document metadata in `vectors.json`

### 2. Similarity Search (`search.js`)

- Takes a query string as input
- Converts the query to an embedding vector
- Calculates cosine similarity between the query and all document embeddings
- Returns the top matches sorted by similarity score

### 3. Cosine Similarity (`similarity.js`)

- Implements the cosine similarity algorithm
- Measures the angle between two vectors
- Returns a score between -1 and 1 (higher = more similar)

## Example Output

```
Query:
How long do I have to request a refund?

Best match:
Score: 0.8234
Text:  We offer a 30-day refund policy on all purchases.
Metadata: { type: 'policy', topic: 'refunds' }

Top 3 results:
- (0.8234) We offer a 30-day refund policy on all purchases.
- (0.1234) Our support team is available 24/7 via email and live chat.
- (0.0567) Shipping usually takes 3-5 business days within the country.
```

## Customization

### Adding Your Own Documents

Edit `data.js` to add your documents:

```javascript
export const documents = [
  {
    id: 1,
    text: "Your document text here",
    metadata: { type: "category", topic: "subject" },
  },
  // Add more documents...
];
```

### Adjusting Embedding Dimensions

In `embed.js`, you can adjust the embedding dimensions:

```javascript
const res = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: doc.text,
  dimensions: 1536, // Change this value (256, 512, 768, 1024, 1536, 2048, etc.)
});
```

### Using Different Models

You can switch to other OpenAI embedding models:

```javascript
const model = "text-embedding-3-large"; // or "text-embedding-ada-002"
```

## Dependencies

- **openai**: OpenAI API client for generating embeddings
- **dotenv**: Environment variable management
- **cross-fetch**: Fetch API polyfill for Node.js
- **formdata-polyfill**: FormData polyfill for Node.js

## Documentation

- [Similarity Search Guide](./similarity-search.md) - Detailed explanation of similarity search concepts
- [Embeddings Guide](./embeddings.md) - Comprehensive guide to embeddings and how they work

## Use Cases

- **Document Search**: Find relevant documents in a knowledge base
- **FAQ Systems**: Match user questions to existing answers
- **Content Recommendation**: Suggest similar articles or products
- **Question Answering**: Retrieve relevant context for Q&A systems
- **Semantic Search**: Search beyond keyword matching

## Limitations

- **Scale**: This implementation loads all vectors into memory. For large datasets, consider using a vector database.
- **Cost**: Each embedding API call incurs costs. Cache embeddings when possible.
- **Performance**: Linear search through all vectors. For production, use approximate nearest neighbor algorithms.

## Production Considerations

For production use, consider:

1. **Vector Databases**: Use Pinecone, Weaviate, Qdrant, or similar for efficient similarity search
2. **Caching**: Cache embeddings to avoid regenerating them
3. **Batch Processing**: Process multiple documents in batches
4. **Indexing**: Use approximate nearest neighbor (ANN) algorithms for faster search
5. **Error Handling**: Add robust error handling and retry logic

## License

ISC

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Resources

- [OpenAI Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [Cosine Similarity Explained](https://en.wikipedia.org/wiki/Cosine_similarity)
- [Vector Databases Guide](https://www.pinecone.io/learn/vector-database/)

