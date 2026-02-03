import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import {
  spatialTranscriptomicsData,
  therapeuticTargets,
  getOutliers,
  getOutlierTargets,
  searchTranscriptomicsData,
  getTargetsByIndication
} from '@/data/spatial-transcriptomics';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function retrieveRelevantContext(query: string): string {
  const lowerQuery = query.toLowerCase();
  let context = '';

  // Check for outlier-related queries
  if (lowerQuery.includes('outlier') || lowerQuery.includes('unexpected') || lowerQuery.includes('anomal')) {
    const outlierRecords = getOutliers();
    const outlierTargets = getOutlierTargets();

    context += '## Outlier Records from Spatial Transcriptomics Data:\n\n';
    outlierRecords.forEach(record => {
      context += `- **${record.gene}** in ${record.mouseModel} (${record.tissue}, ${record.spatialRegion})\n`;
      context += `  - Expression: ${record.normalizedExpression} (normalized)\n`;
      context += `  - Date: ${record.date}\n`;
      context += `  - Notes: ${record.notes}\n\n`;
    });

    context += '\n## Therapeutic Targets with Outlier Findings:\n\n';
    outlierTargets.forEach(target => {
      context += `- **${target.geneName}** (${target.pathway})\n`;
      context += `  - Indication: ${target.diseaseIndication}\n`;
      context += `  - Validation Score: ${target.validationScore}\n`;
      context += `  - Summary: ${target.summary}\n\n`;
    });
  }

  // Check for specific mouse model queries
  const mouseModels = ['app/ps1', 'c57bl', 'balb', 'nod-scid', 'pdx1', 'kras'];
  const matchedModel = mouseModels.find(model => lowerQuery.includes(model));
  if (matchedModel) {
    const records = searchTranscriptomicsData(matchedModel);
    context += `\n## Data for Mouse Model matching "${matchedModel}":\n\n`;
    records.forEach(record => {
      context += `- ${record.date}: ${record.gene} in ${record.tissue} (${record.spatialRegion})\n`;
      context += `  - Expression: ${record.normalizedExpression}, Status: ${record.targetValidationStatus}\n`;
      context += `  - Notes: ${record.notes}\n\n`;
    });
  }

  // Check for disease-specific queries
  const diseases = ['alzheimer', 'breast cancer', 'her2', 'pancreatic', 'pdac', 'myeloma'];
  const matchedDisease = diseases.find(disease => lowerQuery.includes(disease));
  if (matchedDisease) {
    const targets = getTargetsByIndication(matchedDisease);
    context += `\n## Therapeutic Targets for ${matchedDisease}:\n\n`;
    targets.forEach(target => {
      context += `- **${target.geneName}**: ${target.summary}\n`;
      context += `  - Validation Score: ${target.validationScore}, Confidence: ${target.confidenceLevel}\n\n`;
    });
  }

  // Check for target validation queries
  if (lowerQuery.includes('target') || lowerQuery.includes('validation') || lowerQuery.includes('therapeutic')) {
    context += '\n## All Therapeutic Targets Summary:\n\n';
    therapeuticTargets.forEach(target => {
      context += `- **${target.geneName}** (${target.diseaseIndication})\n`;
      context += `  - Pathway: ${target.pathway}\n`;
      context += `  - Validation: ${target.validationScore} | Confidence: ${target.confidenceLevel}\n`;
      context += `  - Outlier: ${target.outlierFlag ? 'YES' : 'No'}\n`;
      context += `  - ${target.summary}\n\n`;
    });
  }

  // Check for spatial queries
  if (lowerQuery.includes('spatial') || lowerQuery.includes('region') || lowerQuery.includes('tissue')) {
    context += '\n## Spatial Distribution Summary:\n\n';
    const tissueGroups: Record<string, typeof spatialTranscriptomicsData> = {};
    spatialTranscriptomicsData.forEach(record => {
      if (!tissueGroups[record.tissue]) {
        tissueGroups[record.tissue] = [];
      }
      tissueGroups[record.tissue].push(record);
    });

    Object.entries(tissueGroups).forEach(([tissue, records]) => {
      context += `### ${tissue}:\n`;
      records.forEach(record => {
        context += `- ${record.gene} @ ${record.spatialRegion}: ${record.normalizedExpression} (${record.targetValidationStatus})\n`;
      });
      context += '\n';
    });
  }

  // If no specific context matched, return general overview
  if (!context) {
    context = '## Research Data Overview (Last 6 Months):\n\n';
    context += `Total experiments: ${spatialTranscriptomicsData.length}\n`;
    context += `Active therapeutic targets: ${therapeuticTargets.length}\n`;
    context += `Outlier findings: ${getOutliers().length}\n\n`;

    context += '### Recent Findings:\n';
    spatialTranscriptomicsData.slice(-5).forEach(record => {
      context += `- ${record.date}: ${record.gene} in ${record.mouseModel} - ${record.notes}\n`;
    });

    context += '\n### High-Priority Targets:\n';
    therapeuticTargets.filter(t => t.therapeuticRelevance === 'high' || t.validationScore > 0.8).forEach(target => {
      context += `- ${target.geneName}: ${target.summary.substring(0, 100)}...\n`;
    });
  }

  return context;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Retrieve relevant context from our "database"
    const retrievedContext = retrieveRelevantContext(query);

    const systemPrompt = `You are a biology-aware AI assistant specialized in analyzing spatial transcriptomics data and supporting therapeutic target discovery at Genentech's Research and Early Development division.

Your role is to help scientists interpret In Vivo workflow data, identify outliers in target validation, and provide actionable insights for drug discovery decisions.

You have access to the following research data context:

${retrievedContext}

When answering questions:
1. Always reference specific data points from the context when available
2. Highlight any OUTLIER findings as they may represent novel therapeutic opportunities
3. Provide confidence levels when making interpretations
4. Connect findings to potential therapeutic implications
5. Be scientifically precise but accessible
6. If data is insufficient, clearly state limitations

Remember: You are supporting REAL drug discovery decisions. Accuracy and scientific rigor are paramount.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const answer = completion.choices[0]?.message?.content || 'Unable to generate response';

    // Extract relevant data for display
    const relevantRecords = spatialTranscriptomicsData.filter(record => {
      const lowerQuery = query.toLowerCase();
      return record.gene.toLowerCase().includes(lowerQuery) ||
        record.mouseModel.toLowerCase().includes(lowerQuery) ||
        record.notes.toLowerCase().includes(lowerQuery) ||
        (lowerQuery.includes('outlier') && record.targetValidationStatus === 'outlier');
    });

    return NextResponse.json({
      answer,
      retrievedContext: retrievedContext.substring(0, 500) + '...',
      relevantRecords: relevantRecords.slice(0, 5),
      metadata: {
        totalRecordsSearched: spatialTranscriptomicsData.length,
        targetsAnalyzed: therapeuticTargets.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Query error:', error);
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
}
