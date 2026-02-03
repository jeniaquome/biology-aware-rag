'use client';

import { useState } from 'react';

interface TranscriptomicsRecord {
  id: string;
  date: string;
  mouseModel: string;
  tissue: string;
  gene: string;
  expressionLevel: number;
  normalizedExpression: number;
  spatialRegion: string;
  experimentId: string;
  researcher: string;
  targetValidationStatus: 'validated' | 'under_review' | 'outlier' | 'inconclusive';
  notes: string;
  therapeuticRelevance: 'high' | 'medium' | 'low';
}

interface QueryResponse {
  answer: string;
  retrievedContext: string;
  relevantRecords: TranscriptomicsRecord[];
  metadata: {
    totalRecordsSearched: number;
    targetsAnalyzed: number;
    timestamp: string;
  };
}

const exampleQueries = [
  "What are the outliers in therapeutic target validation?",
  "Show me findings from the APP/PS1 Alzheimer's model",
  "What spatial patterns exist in HER2+ breast cancer data?",
  "Summarize KRAS findings in the pancreatic cancer model",
  "Which targets have the highest validation scores?"
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (queryText?: string) => {
    const searchQuery = queryText || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      if (!response.ok) {
        throw new Error('Failed to process query');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
    handleQuery(exampleQuery);
  };

  const formatAnswer = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={i} style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>{line.replace(/\*\*/g, '')}</h4>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line.substring(2)}</li>;
      }
      if (line.trim()) {
        return <p key={i}>{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Biology-Aware RAG</h1>
        <p className="subtitle">Target Discovery Intelligence Platform</p>
        <span className="badge">Spatial Transcriptomics | In Vivo Workflows</span>
      </header>

      <section className="query-section">
        <h2>Query Your Research Data</h2>
        <div className="query-input-wrapper">
          <input
            type="text"
            className="query-input"
            placeholder="e.g., Based on our spatial transcriptomics data, what are the outliers in therapeutic target validation?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
          />
          <button
            className="query-button"
            onClick={() => handleQuery()}
            disabled={loading || !query.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        <div className="example-queries">
          {exampleQueries.map((eq, i) => (
            <button
              key={i}
              className="example-query"
              onClick={() => handleExampleClick(eq)}
            >
              {eq}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <div className="loading">
          Querying 6 months of spatial transcriptomics data...
        </div>
      )}

      {error && (
        <div className="result-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && !loading && (
        <div className="results-section">
          <div className="result-card full-width">
            <h3>AI Analysis</h3>
            <div className="answer-text">
              {formatAnswer(result.answer)}
            </div>
            <div className="metadata-bar">
              <span>Records searched: {result.metadata.totalRecordsSearched}</span>
              <span>Targets analyzed: {result.metadata.targetsAnalyzed}</span>
              <span>Query time: {new Date(result.metadata.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>

          {result.relevantRecords.length > 0 && (
            <div className="result-card">
              <h3>Relevant Data Points</h3>
              <div className="records-list">
                {result.relevantRecords.map((record) => (
                  <div
                    key={record.id}
                    className={`record-item ${record.targetValidationStatus === 'outlier' ? 'outlier' : ''}`}
                  >
                    <div className="gene">
                      {record.gene}
                      <span className={`status-badge ${record.targetValidationStatus}`} style={{ marginLeft: '0.5rem' }}>
                        {record.targetValidationStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="meta">
                      {record.mouseModel} | {record.tissue} ({record.spatialRegion}) | {record.date}
                    </div>
                    <div className="notes">{record.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="result-card">
            <h3>Retrieved Context</h3>
            <div className="context-preview">
              {result.retrievedContext}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
