import { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Job } from '../types/job';

interface RawJobData {
  ID: string | number;
  Title: string;
  Company: string;
  Location: string;
  Type: string;
  Description: string;
  Requirements: string;
  SalaryMin: string | number;
  SalaryMax: string | number;
  SalaryCurrency: string;
  PostedDate: string;
  ApplicationUrl: string;
  CompanyLogo: string;
}

const isValidDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  } catch {
    return false;
  }
};

const validateAndParseJob = (row: RawJobData): Job | null => {
  try {
    if (!row.ID || !row.Title || !row.Company) {
      console.error('Missing required fields in job data:', row);
      return null;
    }

    // Ensure we have a valid date, or use current date as fallback
    const postedDate = isValidDate(row.PostedDate?.toString())
      ? row.PostedDate.toString()
      : new Date().toISOString().split('T')[0];

    const job: Job = {
      id: row.ID.toString(),
      title: row.Title.toString(),
      company: row.Company.toString(),
      location: row.Location.toString(),
      type: (row.Type?.toString() || 'FULL_TIME') as 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE',
      description: row.Description.toString(),
      requirements: row.Requirements.toString().split('\n').filter(Boolean),
      salary: {
        min: parseInt(row.SalaryMin.toString(), 10) || 0,
        max: parseInt(row.SalaryMax.toString(), 10) || 0,
        currency: row.SalaryCurrency?.toString() || 'USD',
      },
      postedDate,
      applicationUrl: row.ApplicationUrl?.toString() || '#',
      companyLogo: row.CompanyLogo?.toString() || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    };

    return job;
  } catch (error) {
    console.error('Error parsing job data:', error);
    return null;
  }
};

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/data/jobs.xlsx');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs file');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        
        if (!workbook.SheetNames.length) {
          throw new Error('Excel file is empty');
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<RawJobData>(worksheet);
        
        const parsedJobs = jsonData
          .map(validateAndParseJob)
          .filter((job): job is Job => job !== null);

        if (parsedJobs.length === 0) {
          throw new Error('No valid jobs found in the file');
        }
        
        setJobs(parsedJobs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};