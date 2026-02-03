# Biology-Aware RAG for Target Discovery

AI-powered spatial transcriptomics analysis platform for therapeutic target validation at Genentech Research & Early Development.

## Overview

This application demonstrates a Retrieval-Augmented Generation (RAG) tool specifically designed for In Vivo workflow insights. It allows scientists to query six months of spatial transcriptomics data to identify outliers in therapeutic target validation.

### Key Features

- **Natural Language Queries**: Ask questions about spatial transcriptomics data in plain English
- **Biology-Aware Context Retrieval**: Intelligent retrieval of relevant experimental data
- **Outlier Detection**: Automatic identification of unexpected findings in target validation
- **Multi-Model Support**: Data from Alzheimer's (APP/PS1), HER2+ Breast Cancer, Pancreatic Cancer (KRAS), and other therapeutic areas

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_key_here
   ```

### Running the Application

```bash
npm run dev
```

The app will be available at [http://localhost:3002](http://localhost:3002)

### Running Tests

```bash
npm run test:e2e
```

## Example Queries

- "What are the outliers in therapeutic target validation?"
- "Show me findings from the APP/PS1 Alzheimer's model"
- "What spatial patterns exist in HER2+ breast cancer data?"
- "Summarize KRAS findings in the pancreatic cancer model"
- "Which targets have the highest validation scores?"

## Data Overview

The demo includes mock spatial transcriptomics data representing:

- **14 experimental records** across 4 mouse models
- **6 therapeutic targets** with validation scores
- **5 outlier findings** with actionable insights

### Mouse Models

| Model | Indication | Key Targets |
|-------|-----------|-------------|
| C57BL/6-APP/PS1 | Alzheimer's Disease | TREM2, APOE, BACE1, MAPT |
| BALB/c-HER2 | HER2+ Breast Cancer | ERBB2, CDK4, PIK3CA, PD-L1 |
| Pdx1-Cre-LSL-KrasG12D | Pancreatic Cancer | KRAS, TP53, MET |
| NOD-SCID-IL2Rg | Immuno-Oncology | CD19, BCMA |

## Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **AI**: OpenAI GPT-4
- **Testing**: Playwright

## Strategic Value

This application demonstrates Quome's capability to build "biology-aware" systems that:
1. Bridge lab execution and high-performance compute
2. Deliver real-world ROI through actionable insights
3. Support "Lab-in-the-Loop" workflows
4. Ensure FAIR data principles in research

---

Built with [Quome](https://quome.com)
