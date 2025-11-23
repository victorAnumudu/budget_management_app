import React from "react";
import numberToWords from "../../helpers/NumberTowords";
import formatNumber from "../../helpers/formatNumber";

export default function WarrantHeaderCom({ amt, status }) {
  return (
    <>
      {status ? (
        <div className="text-base font-medium w-full flex flex-col gap-2 border border-slate-300 p-2 rounded-sm">
          <p className="dark:text-white-aside">
            {`YOU are hereby authorized and required to expend out of the Capital
                Development Fund during the Financial Year 2025 a sum not exceeding
                ${numberToWords(amt)} (₦${formatNumber(amt)}) being part of the funds appropriated
                as Capital Expenditure for the Provision services in Abia State for
                the financial year, 2025.`}
          </p>
          <p className="dark:text-white-aside">
            {`PROVIDED that the amount so expended on any one sub-organizational/code shall not exceed the amount entered against that sub-organizational code in the schedule subjoined hereto.`}
          </p>
          <p className="dark:text-white-aside">
            {`AND for so doing, this together with the Accounts, Certificates and Acquaintances prescribed in the Laws and Instruments of Abia State of Nigeria shall be your sufficient warrant and discharge.`}
          </p>
        </div>
      ) : (
        <div className="min-h-22 text-base font-medium w-full border border-slate-300 p-1 rounded-sm">
          <p className="dark:text-white-aside">
            Warrant for {" "}
            {numberToWords(amt)}{" "}
            <span className="italic">
              ({"₦"}
              {formatNumber(amt)})
            </span>
          </p>
        </div>
      )}
    </>
  );
}
