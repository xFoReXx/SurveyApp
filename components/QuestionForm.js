// components/QuestionForm.js
export default function QuestionForm({ question, questionIndex, updateQuestion, addOption, removeOption }) {
    const handleQuestionTextChange = (e) => {
      const updatedQuestion = { ...question, text: e.target.value };
      updateQuestion(questionIndex, updatedQuestion);
    };
    
    const handleOptionChange = (optionIndex, value) => {
      const updatedOptions = [...question.options];
      updatedOptions[optionIndex] = value;
      updateQuestion(questionIndex, { ...question, options: updatedOptions });
    };
    
    return (
      <div className="question-form">
        <h3>Pytanie {questionIndex + 1}</h3>
        
        <div className="form-group">
          <label>Treść pytania:</label>
          <input
            type="text"
            value={question.text}
            onChange={handleQuestionTextChange}
            placeholder="Wprowadź pytanie"
            required
          />
        </div>
        
        <div className="options-container">
          <label>Odpowiedzi:</label>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option-input">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                placeholder={`Odpowiedź ${optionIndex + 1}`}
                required
              />
              {question.options.length > 2 && (
                <button
                  type="button"
                  className="btn remove-btn"
                  onClick={() => removeOption(questionIndex, optionIndex)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          
          {question.options.length < 4 && (
            <button
              type="button"
              className="btn add-btn"
              onClick={() => addOption(questionIndex)}
            >
              Dodaj odpowiedź
            </button>
          )}
        </div>
      </div>
    );
  }