import React from "react";

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  let content;

  switch (selectedTab) {
    case "company":
      content = (
        <div>
          <h3>Our Company</h3>
          <p>
            We are a leading provider of health and wellness solutions. Our mission is to empower women to take control of their health and financial well-being.
          </p>
        </div>
      );
      break;
    case "mission":
      content = (
        <div>
          <h3>Our Mission</h3>
          <p>
            Our mission is to help women improve their overall wellness by providing personalized health insights and financial advice.
          </p>
        </div>
      );
      break;
    case "vision":
      content = (
        <div>
          <h3>Our Vision</h3>
          <p>
            Our vision is to create a world where women have the tools to make informed decisions about their health and finances for a better future.
          </p>
        </div>
      );
      break;
    default:
      content = <div>Please select a tab to see the content.</div>;
  }

  return <div>{content}</div>;
};

export default TabContent;
