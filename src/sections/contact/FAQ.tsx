interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What should I bring to my first class?",
    answer:
      "Just grip socks (sold at the front desk if you don't have any) and water. Reformers require grip socks — no bare feet.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Cancel or reschedule up to 4 hours before class with no penalty. Late cancellations forfeit the class from your pack or membership.",
  },
  {
    question: "Do I need experience to take a reformer class?",
    answer:
      "No experience required. Instructors walk first-timers through the machine before class, and every session can be modified to your level.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes — street parking is available on Santa Monica Blvd, plus a validated lot behind the building.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="bg-base-200 flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display text-center text-2xl font-semibold lg:text-4xl">
          FAQ
        </h2>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="collapse-plus bg-base-100 border-base-300 collapse border"
              open={index === 0}
            >
              <summary className="collapse-title font-semibold">
                {faq.question}
              </summary>
              <div className="collapse-content text-sm">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
