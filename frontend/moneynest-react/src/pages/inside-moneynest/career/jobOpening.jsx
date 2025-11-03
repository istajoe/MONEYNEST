import React from "react";

const JobOpenings = () => {
  const jobs = [
    { title: "Frontend Developer", location: "Remote", type: "Full-time" },
    { title: "Backend Engineer", location: "Lagos, Nigeria", type: "Full-time" },
    { title: "Product Designer", location: "Hybrid", type: "Contract" },
    { title: "Marketing Associate", location: "Remote", type: "Internship" },
    { title: "Security Engineer", location: "Remote", type: "Internship" },
    { title: "Data Analyst", location: "Remote", type: "Internship" },
  ];

  return (
    <section className="jobs-section">
      <h2>Current Opportunities</h2>
      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <span>{job.type}</span>
            <button className="btn-secondary">Apply Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobOpenings;
