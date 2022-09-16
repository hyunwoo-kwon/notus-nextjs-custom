import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";




// components
import { SearchAddressParam } from "../form/SearchAddressParam";
import axios from "axios";

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress, setSearchAddress] = useState(JSON.parse(router.query.SearchAddress));
    const [Collection, setCollection] = useState([]);
    const [Loading, setLoading] = useState(false);
    const handleImgError = (e) => {
        e.target.src = "/img/team-2-800x800.jpg";
    }

    const SearchCollection = () => {
        setLoading(true);
        let param;
        console.log(SearchAddress)
        SearchAddress.forEach((item, index) => {
            console.log("index = " + index + " item = " + item)

            if (index > 0) {
                param.addAddress("kip17", item.id);
            } else {
                param = new SearchAddressParam("kip17", item.id);
            }
        })



        // let param = new SearchAddressParam("kip17","0x66CF55c6cAB5e99Cdd78F097C0528dD7F6259eF5");
        // param.addAddress("kip17","0x128bc210920a37f383a89CD4c3f6C6fCDDe2296C");
        // param.addAddress("kip17","0x53f06FCf84E683309583377d00659E009f82659e");

        setCollection([]);
        axios.post('/hyperwebs/nftlistowner', param.value)
            .then(function (response) {
                let data = response.data;

                data.forEach((d, index) => {
                    setCollection(collection => [...collection, {
                        id: index, address: d.address, contractAddress: d.contractAddress, tokenId: d.tokenId, tokenIdInt: d.tokenIdInt
                        , tokenUri: d.tokenUri, finalPrice: d.finalPrice, imageUrl: d.imageUrl
                    }])
                })

                setLoading(false);
            })
    }

    function SearchImgURL(uri) {
        let return_data = "";
        // axios.get('/hyperwebs/nftimageurl?uri='+uri)
        //     .then(function(response){
        //         let data = response.data;
        //         return_data = data.url;
        //         console.log("data.url = " +data.url)
        //     })

        // fetch('/hyperwebs/nftimageurl?uri='+uri)
        //     .then( res=> {
        //         console.log("res = " + JSON.stringify(res))
        //         return res.url;
        //     });
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
                        {/*<div className="blur hober:blur-lg">*/}
                        {/*    <section className="text-gray-400 body-font">*/}
                        {/*        <div className="container px-5 py-24 mx-auto">*/}
                        {/*            <div className="flex flex-wrap -m-4">*/}
                        {/*                <div className="p-4 md:w-1/3" >*/}
                        {/*                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">*/}
                        {/*                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/Azuki_9605.jpg" alt="blog"/>*/}
                        {/*                        <div className="p-6">*/}
                        {/*                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>*/}
                        {/*                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>*/}
                        {/*                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>*/}
                        {/*                            <div className="flex items-center flex-wrap ">*/}
                        {/*                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More*/}
                        {/*                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">*/}
                        {/*                                        <path d="M5 12h14"></path>*/}
                        {/*                                        <path d="M12 5l7 7-7 7"></path>*/}
                        {/*                                    </svg>*/}
                        {/*                                </a>*/}
                        {/*                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>*/}
                        {/*                                <circle cx="12" cy="12" r="3"></circle>*/}
                        {/*                            </svg>1.2K*/}
                        {/*                        </span>*/}
                        {/*                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>*/}
                        {/*                            </svg>6*/}
                        {/*                        </span>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="container px-5 py-24 mx-auto">*/}
                        {/*            <div className="flex flex-wrap -m-4">*/}
                        {/*                <div className="p-4 md:w-1/3" >*/}
                        {/*                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">*/}
                        {/*                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/bellygom_1119.png" alt="blog"/>*/}
                        {/*                        <div className="p-6">*/}
                        {/*                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>*/}
                        {/*                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>*/}
                        {/*                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>*/}
                        {/*                            <div className="flex items-center flex-wrap ">*/}
                        {/*                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More*/}
                        {/*                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">*/}
                        {/*                                        <path d="M5 12h14"></path>*/}
                        {/*                                        <path d="M12 5l7 7-7 7"></path>*/}
                        {/*                                    </svg>*/}
                        {/*                                </a>*/}
                        {/*                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>*/}
                        {/*                                <circle cx="12" cy="12" r="3"></circle>*/}
                        {/*                            </svg>1.2K*/}
                        {/*                        </span>*/}
                        {/*                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>*/}
                        {/*                            </svg>6*/}
                        {/*                        </span>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="container px-5 py-24 mx-auto">*/}
                        {/*            <div className="flex flex-wrap -m-4">*/}
                        {/*                <div className="p-4 md:w-1/3" >*/}
                        {/*                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">*/}
                        {/*                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/Doodle_8712.png" alt="blog"/>*/}
                        {/*                        <div className="p-6">*/}
                        {/*                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>*/}
                        {/*                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>*/}
                        {/*                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>*/}
                        {/*                            <div className="flex items-center flex-wrap ">*/}
                        {/*                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More*/}
                        {/*                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">*/}
                        {/*                                        <path d="M5 12h14"></path>*/}
                        {/*                                        <path d="M12 5l7 7-7 7"></path>*/}
                        {/*                                    </svg>*/}
                        {/*                                </a>*/}
                        {/*                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>*/}
                        {/*                                <circle cx="12" cy="12" r="3"></circle>*/}
                        {/*                            </svg>1.2K*/}
                        {/*                        </span>*/}
                        {/*                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">*/}
                        {/*                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">*/}
                        {/*                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>*/}
                        {/*                            </svg>6*/}
                        {/*                        </span>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*</div>*/}
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
                            ** View contract 버튼을 통해 scope 조회 가능<br />
                            ** collection 숫자가 맞지 않는 경우가 있어 조회 로직및 아이콘은 변경 예정<br />
                            ** volume 탭에 현재 가치 또는 구매에 사용한 USD를 출력해 주면 좋은 정보가 될것 같습니다.<br />
                        </div>
                    )}
                    <div className="py-24 mx-auto">
                        <div className="flex flex-wrap m-4">
                            {Collection.map((item) => (
                                <div className="p-4 md:w-1/3" id={item.id}>
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        {item.imageUrl === '' ? (
                                            <img
                                                className="rounded-t-xl"
                                                src={item.imageUrl}
                                                onError={handleImgError}
                                                alt="cover image"
                                                width="100%"
                                                height="100px"
                                                layout="responsive"
                                                objectFit="cover"
                                                quality={100}
                                            />

                                        ) : item.imageUrl.includes('.mp4') ? (
                                            <video loop autoPlay>
                                                <source src={item.imageUrl} type="video/mp4"></source>
                                            </video>
                                        ) : (
                                            <img
                                                className="rounded-t-xl"
                                                src={item.imageUrl}
                                                onError={handleImgError}
                                                alt="cover image"
                                                width="100%"
                                                height="100px"
                                                layout="responsive"
                                                objectFit="cover"
                                                quality={100}
                                            />
                                        )}


                                        <div className="p-4 flex flex-col">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">No.{item.tokenIdInt}</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">NFT NAME</h1>
                                            <p className="leading-relaxed mb-3 -align-left flex">Final price : <img class="pt-3 object-scale-down h-5" src="/img/token/klaytnToken.png" /> {item.finalPrice}</p>
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
