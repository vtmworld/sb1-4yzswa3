import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { formatDistanceToNow, parseISO, addMonths } from 'date-fns';
import { useJobs } from '../hooks/useJobs';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs, loading, error } = useJobs();
  const job = jobs.find(j => j.id === id);

  const formatPostedDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recently';
    }
  };

  const getValidThrough = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return addMonths(date, 1).toISOString();
    } catch (error) {
      console.error('Error calculating valid through date:', error);
      return new Date().toISOString(); // Fallback to current date
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        Error loading job details: {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </Link>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          Job not found
        </div>
      </div>
    );
  }

  // Google Job Posting Schema
  const jobSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    validThrough: getValidThrough(job.postedDate),
    employmentType: job.type,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      logo: job.companyLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: job.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: 'YEAR'
      }
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jobSchema)}
      </script>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-6">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-xl text-gray-600 mt-2">{job.company}</p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {job.type.replace('_', ' ')}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {`${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency}`}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Posted {formatPostedDate(job.postedDate)}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
              <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};