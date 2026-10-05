// Skills with the projects that evidence them. Evidence ids are featured project ids (./projects.js),
// archive ids (./archive.js), or WORK ids below. A skill with no evidence is shown as self-reported (marked *).

export const WORK = {
  rink9: { name: 'Rink9 (InnovateMore)' },
  taxbharo: { name: 'TaxBharo' },
  dsa: { name: 'DSA practice and lab work' },
};

/** Query matches an exact name, else any word that starts with it ("go" finds Go, not Django or MongoDB). */
export function findSkills(query) {
  const q = query.trim().toLowerCase();
  if (!q) return skills;
  const exact = skills.filter((s) => s.name.toLowerCase() === q);
  return exact.length ? exact : skills.filter((s) => s.name.toLowerCase().split(/[\s/+()-]+/).some((w) => w.startsWith(q)));
}

export const AREAS = ['Languages', 'Web and backend', 'Data and infra', 'AI and ML', 'Systems and security', 'Fundamentals', 'Automation'];

/** @type {{name:string, area:string, used:string[]}[]} */
export const skills = [
  // Languages
  { name: 'Python', area: 'Languages', used: ['quat', 'trade', 'agentos', 'newsnexus', 'lungcancer', 'tcp', 'predelinq', 'taxbharo', 'ccml', 'finance'] },
  { name: 'Java', area: 'Languages', used: ['rink9', 'taxbharo'] },
  { name: 'TypeScript', area: 'Languages', used: ['rink9', 'recall', 'finance', 'smarthospital', 'examsys'] },
  { name: 'JavaScript', area: 'Languages', used: ['studysathi', 'decivue'] },
  { name: 'Go', area: 'Languages', used: ['whispr', 'flash'] },
  { name: 'C', area: 'Languages', used: ['nexus'] },
  { name: 'C++', area: 'Languages', used: ['ccml', 'dsa'] },
  { name: 'Kotlin', area: 'Languages', used: ['whispr'] },
  { name: 'SQL', area: 'Languages', used: ['flash', 'whispr', 'quat', 'examsys'] },
  // Web and backend
  { name: 'React', area: 'Web and backend', used: ['trade', 'newsnexus'] },
  { name: 'Next.js', area: 'Web and backend', used: ['rink9', 'examsys'] },
  { name: 'React Native', area: 'Web and backend', used: ['finance'] },
  { name: 'Tailwind', area: 'Web and backend', used: [] },
  { name: 'Node.js', area: 'Web and backend', used: ['recall'] },
  { name: 'Express', area: 'Web and backend', used: [] },
  { name: 'Spring Boot', area: 'Web and backend', used: ['rink9'] },
  { name: 'FastAPI', area: 'Web and backend', used: ['quat', 'trade', 'newsnexus', 'lungcancer'] },
  { name: 'Django', area: 'Web and backend', used: ['finance'] },
  { name: 'Flask', area: 'Web and backend', used: ['driver'] },
  { name: 'REST + WebSockets', area: 'Web and backend', used: ['whispr', 'quat'] },
  { name: 'Server-sent events', area: 'Web and backend', used: ['trade'] },
  // Data and infra
  { name: 'Redis', area: 'Data and infra', used: ['flash', 'trade'] },
  { name: 'PostgreSQL', area: 'Data and infra', used: ['flash', 'whispr', 'quat'] },
  { name: 'SQLite', area: 'Data and infra', used: ['examsys'] },
  { name: 'MongoDB', area: 'Data and infra', used: [] },
  { name: 'S3 storage', area: 'Data and infra', used: ['whispr'] },
  { name: 'Docker', area: 'Data and infra', used: ['whispr'] },
  { name: 'AWS', area: 'Data and infra', used: ['predelinq', 'quat'] },
  { name: 'GCP', area: 'Data and infra', used: [] },
  { name: 'Firebase', area: 'Data and infra', used: [] },
  // AI and ML
  { name: 'CUDA', area: 'AI and ML', used: ['ccml'] },
  { name: 'PyTorch', area: 'AI and ML', used: ['ccml'] },
  { name: 'TensorFlow', area: 'AI and ML', used: ['driver'] },
  { name: 'OpenCV + MediaPipe', area: 'AI and ML', used: ['driver'] },
  { name: 'YOLO', area: 'AI and ML', used: ['quat'] },
  { name: 'ONNX', area: 'AI and ML', used: ['lungcancer'] },
  { name: 'NLP', area: 'AI and ML', used: ['quat', 'newsnexus'] },
  { name: 'LLM agents', area: 'AI and ML', used: ['agentos', 'newsnexus'] },
  // Systems and security
  { name: 'x86-64 + NASM', area: 'Systems and security', used: ['nexus'] },
  { name: 'E2EE (libsignal)', area: 'Systems and security', used: ['whispr'] },
  { name: 'Atomic operations (Lua)', area: 'Systems and security', used: ['flash'] },
  { name: 'Network attack detection', area: 'Systems and security', used: ['tcp'] },
  { name: 'DBMS', area: 'Fundamentals', used: ['flash', 'whispr', 'quat', 'examsys'] },
  { name: 'Computer networks', area: 'Fundamentals', used: ['tcp', 'whispr', 'trade', 'quat'] },
  { name: 'Operating systems', area: 'Fundamentals', used: ['nexus'] },
  { name: 'Data structures and algorithms', area: 'Fundamentals', used: ['dsa'] },
  // Automation
  { name: 'Playwright', area: 'Automation', used: ['taxbharo'] },
  { name: 'Git', area: 'Automation', used: [] },
];
