import { Job } from '../types/job';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'FULL_TIME',
    description:
      'As a Chat Support Agent, you will be responsible for providing exceptional customer service through online chat platforms. You will assist customers with inquiries, troubleshoot issues, and ensure a positive experience. This role is perfect for anyone searching for remote positions hiring, as we welcome applicants with no prior experience in chat support. ',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern frontend tooling',
      'Understanding of web performance optimization',
    ],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
    },
    postedDate: '2024-03-15',
    applicationUrl: 'https://example.com/apply/1',
    companyLogo:
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    location: 'Remote',
    type: 'FULL_TIME',
    description:
      'Join our remote-first team building the next generation of web applications...',
    requirements: [
      'Experience with React and Node.js',
      'Database design and optimization',
      'API development experience',
      'Strong problem-solving skills',
    ],
    salary: {
      min: 100000,
      max: 160000,
      currency: 'USD',
    },
    postedDate: '2024-03-14',
    applicationUrl: 'https://example.com/apply/2',
    companyLogo:
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
  },
];
