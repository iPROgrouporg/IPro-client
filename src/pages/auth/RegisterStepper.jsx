import React from "react";

const steps = [
  { title: "Ro'yxatdan o'tish", description: "Iltimos ma'lumotlarni to'ldiring" },
  { title: "Telefon raqamni tasdiqlash", description: "SMS kod yuborildi" },
  { title: "Yakuniy qism", description: "Muvaffaqiyatli ro'yxatdan o'tildi!" },
];

// O'ng panel uchun stepper (dumaloq bosqichlar)
export const StepperCircles = ({ currentStep = 1 }) => {
  return (
    <div className="flex flex-col items-start space-y-6 w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        const circleClass = `
          w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 text-sm sm:text-base
          ${isCompleted ? "border-blue-600 text-blue-600 bg-white" : ""}
          ${isActive ? "border-blue-600 text-blue-600 bg-white" : ""}
          ${!isActive && !isCompleted ? "border-gray-300 text-gray-400 bg-white" : ""}
        `;

        return (
          <div key={stepNumber} className="flex flex-col items-start">
            <div className="flex items-center space-x-3">
              <div className={circleClass.trim()}>
                {isCompleted ? "✓" : stepNumber}
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base text-white">{step.title}</p>
                <p className="text-xs sm:text-sm text-gray-300">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-6 sm:h-8 border-l-2 ml-3 ${
                  currentStep > stepNumber ? "border-blue-400" : "border-gray-400"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Chap panel uchun progress bar
export const ProgressBar = ({ currentStep = 1 }) => {
  return (
    <div className="flex items-center justify-between mt-4 sm:mt-6 w-full">
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        return (
          <div
            key={stepNumber}
            className={`flex-1 h-[3px] mx-1 transition-colors duration-300 ${
              currentStep >= stepNumber ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};