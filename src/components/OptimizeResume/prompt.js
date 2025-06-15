export const generatePrompt = (resumeText, jobDescription) => {
  const prompt = `
            Analyze the following resume and job description.
            You are an Applicant Tracking System (ATS) score calculator.
            Your task is to analyze the provided resume against the given job description and provide a match score (out of 100) and actionable feedback.
            Focus on keyword matching, skill alignment, experience relevance, and overall fit.
            
            **Resume:**
            ${resumeText}
            
            **Job Description:**
            ${jobDescription}
            
            Based on the analysis, provide:
            1. A "before" ATS score representing how well the current resume fits the job description. The score should be between 0 and 100.
            2. A list of specific, actionable suggestions to improve the resume (at max 5, so list only most important 5). Format these as a list of points in short and execty where the improvements are needed.
            3. A projected "after" ATS match score if all suggestions are implemented. This score should be higher than the 'before' score and between 0 and 100.
            4. A "detailedChanges" section that contains at max 6 list of specific changes - those changes must be valid and impactful and not just be a 1-2 word change, where each item includes:
              - "from": a short snippet (up to 1-2 lines) from the resume that needs improvement, EXCEPT THE NAME AND PERSONLA DETAILS.,
              - "to": the better and improved version of that snippet that better aligns with the job description. Also check for grammar and spelling errors in the original text and correct them in the "to" section.
              
            Format the detailedChanges like this:
            [
              {
                "from": "Experienced in software development.",
                "to": "Experienced in developing scalable web applications using React and Node.js, aligning with job requirements."
              },
              {
                "from": "Worked at ABC Corp.",
                "to": "Led front-end development at ABC Corp, optimizing UI components for a fintech platform."
              }
            ]

            Ensure this section is not empty. If no specific edits are needed, explain why.

            Most Important: Provide the answers in such a way they each feedback or suggestion works on making the resume better aligned with the job description, and that the ATS score is improved.
            `;
  return prompt;
};
