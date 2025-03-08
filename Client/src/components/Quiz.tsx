import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css"; // ✅ Import styles

const questions = [
  { question: "🎯 Do you struggle with managing your finances?" },
  { question: "💰 Are you interested in saving money effectively?" },
  { question: "🩺 Do you often worry about your health?" },
  { question: "📈 Would you like guidance on investing?" },
  { question: "🏃‍♂️ Do you want to track your health goals?" },
  { question: "📊 Are you interested in budgeting tools?" },
  { question: "⏰ Would you like reminders for health checkups?" },
  { question: "🛡️ Do you want to explore insurance options?" },
  { question: "👨‍💼 Are you looking for a financial advisor?" },
  { question: "🍎 Would you like personalized health tips?" },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnswer = async (answer: string) => {
    const newResponses = [...responses, answer === "Yes" ? "a" : "b"];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        await axios.post("http://localhost:4000/api/v1/quiz", { answers: newResponses });
        console.log("🚀 Quiz responses sent successfully!");
      } catch (error) {
        console.error("❌ Error sending quiz responses:", error);
      }

      // Determine preference
      const financeScore = newResponses.filter((r, i) => i % 2 === 0 && r === "a").length;
      const healthScore = newResponses.filter((r, i) => i % 2 !== 0 && r === "a").length;

      let choice = "";
      if (financeScore > healthScore) {
        choice = "finance";
      } else if (healthScore > financeScore) {
        choice = "health";
      } else {
        choice = "both";
      }

      localStorage.setItem("userChoice", choice);
      setResult(choice);
    }
  };

  return (
    <div className="quiz-container">
      {result ? (
        <div className="quiz-completed">
          <h2>🎯 Quiz Completed! Your Suggested Section:</h2>
          {result === "both" ? (
            <>
              <p>You're interested in both Health & Finance! Choose where to start:</p>
              <div className="options">
                <button className="btn" onClick={() => navigate("/health")}>🩺 Health</button>
                <button className="btn" onClick={() => navigate("/finance")}>💰 Finance</button>
              </div>
            </>
          ) : (
            <>
              <p>We suggest starting with the <strong>{result.toUpperCase()}</strong> section.</p>
              <button className="btn" onClick={() => navigate(`/${result}`)}>Go to {result.toUpperCase()}</button>
            </>
          )}
        </div>
      ) : (
        <>
          <h2>🎉 Quiz Time!</h2>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            <button className="btn yes" onClick={() => handleAnswer("Yes")}>✅ Yes</button>
            <button className="btn no" onClick={() => handleAnswer("No")}>❌ No</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
