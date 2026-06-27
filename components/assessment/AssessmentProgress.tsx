interface AssessmentProgressProps {
  currentQuestionNumber: number;
  totalQuestions: number;
  domainName: string;
}

export default function AssessmentProgress({
  currentQuestionNumber,
  totalQuestions,
  domainName,
}: AssessmentProgressProps) {
  const progressPercentage = Math.round(
    (currentQuestionNumber / totalQuestions) * 100,
  );

  return (
    <div aria-label="Assessment progress">
      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-white">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>

        <p className="text-slate-400">{domainName}</p>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercentage}
        aria-valuetext={`${currentQuestionNumber} of ${totalQuestions} questions`}
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-[width] duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
