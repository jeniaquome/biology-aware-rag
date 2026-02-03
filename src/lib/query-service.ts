// Client-side query service for GitHub Pages static deployment

export interface TranscriptomicsRecord {
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

export interface TherapeuticTarget {
  targetId: string;
  geneName: string;
  pathway: string;
  diseaseIndication: string;
  validationScore: number;
  outlierFlag: boolean;
  confidenceLevel: number;
  supportingExperiments: number;
  lastUpdated: string;
  summary: string;
}

// Mock spatial transcriptomics data
export const spatialTranscriptomicsData: TranscriptomicsRecord[] = [
  {
    id: 'ST-001',
    date: '2025-07-15',
    mouseModel: 'C57BL/6-APP/PS1',
    tissue: 'Hippocampus',
    gene: 'TREM2',
    expressionLevel: 2847,
    normalizedExpression: 3.2,
    spatialRegion: 'CA1',
    experimentId: 'EXP-2025-0142',
    researcher: 'Dr. Chen',
    targetValidationStatus: 'validated',
    notes: 'Elevated microglial activation consistent with AD model',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-002',
    date: '2025-07-22',
    mouseModel: 'C57BL/6-APP/PS1',
    tissue: 'Hippocampus',
    gene: 'APOE',
    expressionLevel: 4521,
    normalizedExpression: 4.8,
    spatialRegion: 'Dentate Gyrus',
    experimentId: 'EXP-2025-0143',
    researcher: 'Dr. Chen',
    targetValidationStatus: 'validated',
    notes: 'Strong correlation with amyloid deposition regions',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-003',
    date: '2025-08-05',
    mouseModel: 'BALB/c-HER2',
    tissue: 'Mammary Tumor',
    gene: 'ERBB2',
    expressionLevel: 8932,
    normalizedExpression: 7.1,
    spatialRegion: 'Tumor Core',
    experimentId: 'EXP-2025-0156',
    researcher: 'Dr. Patel',
    targetValidationStatus: 'validated',
    notes: 'Expected overexpression in HER2+ model',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-004',
    date: '2025-08-12',
    mouseModel: 'BALB/c-HER2',
    tissue: 'Mammary Tumor',
    gene: 'CDK4',
    expressionLevel: 6234,
    normalizedExpression: 5.9,
    spatialRegion: 'Tumor Periphery',
    experimentId: 'EXP-2025-0157',
    researcher: 'Dr. Patel',
    targetValidationStatus: 'outlier',
    notes: 'OUTLIER: Unexpectedly high expression at tumor boundary - potential novel therapeutic angle',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-005',
    date: '2025-09-03',
    mouseModel: 'NOD-SCID-IL2Rg',
    tissue: 'Spleen',
    gene: 'CD19',
    expressionLevel: 12450,
    normalizedExpression: 8.4,
    spatialRegion: 'White Pulp',
    experimentId: 'EXP-2025-0189',
    researcher: 'Dr. Kim',
    targetValidationStatus: 'validated',
    notes: 'CAR-T target validation study',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-006',
    date: '2025-09-18',
    mouseModel: 'C57BL/6-APP/PS1',
    tissue: 'Cortex',
    gene: 'MAPT',
    expressionLevel: 567,
    normalizedExpression: 0.8,
    spatialRegion: 'Layer V',
    experimentId: 'EXP-2025-0201',
    researcher: 'Dr. Chen',
    targetValidationStatus: 'outlier',
    notes: 'OUTLIER: Unexpectedly LOW tau expression in AD model - verify sample integrity',
    therapeuticRelevance: 'medium'
  },
  {
    id: 'ST-007',
    date: '2025-10-02',
    mouseModel: 'Pdx1-Cre-LSL-KrasG12D',
    tissue: 'Pancreas',
    gene: 'KRAS',
    expressionLevel: 7823,
    normalizedExpression: 6.7,
    spatialRegion: 'Ductal Epithelium',
    experimentId: 'EXP-2025-0215',
    researcher: 'Dr. Martinez',
    targetValidationStatus: 'validated',
    notes: 'PDAC model showing expected oncogenic KRAS activation',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-008',
    date: '2025-10-15',
    mouseModel: 'Pdx1-Cre-LSL-KrasG12D',
    tissue: 'Pancreas',
    gene: 'TP53',
    expressionLevel: 234,
    normalizedExpression: 0.3,
    spatialRegion: 'Acinar Cells',
    experimentId: 'EXP-2025-0216',
    researcher: 'Dr. Martinez',
    targetValidationStatus: 'validated',
    notes: 'Expected p53 loss of function',
    therapeuticRelevance: 'medium'
  },
  {
    id: 'ST-009',
    date: '2025-11-08',
    mouseModel: 'BALB/c-HER2',
    tissue: 'Mammary Tumor',
    gene: 'PIK3CA',
    expressionLevel: 9876,
    normalizedExpression: 7.8,
    spatialRegion: 'Invasive Front',
    experimentId: 'EXP-2025-0234',
    researcher: 'Dr. Patel',
    targetValidationStatus: 'outlier',
    notes: 'OUTLIER: PIK3CA shows unexpected spatial gradient - potential resistance mechanism',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-010',
    date: '2025-11-22',
    mouseModel: 'C57BL/6-APP/PS1',
    tissue: 'Hippocampus',
    gene: 'BACE1',
    expressionLevel: 3456,
    normalizedExpression: 3.9,
    spatialRegion: 'CA3',
    experimentId: 'EXP-2025-0245',
    researcher: 'Dr. Chen',
    targetValidationStatus: 'validated',
    notes: 'Beta-secretase levels consistent with AD pathology',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-011',
    date: '2025-12-05',
    mouseModel: 'NOD-SCID-IL2Rg',
    tissue: 'Bone Marrow',
    gene: 'BCMA',
    expressionLevel: 5678,
    normalizedExpression: 5.2,
    spatialRegion: 'Plasma Cell Niche',
    experimentId: 'EXP-2025-0267',
    researcher: 'Dr. Kim',
    targetValidationStatus: 'validated',
    notes: 'Multiple myeloma target validation',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-012',
    date: '2025-12-18',
    mouseModel: 'Pdx1-Cre-LSL-KrasG12D',
    tissue: 'Liver',
    gene: 'MET',
    expressionLevel: 11234,
    normalizedExpression: 8.9,
    spatialRegion: 'Metastatic Foci',
    experimentId: 'EXP-2025-0278',
    researcher: 'Dr. Martinez',
    targetValidationStatus: 'outlier',
    notes: 'OUTLIER: Dramatic MET amplification in liver metastases - actionable target',
    therapeuticRelevance: 'high'
  },
  {
    id: 'ST-013',
    date: '2026-01-08',
    mouseModel: 'C57BL/6-APP/PS1',
    tissue: 'Cortex',
    gene: 'CLU',
    expressionLevel: 4123,
    normalizedExpression: 4.5,
    spatialRegion: 'Layer II/III',
    experimentId: 'EXP-2026-0012',
    researcher: 'Dr. Chen',
    targetValidationStatus: 'under_review',
    notes: 'Clusterin elevation needs cross-validation',
    therapeuticRelevance: 'medium'
  },
  {
    id: 'ST-014',
    date: '2026-01-15',
    mouseModel: 'BALB/c-HER2',
    tissue: 'Lymph Node',
    gene: 'PD-L1',
    expressionLevel: 2345,
    normalizedExpression: 2.8,
    spatialRegion: 'Germinal Center',
    experimentId: 'EXP-2026-0023',
    researcher: 'Dr. Patel',
    targetValidationStatus: 'outlier',
    notes: 'OUTLIER: Low PD-L1 despite tumor burden - immune cold phenotype?',
    therapeuticRelevance: 'high'
  }
];

export const therapeuticTargets: TherapeuticTarget[] = [
  {
    targetId: 'TGT-001',
    geneName: 'TREM2',
    pathway: 'Microglial Activation / Neuroinflammation',
    diseaseIndication: 'Alzheimers Disease',
    validationScore: 0.92,
    outlierFlag: false,
    confidenceLevel: 0.95,
    supportingExperiments: 8,
    lastUpdated: '2026-01-20',
    summary: 'TREM2 agonism shows consistent therapeutic potential across multiple AD models with strong spatial correlation to amyloid plaques.'
  },
  {
    targetId: 'TGT-002',
    geneName: 'CDK4',
    pathway: 'Cell Cycle Regulation',
    diseaseIndication: 'HER2+ Breast Cancer',
    validationScore: 0.78,
    outlierFlag: true,
    confidenceLevel: 0.82,
    supportingExperiments: 4,
    lastUpdated: '2026-01-18',
    summary: 'OUTLIER FINDING: CDK4 shows unexpected spatial enrichment at tumor periphery, suggesting potential combination therapy with CDK4/6 inhibitors in HER2+ setting.'
  },
  {
    targetId: 'TGT-003',
    geneName: 'PIK3CA',
    pathway: 'PI3K/AKT/mTOR Signaling',
    diseaseIndication: 'HER2+ Breast Cancer',
    validationScore: 0.85,
    outlierFlag: true,
    confidenceLevel: 0.88,
    supportingExperiments: 6,
    lastUpdated: '2026-01-22',
    summary: 'OUTLIER FINDING: Spatial transcriptomics reveals PIK3CA gradient at invasive tumor front - potential driver of treatment resistance and metastasis.'
  },
  {
    targetId: 'TGT-004',
    geneName: 'MET',
    pathway: 'Receptor Tyrosine Kinase',
    diseaseIndication: 'Pancreatic Cancer Metastasis',
    validationScore: 0.91,
    outlierFlag: true,
    confidenceLevel: 0.93,
    supportingExperiments: 3,
    lastUpdated: '2026-01-25',
    summary: 'CRITICAL OUTLIER: MET amplification dramatically elevated in PDAC liver metastases vs primary tumor - immediate actionable target for MET inhibitor therapy.'
  },
  {
    targetId: 'TGT-005',
    geneName: 'PD-L1',
    pathway: 'Immune Checkpoint',
    diseaseIndication: 'HER2+ Breast Cancer',
    validationScore: 0.45,
    outlierFlag: true,
    confidenceLevel: 0.72,
    supportingExperiments: 5,
    lastUpdated: '2026-01-28',
    summary: 'NEGATIVE OUTLIER: Unexpectedly low PD-L1 despite high tumor burden suggests immune-cold phenotype - checkpoint inhibitors unlikely to benefit this subgroup.'
  },
  {
    targetId: 'TGT-006',
    geneName: 'MAPT',
    pathway: 'Tau Protein / Neurodegeneration',
    diseaseIndication: 'Alzheimers Disease',
    validationScore: 0.34,
    outlierFlag: true,
    confidenceLevel: 0.65,
    supportingExperiments: 2,
    lastUpdated: '2026-01-15',
    summary: 'OUTLIER: Unexpectedly low tau expression in APP/PS1 model cortex - requires sample verification or may indicate model-specific limitation.'
  }
];

function getOutliers(): TranscriptomicsRecord[] {
  return spatialTranscriptomicsData.filter(record =>
    record.targetValidationStatus === 'outlier'
  );
}

function getOutlierTargets(): TherapeuticTarget[] {
  return therapeuticTargets.filter(target => target.outlierFlag);
}

function generateDemoResponse(query: string): string {
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

**Key Insights:**
Our platform has identified several critical findings across oncology and neuroscience therapeutic areas. The most actionable discoveries include MET amplification in pancreatic cancer metastases and novel spatial patterns in HER2+ breast cancer.

**Recommendation:**
For more specific insights, try queries like:
- "What are the outliers in therapeutic target validation?"
- "Show me findings from the APP/PS1 Alzheimer's model"
- "Which targets have the highest validation scores?"`;
}

export interface QueryResponse {
  answer: string;
  retrievedContext: string;
  relevantRecords: TranscriptomicsRecord[];
  metadata: {
    totalRecordsSearched: number;
    targetsAnalyzed: number;
    timestamp: string;
  };
}

export function executeQuery(query: string): QueryResponse {
  const lowerQuery = query.toLowerCase();

  // Generate response
  const answer = generateDemoResponse(query);

  // Get relevant records based on query
  let relevantRecords = spatialTranscriptomicsData.filter(record => {
    if (record.gene.toLowerCase().includes(lowerQuery) ||
        record.mouseModel.toLowerCase().includes(lowerQuery) ||
        record.notes.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    if ((lowerQuery.includes('outlier') || lowerQuery.includes('validation')) &&
        record.targetValidationStatus === 'outlier') {
      return true;
    }
    if ((lowerQuery.includes('alzheimer') || lowerQuery.includes('app/ps1') ||
         lowerQuery.includes('trem2') || lowerQuery.includes(' ad ')) &&
        record.mouseModel.includes('APP/PS1')) {
      return true;
    }
    if ((lowerQuery.includes('her2') || lowerQuery.includes('breast') ||
         lowerQuery.includes('balb')) &&
        record.mouseModel.includes('HER2')) {
      return true;
    }
    if ((lowerQuery.includes('kras') || lowerQuery.includes('pancrea') ||
         lowerQuery.includes('pdac')) &&
        record.mouseModel.includes('Kras')) {
      return true;
    }
    if ((lowerQuery.includes('score') || lowerQuery.includes('highest') ||
         lowerQuery.includes('best') || lowerQuery.includes('top')) &&
        record.therapeuticRelevance === 'high') {
      return true;
    }
    return false;
  });

  // Fallback to outliers + high-relevance
  if (relevantRecords.length === 0) {
    relevantRecords = [
      ...getOutliers().slice(0, 3),
      ...spatialTranscriptomicsData.filter(r => r.therapeuticRelevance === 'high').slice(0, 2)
    ];
  }

  // Build context preview
  let context = `## Research Data Overview\n`;
  context += `Total experiments: ${spatialTranscriptomicsData.length}\n`;
  context += `Therapeutic targets: ${therapeuticTargets.length}\n`;
  context += `Outlier findings: ${getOutliers().length}\n\n`;
  context += `### Matched Records:\n`;
  relevantRecords.slice(0, 3).forEach(r => {
    context += `- ${r.gene} in ${r.mouseModel}: ${r.notes.substring(0, 50)}...\n`;
  });

  return {
    answer,
    retrievedContext: context,
    relevantRecords: relevantRecords.slice(0, 6),
    metadata: {
      totalRecordsSearched: spatialTranscriptomicsData.length,
      targetsAnalyzed: therapeuticTargets.length,
      timestamp: new Date().toISOString()
    }
  };
}
