import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";

// components
import {SearchAddressParam} from "../form/SearchAddressParam";
import axios from "axios";

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress, setSearchAddress] = useState(JSON.parse(router.query.SearchAddress));
    const [Collection, setCollection] = useState([]);
    const [Loading, setLoading] = useState(false);

    const SearchCollection = () =>{
        setLoading(true);
        let param;
        console.log(SearchAddress)
        SearchAddress.forEach((item,index)=> {
            console.log("index = " + index + " item = " + item )

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
        axios.post('/hyperwebs/nftlistowner',param.value)
            .then(function(response){
                let data = response.data;

                data.forEach((d,index)=>{
                    setCollection(collection => [...collection, {id:index, address: d.address, contractAddress: d.contractAddress, tokenId: d.tokenId, tokenIdInt: d.tokenIdInt
                                                                      ,tokenUri: d.tokenUri, finalPrice: d.finalPrice, imageUrl: d.imageUrl}])
                })

                setLoading(false);
            })
    }

    function SearchImgURL(uri){
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

    useEffect(() =>  {
       SearchCollection();
    },[]);

  return (
    <>
        <br/>
        <br/>
        <br/>
        <br/>

        <main>
            {Loading ? (
                <div className="blur hober:blur-lg">
                    <h1>Searching..</h1>
                    <section className="text-gray-400 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 md:w-1/3" >
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/Azuki_9605.jpg" alt="blog"/>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>
                                            <div className="flex items-center flex-wrap ">
                                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
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
                            </div>
                        </div>
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 md:w-1/3" >
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/bellygom_1119.png" alt="blog"/>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>
                                            <div className="flex items-center flex-wrap ">
                                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
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
                            </div>
                        </div>
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 md:w-1/3" >
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="/img/nft/Doodle_8712.png" alt="blog"/>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NFT category</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                                            <p className="leading-relaxed mb-3">NFT collections by Total NFT</p>
                                            <div className="flex items-center flex-wrap ">
                                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
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
                            </div>
                        </div>
                    </section>
                </div>
            ): null}
            <section className="text-gray-400 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {Collection.map((item)=> (
                            <div className="p-4 md:w-1/3" id={item.id}>
                                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    {item.imageUrl === '' ? (
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.imageUrl} alt="blog"/>
                                    ) : item.imageUrl.includes('.mp4') ?(
                                        <video loop autoPlay>
                                            <source src={item.imageUrl} type="video/mp4"></source>
                                        </video>
                                    ) : (
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.imageUrl} alt="blog"/>
                                    )}


                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">No.{item.tokenIdInt}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">NFT NAME</h1>
                                        <p className="leading-relaxed mb-3 -align-left flex">Final price : <img class="pt-3 object-scale-down h-5" src="/img/token/klaytnToken.png"/> {item.finalPrice}</p>
                                        <p className="leading-relaxed mb-3 -align-left flex">contract Address <br/>{item.contractAddress}</p>
                                        <div className="flex items-center flex-wrap ">
                                            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" target="_blank" herf={'https://scope.klaytn.com/nft/0xcc41e29aa016488a6959b8be177b5fc1bf8656f8'+item.contractAddress}>View contract
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
        <br/>
        <br/>
        <br/>
    </>
  );
}
