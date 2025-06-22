export const generatePrompt = (name, resumeText, jobDescription) => {
  const prompt = `
            You are an expert career advisor and professional writer.
            Generate a formal and confident cover letter based on the provided details.
            The output must be a JSON object with three keys: "introduction", "body", and "conclusion".
            Each key should contain a string of well-formatted HTML paragraph(s).
            Do not include any introductory text like "Here is the JSON object".

            Candidate's Name: ${name}
            Candidate's Resume:
            ---
            ${resumeText}
            ---
            Job Description (optional):
            ---
            ${jobDescription || "Not provided"}
            ---
        `;
  return prompt;
};
