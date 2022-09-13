import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";

// components
import {SearchAddressParam} from "../form/SearchAddressParam";
import axios from "axios";

export default function Collections(props) {
    const router = useRouter();
    const [SearchAddress, setSearchAddress] = useState(router.query.SearchAddress);
    const [Collection, setCollection] = useState([]);

    console.log("SearchAddress = " +SearchAddress)
    const SearchCollection = () =>{

        let param = new SearchAddressParam("kip17","0x66CF55c6cAB5e99Cdd78F097C0528dD7F6259eF5");
        param.addAddress("kip17","0x128bc210920a37f383a89CD4c3f6C6fCDDe2296C");
        param.addAddress("kip17","0x53f06FCf84E683309583377d00659E009f82659e");

        console.log(param.value)

        axios.post('/hyperwebs/nftlistowner',param.value)
            .then(function(response){
                let data = response.data;
                console.log("data : " + JSON.stringify(data) )
                console.log("data[0] : " +data[0].address);
                let test = [];

                data.forEach((d,index)=>{
                    console.log("index = " + index)
                    // console.log("d = " + JSON.stringify(d) );
                    console.log("d = " + d.address );
                    console.log("d = " + d.contractAddress );
                    console.log("d = " + d.tokenId );
                    console.log("d = " + d.tokenIdInt );
                    test.push({id:index, address: d.address, contractAddress: d.contractAddress, tokenId: d.tokenId, tokenIdInt: d.tokenIdInt});

                })

                console.log("test = " + test);
                console.log("JOSN test = " + JSON.stringify(test))
                // setCollection(Collection => [...test]);
            })
    }

    useEffect(() =>  {
       SearchCollection();
    },[]);

  return (
    <>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center ">
        </div>
          <section>
            <div className="w-full  px-4 mr-auto ml-auto flex ">
                <div className="relative flex flex-col min-w-0 break-words bg-white lg:w-3/12 mb-6 shadow-lg rounded-lg bg-blueGray-700">
                    <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                        className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8 mb-4">
                        <svg
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 583 95"
                            className="absolute left-0 w-full block h-95-px -top-94-px"
                        >
                            <polygon
                                points="-30,95 583,95 583,65"
                                className="text-blueGray-700 fill-current"
                            ></polygon>
                        </svg>
                        <h4 className="text-xl font-bold text-white">
                            Top Notch Services
                        </h4>
                    </blockquote>
                </div>
            </div>
        </section>
          collection=
          {Collection}
          {/*{Collection.map((item, key)=>(*/}
          {/*    <div>*/}
          {/*        {item}*/}
          {/*        <br/>*/}
          {/*        <br/>*/}
          {/*        <br/>*/}
          {/*        <br/>*/}
          {/*    </div>*/}
          {/*))}*/}
      </main>
    </>
  );
}
