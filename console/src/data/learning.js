// DSA and growth, from the DSA repository (C++, started July 2025) and lab coursework. Counts are exact as of October 2026.
// status: 'solved' (code in repo) | 'lab' (lab coursework in C++/Java) | 'lectures' | 'planned'

export const dsaRepo = {
  href: 'https://github.com/Siddhesh-source/DSA',
  visibility: 'private',
  language: 'C++',
  solutions: 45,
  groups: [['LeetCode', 15], ['advanced', 7], ['beginner', 6], ['intermediate', 4], ['revise', 9], ['sorting', 3], ['two pointers', 1]],
  patterns: ['binary search', 'rotated binary search', 'dutch national flag', 'prefix sum', 'sliding window', 'monotonic stack', 'Kadane', 'two sum', 'longest subsequence'],
};

export const roadmap = [
  { topic: 'Arrays and strings', status: 'solved', note: '45 C++ solutions: sliding window, prefix sum, two pointers, monotonic stack' },
  { topic: 'Linked list', status: 'lab', note: 'single and double lists, reversal (C++)' },
  { topic: 'Stack and queue', status: 'lab', note: 'implemented in the DSA lab (C++)' },
  { topic: 'Trees (BST and binary)', status: 'lab', note: 'BST implementation (C++)' },
  { topic: 'Binary search', status: 'solved', note: 'plain and rotated-array variants' },
  { topic: 'Recursion and backtracking', status: 'planned', note: 'next in the tracker' },
  { topic: 'Graphs', status: 'lab', note: 'BFS, DFS, Dijkstra (C++/Java)' },
  { topic: 'Dynamic programming', status: 'lectures', note: 'DP and bitmask DP lecture series (TLE Eliminators)' },
  { topic: 'Heaps and priority queues', status: 'planned', note: 'in the tracker' },
  { topic: 'Tries', status: 'planned', note: 'in the tracker' },
  { topic: 'Bit manipulation', status: 'planned', note: 'in the tracker' },
];

export const STATUS_LABEL = { solved: 'solved in repo', lab: 'lab coursework', lectures: 'lectures', planned: 'planned' };

export const now = {
  building: [
    { what: 'Whispr', detail: 'end-to-end encrypted Android messenger on a Go backend (private, opening soon)' },
    { what: 'NexusOS', detail: 'x86-64 kernel; phases 1 to 5 of 10 done, scheduler verified at boot' },
    { what: 'ccml', detail: 'tuning the CUDA kernels, which are below PyTorch speed today' },
  ],
  learning: [
    { what: 'Distributed systems', detail: 'atomic stock under load (Flash Sale), relays and ciphertext-only servers (Whispr)' },
    { what: 'LLM inference and compression', detail: 'forked llm-compressor, LLM compression built for vLLM inference' },
    { what: 'DSA', detail: 'tracker topics still ahead: recursion, heaps, tries, bit manipulation' },
  ],
};
