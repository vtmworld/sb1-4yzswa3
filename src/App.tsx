import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';
import { PostJob } from './components/PostJob';
import { AdminUpload } from './components/AdminUpload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">JobBoard</h1>
              </div>
              <nav className="flex space-x-4">
                <a
                  href="/post-job"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Post a Job
                </a>
                <a
                  href="/admin/upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Upload CSV
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Latest Jobs</h2>
                  <p className="mt-2 text-gray-600">Find your next opportunity</p>
                </div>
                <JobList />
              </>
            } />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
          </Routes>
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-500">© 2024 JobBoard. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;