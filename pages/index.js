/* eslint-disable react/jsx-no-target-blank */
import React, { useCallback, useEffect, useState } from "react";
import uuid from "react-uuid";
import axios from "axios";
import { SearchAddressParam } from "../form/SearchAddressParam";
import { useRouter } from 'next/router'
import { AiFillCloseCircle } from "react-icons/ai"
import WalletList from "components/WalletList";
import Image from "next/image";

export default function Index() {
  console.log("Index render")
  const router = useRouter();
  const [InputAddress, setInputAddress] = useState("0x53f06FCf84E683309583377d00659E009f82659e");
  const [SearchAddress, setSearchAddress] = useState([]);
  const [Searching, setSearching] = useState(false);
  const [TotalCountCollection, setTotalCountCollection] = useState(0);
  const [EthereumCountCollection, setEthereumCountCollection] = useState(0);
  const [KlaytnCountCollection, setKlaytnCountCollection] = useState(0);
  const [WorkUUID, setWorkUUID] = useState(uuid());

  const onChange = (event) => {
    setInputAddress(event.target.value);
  }

  const RandomSearchWallet = () => {
    WalletList.sort(() => 0.5 - Math.random())
    setInputAddress(WalletList[0])
    WalletList.shift();
  }

  const SearchAddClick = (event) => {
    if (SearchAddress.findIndex(search => search.id === InputAddress) != '-1' || InputAddress === '') {
      setInputAddress("");
    } else {
      let param = new SearchAddressParam("", InputAddress, WorkUUID);

      setInputAddress("");

      setSearching(true);

      axios.post('/hyperwebs/eoanftcount', param.value)
        .then(function (response) {
          let data = response.data;

          setSearchAddress(SearchAddress => [...SearchAddress, { id: InputAddress, type: data[0].type, countCollection: data[0].countCollection }]);

          setTotalCountCollection(TotalCountCollection + data[0].countCollection);

          if(data[0].type === "klaytn"){
            setKlaytnCountCollection(KlaytnCountCollection + data[0].countCollection);
          }else if(data[0].type === "ethereum"){
            setEthereumCountCollection(EthereumCountCollection + data[0].countCollection);
          }

          setSearching(false);
        })
        .catch(function (error) {
          setSearching(false);
        });

    }
  }

  function DeleteAddress(Address) {
    let param = new SearchAddressParam("kip17", Address, WorkUUID);

    axios.post('/hyperwebs/deladdress', param.value)
      .catch(function (error) {
        console.log("error = " + error)
      });

  }

  return (
    <>
      <section className="header relative pt-16 items-center flex min-h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Total NFT
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                How much NFT assets do you have? <br />
                Check it right now by simply entering wallet address.
              </p>
              {/* border-solid border-2 border-sky-500 */}
              <div className="mt-10 flex mb-3 ">
                <input
                  type="text"
                  className="border-1 px-3 py-3 mr-3 placeholder-blueGray-300 text-blueGray-600
                                bg-white rounded text-sm shadow focus:outline-none focus:ring w-full
                                ease-linear transition-all duration-150"
                  placeholder="Please write your Klaytn wallet address"
                  onChange={onChange}
                  value={InputAddress}
                />
                <button
                  onClick={SearchAddClick}
                  className="flex bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150 " type="button">
                  Search address
                </button>
                <button
                  onClick={RandomSearchWallet}
                  className="flex bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150 " type="button">
                  Random wallet
                </button>
              </div>
              {SearchAddress.map((item, key) => (

                <div className="flex text-sm mb-4" key={item.id}>
                  <div className="flex bg-gray-100 rounded-full items-center hover:bg-gray-300 focus:outline-none border border-slate-300 shadow-md p-2">
                    <span className="font-bold ml-1">
                      {item.type === 'klaytn' ? (
                      <img
                        className="rounded-t-xl ml-2 mb-1 "
                        src="../img/klaytn-klay-logo.png"
                        alt="cover image"
                        width="25px"
                        height="25px"
                        layout="responsive"
                        objectFit="cover"
                        quality={100}
                      />)
                      : item.type === 'ethereum' ? (
                        <img
                          src="../img/eth-logo.svg"
                          width="20px"
                          height="50%"
                        />)
                        : null
                    } </span>
                    <span className="ml-3">
                      {item.id}
                      </span>

                    <span className="ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-sky-200">

                      {item.countCollection} {item.countCollection > 1 ? 'Collections' : 'Collection'}
                    </span>
                  </div>
                  <AiFillCloseCircle className="text-2xl justify-center cursor-pointer" onClick={() => {
                    let copy = [...SearchAddress]
                    copy.splice(key, 1)
                    DeleteAddress(item.id);
                    setTotalCountCollection(TotalCountCollection - item.countCollection);

                    if(item.type === "klaytn"){
                      setKlaytnCountCollection(KlaytnCountCollection - item.countCollection);
                    }else if(item.type === "ethereum"){
                      setEthereumCountCollection(EthereumCountCollection - item.countCollection);
                    }

                    setSearchAddress(copy);
                    WalletList.unshift(item.id);
                  }} />
                </div>

              ))}
              {Searching ? (
                <div className="block mb-4">
                  <i className="fas fa-circle-notch animate-spin text-gray-500 mr-3 text-sm "></i>
                </div>
              ) : null}

            </div>

            <div className="mt-10 text-center ">
              <button
                onClick={() => {
                  router.push({
                    pathname: '/collections',
                    query: {
                      SearchAddress: JSON.stringify(SearchAddress),
                      WorkUUID: JSON.stringify(WorkUUID),
                      TotalCountCollection: JSON.stringify(TotalCountCollection),
                      KlaytnCountCollection : JSON.stringify(KlaytnCountCollection),
                      EthereumCountCollection : JSON.stringify(EthereumCountCollection)
                    }
                  })

                }}
                className=" bg-pink-500 text-white active:bg-indigo-600 mb-28 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 " type="button">
                View all collection
                <i className="ml-3 fas fa-list p-2"></i>
              </button>
            </div>

          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>
    </>
  );
}