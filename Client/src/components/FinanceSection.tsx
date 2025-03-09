import React from "react";
import financeImg1 from "../assets/finance1.jpeg";  // Replace with your actual image paths
import financeImg2 from "../assets/finance2.png";
import financeImg3 from "../assets/finance3.png";
import "./FinanceSection.css";  // Create this CSS file for styling

const FinanceSection = () => {
  return (
    <section className="finance-section" id="finance">
      <div className="finance-header">
        <h2>Finance with Wellth</h2>
      </div>
      <div className="finance-container">
        <div className="finance-item">
          <img src={financeImg1} alt="Finance 1" className="finance-image" />
          <p className="finance-text">Personalised Income Tracker</p>
        </div>
        <div className="finance-item">
          <img src={financeImg2} alt="Finance 2" className="finance-image" />
          <p className="finance-text">Savings and Expenditure Tracker</p>
        </div>
        <div className="finance-item">
          <img src={financeImg3} alt="Finance 3" className="finance-image" />
          <p className="finance-text">Calender to keep track of paying debts,salaries or any important financial event </p>
        </div>
      </div>
    </section>
  );
};

export default FinanceSection;
