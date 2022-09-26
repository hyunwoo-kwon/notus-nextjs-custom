import React, { useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai"
import Animation from "./Animation";


export default function CollectionInfo(props) {

    const [searchedAddress, setSearchedAddress] = useState(props.SearchAddress)
    // console.log(searchedAddress)

    return (
        <>
            <div className="w-full bg-slate-50 mt-10">
                <div className="w-full flex shadow-md">

                    <div className="w-full flex items-center h-full pr-10">
                        <div className="ml-32 justify-center">
                            <Animation />
                        </div>
                        <strong className="text-xl w-full text-left ml-10">
                            돈 졸라 많이 버셨네요! 축하드려요!!!  <br /> 떡상 축 46% 냠냠 중이심
                        </strong>
                        <div>
                            <div className="py-2 md:px-4 mx-2 rounded-md my-auto h-30 w-20 border-2 border-slate-800">
                                <img
                                    className="rounded-t-xl ml-2 mb-1 "
                                    src="../img/google.svg"
                                    alt="cover image"
                                    width="25px"
                                    height="25px"
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <p className="leading-snug text-center font-medium text-sm text-gray-900">TOTAL <br /> {props.Collection.length}</p>
                            </div>
                        </div>
                        <div>
                            <div className="py-2 md:px-4 mx-2 rounded-md my-auto h-30 w-20 border-2 border-slate-800">
                                <img
                                    className="rounded-t-xl ml-3 mb-1 "
                                    src="../img/eth-logo.svg"
                                    alt="cover image"
                                    width="15px"
                                    height="15px"
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <p className="leading-snug text-center font-medium text-sm text-gray-900">ETH <br /> {props.Collection.length}</p>
                            </div>
                        </div>
                        <div>
                            <div className="py-2 md:px-4 mx-2 rounded-md my-auto h-30 w-20 border-2 border-slate-800">
                                <img
                                    className="rounded-t-xl ml-2 mb-1 "
                                    src="../img/vue.jpg"
                                    alt="cover image"
                                    width="25px"
                                    height="25px"
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <p className="leading-snug text-center font-medium text-sm text-gray-900">klaytn <br /> {props.Collection.length}</p>
                            </div>
                        </div>
                        <div>
                            <div className="py-2 md:px-4 mx-2 rounded-md my-auto h-30 w-20 border-2 border-slate-800">
                                <img
                                    className="rounded-t-xl ml-2 mb-1 "
                                    src="../img/react.jpg"
                                    alt="cover image"
                                    width="25px"
                                    height="25px"
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <p className="leading-snug text-center font-medium text-sm text-gray-900">Sol <br /> {props.Collection.length}</p>
                            </div>
                        </div>


                    </div>
                    <div className="w-1/6 hidden md:block">
                        <div className="bg-slate-700 text-white py-1 "> Connected Wallets : {searchedAddress.length}</div>
                        <div className="bg-gray-200 p-4 overflow-y-scroll h-28">
                            {searchedAddress.map((item, key) => (
                                <div className="flex text-sm mb-2 content-center align-middle" key={item.id}>
                                    <div className="bg-gray-100 rounded-lg items-center focus:outline-none border border-slate-300 shadow-md p-2 w-84 flex flex-wrap">
                                        <p className="text-xs overflow-hidden">{item.id}</p>
                                        <span className="ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-sky-200">
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
                <div className="h-1 bg-blue-100 shadow-md"></div>
            </div>
        </>
    );
}
