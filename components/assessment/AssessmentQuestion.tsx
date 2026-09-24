import type { AssessmentQuestion as AssessmentQuestionType, MaturityScore } from "../../data/assessment";

interface AssessmentQuestionProps {
  question: AssessmentQuestionType;
  selectedScore: MaturityScore | undefined;
  onSelect: (score: MaturityScore) => void;
}

export default function AssessmentQuestion({ question, selectedScore, onSelect }: AssessmentQuestionProps) {
  return (
    <fieldset className="assessment-fieldset">
      <legend>{question.prompt}</legend>
      <div className="assessment-options">
        {question.options.map((option) => {
          const optionId = `${question.id}-${option.score}`;
          const isSelected = selectedScore === option.score;
          return (
            <label key={option.score} htmlFor={optionId} className={`assessment-option${isSelected ? " is-selected" : ""}`}>
              <input id={optionId} type="radio" name={`question-${question.id}`} value={option.score} checked={isSelected} onChange={() => onSelect(option.score)} className="sr-only" />
              <span aria-hidden="true" className="assessment-radio">{isSelected ? <span /> : null}</span>
              <span className="assessment-option-copy">
                <span className="assessment-option-level">{option.level}</span>
                <span className="assessment-option-description">{option.description}</span>
              </span>
              <span aria-hidden="true" className="assessment-option-number assessment-mono">0{option.score}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
