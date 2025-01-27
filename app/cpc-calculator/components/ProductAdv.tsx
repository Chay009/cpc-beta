import React from "react";

interface HeaderProps {
  setBookDemo: (value: boolean) => void;
}

const ProductAdv: React.FC<HeaderProps> = ({ setBookDemo }) => {
  const handleBookDemoClick = () => {
    setBookDemo(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4">
      <div className="bg-blue-50 p-8 rounded-lg shadow-md mx-auto flex justify-between items-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-gray-900">
            Amazon PPC software that understands Retail!
          </h1>
          <p className="text-gray-700 mt-4">
            The only Amazon PPC software that combines Ads with retail signals like inventory, PPC cannibalization and competition. Optimize spend, increase sales and improve advertising performance by elevating your Amazon ads strategy.
          </p>
          {/* <button
            onClick={handleBookDemoClick}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Book a Demo
          </button> */}
          <nav className="mt-6">
            <a
              href="https://meetings.hubspot.com/neha-bhuchar?uuid=afebf53a-e64a-4c54-9d06-9bf8cd9eb995"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Book a Demo
            </a>
          </nav>
        </div>
        <div className="w-1/2 p-4">
          <img
            src="https://app-pages.storylane.io/company/company_0268acbc-1975-44ad-bcec-c2ff12516526/project/project_05f27227-1272-42e9-8336-fed34cd7c504/page/7smutlobi0ysgc3xzx7napl7703c"
            alt="Dashboard preview"
            width="600"
            height="400"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAdv;
