import React, { useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai"
import Animation from "./Animation";


export default function CollectionInfo(props) {

    const [searchedAddress, setSearchedAddress] = useState(props.SearchAddress)
    // console.log(searchedAddress)

    return (
        <>
            <div className="w-full bg-slate-50 mt-14">
                <div className=" h-120 md:h-48 grid md:grid-cols-5 sm:grid-cols-1 mx-auto shadow-md items-center align-middle place-content-center ">
                    <div className="col-span-1 mx-5 mt-10 sm:mt-0">
                        <span className="font-bold"> Summary </span>
                        {/* <div flex flex-wrap>
                            <div className="border border-slate-300 col-span-1">11241414124</div>
                            <div className="border border-slate-300 col-span-1">2</div>
                            <div className="border border-slate-300 col-span-1">3</div>
                            <div className="border border-slate-300 col-span-1">4</div>
                            <div className="border border-slate-300 col-span-1">5</div>
                        </div> */}
                        <div className="grid-cols-4 flex mt-2">
                            <div className="py-2 md:px-4 md:mx-5 rounded-md bg-slate-200 my-auto h-30 w-20 border-2 border-slate-800">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className={`text-lightBlue-600 w-6 h-6 inline-block`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                </svg>
                                <p className="leading-snug text-center">Total</p>
                                <h2 className="title-font font-medium text-md text-gray-900">
                                    {props.Collection.length}
                                </h2>
                            </div>
                            <div className="py-1 px-4 mx-1 rounded-lg bg-slate-300 my-auto h-30 w-20">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className={`text-lightBlue-600 w-8 h-8 mb-1 inline-block`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                </svg>
                                <p className="leading-snug">ETH</p>
                                <h2 className="title-font font-medium text-md text-gray-900">
                                    {props.Collection.length}
                                </h2>
                            </div>
                            <div className="py-1 px-4 mx-1 rounded-lg bg-red-200 my-auto h-30 w-20">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className={`text-lightBlue-600 w-8 h-8 mb-1 inline-block`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                </svg>
                                <p className="leading-snug">Sol</p>
                                <h2 className="title-font font-medium text-md text-gray-900">
                                    {searchedAddress.length}
                                </h2>
                            </div>
                            <div className="py-1 px-4 mx-1 rounded-lg bg-orange-200 my-auto h-30 w-20">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className={`text-lightBlue-600 w-8 h-8 mb-1 inline-block`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                </svg>
                                <p className="leading-snug">Klaytn</p>
                                <h2 className="title-font font-medium text-md text-gray-900 ">
                                    {searchedAddress.length}
                                </h2>
                            </div>
                            <div className="py-1 px-4 mx-1 rounded-lg bg-green-200 my-auto h-30 w-20">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className={`text-lightBlue-600  w-8 h-8 mb-1 inline-block`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 18v-6a9 9 0 0118 0v6" />
                                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                                </svg>
                                <p className="leading-snug">Price</p>
                                <h2 className="title-font font-medium text-md text-gray-900">
                                    132,000$
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center mx-auto ">
                        <div className="w-36 justify-center align-middle my-auto ">
                            <Animation />
                        </div>
                        <strong className="text-2xl w-full">
                            돈 졸라 많이 버셨네요! 축하드려요!!!  <br /> 떡상 축 46% 냠냠 중이심
                        </strong>
                    </div>
                    <div className="col-span-1 mx-5 mt-10 sm:mt-0">
                        <div className="bg-slate-700 text-white py-1 rounded-t-xl mt-1"> Connected Wallets : {searchedAddress.length}</div>
                        <div className="bg-gray-300 p-4 overflow-y-scroll h-32">
                            {searchedAddress.map((item, key) => (
                                <div className="flex text-sm mb-1 content-center align-middle" key={item.id}>
                                    <div className="bg-gray-100 rounded-lg items-center focus:outline-none border border-slate-300 shadow-md p-2 w-80 flex flex-wrap">
                                        <p className="text-xs overflow-hidden">{item.id}</p>
                                        <span className="ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-sky-200">
                                            {item.countCollection} {item.countCollection > 1 ? 'Collections' : 'Collection'}
                                        </span>

                                        <AiFillCloseCircle className="text-2xl ml-auto justify-end cursor-pointer z-15 " onClick={() => {
                                            let copy = [...searchedAddress]
                                            copy.splice(key, 1)
                                            setSearchedAddress(copy)

                                            // setCollection();
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
