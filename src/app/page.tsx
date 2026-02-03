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

// Helix Logo SVG Component
function HelixLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#134E4A" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="helixGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* DNA Helix strands */}
      <path
        d="M12 8C12 8 18 14 24 14C30 14 36 8 36 8"
        stroke="url(#helixGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 18C12 18 18 24 24 24C30 24 36 18 36 18"
        stroke="url(#helixGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 28C12 28 18 34 24 34C30 34 36 28 36 28"
        stroke="url(#helixGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 38C12 38 18 44 24 44C30 44 36 38 36 38"
        stroke="url(#helixGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Connecting rungs */}
      <line x1="18" y1="11" x2="30" y2="11" stroke="url(#helixGradient2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="21" x2="30" y2="21" stroke="url(#helixGradient2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="31" x2="30" y2="31" stroke="url(#helixGradient2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="41" x2="30" y2="41" stroke="url(#helixGradient2)" strokeWidth="2" strokeLinecap="round" />
      {/* Dots at intersections */}
      <circle cx="24" cy="14" r="3" fill="#0D9488" />
      <circle cx="24" cy="24" r="3" fill="#7C3AED" />
      <circle cx="24" cy="34" r="3" fill="#0D9488" />
    </svg>
  );
}

// Search Icon
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

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
        return <h4 key={i}>{line.replace(/\*\*/g, '')}</h4>;
      }
      if (line.startsWith('- ')) {
        return <li key={i}>{line.substring(2)}</li>;
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
        <div className="logo">
          <div className="logo-icon">
            <HelixLogo />
          </div>
        </div>
        <h1>Helix</h1>
        <p className="subtitle">Biology-Aware Target Discovery</p>
        <span className="badge">
          <span className="badge-dot"></span>
          Spatial Transcriptomics | In Vivo Workflows
        </span>
      </header>

      <section className="query-section">
        <h2>Query Your Research Data</h2>
        <div className="query-input-wrapper">
          <input
            type="text"
            className="query-input"
            placeholder="Ask about spatial transcriptomics, target validation, or outlier analysis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
          />
          <button
            className="query-button"
            onClick={() => handleQuery()}
            disabled={loading || !query.trim()}
          >
            <SearchIcon />
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
          Analyzing spatial transcriptomics data...
        </div>
      )}

      {error && (
        <div className="result-card" style={{ borderLeft: '4px solid var(--error)' }}>
          <h3>Error</h3>
          <p style={{ color: 'var(--error)' }}>{error}</p>
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
              <span>Records: {result.metadata.totalRecordsSearched}</span>
              <span>Targets: {result.metadata.targetsAnalyzed}</span>
              <span>{new Date(result.metadata.timestamp).toLocaleTimeString()}</span>
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
                      <span className={`status-badge ${record.targetValidationStatus}`}>
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
