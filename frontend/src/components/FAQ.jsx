import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy. If you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange, provided the item is in its original condition."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days. We also offer expedited shipping options at checkout if you need your order sooner."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can calculate shipping at checkout."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can use this number to track your package on our carrier's website."
        },
        {
            question: "Are your sunglasses UV protected?",
            answer: "Absentlutely! All our sunglasses come with 100% UV400 protection to keep your eyes safe from harmful UVA and UVB rays."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600">
                        Have questions? We're here to help.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <button
                                className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center transition-colors duration-200"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={`text-lg font-semibold ${activeIndex === index ? 'text-blue-600' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}>
                                    {activeIndex === index ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
