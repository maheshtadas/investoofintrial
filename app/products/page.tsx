"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuantityCalc from "@/components/QuantityCalc";

export default function ProductsSection() {
  // Set "calculator" as the default active content
  const [activeContent, setActiveContent] = useState<"calculator" | "tools">(
    "calculator"
  );

  return (
    <div>
      {/* Heading and buttons */}
      <div className="mx-auto max-w-5xl px-6 pt-16 mt-10 flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Heading on the left */}
        <h3 className="text-3xl font-semibold leading-tight md:leading-snug mb-3 md:mb-0">
          Products :
        </h3>

        {/* Buttons on the right on desktop */}
        <div className="flex gap-4 md:ml-auto">
          <Button
            size="lg"
            className="rounded-xl px-5"
            onClick={() => setActiveContent("calculator")}
          >
            Quantity Calculator
          </Button>
          <Button
            size="lg"
            className="rounded-xl px-5"
            onClick={() => setActiveContent("tools")}
          >
            New tool
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div>
        {activeContent === "calculator" && (
          <div>
            <QuantityCalc />
          </div>
        )}
        {activeContent === "tools" && (
          <div>
            <div className="relative mx-auto  max-w-5xl rounded-lg bg-white/20 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-md p-6">
              <h1 className="text-center text-2xl font-bold text-blue-500 dark:text-white md:text-3xl">
                Coming soon
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
