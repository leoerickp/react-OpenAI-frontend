interface Props {
  is_correct: boolean;
  corrected_text: string;
  errors: string[];
  suggestions: string[];
  correct_label: string;
  uncorrect_label: string;
  suggestions_label: string;
  mistakes_label: string;
}

export const GptOrthographyMessage = ({
  is_correct,
  corrected_text,
  errors,
  suggestions,
  correct_label,
  uncorrect_label,
  suggestions_label,
  mistakes_label,
}: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">G</div>
        <div className="relative ml-3 text-sm bg-black/75 pt-3 pb-2 px-4 rounded-xl shadow">
          {is_correct ? (
            <h3 className="text-green-500">✅ {correct_label}</h3>
          ) : (
            <h3 className="text-red-500">❌ {uncorrect_label}</h3>
          )}
          <p>{corrected_text}</p>
          {suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-cyan-200">{suggestions_label}:</p>
              <ul className="border-l-4 border-cyan-200/50 rounded-lg p-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          {errors.length > 0 && (
            <div className="mb-2">
              <p className="text-red-300">{mistakes_label}:</p>
              <ul className="border-l-4 border-red-300/50 rounded-lg p-2">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
