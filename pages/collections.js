import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai"

// components
import { SearchAddressParam } from "../form/SearchAddressParam";
import axios from "axios";
import PageLoader from "next/dist/client/page-loader";
import { Link } from "react-scroll";

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress, setSearchAddress] = useState(JSON.parse(router.query.SearchAddress));
    const [WorkUUID, setWorkUUID] = useState(JSON.parse(router.query.WorkUUID));
    const [Collection, setCollection] = useState([]);
    const [CollectionImg, setCollectionImg] = useState([]);
    const [Price, setPrice] = useState([]);
    const [Loading, setLoading] = useState(false);
    const handleImgError = (e) => {
        e.target.src = "/img/default-item.png";
    }

    const addressList = SearchAddress.map((address) => <li key={address.id}>{address.id}</li>);
    const SearchCollection = () => {
        setLoading(true);
        let param;
        SearchAddress.forEach((item, index) => {
            if (index > 0) {
                param.addAddress("kip17", item.id);
            } else {
                param = new SearchAddressParam("kip17", item.id);
            }
        })

        setCollection([]);
        axios.post('/hyperwebs/nftlistowner', param.value)
            .then(function (response) {
                let data = response.data;

                data.forEach((d, index) => {
                    setCollection(collection => [...collection, {
                        id: index, type: 'kip17', address: d.address, contractAddress: d.contractAddress, tokenId: d.tokenId, tokenIdInt: d.tokenIdInt
                        , tokenUri: d.tokenUri, finalPrice: d.finalPrice
                    }])
                    setCollectionImg(img => [...img, {
                        id: 'img' + index, imageUrl: '', imageLoad: false
                    }])
                    setPrice(price => [...price, {
                        id: 'final' + index, finalPrice: '', floorPrice: '', priceLoad: false
                    }])
                })

                setLoading(false);
            })
    }

    function SearchImgURL(index) {
        let tempCollectionImg = [...CollectionImg];

        if (tempCollectionImg[index]?.imageLoad == false) {

            tempCollectionImg[index].imageLoad = true;
            setCollectionImg(tempCollectionImg);

            axios.get('/hyperwebs/nftimageurl?uri=' + Collection[index].tokenUri)
                .then(function (response) {
                    let data = response.data;
                    let tempCollectionImg = [...CollectionImg];

                    tempCollectionImg[index].imageUrl = data.url;
                    tempCollectionImg[index].imageLoad = true;

                    setCollectionImg(tempCollectionImg);
                })

        }
    }

    function SearchPrice(index) {
        let tempPrice = [...Price];

        if (tempPrice[index]?.priceLoad == false) {

            tempPrice[index].priceLoad = true;
            setPrice(tempPrice);

            axios.get('/hyperwebs/nftsingleprice?workUUID=' + WorkUUID + '&type=' + Collection[index].type + '&contractAddress=' + Collection[index].contractAddress + '&tokenId=' + Collection[index].tokenId)
                .then(function (response) {
                    let data = response.data;
                    let tempPrice = [...Price];

                    tempPrice[index].finalPrice = data.finalPrice;
                    tempPrice[index].floorPrice = data.floorPrice;

                    setPrice(tempPrice);
                })

        }
    }

    useEffect(() => {
        SearchCollection();
    }, []);

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <main>
                {Loading ? (
                    <div>
                        <div className="mb-4 flex flex-col items-center justify-center min-h-screen">
                            <i className="fas fa-circle-notch animate-spin text-gray-500 mr-10 text-6xl"></i>
                            <h1 className="mr-6 mt-3">Searching...</h1>
                        </div>
                    </div>

                ) : null}
                <section className="text-gray-400 body-font relative">
                    <div className="fixed z-10 right-10 bottom-10 w-20 h-20">

                        {/* 해당 위치로 스크롤 되며 올라오는 플로팅 버튼. 리스트가 길 경우 필요하면 사용 */}
                        <Link
                            className="shadow-xl cursor-pointer"
                            activeClass="active"
                            to="section1"
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={700}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 hover:text-gray-800 ">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    {Loading ? null : (
                        <div className="container px-5 mx-auto relative" id="section1">
                            <div className="flex flex-col text-center w-full mb-20 relative">
                                <h1 className="sm:text-3xl text-2xl font-extrabold title-font mb-4 text-gray-900">
                                    Your  NFT collections
                                </h1>
                            </div>
                            <div className="flex flex-wrap -m-4 text-center">
                                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className={`text-lightBlue-600 w-12 h-12 mb-3 inline-block`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                        </svg>
                                        <h2 className="title-font font-medium text-3xl text-gray-900">
                                            {SearchAddress.length}
                                        </h2>
                                        <p className="leading-relaxed">Account</p>
                                    </div>
                                </div>
                                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className={`text-lightBlue-600  w-12 h-12 mb-3 inline-block`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M3 18v-6a9 9 0 0118 0v6" />
                                            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                                        </svg>
                                        <h2 className="title-font font-medium text-3xl text-gray-900">
                                            {Collection.length}
                                        </h2>
                                        <p className="leading-relaxed">Collections</p>
                                    </div>
                                </div>
                                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className={`text-lightBlue-600 w-12 h-12 mb-3 inline-block`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M3 18v-6a9 9 0 0118 0v6" />
                                            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                                        </svg>
                                        <h2 className="title-font font-medium text-3xl text-gray-900">
                                            74
                                        </h2>
                                        <p className="leading-relaxed">Volume</p>
                                    </div>
                                </div>
                            </div>
                            {SearchAddress.map((item, key) => (
                                <div className="flex text-sm mb-4" key={item.id}>
                                    <div className="bg-gray-100 rounded-full items-center hover:bg-gray-300 focus:outline-none border border-slate-300 shadow-md p-2">
                                        <span className="font-bold ml-1"> Address</span> : {item.id}
                                        <span className="ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200">
                                            {item.countCollection} {item.countCollection > 1 ? 'Collections' : 'Collection'}
                                        </span>
                                    </div>
                                    <AiFillCloseCircle className="text-2xl justify-center cursor-pointer" onClick={() => {
                                        let copy = [...SearchAddress]
                                        copy.splice(key, 1)
                                        setSearchAddress(copy);
                                        // setCollection();
                                    }} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="py-24 mx-auto">
                        <div className="grid md:grid-cols-5 sm:grid-cols-2 mx-auto ">
                            {Collection?.map((item) => (
                                <div className="p-4" id={item.id}>
                                    <div
                                        className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg bg-cover cursor-pointer
                                                    overflow-hidden transition duration-300 transform hover:shadow-lg hover:scale-105">
                                        {CollectionImg[item.id]?.imageLoad == false ? (
                                            <img
                                                className="rounded-t-xl bg-cover"
                                                src="/img/loading.gif"
                                                onError={handleImgError}
                                                placeholder="Nft not found"
                                                alt="cover image"
                                                width={600}
                                                height={450}
                                                unoptimized={true}
                                                loading="eager"
                                                layout="responsive"
                                            />
                                        ) :
                                            CollectionImg[item.id]?.imageUrl === '' ? (
                                                <img
                                                    className="rounded-t-lg bg-cover"
                                                    src="/img/totalnft.png"
                                                    onError={handleImgError}
                                                    placeholder="Nft not found"
                                                    alt="cover image"
                                                    width={600}
                                                    height={450}
                                                    unoptimized={true}
                                                    loading="eager"
                                                    layout="responsive"
                                                />

                                            ) : CollectionImg[item.id]?.imageUrl.includes('.mp4') ? (
                                                <video>
                                                    <source src={CollectionImg[item.id]?.imageUrl} type="video/mp4"></source>
                                                </video>
                                            ) : (
                                                <img
                                                    className="rounded-t-lg bg-cover"
                                                    src={CollectionImg[item.id]?.imageUrl}
                                                    onError={handleImgError}
                                                    placeholder="Nft not found"
                                                    alt="cover image"
                                                    width={600}
                                                    height={450}
                                                    unoptimized={true}
                                                    loading="eager"
                                                    layout="responsive"
                                                />
                                            )}
                                        {CollectionImg[item.id]?.imageLoad ? null : SearchImgURL(item.id)}

                                        {/*{Price[item.id]?.priceLoad ? null: SearchPrice(item.id)}*/}

                                        <div className="p-4 flex flex-col">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">No.{item.tokenIdInt}</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">NFT NAME</h1>
                                            <p className="leading-relaxed mb-3 -align-left flex">Final price : <img class="pt-3 object-scale-down h-5" src="/img/token/klaytnToken.png" /> {Price[item.id]?.priceLoad ? Price[item.id]?.finalPrice : 'searching..'}</p>
                                            <div className="flex items-center flex-wrap ">
                                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" target="_blank" href={'https://scope.klaytn.com/nft/' + item.contractAddress + '/' + item.tokenIdInt}>View contract
                                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </a>
                                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>1.2K
                                                </span>
                                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>6
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <br />
            <br />
            <br />
        </>
    );
}
