# Embeddings

## What Are Embeddings?

Embeddings are numerical representations of text (or other data) as high-dimensional vectors. They capture semantic meaning and relationships between words, phrases, or documents in a way that computers can process and compare.

## Key Concepts

### Vector Representation

Text is converted into a fixed-size array of numbers (a vector). For example:
- A 1536-dimensional vector for each piece of text
- Similar texts produce similar vectors
- The position in the vector space represents semantic meaning

### Semantic Understanding

Unlike traditional keyword-based approaches, embeddings capture:
- **Meaning**: Words with similar meanings are close in vector space
- **Context**: The same word in different contexts has different embeddings
- **Relationships**: Related concepts are positioned near each other

## How Embeddings Work

### 1. Training

Embedding models are trained on large text corpora to learn:
- Word relationships
- Contextual meanings
- Semantic similarities

### 2. Encoding

When you encode text:
- The model processes the input text
- Produces a dense vector representation
- Each dimension captures some aspect of meaning

### 3. Comparison

Vectors can be compared using:
- **Cosine similarity**: Measures angle between vectors
- **Euclidean distance**: Measures straight-line distance
- **Dot product**: Measures alignment

## OpenAI Embeddings

This codebase uses OpenAI's `text-embedding-3-small` model, which:

- **Dimensions**: Default 1536 dimensions (configurable)
- **Cost**: Efficient and cost-effective for most use cases
- **Quality**: Optimized for search and similarity tasks
- **API**: Simple REST API for generating embeddings

### Model Configuration

```javascript
const res = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: doc.text,
  dimensions: 1536, // Optional: adjust dimensions
});
```

### Dimension Options

You can adjust the number of dimensions:
- **Lower dimensions** (256, 512, 768): Less storage/memory, potentially slightly lower accuracy
- **Standard dimensions** (1536): Good balance of accuracy and efficiency
- **Higher dimensions** (2048+): More storage/memory, potentially better accuracy

## Embedding Process in This Codebase

### Step 1: Prepare Documents

Documents are defined in `data.js` with:
- Unique ID
- Text content
- Metadata (optional)

### Step 2: Generate Embeddings

The `embed.js` script:
1. Iterates through each document
2. Calls OpenAI's embedding API
3. Stores the embedding vector with the document
4. Saves everything to `vectors.json`

### Step 3: Store Vectors

The vector store contains:
```json
{
  "id": 1,
  "text": "Document text...",
  "metadata": { "type": "policy", "topic": "refunds" },
  "embedding": [0.123, -0.456, 0.789, ...]
}
```

## Use Cases

### 1. Semantic Search

Find documents based on meaning, not keywords:
- Query: "How do I get my money back?"
- Matches: Documents about refunds, returns, cancellations

### 2. Recommendation Systems

Suggest similar items based on embeddings:
- Product recommendations
- Content recommendations
- User matching

### 3. Clustering

Group similar documents together:
- Organize content by topic
- Identify duplicate content
- Discover patterns

### 4. Classification

Classify documents based on embeddings:
- Sentiment analysis
- Topic categorization
- Spam detection

## Best Practices

### 1. Batch Processing

OpenAI supports batch requests (up to 2048 inputs per request):
```javascript
// Process multiple documents at once
const res = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: documents.map(doc => doc.text), // Array of texts
});
```

### 2. Consistent Models

Always use the same embedding model for:
- Creating embeddings
- Querying embeddings
- Comparing embeddings

### 3. Preprocessing

Consider preprocessing text:
- Normalize whitespace
- Handle special characters
- Truncate very long texts (models have token limits)

### 4. Caching

Cache embeddings to avoid regenerating:
- Store in a database or file
- Only regenerate when content changes
- Reduces API costs and latency

## Cost Optimization

### 1. Dimension Reduction

Use fewer dimensions when possible:
- Test accuracy with different dimension counts
- Lower dimensions = lower storage and API costs

### 2. Batch Requests

Combine multiple texts in one API call:
- Up to 2048 inputs per request
- More efficient than individual calls

### 3. Caching Strategy

- Cache embeddings for static content
- Only regenerate for new or updated documents
- Store in efficient formats (JSON, binary)

## Limitations

1. **Model Dependency**: Quality depends on the embedding model used
2. **Context Window**: Limited by model's maximum token length
3. **Language**: Performance varies by language (best for English)
4. **Domain**: May need fine-tuning for specialized domains
5. **Cost**: API calls incur costs (though embeddings are relatively cheap)

## Alternative Embedding Models

While this codebase uses OpenAI, other options include:

- **Open-source models**: Sentence-BERT, Universal Sentence Encoder
- **Cloud services**: Google Cloud AI, AWS Bedrock
- **Self-hosted**: Deploy models locally for privacy/control

## Further Reading

- [OpenAI Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [Vector Databases Guide](https://www.pinecone.io/learn/vector-database/)
- [Semantic Search Tutorials](https://www.sbert.net/examples/applications/semantic-search/README.html)

