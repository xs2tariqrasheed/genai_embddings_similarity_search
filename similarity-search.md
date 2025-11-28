# Similarity Search

## Overview

Similarity search is a technique used to find documents, items, or data points that are most similar to a given query. In the context of this codebase, similarity search uses **vector embeddings** and **cosine similarity** to find the most relevant documents based on semantic meaning rather than exact keyword matching.

## How It Works

### 1. Vector Embeddings

First, text documents are converted into high-dimensional vectors (embeddings) that capture semantic meaning. Similar texts will have similar vector representations, even if they don't share exact words.

### 2. Query Embedding

When a user submits a query, it is also converted into an embedding vector using the same embedding model.

### 3. Similarity Calculation

The similarity between the query embedding and each document embedding is calculated using **cosine similarity**.

### 4. Ranking

Documents are ranked by their similarity scores, with the highest scores indicating the most relevant matches.

## Cosine Similarity

Cosine similarity measures the cosine of the angle between two vectors in a multi-dimensional space. It ranges from -1 to 1:

- **1.0**: Vectors point in the same direction (identical)
- **0.0**: Vectors are orthogonal (unrelated)
- **-1.0**: Vectors point in opposite directions (opposite meaning)

### Formula

```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Where:
- `A · B` is the dot product of vectors A and B
- `||A||` and `||B||` are the magnitudes (norms) of vectors A and B

### Implementation

In this codebase, cosine similarity is implemented in `similarity.js`:

```javascript
export function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must be same length");
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

## Why Cosine Similarity?

1. **Scale Invariant**: Cosine similarity focuses on the direction of vectors, not their magnitude, making it robust to different document lengths.

2. **Semantic Understanding**: It captures semantic relationships between texts, allowing for finding conceptually similar content even with different wording.

3. **Efficient**: The calculation is straightforward and computationally efficient for high-dimensional vectors.

4. **Normalized**: The output is normalized between -1 and 1, making it easy to interpret and compare.

## Usage in This Codebase

The similarity search workflow in `search.js`:

1. **Embed the query** using OpenAI's embedding API
2. **Load the vector store** from `vectors.json`
3. **Compute similarity** between the query embedding and each document embedding
4. **Sort results** by similarity score (descending)
5. **Return top matches** with their scores and metadata

### Example

```bash
node search.js "How long do I have to request a refund?"
```

This will:
- Convert the query to an embedding
- Compare it against all document embeddings
- Return the most similar document (likely the one about the 30-day refund policy)

## Advantages of Similarity Search

1. **Semantic Understanding**: Finds relevant content based on meaning, not just keywords
2. **Language Flexibility**: Can match queries with different wording than the documents
3. **Context Awareness**: Understands relationships between concepts
4. **Scalable**: Can be optimized with vector databases for large-scale applications

## Limitations

1. **Computational Cost**: Requires computing similarity against all vectors (can be optimized with approximate nearest neighbor algorithms)
2. **Embedding Quality**: Results depend on the quality of the embedding model
3. **No Exact Matching**: May not find exact keyword matches if semantic similarity is low
4. **Storage**: Requires storing embeddings for all documents

## Optimizations

For production use, consider:

- **Vector Databases**: Use specialized databases like Pinecone, Weaviate, or Qdrant for efficient similarity search
- **Approximate Nearest Neighbor (ANN)**: Algorithms like HNSW or IVF for faster search in large datasets
- **Indexing**: Pre-compute and index embeddings for faster retrieval
- **Batch Processing**: Process multiple queries simultaneously

