import { useState } from 'react';
import Image from 'next/image';

type AnswerPart = {
  text?: string; // Plain text
  link?: { text: string; url: string }; // Dynamic link text and URL
  image?: string; // Image filename
  button?: string;
};

type Step = {
  text?: string; // Step text
  link?: { text: string; url: string }; // Link within the step
  image?: string; // Optional image for the step
};

type FAQItem = {
  question: string;
  answer?: AnswerPart[]; // Regular answers
  steps?: Step[]; // Step-by-step guide
};

type FAQProps = {
  faqs: FAQItem[];
  imagePath: string; // Base path for images
};

export default function FAQ({ faqs, imagePath }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswer = (answer: AnswerPart[]) => {
    return answer.map((part, index) => {
      if (part.link) {
        return (
          <span key={index}>
            {part.text}
            <a
              href={part.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              {part.link.text}
            </a>
          </span>
        );
      } else if (part.image) {
        return (
          <div key={index} className="flex justify-center my-4">
            <Image
              src={`${imagePath}/${part.image}`}
              alt={part.image}
              width={0}
              height={0}
              sizes="60vw"
              className="w-2/5 rounded-lg"
            />
          </div>
        );
      } else if (part.button) {
        return (
          // <button
          //   onClick={() => {
          //     setBookDemo(true);
          //     window.scrollTo({ top: 0, behavior: "smooth" });
          //   }}
          //   className="px-2 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          // >
          //   Book a Demo
          // </button>
          <nav key={index} className="space-x-4">
            <a
              href="https://meetings.hubspot.com/neha-bhuchar?uuid=afebf53a-e64a-4c54-9d06-9bf8cd9eb995"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                {/* <button
                  onClick={() => setBookDemo(!bookDemo)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                > */}
                  {/* {bookDemo ? "Back to Results" : "Book a Demo"} */}
                  Book a Demo
                {/* </button> */}
            </a>
          </nav>
        );
      }
      return <span key={index}>{part.text}</span>;
    });
  };

  const renderSteps = (steps: Step[]) => {
    return (
      <ol className="list-decimal ml-6 space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-600">
            {step.text && <span>{step.text}</span>}
            {step.link && (
              <a
                href={step.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mx-1"
              >
                {step.link.text}
              </a>
            )}
            {step.image && (
              <div key={index} className="flex justify-center my-4">
                <Image
                  src={`${imagePath}/${step.image}`}
                  alt={step.image}
                  width={0}
                  height={0}
                  sizes="60vw"
                  className="w-2/5 rounded-lg"
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="p-4">
      <div className="bg-[#fef6ff] p-8 rounded-lg shadow-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-m font-semibold text-gray-800"
              >
                {faq.question}
                <span>{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="text-gray-600 mt-2">
                  {faq.answer && renderAnswer(faq.answer)}
                  {faq.steps && renderSteps(faq.steps)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
