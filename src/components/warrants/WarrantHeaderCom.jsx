import React from "react";
import numberToWords from "../../helpers/NumberTowords";
import formatNumber from "../../helpers/formatNumber";
import localImgLoader from "../../helpers/localImageLoader";

export default function WarrantHeaderCom({ amt, status, warrantNumber, warrant_type }) {

  const currentYear = new Date().getFullYear()
 
  return (
    <>
      {status ? (
        <div className="w-full text-justify text-black dark:text-slate-high text-base print:text-sm font-medium flex flex-col gap-4">
          <div className="hidden print:flex font-extrabold text-2xl flex-col items-center gap-0">
            <img className="w-[150px] h-auto" src={localImgLoader('logos/Abia_logo.png')} />
            <div className="w-full text-center -mt-5">
              <h1 className="text-black">GOVERNMENT OF ABIA STATE</h1>
              <h1 className="text-emerald-600">OFFICE OF THE HONOURABLE COMMISSIONER</h1>
              <h1 className="text-red-500 italic">MINISTRY OF FINANCE</h1>
            </div>
            <div className="relative w-full h-[.5px] bg-emerald-600 overflow-visible"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <p className="">{warrant_type == 'recurrent' ? 'RECURRENT' : 'CAPITAL'} EXPENDITURE RELEASE WARRANT NO. {warrantNumber}</p>
              <p className="">Ref: MOF/HCF/CEW/{warrantNumber}</p>
            </div>
              <div className="w-full">
                <p className="">The Accountant-General</p>
                <p className="">Office of the Accountant-General Umuahia</p>
                <p className="">Abia State of Nigeria</p>
              </div>
          </div>
          <div className="w-full flex flex-col gap-3 border border-slate-300 p-2 rounded-sm">
            <p className="">
              {`YOU are hereby authorized and required to expend out of the Capital
                  Development Fund during the Financial Year ${currentYear} a sum not exceeding
                  ${numberToWords(amt)} (₦${formatNumber(amt)}) being part of the funds appropriated
                  as Capital Expenditure for the Provision services in Abia State for
                  the financial year, ${currentYear}.`}
            </p>
            <p className="">
              {`PROVIDED that the amount so expended on any one sub-organizational/code shall not exceed the amount entered against that sub-organizational code in the schedule subjoined hereto.`}
            </p>
            <p className="">
              {`AND for so doing, this together with the Accounts, Certificates and Acquaintances prescribed in the Laws and Instruments of Abia State of Nigeria shall be your sufficient warrant and discharge.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-black dark:text-slate-high min-h-22 text-base print:text-sm font-medium w-full border border-slate-300 p-1 rounded-sm">
          <p className='print:text-red-500 font-extrabold text-black dark:text-slate-high'>Please note that this warrant in under review, and thus you must login after review and update, to generate this warrant as a working document</p>
          <p className="">
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
