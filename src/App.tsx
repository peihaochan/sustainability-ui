import { useEffect, useState } from "react";
import "./App.css";
import { ThreeDots } from "react-loading-icons";
import { IoIosInformationCircleOutline } from "react-icons/io";

const URLCONSTANT = {
  FIRST: "first",
  SECOND: "second",
};

function App() {
  const [firstUrl, setFirstUrl] = useState<string>("");
  const [secondUrl, setSecondUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [compareComplete, setCompareComplete] = useState<boolean>(false);
  const [firstUrlValue, setFirstUrlValue] = useState<number>(7);
  const [secondUrlValue, setSecondUrlValue] = useState<number>(9);
  const [showFirstInfo, setShowFirstInfo] = useState<boolean>(false);
  const [showSecondInfo, setShowSecondInfo] = useState<boolean>(false);

  // const urlRegex =
  //   /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-]*)*\/?$/;

  const handleUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    url: string
  ) => {
    url === URLCONSTANT.FIRST
      ? setFirstUrl(event.target.value)
      : setSecondUrl(event.target.value);
  };

  // const validateUrl = (url: string): boolean => {
  //   return urlRegex.test(url);
  // };

  const compareUrl = () => {
    if (firstUrl !== "" && secondUrl !== "") {
      setError(undefined);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCompareComplete(true);
      }, 1000);
    } else {
      setError("Please fill in both URLs");
    }
  };

  const clearUrl = () => {
    setFirstUrl("");
    setSecondUrl("");
    setCompareComplete(false);
    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(undefined);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="App flex flex-col h-screen w-screen justify-center items-center gap-6 relative">
      <div className="desktop:w-3/6 w-5/6">
        <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First URL link
        </label>
        <input
          type="text"
          id="first_url"
          value={firstUrl}
          onChange={(e) => handleUrlChange(e, URLCONSTANT.FIRST)}
          className="bg-gray-50 border border-[#3f7652] text-gray-900 text-sm rounded-lg focus:ring-[#3f7652] focus:border-[#3f7652] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example:https://www.asos.com/dont-think-twice/dtt-raw-edge-t-shirt-in-light-grey-marl/prd/206491797#colourWayId-206491798"
          required
        />
      </div>
      <div className="desktop:w-3/6 w-5/6">
        <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Second URL link
        </label>
        <input
          type="text"
          id="second_url"
          value={secondUrl}
          onChange={(e) => handleUrlChange(e, URLCONSTANT.SECOND)}
          className="bg-gray-50 border border-[#3f7652] text-gray-900 text-sm rounded-lg focus:ring-[#3f7652] focus:border-[#3f7652] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example:https://www.riverisland.com/p/black-slim-fit-jeans-387942"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          className="bg-[#3f7652] text-white p-4 rounded-[16px] min-w-36"
          onClick={() => compareUrl()}
        >
          {!loading ? (
            "Compare"
          ) : (
            <ThreeDots
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
              fill="#3f7652"
              fontSize={1}
            />
          )}
        </button>
        <button
          className="bg-[#3f7652] text-white p-4 rounded-[16px] min-w-36"
          onClick={() => clearUrl()}
        >
          Clear
        </button>
      </div>
      {error && (
        <div className="absolute top-2 bg-red-600 text-white w-auto p-4 rounded-[16px]">
          {error}
        </div>
      )}

      {/* Display Sliders after comparison */}

      <div
        className={`flex flex-col items-center gap-6 mt-8 ${
          compareComplete ? "visible" : "invisible"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          <label className="mb-2">First URL Sustainability Rating</label>
          <div className="relative w-full">
            <div className="absolute left-[0%] top-[15px]">0</div>
            <IoIosInformationCircleOutline
              className="text-[#3f7652] absolute right-[-10%] text-2xl cursor-pointer"
              onMouseEnter={() => setShowFirstInfo(true)}
              onMouseLeave={() => setShowFirstInfo(false)}
            />
            {showFirstInfo && (
              <div className="pointer-events-none absolute rounded-[16px] right-[-90%] p-4 bg-gray-50 border border-[#3f7652]">
                cotton 50%, wool 50%
              </div>
            )}
            <input
              type="range"
              min="0"
              max="15"
              value={firstUrlValue}
              readOnly
              className="slider w-full bg-[#3f7652]"
            />

            <div
              className="absolute top-[15px] left-[50%] translate-x-[-50%]"
              style={{ left: `${(firstUrlValue / 15) * 100}%` }}
            >
              ▲ {firstUrlValue}
            </div>
            <div className="absolute left-[100%] top-[15px]">15</div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center pt-5">
          <label className="mb-2">Second URL Sustainability Rating</label>
          <div className="relative w-full">
            <div className="absolute left-[0%] top-[15px]">0</div>
            <IoIosInformationCircleOutline
              className="text-[#3f7652] absolute right-[-10%] text-2xl cursor-pointer"
              onMouseEnter={() => setShowSecondInfo(true)}
              onMouseLeave={() => setShowSecondInfo(false)}
            />
            {showSecondInfo && (
              <div className="pointer-events-none absolute rounded-[16px] right-[-90%] p-4 bg-gray-50 border border-[#3f7652]">
                cotton 50%, wool 50%
              </div>
            )}
            <input
              type="range"
              min="0"
              max="15"
              value={secondUrlValue}
              readOnly
              className="slider w-full bg-[#3f7652]"
            />

            <div
              className="absolute top-[15px] left-[50%] translate-x-[-50%]"
              style={{ left: `${(secondUrlValue / 15) * 100}%` }}
            >
              ▲ {secondUrlValue}
            </div>
            <div className="absolute left-[100%] top-[15px]">15</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
