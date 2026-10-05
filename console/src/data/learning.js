// Core subjects being strengthened, and what I am working on now.
// `shows` lists evidence ids (featured projects, archive ids, work ids from skills.js): where the subject appears in real work.
// `profiles` is empty on purpose: add { label, href } entries (https only) when coding profiles exist and they appear automatically.

export const fundamentals = [
  {
    id: 'dbms', name: 'DBMS',
    line: 'How data is modelled, stored and kept consistent.',
    shows: [['flash', 'PostgreSQL as the source of truth, reconciled against Redis'], ['whispr', 'PostgreSQL envelopes with migrations'], ['quat', 'PostgreSQL for exams, sessions and violations'], ['examsys', 'exam management on SQLite']],
    profiles: [],
  },
  {
    id: 'cn', name: 'Computer networks',
    line: 'How bytes move between machines, and what that costs.',
    shows: [['tcp', 'TCP congestion-control fingerprinting for covert-channel detection'], ['whispr', 'REST and WebSocket relay'], ['trade', 'server-sent events instead of polling'], ['quat', 'WebSocket live feed']],
    profiles: [],
  },
  {
    id: 'os', name: 'Operating systems',
    line: 'What runs underneath every program.',
    shows: [['nexus', 'x86-64 kernel: interrupts, memory, threads and a preemptive scheduler']],
    profiles: [],
  },
  {
    id: 'dsa', name: 'Data structures and algorithms',
    line: 'The vocabulary for efficient solutions.',
    shows: [['dsa', 'C++ and Java practice and lab work: lists, stacks, queues, trees, graphs, hashing, sorting'], ['flash', 'atomic operations under contention']],
    profiles: [],
  },
];

export const now = {
  building: [
    { what: 'Whispr', detail: 'end-to-end encrypted Android messenger on a Go backend (private, opening soon)' },
    { what: 'NexusOS', detail: 'x86-64 kernel; phases 1 to 5 of 10 done, scheduler verified at boot' },
    { what: 'ccml', detail: 'tuning the CUDA kernels, which are below PyTorch speed today' },
  ],
  learning: [
    { what: 'Fundamentals', detail: 'DBMS, computer networks, operating systems and DSA, tied to the projects above' },
    { what: 'Distributed systems', detail: 'atomic stock under load (Flash Sale), relays and ciphertext-only servers (Whispr)' },
    { what: 'LLM inference and compression', detail: 'forked llm-compressor, LLM compression built for vLLM inference' },
  ],
};
