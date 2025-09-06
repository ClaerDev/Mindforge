import React from "react";
import { SparklesText } from "../magicui/sparkles-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqsList = [
  {
    question: "How does MindForge work?",
    answer:
      "MindForge uses advanced machine learning algorithms to analyze and understand your photos. It then generates new images based on your features and the scenarios you choose, creating realistic and personalized results.",
  },
  {
    question: "Is my data safe with MindForge?",
    answer:
      "Yes, we take data privacy very seriously. All uploaded photos and generated images are encrypted and stored securely. We never share your personal data or images with third parties without your explicit consent.",
  },
  {
    question: "How many photos do I need to upload for best results?",
    answer:
      "For optimal results, we recommend uploading at least 10-20 diverse photos of yourself. This helps our model better understand your features and expressions, leading to more accurate and realistic generated images.",
  },
  {
    question: "Can I use MindForge for commercial purposes?",
    answer:
      "Yes, our Pro and Enterprise plans include commercial usage rights for the images you generate. However, please note that you should always respect copyright and privacy laws when using generated images.",
  },
  {
    question: "How often do you update the model?",
    answer:
      "We continuously work on improving our model. Major updates are typically released quarterly, with minor improvements and optimizations happening more frequently. All users benefit from these updates automatically.",
  },
  {
    question: "What are the differences between the free and paid plans?",
    answer:
      "The free plan allows you to generate up to 5 images per day. The Pro plan includes unlimited image generation, higher resolution output, and access to additional features. The Enterprise plan is tailored for businesses and offers custom integrations and dedicated support.",
  },
];

const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <AccordionItem
      value={question}
      className="border border-gray-200 dark:border-gray-700 rounded-xl mb-4 overflow-hidden shadow-sm"
    >
      <AccordionTrigger className="text-left text-lg sm:text-xl font-medium px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const Faqs = () => {
  return (
    <section
      className="w-full bg-muted py-20 sm:py-32 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      id="faqs"
    >
      <SparklesText className="text-3xl xs:text-4xl sm:text-5xl font-bold text-center">
        Frequently Asked Questions
      </SparklesText>
      <p className="mt-4 text-base sm:text-lg text-center max-w-2xl text-muted-foreground">
        Here are some of the most frequently asked questions about MindForge.
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mt-10 sm:mt-16"
      >
        {faqsList.map((faq) => (
          <Question key={faq.question} {...faq} />
        ))}
      </Accordion>
    </section>
  );
};

export default Faqs;
