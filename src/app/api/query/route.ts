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

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function generateDemoResponse(query: string, context: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('outlier') || lowerQuery.includes('validation')) {
    const outliers = getOutlierTargets();
    return `Based on the spatial transcriptomics data from the last six months, I've identified **${outliers.length} significant outliers** in therapeutic target validation:

**Critical Findings:**

1. **MET Amplification in PDAC Metastases** (Validation Score: 0.91)
   - Dramatic elevation in liver metastases vs primary pancreatic tumor
   - This represents an immediately actionable target for MET inhibitor therapy
   - Confidence Level: 93%

2. **PIK3CA Spatial Gradient** (Validation Score: 0.85)
   - Unexpected expression gradient at invasive tumor front in HER2+ breast cancer
   - Potential driver of treatment resistance and metastasis
   - Supports investigation of PI3K inhibitor combinations

3. **CDK4 Peripheral Enrichment** (Validation Score: 0.78)
   - Novel finding: CDK4 shows unexpected spatial enrichment at tumor periphery
   - Suggests potential combination therapy with CDK4/6 inhibitors in HER2+ setting

4. **PD-L1 "Cold" Phenotype** (Validation Score: 0.45)
   - Unexpectedly LOW PD-L1 despite high tumor burden
   - Indicates immune-cold phenotype - checkpoint inhibitors unlikely to benefit this subgroup
   - Critical for patient stratification

**Recommendation:** The MET amplification finding in PDAC liver metastases warrants immediate follow-up given its high validation score and clear therapeutic implications.`;
  }

  if (lowerQuery.includes('alzheimer') || lowerQuery.includes('app/ps1') || lowerQuery.includes('trem2')) {
    return `**Alzheimer's Disease Model (APP/PS1) Analysis:**

Based on our spatial transcriptomics data, key findings from the C57BL/6-APP/PS1 model include:

**Validated Targets:**
- **TREM2** (CA1 hippocampus): Normalized expression 3.2 - Elevated microglial activation consistent with AD pathology. Validation Score: 0.92
- **APOE** (Dentate Gyrus): Normalized expression 4.8 - Strong correlation with amyloid deposition regions
- **BACE1** (CA3): Normalized expression 3.9 - Beta-secretase levels consistent with AD pathology

**Outlier Finding:**
- **MAPT** (Cortex Layer V): Expression 0.8 (UNEXPECTEDLY LOW)
  - Tau expression significantly below expected levels
  - Requires sample verification or may indicate model-specific limitation
  - Validation Score: 0.34

**Therapeutic Implications:**
TREM2 agonism shows consistent therapeutic potential across our AD studies with strong spatial correlation to amyloid plaques (Confidence: 95%). This aligns with ongoing clinical programs.`;
  }

  if (lowerQuery.includes('her2') || lowerQuery.includes('breast') || lowerQuery.includes('balb')) {
    return `**HER2+ Breast Cancer Model (BALB/c-HER2) Analysis:**

**Spatial Transcriptomics Findings:**

1. **ERBB2 (Tumor Core)**: Expression 7.1 - Expected overexpression confirmed
   - Status: Validated

2. **CDK4 (Tumor Periphery)**: Expression 5.9 - OUTLIER
   - Unexpected spatial enrichment at tumor boundary
   - Potential novel therapeutic angle for CDK4/6 inhibitor combinations

3. **PIK3CA (Invasive Front)**: Expression 7.8 - OUTLIER
   - Gradient pattern suggests role in invasion/metastasis
   - Potential resistance mechanism to HER2-targeted therapy

4. **PD-L1 (Lymph Node)**: Expression 2.8 - NEGATIVE OUTLIER
   - Surprisingly low despite tumor burden
   - Suggests "immune cold" phenotype
   - Checkpoint inhibitors may not benefit this subgroup

**Recommendation:** The CDK4 and PIK3CA spatial patterns suggest combination strategies beyond standard HER2-targeted therapy may be needed for optimal efficacy.`;
  }

  if (lowerQuery.includes('kras') || lowerQuery.includes('pancrea') || lowerQuery.includes('pdac')) {
    return `**Pancreatic Cancer Model (Pdx1-Cre-LSL-KrasG12D) Analysis:**

**Key Findings:**

1. **KRAS (Ductal Epithelium)**: Expression 6.7
   - Expected oncogenic activation confirmed
   - Status: Validated

2. **TP53 (Acinar Cells)**: Expression 0.3
   - Expected loss of function pattern
   - Status: Validated

3. **MET (Liver Metastatic Foci)**: Expression 8.9 - CRITICAL OUTLIER
   - Dramatic amplification in liver metastases
   - Significantly higher than primary tumor levels
   - **Immediately actionable target for MET inhibitor therapy**
   - Validation Score: 0.91 | Confidence: 93%

**Therapeutic Implications:**
The MET amplification finding represents a critical discovery. Patients with PDAC liver metastases may benefit from MET inhibitor therapy, warranting immediate clinical investigation.`;
  }

  if (lowerQuery.includes('score') || lowerQuery.includes('highest') || lowerQuery.includes('best')) {
    return `**Therapeutic Targets Ranked by Validation Score:**

| Rank | Target | Indication | Score | Confidence | Outlier |
|------|--------|-----------|-------|------------|---------|
| 1 | TREM2 | Alzheimer's | 0.92 | 95% | No |
| 2 | MET | PDAC Metastasis | 0.91 | 93% | Yes |
| 3 | PIK3CA | HER2+ Breast | 0.85 | 88% | Yes |
| 4 | CDK4 | HER2+ Breast | 0.78 | 82% | Yes |
| 5 | PD-L1 | HER2+ Breast | 0.45 | 72% | Yes |
| 6 | MAPT | Alzheimer's | 0.34 | 65% | Yes |

**Analysis:**
- **TREM2** leads with the highest validation score (0.92) and confidence (95%) for Alzheimer's disease
- **MET** shows exceptional validation (0.91) as an outlier finding in pancreatic cancer metastases
- Four of the top six targets are flagged as outliers, indicating novel therapeutic opportunities
- Lower-scoring targets (PD-L1, MAPT) provide important negative signals for patient stratification`;
  }

  // Default response
  return `Based on analysis of our spatial transcriptomics data from the last six months:

**Data Summary:**
- Total experiments analyzed: 14
- Mouse models covered: 4 (APP/PS1, BALB/c-HER2, Pdx1-Cre-KrasG12D, NOD-SCID)
- Therapeutic targets tracked: 6
- Outlier findings: 5

**Key Insights from Your Query:**
${context.substring(0, 800)}

**Recommendation:**
For more specific insights, try queries like:
- "What are the outliers in therapeutic target validation?"
- "Show me findings from the APP/PS1 Alzheimer's model"
- "Which targets have the highest validation scores?"`;
}

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

    let answer: string;

    if (openai) {
      // Use OpenAI for production-quality responses
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

      answer = completion.choices[0]?.message?.content || 'Unable to generate response';
    } else {
      // Demo mode - generate meaningful responses without API
      answer = generateDemoResponse(query, retrievedContext);
    }

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
