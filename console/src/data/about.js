// Profile overview and the one core message. Edit here. Anything not stated by the owner or traceable to a repository stays out.
// Email and education live in the shared ../../../src/data/profile.js so both sites stay in step.
import { profile } from '../../../src/data/profile.js';

export const about = {
  headline: 'Software engineer. Products end to end, depth in AI, ML and infra.',
  tagline: 'SDE · full stack · AI, ML and infra · strong fundamentals',
  location: 'Pune, India',
  openTo: 'Open to SDE roles, and SDE-leaning AI, ML and infra roles.',
  summary: [
    'I am a software engineer who builds products end to end: schema, API, interface, deployment. I go deep on the parts that decide quality, including AI and ML systems, infrastructure and the layers underneath them.',
    'Underneath all of it are the fundamentals I keep strengthening: DBMS, computer networks, operating systems, and data structures and algorithms. Professionally I have worked on a Spring Boot and Next.js product (Rink9, InnovateMore) and on ITR filing automation (TaxBharo).',
  ],
  focus: [
    ['Software', 'full stack: web, mobile, backends, APIs'],
    ['AI, ML, infra', 'CUDA kernels, LLM agents, encrypted messaging, stock under load'],
    ['Fundamentals', 'DBMS, networks, OS, DSA'],
  ],
  education: profile.education.map((e) => [e.school, e.years]),
  resumeHref: '', // add a link here and it appears on contact.md
  email: profile.email,
};
