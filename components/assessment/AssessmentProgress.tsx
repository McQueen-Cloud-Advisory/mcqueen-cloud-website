interface AssessmentProgressProps {
  currentQuestionNumber: number;
  totalQuestions: number;
  domainName: string;
}

export default function AssessmentProgress({ currentQuestionNumber, totalQuestions, domainName }: AssessmentProgressProps) {
  const progressPercentage = Math.round((currentQuestionNumber / totalQuestions) * 100);
  return (
    <div className="assessment-progress">
      <div className="assessment-progress-labels">
        <p className="assessment-mono">Question {String(currentQuestionNumber).padStart(2, "0")} <span>of {totalQuestions}</span></p>
        <p>{domainName}</p>
      </div>
      <div className="assessment-progress-track" role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercentage} aria-valuetext={`${currentQuestionNumber} of ${totalQuestions} questions`}>
        <div className="assessment-progress-fill" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
}
