import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useEffect, useState } from "react";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";

function SearchStockModal({ modalToggle, modalOpen,searchBrandData,setSearchBrandData,mainSetCallApi,searchCollectionData,setSearchCollectionData,categoryCode,setIsLoading,setMainData,setCurrentPage }) {
    const [nextPage, setNextPage] = useState(0);
    const [brandData, setBrandData] = useState([]);
    const [collectionData, setCollectionData] = useState([]);
    const [callApi, setCallApi] = useState(false);
    const [callApi2,setCallApi2]=useState(false);
   

    const toggle = () => {
        modalToggle();
        setNextPage(0);
    }

    const submitSearchData = () => {
        setMainData([]);
        setIsLoading(true);
        toggle();
        setCurrentPage(1);
        mainSetCallApi(true);
    }

    const handleInputBrandChange = (e) => { 
        setSearchBrandData(e.target.value);
        setCallApi(true);
    }
    const handleInputCollectionChange = (e) => { 
        setSearchCollectionData(e.target.value);
        setCallApi2(true);
    }

    const brandSubmitHandler = (data) => {
        setSearchBrandData(data);
        setNextPage(0);
    }

    const collectionSubmitHandler = (data) => {
        setSearchCollectionData(data);
         setNextPage(0);
    }

    useEffect(() => {
        if (callApi) {
            GetDataWithToken(`superadmin/get-brands?searchText=${searchBrandData}&page=''&pageSize=''`)
            .then(response => {
                if (response.status === true) {
                    setBrandData(response.data);
                    console.log(brandData);
                    setCallApi(false);
                     setCallApi2(false);
                }
                 setCallApi(false);
                 setCallApi2(false);
            })
        }
        if (callApi2) { 
            GetDataWithToken(`superadmin/get-collections?brandCode=${searchBrandData}&searchText=${searchCollectionData}&categoryCode=${categoryCode}`)
                .then(response => {
                    if (response.status === true) {
                    setCollectionData(response.data);
                }
            })
        }
    },[callApi,callApi2])

    return (
        <Modal isOpen={modalOpen} toggle={toggle} centered>
            {nextPage===0 &&<>
            <ModalHeader>
                FILTERS
            </ModalHeader>
            <ModalBody>
                    <span className="ms-2" onClick={() => { setNextPage(1); setCallApi(true)}}>Brand {searchBrandData&&`: ${searchBrandData}` }</span>
                    {searchBrandData && <button className="btn btn-primary ms-2" onClick={() =>  setSearchBrandData('')}>X</button>}
                <hr></hr>
                    <span className="ms-2 mb-5 " onClick={() => { setNextPage(2); setCallApi2(true)}} >Collection {searchCollectionData&&`: ${searchCollectionData}`}
                    </span>
                    {searchCollectionData&&<button className="btn btn-primary ms-2" onClick={() => setSearchCollectionData('')}>X</button>}
                <hr></hr> 
                  <div>
                         <button className="btn btn-primary ms-2"
                            onClick={submitSearchData}
                        >Search
                    </button>
                    </div>   
                </ModalBody>
                </>
            }
            {nextPage===1 && <>
            <ModalHeader>
                SELECT OPTION
            </ModalHeader>
            <ModalBody>
                <div className="d-flex mb-5"> 
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={handleInputBrandChange}
                    />
                        {/* <button className="btn btn-primary ms-2"
                            onClick={submitSearchData}
                        >Search
                    </button> */}
                    </div>
                     <ul class="list-group list-group-flush">
                        {brandData?.map((data) => <li class="list-group-item d-flex justify-content-between"
                            onClick={() => brandSubmitHandler(data?.Code)}
                        >
                            {data?.Name}
                        </li>)}
                    </ul>
            </ModalBody>
            </>
            }
             {nextPage===2 && <>
            <ModalHeader>
                SELECT OPTION
            </ModalHeader>
            <ModalBody>
                <div className="d-flex mb-5"> 
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={handleInputCollectionChange}
                    />
                        {/* <button className="btn btn-primary ms-2"
                            onClick={submitSearchData}
                        >Search
                    </button> */}
                    </div>
                     <ul class="list-group list-group-flush">
                        {collectionData?.map((data) => <li class="list-group-item d-flex justify-content-between"
                            onClick={() => collectionSubmitHandler(data?.Name)}
                        >
                            {data?.Name}
                        </li>)}
                    </ul>
            </ModalBody>
            </>
            }
          </Modal>   
    )
  
}

export default SearchStockModal;