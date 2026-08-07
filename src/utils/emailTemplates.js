export const welcomeEmailTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to Job Portal</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Your account has been created successfully.
      </p>

      <p>You can now:</p>

      <ul>
        <li>Create your professional profile</li>
        <li>Upload your resume</li>
        <li>Apply for jobs</li>
        <li>Track your applications</li>
      </ul>

      <p>We wish you the best in your job search.</p>

      <br>

      <p>
        Regards,<br>
        <strong>Job Portal Team</strong>
      </p>
    </div>
  `;
};

export const applicationSubmittedTemplate = (
  candidateName,
  jobTitle,
  companyName,
) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Application Submitted</h2>

      <p>Hi <strong>${candidateName}</strong>,</p>

      <p>
        Your application for
        <strong>${jobTitle}</strong>
        at
        <strong>${companyName}</strong>
        has been submitted successfully.
      </p>

      <p>
        You can track your application status from your dashboard.
      </p>

      <br>

      <p>
        Regards,<br>
        <strong>Job Portal Team</strong>
      </p>
    </div>
  `;
};

export const applicationStatusTemplate = (candidateName, jobTitle, status) => {
  const messages = {
    Pending: "Your application has been received.",
    Reviewed: "Your application has been reviewed.",
    Interview: "Congratulations! You have been shortlisted for an interview.",
    Accepted: "Congratulations! You have been selected for this position.",
    Rejected:
      "Thank you for applying. Unfortunately, you were not selected this time.",
  };

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Application Status Updated</h2>

      <p>Hi <strong>${candidateName}</strong>,</p>

      <p>
        Your application for
        <strong>${jobTitle}</strong>
        has been updated.
      </p>

      <p>
        <strong>Current Status:</strong> ${status}
      </p>

      <p>
        ${messages[status]}
      </p>

      <br>

      <p>
        Regards,<br>
        <strong>Job Portal Team</strong>
      </p>
    </div>
  `;
};

export const passwordResetTemplate = (name, resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset Request</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to reset your password:
      </p>

      <a
        href="${resetLink}"
        style="
          display:inline-block;
          padding:12px 24px;
          background:#2563eb;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>

      <p>
        If you didn't request this, you can safely ignore this email.
      </p>

      <br>

      <p>
        Regards,<br>
        <strong>Job Portal Team</strong>
      </p>
    </div>
  `;
};
