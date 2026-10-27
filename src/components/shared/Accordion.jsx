import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="accordion">
      {items.map(([question, answer], index) => (
        <details key={question} open={openIndex === index}>
          <summary
            onClick={(event) => {
              event.preventDefault();
              setOpenIndex(openIndex === index ? null : index);
            }}
          >
            {question}
            <b aria-hidden="true">{openIndex === index ? "−" : "+"}</b>
          </summary>
          {openIndex === index && <p>{answer}</p>}
        </details>
      ))}
    </div>
  );
}
