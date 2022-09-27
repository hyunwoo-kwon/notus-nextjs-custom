import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai"

// components
import { SearchAddressParam } from "../form/SearchAddressParam";
import axios from "axios";
import PageLoader from "next/dist/client/page-loader";
import { Link } from "react-scroll";
import Image from "next/image";
import CollectionInfo from "components/CollectionInfo";

let tempImgUrlBox = [];
let tempPriceBox = [];

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress,       setSearchAddress] = useState(JSON.parse(router.query.SearchAddress));
    const [WorkUUID,            setWorkUUID] = useState(JSON.parse(router.query.WorkUUID));
    const [TotalCountCollection,     setTotalCountCollection] = useState(JSON.parse(router.query.TotalCountCollection));
    const [EthereumCountCollection, setEthereumCountCollection] = useState(JSON.parse(router.query.EthereumCountCollection));
    const [KlaytnCountCollection, setKlaytnCountCollection] = useState(JSON.parse(router.query.KlaytnCountCollection));
    const [Collection,          setCollection] = useState([]);
    const [CollectionImg,       setCollectionImg] = useState([]);
    const [Price,               setPrice] = useState([]);
    const [PageParam,           setPageParam] = useState(0);
    const [CollectionFeching,   setCollectionFeching] = useState(false);
    const [ImgLoadingNumber,    setImgLoadingNumber] = useState(0);
    const [ImgLoading,          setImgLoading] = useState(false);

    const [PriceLoading,        setPriceLoading] = useState(false);
    const [PriceLoadingNumber,  setPriceLoadingNumber] = useState(0);
    const [headInfo,            setHeadInfo] = useState(true);


    const handleInfobox = () => {
        setHeadInfo(
            !headInfo
        )
    }

    //컬렉션 조회 후 파라메터 세팅
    useEffect(() => {
        console.log("useEffect = 컬렉션 조회 후 파라메터 세팅")
        console.log("Collection.length>0 : " + Collection.length + " CollectionFeching==true : " + CollectionFeching)
        setPageParam(PageParam + 1);
        setCollectionFeching(false);
    }, [Collection.length > 0
        && CollectionFeching == true]);

    //초기 1번만 실행(조회)
    useEffect(() => {
        tempImgUrlBox = [];
        setCollectionFeching(true);
    }, []);

    //CollectionFeching 추가조회가 시작(true)되면 실행
    useEffect(() => {
        SearchCollection();
    }, [CollectionFeching == true]);

    useEffect(() => {
        //이미지가 로딩중이면 이미지 서칭 시작
        if (ImgLoading) {
            SearchImgURL(ImgLoadingNumber);
            if (CollectionImg.length > ImgLoadingNumber + 1) {
                //추가 로딩할 이미지가 있으면 계속 진행
            } else {
                //추가 로딩할 이미지가 없으면 종료
                setImgLoading(false);
            }
        }

    }, [ImgLoading === true, Collection, CollectionImg]);

    useEffect(() => {
        //로딩 해야할 이미지 여부 확인
        if (CollectionImg.length > ImgLoadingNumber) {
            //이미지 로딩상태로 변경
            setImgLoading(true);
        }
    }, [ImgLoading === false, Collection, CollectionImg]);
    //
    // //가격정보
    // useEffect(() => {
    //     //가격정보가 로딩중이면 이미지 서칭 시작
    //     if(PriceLoading){
    //         SearchPrice(PriceLoadingNumber);
    //         if(CollectionImg.length > PriceLoadingNumber+1){
    //             //추가 로딩할 가격정보가 있으면 계속 진행
    //         }else{
    //             //추가 로딩할 가격정보가 없으면 종료
    //             setPriceLoading(false);
    //         }
    //         setPriceLoadingNumber(PriceLoadingNumber+1);
    //     }
    // },[PriceLoading===true, PriceLoadingNumber]);
    //
    // //가격정보
    // useEffect(() => {
    //     //로딩 해야할 가격정보 확인
    //     if(Price.length > PriceLoadingNumber){
    //         //가격정보 로딩상태로 변경
    //         setPriceLoading(true);
    //     }
    // },[PriceLoading===false, Collection, Price]);

    //스크롤 상태 조회
    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        return () => {
            // scroll event listener 해제
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 1 && !CollectionFeching) {
            setCollectionFeching(true);
        }
    };

    //컬렉션 데이터 조회 함수
    const SearchCollection = () => {
        const startIndex = (PageParam * 5);
        axios.get(`/hyperwebs/nftlistowner?workUUID=${WorkUUID}&page=${PageParam}`)
            .then(function (response) {
                var data = response.data;
                let tempCollection = [];
                let tempCollectionImg = [];
                let tempPrice = [];
                console.log(JSON.stringify(data))
                data.forEach((d, index) => {
                    tempCollection.push({
                        id: startIndex + index, mainNetType: d.mainNetType, type: d.type, address: d.address, projectName: d.projectName, contractAddress: d.contractAddress, tokenId: d.tokenId, tokenIdInt: d.tokenIdInt
                        , tokenUri: d.tokenUri, finalPrice: d.finalPrice
                    })
                    tempCollectionImg.push({
                        id: 'img' + (startIndex + index), imageUrl: '', imageLoad: false
                    })
                    tempPrice.push({
                        id: 'price' + (startIndex + index), finalPrice: '', floorPrice: '', priceLoad: false
                    })

                    tempImgUrlBox.push({ id: 'img' + (startIndex + index), imageUrl: '', imageLoad: false })

                    tempPriceBox.push({ id: 'price' + (startIndex + index), finalPrice: '', floorPrice: '', priceLoad: false })

                })

                setCollectionImg(collectionImg => [...collectionImg, ...tempCollectionImg]);
                setPrice(price => [...price, ...tempPrice]);
                setCollection(collection => [...collection, ...tempCollection]);

                console.log("axios CollectionFeching data = " + CollectionFeching)
            })
    }

    function SearchImgURL(index) {
        if (CollectionImg[index]?.imageLoad == false && Collection.length >= CollectionImg.length) {
            setImgLoadingNumber(index + 1);
            if (Collection[index]?.tokenUri === "") {
                tempImgUrlBox[index] = { id: 'img' + index, imageUrl: "", imageLoad: true };

                setCollectionImg([...tempImgUrlBox])
            } else {
                axios.get('/hyperwebs/nftimageurl?uri=' + Collection[index].tokenUri)
                    .then(function (response) {
                        let data = response.data;
                        tempImgUrlBox[index] = { id: 'img' + index, imageUrl: response.data.url, imageLoad: true };

                        setCollectionImg([...tempImgUrlBox])
                    })
                    .catch(function (error) {
                        tempImgUrlBox[index] = { id: 'img' + index, imageUrl: "", imageLoad: true };

                        setCollectionImg([...tempImgUrlBox]);
                    })

            }
        }
    }

    function SearchPrice(index) {
        axios.get('/hyperwebs/nftsingleprice?workUUID=' + WorkUUID + '&type=' + Collection[index].type + '&contractAddress=' + Collection[index].contractAddress + '&tokenId=' + Collection[index].tokenId)
            .then(function (response) {
                let data = response.data;

                tempPriceBox[index] = { id: 'price' + (index), finalPrice: data.finalPrice, floorPrice: data.floorPrice, priceLoad: true }

                setPrice([...tempPriceBox]);
            })
    }


    return (
        <>
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
            </section>
            <section className="flex flex-wrap relative text-center">
                <div className="fixed z-10 w-full">
                    {headInfo === true ?
                        <div>
                            <CollectionInfo
                                SearchAddress={SearchAddress}
                                Collection={Collection}
                                CountCollection={TotalCountCollection}
                                EthereumCountCollection = {EthereumCountCollection}
                                KlaytnCountCollection = {KlaytnCountCollection}
                            />
                            <button className="flex mx-auto fiexd top-10 text-lg">
                                <div onClick={handleInfobox}>🔼</div>
                            </button>
                        </div>

                        : <button className="fixed my-11 text-lg w-1920">
                            <div onClick={handleInfobox}>🔽</div>
                        </button>
                    }

                </div>

            </section>
            <section className="py-24 mx-auto mt-48 flex flex-wrap">
                <div className="item-center justify-center mx-auto text-center">
                    <strong className="flex sm:text-3xl text-2xl font-extrabold text-gray-900 w-full text-center " >
                        Your NFT collections
                    </strong>
                </div>


                <div className="grid grid-cols-7 mx-auto mt-10 px-20" id="section1">
                    {Collection?.map((item) => (
                        <div className="p-4" id={item.id}>
                            <div
                                className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg bg-cover cursor-pointer
                                                    overflow-hidden transition duration-300 transform hover:shadow-lg ">
                                <div id={'img' + item.id}>
                                    {CollectionImg[item.id]?.imageLoad == false ? (
                                        <img
                                            className="rounded-t-xl bg-cover"
                                            src="/img/loading.gif"
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
                                                className="rounded-t-lg bg-cover hover:scale-110"
                                                src="/img/default-item.png"
                                                placeholder="Nft not found"
                                                alt="cover image"
                                                width={600}
                                                height={450}
                                                unoptimized={true}
                                                loading="eager"
                                                layout="responsive"
                                            />

                                        ) : CollectionImg[item.id]?.imageUrl.includes('.mp4') ? (
                                            <video controls={true}>
                                                <source src={CollectionImg[item.id]?.imageUrl} type="video/mp4"></source>
                                            </video>
                                        ) : (
                                            <img
                                                className="rounded-t-lg bg-cover hover:scale-110 overflow-hidden transition duration-300 transform "
                                                src={CollectionImg[item.id]?.imageUrl}
                                                placeholder="Nft not found"
                                                alt="cover image"
                                                width={600}
                                                height={450}
                                                unoptimized={true}
                                                loading="lazy"
                                                layout="responsive"
                                            />
                                        )}
                                </div>
                                <div className="p-4 flex flex-col">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">No.{item.tokenIdInt}</h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.projectName === '' ? (<>..</>) : item.projectName}</h1>
                                    <p className="leading-relaxed mb-3 -align-left flex">Final price :
                                        {item.mainNetType === 'ethereum'? (
                                                <>
                                                    <img className="pt-3 object-scale-down h-7" src="/img/eth-logo.svg" />
                                                </>
                                            ):item.mainNetType ==='klaytn'? (
                                                <>
                                                    <img className="pt-3 object-scale-down h-7" src="/img/token/klaytnToken.png" />
                                                </>
                                            ):null}


                                        <span className="text-lightBlue-600">
                                            {Price[item.id]?.priceLoad ? Price[item.id]?.finalPrice : 'searching..'}
                                        </span>
                                    </p>
                                    <div className="flex items-center flex-wrap ">
                                        {item.mainNetType === 'ethereum'? (
                                                <>
                                                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" target="_blank" href={'https://etherscan.io/token/' + item.contractAddress + '?a=' + item.tokenIdInt}>View contract
                                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5l7 7-7 7"></path>
                                                        </svg>
                                                    </a>
                                                </>
                                            ):(
                                                <>
                                                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" target="_blank" href={'https://scope.klaytn.com/nft/' + item.contractAddress + '/' + item.tokenIdInt}>View contract
                                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5l7 7-7 7"></path>
                                                        </svg>
                                                    </a>
                                                </>
                                            )}

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
            </section>
            <br /><br /><br /><br /><br /><br />
        </>
    );
}
