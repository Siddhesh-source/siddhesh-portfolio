// Other GitHub projects, each verified against its repository README or description (October 2026).
// Private repositories are not listed. Forks are marked. Add a project here and it appears in more.md.
const GH = 'https://github.com/Siddhesh-source/';

/** @type {{id:string, name:string, kind:string, desc:string, stack:string[], year:number, href:string, note?:string}[]} */
export const archive = [
  { id: 'agentos', name: 'AgentOS', kind: 'AI agents', year: 2026, stack: ['Python', 'LLM agents'], href: GH + 'Multi-Agent-Orchestration-System-',
    desc: 'Autonomous research and execution agent system with human-like memory, self-reflection and multi-agent debate.' },
  { id: 'newsnexus', name: 'NewsNexus', kind: 'AI agents', year: 2026, stack: ['Python', 'FastAPI', 'React'], href: GH + 'news_aggregrator-',
    desc: 'Multi-agent pipeline that curates and analyzes news into personalized UPSC briefs across 12 Indian languages.' },
  { id: 'studysathi', name: 'StudySathi', kind: 'AI agents', year: 2026, stack: ['JavaScript'], href: GH + 'StudySathi',
    desc: 'AI study companion for JEE, NEET and UPSC aspirants.' },
  { id: 'decivue', name: 'Decivue', kind: 'Product', year: 2026, stack: ['JavaScript'], href: GH + 'Decision-Making-Companion',
    desc: 'Decision intelligence: tracks decisions over time and reminds you when the context behind them changes.' },
  { id: 'recall', name: 'Recall', kind: 'Product', year: 2026, stack: ['TypeScript', 'Node.js'], href: GH + 'recall',
    desc: 'Spaced-repetition reminders for links, PDFs and notes, delivered over WhatsApp and email.' },
  { id: 'predelinq', name: 'Pre-Delinquency Engine', kind: 'ML', year: 2026, stack: ['Python', 'AWS'], href: GH + 'Pre-Delinquency-Engine', note: 'fork, team project',
    desc: 'Predicts customer defaults 30 days ahead at 85% recall, with a risk dashboard deployed on AWS.' },
  { id: 'lungcancer', name: 'Lung Cancer Screening', kind: 'ML', year: 2026, stack: ['Python', 'FastAPI', 'ONNX'], href: GH + 'lung_cancer_detection',
    desc: 'FastAPI service for lung cancer risk screening on chest X-rays using ChestX-ray14 multi-label ONNX models.' },
  { id: 'tcp', name: 'Covert Channel Detection', kind: 'Security', year: 2026, stack: ['Python'], href: GH + 'Detecting_Tcp_Attack',
    desc: 'Real-time detection of covert channels via congestion-control fingerprinting and cross-flow correlation.' },
  { id: 'driver', name: 'Drowsiness Detection', kind: 'ML', year: 2025, stack: ['Python', 'Flask', 'TensorFlow', 'OpenCV'], href: GH + 'driver',
    desc: 'Real-time webcam detection of yawning and eye closure with MediaPipe and TensorFlow.' },
  { id: 'soil2crop', name: 'Soil2Crop', kind: 'ML', year: 2026, stack: ['HTML', 'CNN'], href: GH + 'Farmer-app', note: 'hackathon',
    desc: 'Agriculture platform for crop prediction, yield estimation and irrigation advice for Indian farmers.' },
  { id: 'examsys', name: 'Exam Management System', kind: 'Web app', year: 2025, stack: ['Next.js', 'TypeScript', 'SQLite'], href: GH + 'DBMS',
    desc: 'Web-based exam management with admin dashboards, exam creation and monitoring.' },
  { id: 'smarthospital', name: 'Smart Hospital', kind: 'Web app', year: 2025, stack: ['TypeScript'], href: GH + 'Smart-hospital',
    desc: 'Hospital management system.' },
  { id: 'finance', name: 'Personal Finance', kind: 'Mobile', year: 2025, stack: ['React Native', 'Django', 'Python'], href: GH + 'personal_finance',
    desc: 'React Native app with a Django backend for a personalised finance advisor.' },
];

export const KINDS = [...new Set(archive.map((a) => a.kind))];
