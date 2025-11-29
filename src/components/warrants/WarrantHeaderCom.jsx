import React from "react";
import numberToWords from "../../helpers/NumberTowords";
import formatNumber from "../../helpers/formatNumber";

export default function WarrantHeaderCom({ amt, status, warrantId }) {
 
  return (
    <>
      {status ? (
        <div className="w-full text-base print:text-sm font-medium flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <p className="dark:text-white-aside">RECURRENT EXPENDITURE RELEASE WARRANT NO. {warrantId}</p>
              <p className="dark:text-white-aside">Ref: MOF/HCF/CEW/{warrantId}</p>
            </div>
              <div className="w-full">
                <p className="dark:text-white-aside">The Accountant-General</p>
                <p className="dark:text-white-aside">Office of the Accountant-General Umuahia</p>
                <p className="dark:text-white-aside">Abia State of Nigeria</p>
              </div>
          </div>
          <div className="w-full flex flex-col gap-3 border border-slate-300 p-2 rounded-sm">
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
        </div>
      ) : (
        <div className="min-h-22 text-base print:text-sm font-medium w-full border border-slate-300 p-1 rounded-sm">
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
