/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect, useState} from "react";
import Link from "next/link";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import axios from "axios";
import {SearchAddressParam} from "../form/SearchAddressParam";
import {Input} from "postcss";
import Alert from "./Alert";

export default function Index() {
  const [InputAddress, setInputAddress] = useState("0x53f06FCf84E683309583377d00659E009f82659e");
  const [SearchAddress, setSearchAddress] = useState([]);
  const [Searching, setSearching] = useState(false);
  const [Alert, setAlert] = useState('false');

  const onChange = (event) =>{
    setInputAddress(event.target.value);
  }

  const SearchAddClick = (event) => {
    if (SearchAddress.findIndex(search => search.id===InputAddress)!='-1'||InputAddress===''){
        setInputAddress("");
    }else{
        let param = new SearchAddressParam("kip17",InputAddress);
        setInputAddress("");

        setSearching(true);

        axios.post('/hyperwebs/nftcountlistowner',param.value)
            .then(function(response){
                let test = response.data;

                setSearchAddress(SearchAddress =>[...SearchAddress, { id:InputAddress, countCollection: test[0].countCollection}]);

                setSearching(false);
            })
            .catch(function (error){
                setSearching(false);
            });

    }
  }

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Total NFT
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    How much NFT assets do you have? <br/>
                    Check it right now by simply entering wallet address.
                </p>
              {/* border-solid border-2 border-sky-500 */}
              <div className="mt-12 flex mb-3 ">
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
                  className="flex bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Search address
                </button>
              </div>
                {SearchAddress.map((item, key) => (

                    <div className="flex border-x-4 border-indigo-500 mb-2" key={item.id}>

                        <span className="font-bold"> Address</span> : {item.id}
                        <span className="ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 uppercase last:mr-0 mr-1">

                            {item.countCollection} {item.countCollection>1 ? 'Collections' : 'Collection' }
                        </span>

                    </div>

                ))}
                {Searching ? (
                    <div className="block mb-4">
                        <i className="fas fa-circle-notch animate-spin text-gray-500 mr-3 text-sm "></i>
                    </div>
                ): null }
            </div>
              <div className="mt-10 text-center">
                  <button
                      onClick={SearchAddClick}
                      className=" bg-pink-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      View all collection
                      <i className="ml-3 fas fa-list"></i>
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
      <Footer />
    </>
  );
}
