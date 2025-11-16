"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const indexes: { name: string; value: IndexType }[] = [
    { name: "NIFTY50", value: "nifty50" },
    { name: "BANKNIFTY", value: "banknifty" },
    { name: "FINNIFTY", value: "finnifty" },
    { name: "SENSEX", value: "sensex" },
  ];

  const LOT_SIZES = {
    nifty50: 75,
    banknifty: 30,
    finnifty: 50,
    sensex: 30,
  };

  const [amount, setAmount] = useState<string>("");
  const [ltp, setLtp] = useState<string>("0");
  const [lotSize, setLotSize] = useState<number>(75);
  const [capital, setCapital] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [lots, setLots] = useState<number>(0);
  type IndexType = "nifty50" | "banknifty" | "finnifty" | "sensex";
  const [selectedIndex, setSelectedIndex] = useState<IndexType>("nifty50");

  useEffect(() => {
    const amountValue = parseFloat(amount);
    const ltpValue = parseFloat(ltp);

    if (!isNaN(amountValue) && !isNaN(ltpValue) && ltpValue > 0) {
      const selectedLotSize = LOT_SIZES[selectedIndex];
      let qty = Math.floor(amountValue / ltpValue);
      qty = Math.floor(qty / selectedLotSize) * selectedLotSize;
      const lotCount = qty / selectedLotSize;
      const requiredCap = lotCount * selectedLotSize * ltpValue;

      setLotSize(selectedLotSize);
      setQuantity(qty);
      setLots(lotCount);
      setCapital(requiredCap);
    } else {
      setQuantity(0);
      setLots(0);
      setCapital(0);
    }
  }, [amount, ltp, selectedIndex]);

  const handleIndexChange = (index: IndexType) => {
    setSelectedIndex(index);
    setLotSize(LOT_SIZES[index]);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleLtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLtp(e.target.value);
  };

  const handleAmountDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAmount(e.target.value);
  };

  const calculateResults = () => {
    const amountValue = parseFloat(amount);
    const ltpValue = parseFloat(ltp);
    if (!isNaN(amountValue) && !isNaN(ltpValue)) {
      const lotSize = LOT_SIZES[selectedIndex];
      let quantity = Math.floor(amountValue / ltpValue);
      quantity = Math.floor(quantity / lotSize) * lotSize;
      const lots = quantity / lotSize;
      const requiredCapital = lots * lotSize * ltpValue;

      setQuantity(quantity);
      setLots(lots);
      setCapital(requiredCapital);
    }
  };

  const resetCalculator = () => {
    setAmount("");
    setLtp("");
    setSelectedIndex("nifty50");
    setLotSize(75);
    setQuantity(0);
    setLots(0);
    setCapital(0);
  };
  const formatIndianNumber = (value: number | string) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-16 sm:mt-10 overflow-hidden h-full">
      <section>
        <div className="relative mx-auto  max-w-5xl rounded-lg bg-white/20 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-md p-6">
          <h1 className="text-center text-2xl font-bold text-blue-500 dark:text-white md:text-3xl">
            Quantity Calculator
          </h1>
        </div>

        <div className="px-4 pt-6 lg:px-4">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Select Index :
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
            {indexes.map(({ name, value }) => (
              <button
                key={value}
                onClick={() => handleIndexChange(value)}
                className={`index-btn w-full rounded border p-3 text-sm font-medium transition-all duration-200 sm:p-4 ${
                  selectedIndex === value
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-900"
                }`}
                aria-pressed={selectedIndex === value ? "true" : "false"}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 pt-3">
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 mt-3">
              <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                Enter Amount :
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-2/3">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    id="amount"
                    className=" pl-7  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter manually..."
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <select
                  id="amountDropdown"
                  className="block p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-1/3"
                  onChange={handleAmountDropdownChange}
                  value={amount}
                >
                  <option value="">Quick</option>
                  <option value="100000">1 Lakh</option>
                  <option value="500000">5 Lakhs</option>
                  <option value="1000000">10 Lakhs</option>
                  <option value="2500000">25 Lakhs</option>
                  <option value="5000000">50 Lakhs</option>
                  <option value="10000000">1 Crore</option>
                  <option value="50000000">5 Crore</option>
                  <option value="100000000">10 Crore</option>
                  <option value="1000000000">100 Crore</option>
                </select>
              </div>
            </div>

            {/* LTP Input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                Enter LTP (Last Traded Price) :
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  id="ltp"
                  className=" pl-7 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter LTP..."
                  value={ltp}
                  onChange={handleLtpChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Results :
            </h3>
            <button
              onClick={resetCalculator}
              className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-white text-gray-900 dark:text-white rounded text-sm font-medium"
            >
              Reset
            </button>
          </div>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-white">
                  Selected Index
                </td>
                <td className="py-3 text-right font-medium text-blue dark:text-white">
                  {selectedIndex.toUpperCase()}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-white">Lot Size</td>
                <td className="py-3 text-right font-medium text-blue dark:text-white">
                  {formatIndianNumber(lotSize)}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-white">LTP :</td>
                <td className="py-3 text-right font-medium text-blue dark:text-white">
                  {formatIndianNumber(ltp)}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-white">Quantity</td>
                <td className="py-3 text-right font-medium text-blue-500 dark:text-blue-600">
                  {formatIndianNumber(quantity)}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-white">Lots</td>
                <td className="py-3 text-right font-medium text-blue-500 dark:text-blue-600">
                  {formatIndianNumber(lots)}
                </td>
              </tr>
              <tr>
                <td className="py-3 text-gray-900 dark:text-white">
                  Required Capital
                </td>
                <td className="py-3 text-right font-medium text-blue-500 dark:text-blue-600">
                  ₹{Math.round(capital).toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section
        aria-labelledby="calculator-guide"
        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-8 px-4 sm:px-8 mt-6"
      >
        <h2
          id="calculator-guide"
          className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8"
        >
          How to Use the Quantity Calculator
        </h2>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 1: Choose an Index
            </h3>
            <p className="mt-2 leading-relaxed">
              Select an index like{" "}
              <strong>NIFTY50, BANKNIFTY, FINNIFTY, or SENSEX</strong> by
              clicking the respective button.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 2: Enter Your Investment Amount
            </h3>
            <p className="mt-2 leading-relaxed">
              Type an amount manually or pick from a dropdown of predefined
              capital values.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 3: Enter the LTP (Last Traded Price)
            </h3>
            <p className="mt-2 leading-relaxed">
              Fill in the latest traded price of your selected index in the
              provided field.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 4: Review the Results
            </h3>
            <p className="mt-2 leading-relaxed">You'll instantly see:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Selected Index</li>
              <li>Lot Size</li>
              <li>LTP (Last Traded Price)</li>
              <li>Quantity Required</li>
              <li>Number of Lots</li>
              <li>Required Capital</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 5: Reset Anytime
            </h3>
            <p className="mt-2 leading-relaxed">
              Press the <strong>Reset</strong> button to clear all inputs and
              start over.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
