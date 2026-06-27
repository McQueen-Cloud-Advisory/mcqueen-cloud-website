import type {
  AssessmentQuestion as AssessmentQuestionType,
  MaturityScore,
} from "../../data/assessment";

interface AssessmentQuestionProps {
  question: AssessmentQuestionType;
  selectedScore: MaturityScore | undefined;
  onSelect: (score: MaturityScore) => void;
}

export default function AssessmentQuestion({
  question,
  selectedScore,
  onSelect,
}: AssessmentQuestionProps) {
  return (
    <fieldset>
      <legend className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {question.prompt}
      </legend>

      <div className="mt-8 space-y-4">
        {question.options.map((option) => {
          const optionId = `${question.id}-${option.score}`;
          const isSelected = selectedScore === option.score;

          return (
            <label
              key={option.score}
              htmlFor={optionId}
              className={[
                "block cursor-pointer rounded-2xl border p-5 transition",
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-950",
                isSelected
                  ? "border-blue-400 bg-blue-400/10"
                  : "border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900",
              ].join(" ")}
            >
              <input
                id={optionId}
                type="radio"
                name={`question-${question.id}`}
                value={option.score}
                checked={isSelected}
                onChange={() => onSelect(option.score)}
                className="sr-only"
              />

              <span className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className={[
                    "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-blue-400 bg-blue-500"
                      : "border-slate-600 bg-slate-950",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  ) : null}
                </span>

                <span>
                  <span className="block font-semibold text-white">
                    {option.level}
                  </span>

                  <span className="mt-2 block leading-7 text-slate-300">
                    {option.description}
                  </span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
