import React, { useState } from "react";
import { NextPage } from "next/types";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { paymentContract } from "components/blockchain";
import { hexBalance } from "utils";
import { useRecoilValue } from "recoil";
import { walletState } from "~/stores";

const Create: NextPage = () => {
  const wallet = useRecoilValue(walletState);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent, onChangeContent] = useInput<string>("");
  const [price, setPrice, onChangePrice] = useInput<number>(0);
  // const [prepareKey, setPrepareKey] = useState("");
  // const [prepareLogKey, setPrepareLogKey] = useState("");
  // const [paymentInfo, setPaymentInfo] = useState({
  //   key: "",
  //   title: "",
  //   orderName: "",
  //   price: 0,
  //   owner: "",
  // });
  // const [paymentEvent, setPaymentEvent] = useState([]);
  // const [paymentkeyList, setPaymentKeyList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // const [isCopy, setIsCopy] = useState(false);
  // const [isRefresh, setIsRefresh] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const registerHandler = async () => {
    if (title.length === 0) {
      alert("Please enter your title");
      return;
    }

    if (price < 0.01) {
      alert("A minimum of 0.01 klay is required");
      return;
    }

    try {
      await paymentContract.methods
        .prepareKeyRegister(title, content, hexBalance(price))
        .send({
          from: wallet.address,
          gas: 10000000,
        });

      const lastKey = await paymentContract.methods
        .lastKey(wallet.address)
        .call();
      alert("Successfully registered");
      setCurrentKey(lastKey);
    } catch (err) {
      alert("Error! Please check for sufficient gas or network");
      return;
    }

    setTitle("");
    setContent("");
    setPrice(0);
  };

  return (
    <></>
    // <div className="min-h-screen bg-zinc-50">
    //   <div className="max-w-[1200px] mx-auto pt-28 ">
    //     <div className="flex">
    //       <div className="w-1/4">
    //         <ul>
    //           <li>1</li>
    //           <li>2</li>
    //           <li>3</li>
    //         </ul>
    //       </div>
    //       <form className="w-3/4">
    //         <div className="border shadow rounded">
    //           <div className="bg-white rounded px-4 py-5 sm:p-6">
    //             <div className="grid grid-cols-6 gap-6">
    //               <div className="col-span-6 sm:col-span-4">
    //                 <label
    //                   htmlFor="payment-title"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Title
    //                 </label>
    //                 <input
    //                   type="text"
    //                   name="payment-title"
    //                   id="payment-title"
    //                   autoComplete="payment-title"
    //                   value={title}
    //                   onChange={onChangeTitle}
    //                   className="mt-1 block w-full rounded p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //                 />
    //               </div>

    //               <div className="col-span-6">
    //                 <label
    //                   htmlFor="payment-content"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Content
    //                 </label>
    //                 <textarea
    //                   name="payment-content"
    //                   id="payment-content"
    //                   autoComplete="payment-content"
    //                   value={content}
    //                   onChange={onChangeContent}
    //                   className="scrollUI mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //                 />
    //               </div>

    //               <div className="col-span-6 sm:col-span-6 lg:col-span-2">
    //                 <label
    //                   htmlFor="payment-price"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Price
    //                 </label>
    //                 <input
    //                   type="text"
    //                   name="payment-price"
    //                   id="payment-price"
    //                   autoComplete="payment-price"
    //                   value={price}
    //                   onChange={onChangePrice}
    //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //                 />
    //                 <p className="mt-1 text-sm text-gray-600">
    //                   currency : klay
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="bg-gray-50 justify-between px-4 py-3 text-right sm:px-6">
    //             <button
    //               onClick={registerHandler}
    //               type="button"
    //               className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //             >
    //               Register
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Create;
