// Mock spatial transcriptomics data representing 6 months of In Vivo research
// This simulates data that would typically be stored in an ELN or research data platform

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

// Simulated spatial transcriptomics data from mouse studies
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

// Aggregated therapeutic targets with validation status
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

// Function to search data based on query
export function searchTranscriptomicsData(query: string): TranscriptomicsRecord[] {
  const lowerQuery = query.toLowerCase();
  return spatialTranscriptomicsData.filter(record =>
    record.gene.toLowerCase().includes(lowerQuery) ||
    record.mouseModel.toLowerCase().includes(lowerQuery) ||
    record.tissue.toLowerCase().includes(lowerQuery) ||
    record.notes.toLowerCase().includes(lowerQuery) ||
    record.spatialRegion.toLowerCase().includes(lowerQuery)
  );
}

export function getOutliers(): TranscriptomicsRecord[] {
  return spatialTranscriptomicsData.filter(record =>
    record.targetValidationStatus === 'outlier'
  );
}

export function getOutlierTargets(): TherapeuticTarget[] {
  return therapeuticTargets.filter(target => target.outlierFlag);
}

export function getTargetsByIndication(indication: string): TherapeuticTarget[] {
  const lowerIndication = indication.toLowerCase();
  return therapeuticTargets.filter(target =>
    target.diseaseIndication.toLowerCase().includes(lowerIndication)
  );
}
