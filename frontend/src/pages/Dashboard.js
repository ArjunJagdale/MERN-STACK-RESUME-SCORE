import React, { useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!resume || !jobDescription.trim()) {
      alert("Please upload a resume and provide a job description");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      // Call the correct backend endpoint - using full API path
      const response = await fetch("http://localhost:5000/api/score/score-jd", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData;
        
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          // If it's HTML or other content, get text for debugging
          const errorText = await response.text();
          console.error("Non-JSON response received:", errorText.substring(0, 200));
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        throw new Error(errorData.error || errorData.details || "Failed to score resume");
      }

      const result = await response.json();
      
      // Transform backend response to match frontend expectations
      setScore({
        value: result.score,
        suggestions: result.suggestions,
        support: result.support,
        raw: result.raw
      });
    } catch (error) {
      console.error("Error scoring resume:", error);
      alert(`Failed to score resume: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setResume(null);
    setJobDescription("");
    setScore(null);
  };

  return (
    <div className="fixed inset-0 top-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse absolute -top-10 -left-10"></div>
        <div className="w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse absolute top-1/2 right-10"></div>
        <div className="w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse absolute -bottom-10 left-1/3"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-full px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Resume Scorer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and job description to get an AI-powered compatibility score with personalized improvement suggestions.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Upload & Describe</h2>
            </div>

            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Resume (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleUpload}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all cursor-pointer hover:border-blue-400"
                  />
                  {resume && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">
                        {resume.name}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Paste Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows="6"
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!resume || !jobDescription.trim() || isUploading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Upload & Score
                    </>
                  )}
                </button>
                
                {(resume || jobDescription) && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Results</h2>
            </div>

            {score ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Score Display */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">{score.value}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Compatibility Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{score.value}/100</p>
                </div>

                {/* Suggestions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Improvement Suggestions
                  </h3>
                  <div className="space-y-3">
                    {score.suggestions.map((suggestion, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Support Links */}
                {score.support && score.support.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m.758 4.899l-1.172-1.171" />
                      </svg>
                      Helpful Resources
                    </h3>
                    <div className="space-y-2">
                      {score.support.map((link, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
                        >
                          <div className="w-5 h-5 text-purple-600">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-700 hover:text-purple-900 underline text-sm flex-1 break-all"
                          >
                            {link}
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Try Another Resume
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
                  >
                    Save Results
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg mb-2">No score yet</p>
                <p className="text-gray-400">Upload your resume and add a job description to get started</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl mt-12"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {resume && jobDescription.trim() ? (score ? "3/3" : "2/3") : resume || jobDescription.trim() ? "1/3" : "0/3"} steps completed
            </span>
          </div>
          <div className="flex gap-2">
            <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${resume ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${jobDescription.trim() ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${score ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Upload Resume</span>
            <span>Add Job Description</span>
            <span>Get Score</span>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-600">Advanced algorithms analyze your resume against job requirements</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Feedback</h3>
            <p className="text-sm text-gray-600">Get immediate scores and actionable improvement suggestions</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">Your documents are processed securely and never stored</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;