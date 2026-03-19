import React from "react";
import "../css/DidYouKnow.css";

const DidYouKnow: React.FC = () => {
  const items = [
    {
      title: "Registered Disability Savings Plan (RDSP)",
      description:
        "A registered disability savings plan (RDSP) is a savings plan to help parents and others save for.",
    },
    {
      title: "Advantages of spousal RRSP",
      description:
        "The RRSP rules allow an individual to contribute to an RRSP for his or her spouse.",
    },
    {
      title: "First time home buyer plan (HBP)",
      description:
        "If you are purchasing or building a home for the first time, the first time Home Buyer’s Plan.",
    },
    {
      title: "Differences between disability and critical illness coverage",
      description:
        "Disability insurance is designed to assist the individual when unable to work.",
    },
    {
      title: "Statistics about critical illnesses",
      description:
        "Lifetime probability of developing some form of cancer in someone’s lifetime.",
    },
    {
      title: "Life long learning plan (LLP)",
      description:
        "The Lifelong Learning Plan (LLP) is a Canada Revenue Agency program.",
    },
  ];

  return (
    <section className="did-section">
      <div className="container">
        <h2 className="did-title">Did you know?</h2>

        <div className="did-grid">
          {items.map((item, index) => (
            <div className="did-card" key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href="#">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DidYouKnow;