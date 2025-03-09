import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { determineGoal } from "../operations/services/authapis"; // ✅ Import function
import { useAppDispatch } from "../types/hooks";
import "./Quiz.css";

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

interface User {
  name: string;
  email: string;
  [key: string]: any;
}



const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [choice, setChoice] = useState<string | null>(null); // Store API response
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const user: User = JSON.parse(localStorage.getItem("user") || "null");
  const handleAnswer = async (answer: string) => {
    const newResponses = [...responses, answer === "Yes" ? "a" : "b"];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        
        console.log(newResponses)
        // Call determineGoal API to get the choice
        const response = await dispatch(determineGoal(user, newResponses));
        console.log(response)
        setChoice(response?.data.user.goal|| "unknown"); // Store API response in state
        localStorage.setItem("userChoice", response?.data.user.goal || "unknown");
      } catch (error) {
        console.error("❌ Error sending quiz responses or determining goal:", error);
      }
    }
  };

  return (
    <div className="quiz-container">
      {choice ? (
        <div className="quiz-completed">
          <h2>🎯 Quiz Completed! Your Suggested Section:</h2>
          {choice === "both" ? (
            <>
              <p>You're interested in both Health & Finance! Choose where to start:</p>
              <div className="options">
                <button className="btn" onClick={() => navigate("/dash")}>🩺 Health</button>
                <button className="btn" onClick={() => navigate("/finance")}>💰 Finance</button>
              </div>
            </>
          ) : (
            <>
              <p>We suggest starting with the <strong>{choice.toUpperCase()}</strong> section.</p>
              <button className="btn" onClick={() => choice==='Health'?navigate('/dash'):navigate(`/${choice}`)}>Go to {choice.toUpperCase()}</button>
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
