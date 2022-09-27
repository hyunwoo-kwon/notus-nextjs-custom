import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai"
import { useInfiniteQuery } from "react-query";

// components
import { SearchAddressParam } from "../form/SearchAddressParam";
import axios from "axios";
import PageLoader from "next/dist/client/page-loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress, setSearchAddress] = useState(JSON.parse(router.query.SearchAddress));
    const [WorkUUID, setWorkUUID] = useState(JSON.parse(router.query.WorkUUID));
    const [Collection, setCollection] = useState([]);
    const [CollectionImg, setCollectionImg] = useState([]);
    const [Price, setPrice] = useState([]);
    const [Loading, setLoading] = useState(false);
    const handleImgError = (e) => {
        e.target.src = "/img/team-2-800x800.jpg";
    }

    const addressList = SearchAddress.map((address) => <li key={address.id}>{address.id}</li>);

    const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        "collections",
        async ({ pageParam = 1 }) =>
            await fetch(
                `/hyperwebs/nftlistowner?workUUID=${WorkUUID}&page=${pageParam}`
            ).then((result) => result.json()),
        {
            getNextPageParam: (lastPage,pages) => {
                console.log("pages = "+ pages.length + 1)
                if(lastPage.length>0){
                    return pages.length + 1;
                }
            },
        }
    );

    function insertCollectionData(data){
        console.log("data.length = "+ data[0].length)
        if(data[0].length>0){
            data[0].map(d=>{
                setCollection(collection => [...collection,d]);
            })
        }
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
                <section className="text-gray-400 body-font">
                    {Loading ? null : (
                        <div className="container px-5 mx-auto">
                            <div className="flex flex-col text-center w-full mb-20">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
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
                                    }} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="py-24 mx-auto">
                        <div className="grid md:grid-cols-5 sm:grid-cols-2 mx-auto ">
                            {Collection}
                            {status === "success" && (
                                <InfiniteScroll
                                    dataLength={data?.pages.length * 5}
                                    next={fetchNextPage}
                                    hasMore={hasNextPage}
                                    loader={<h4>Loading...</h4>}
                                >
                                    <div>
                                        <br/>
                                        <br/>
                                        <br/>
                                        {data?.pages.map((page)=>(
                                            <>
                                                {page?.map((collection) =>(
                                                    <>
                                                        {JSON.stringify(collection.finalPrice)}
                                                        <br/>
                                                        <br/>
                                                        <br/>
                                                    </>
                                                ))}
                                            </>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            )}
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
