import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { utils, write } from 'xlsx';

export const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'FULL_TIME',
    description: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    companyLogo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requirements = formData.requirements
      .split('\n')
      .filter(req => req.trim() !== '');

    const newJob = {
      ID: Date.now().toString(),
      Title: formData.title,
      Company: formData.company,
      Location: formData.location,
      Type: formData.type,
      Description: formData.description,
      Requirements: requirements.join('\n'),
      SalaryMin: formData.salaryMin,
      SalaryMax: formData.salaryMax,
      SalaryCurrency: formData.currency,
      PostedDate: new Date().toISOString().split('T')[0],
      ApplicationUrl: '#',
      CompanyLogo: formData.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
    };

    try {
      const ws = utils.json_to_sheet([newJob]);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Jobs");
      const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
      
      console.log('New job data ready for Excel:', newJob);
      alert('Job posted successfully! In a real application, this would be saved to the Excel file.');
      navigate('/');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type *
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="FREELANCE">Freelance</option>
              </select>
            </div>

            <div>
              <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary *
              </label>
              <input
                type="number"
                id="salaryMin"
                name="salaryMin"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.salaryMin}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary *
              </label>
              <input
                type="number"
                id="salaryMax"
                name="salaryMax"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.salaryMax}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency *
              </label>
              <select
                id="currency"
                name="currency"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div>
              <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo URL
              </label>
              <input
                type="url"
                id="companyLogo"
                name="companyLogo"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.companyLogo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
              Requirements * (One per line)
            </label>
            <textarea
              id="requirements"
              name="requirements"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="5+ years of experience with React&#10;Strong TypeScript skills&#10;Experience with modern frontend tooling"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};