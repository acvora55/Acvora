import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const QuestionList = ({ title, questions, section, expanded, toggle }) => (
  <div className="mb-6">
    {title && (
      <h3 className="text-lg font-semibold mb-3 text-[var(--text-color)]">
        {title}
      </h3>
    )}
    <div className="space-y-3">
      {questions.length > 0 ? (
        questions.map((qa, index) => (
          <div key={index} className="question-item transition-all">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-base">{qa.question}</p>
              <button
                onClick={() => toggle(section, index)}
                aria-expanded={expanded[`${section}-${index}`] || false}
                aria-controls={`${section}-answer-${index}`}
                className="text-[var(--text-secondary)] hover:text-[var(--button-hover)] transition-colors"
              >
                <FontAwesomeIcon
                  icon={
                    expanded[`${section}-${index}`] ? faMinus : faPlus
                  }
                />
              </button>
            </div>
            {expanded[`${section}-${index}`] && (
              <p
                id={`${section}-answer-${index}`}
                className="text-xs mt-2 text-gray-700 transition-all"
              >
                {qa.answer}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">No questions yet.</p>
      )}
    </div>
  </div>
);

const QA = ({ isLoggedIn }) => {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState([
    {
      question: "What is the full form of DTU?",
      answer: "DTU stands for Delhi Technological University.",
    },
    {
      question: "When was DTU established?",
      answer:
        "DTU was established in 1941 as Delhi College of Engineering (DCE) and became DTU in 2008.",
    },
    { question: "Where is DTU located?", answer: "DTU is in Rohini, Delhi." },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const maxLength = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !query.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newAnswer = {
        question: query,
        answer: "Answer will be provided soon.",
      };
      setAnswers([newAnswer, ...answers]);
      setQuery("");
      setIsSubmitting(false);
    }, 1000);
  };

  const toggleAnswer = (section, index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`],
    }));
  };

  const mostAskedQuestions = [
    {
      question: "What is the full form of DTU?",
      answer: "DTU stands for Delhi Technological University.",
    },
    {
      question: "When was DTU established?",
      answer:
        "DTU was established in 1941 as Delhi College of Engineering (DCE) and became DTU in 2008.",
    },
    { question: "Where is DTU located?", answer: "DTU is in Rohini, Delhi." },
  ];

  return (
    <div className="container flex flex-col gap-6 max-w-3xl ml-0">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">
          Ask a Question
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, maxLength))}
              placeholder="Type your question..."
              className="w-full pr-20 bg-white rounded-md border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--button-primary)] focus:border-transparent transition-all duration-200"
              disabled={!isLoggedIn || isSubmitting}
              maxLength={maxLength}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[var(--text-secondary)]">
              {query.length}/{maxLength}
            </span>
            {!isLoggedIn && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                Please log in to ask a question.
              </p>
            )}
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[var(--highlight-bg)] text-black hover:bg-[var(--highlight-hover)] hover:text-white transition-all"
              disabled={!isLoggedIn || !query.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <hr className="my-4 border-[var(--border-color)]" />

        {/* Questions */}
        <QuestionList
          title="Most Asked Questions"
          questions={mostAskedQuestions}
          section="mostAsked"
          expanded={expandedQuestions}
          toggle={toggleAnswer}
        />

        <QuestionList
          title="Submitted Questions"
          questions={answers}
          section="submitted"
          expanded={expandedQuestions}
          toggle={toggleAnswer}
        />
      </div>
    </div>
  );
};

export default QA;
