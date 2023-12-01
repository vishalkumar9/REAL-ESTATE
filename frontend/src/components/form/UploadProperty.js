import React  from "react";

import {useForm} from "../hook/formHook";

import "./UploadProperty.css";

const UploadProperty =   () => {

    const {propertyData, error, displayImages, handleChange, handleFileChange, uploadProperty } = useForm();
    
    const arrPropertyType = ["Residential","Commercial"];
    const arrPurpose = ["Rent","Sell"];
    const arrResidentialType = ["Flat","Plot","House","Apartment"];
    const arrCommercialType = ["Office","Retail Shop","Showroom","Warehouse"];
    const arrFurnishType = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
    const arrBhk = ["1","2","3","4","5", "6","7"];
    const arrBathroom = ["1","2","3","4"];
    const arrPgFor = ["Girls","Boys"];
    const arrSuitedFor = ["Students","Professionals"];
    const arrConstructionStatus = ["Under Construction", "Ready To Move"];

    console.log(error);
    return(
        <div className="form_outer_div">
            <form className="uploadForm_div">
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>For </label>
                    <div className="option">
                        {arrPropertyType.map(value => (
                            <button name = "propertyType" value = {value} className = {value===propertyData.propertyType ? "active" : ""} onClick={handleChange}>{value}</button>
                        ))}
                    </div>
                </div>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>For </label>
                    <div className="option">
                        {arrPurpose.map(value => (
                            (propertyData.propertyType==="" || propertyData.propertyType==="Residential" ?
                                <button name = "purposeType" value = {value} className = {value===propertyData.purposeType ? "active" : ""} onClick={handleChange}>{value}</button> :
                                propertyData.propertyType==="Commercial" && <button name = "purposeType" value = {value} className = {value===propertyData.purposeType ? "active" : ""} onClick={handleChange}>{value}</button>)
                        ))}
                    </div>
                </div>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Type </label>
                    <div className="option">
                        { propertyData.propertyType === "Residential" ? arrResidentialType.map(value => (
                            (propertyData.purposeType==="" || propertyData.purposeType==="Rent" || propertyData.purposeType==="Sell") ? <button name = "type" value = {value} className = {value===propertyData.type ? "active" : ""} onClick={handleChange}>{value}</button>
                                : value!=="Plot" && <button name = "type" value = {value} className = {value===propertyData.type ? "active" : ""} onClick={handleChange}>{value}</button>
                        )) : arrCommercialType.map(value => (
                            <button name="type" value = {value} className = {value===propertyData.type ? "active" : ""} onClick={handleChange}>{value}</button>
                        ))}
                        }
                    </div>
                </div>
                {propertyData.propertyType === "Residential" && propertyData.type!=="Plot" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>BHK </label>
                    <div className="option">
                        {arrBhk.map(value => (
                            <button name="bhk" value={value} className = {value===propertyData.bhk ? "active" : ""} onClick={handleChange}>{value}</button>
                        ))}
                    </div>
                </div>
                }
                {propertyData.propertyType==="Residential" && propertyData.type!=="Plot" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Bathroom </label>
                    <div className="option">
                        {arrBathroom.map(value => (
                            <button name="countOfBathroom" value = {value} className = {value===propertyData.countOfBathroom ? "active" : ""} onClick={handleChange}>{value}</button>
                        ))}
                    </div>
                </div>}
                {propertyData.type!=="Plot" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Construction Status </label>
                    <div className="option">
                        {arrConstructionStatus.map(value => (
                            <button name="constructionStatus" value = {value} className = {value===propertyData.constructionStatus ? "active" : ""} onClick={handleChange}>{value}</button>
                        ))}
                    </div>
                </div>}
                {<div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Area in sq.ft </label>
                    <div className="option">
                        <input type="text" name="builtUpArea" value = {propertyData.builtUpArea} onChange={handleChange}/>
                    </div>
                </div>
                }
                {<div className="form_input_div">
                    <label>Length in ft </label>
                    <div className="option">
                        <input type="text" name="length" value = {propertyData.length} onChange={handleChange}/>
                    </div>
                </div>
                }
                {<div className="form_input_div">
                    <label>Width in ft</label>
                    <div className="option">
                        <input type="text" name="width" value = {propertyData.width} onChange={handleChange}/>
                    </div>
                </div>
                }
                {propertyData.purposeType!=="Sell" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Monthly Rent in Rs </label>
                    <div className="option">
                        <input type="text" name="price" value = {propertyData.price} onChange={handleChange}/>
                    </div>
                </div>
                }
                {propertyData.purposeType==="Sell" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Property Price/Sq.ft in Rs </label>
                    <div className="option">
                        <input type="text" name="price" value = {propertyData.price} onChange={handleChange}/>
                    </div>
                </div>
                }
                {propertyData.type!=="Plot" && <div className="form_input_div">
                    <label>Age Of Property (year) </label>
                    <div className="option">
                        <input type="text" name="ageOfProperty" value = {propertyData.ageOfProperty} onChange={handleChange}/>
                    </div>
                </div>
                }
                {propertyData.propertyType==="Residential" && <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Furnish Type (years)</label>
                    <div className="option">
                        { arrFurnishType.map(value => (
                            <button name="furnishType" value = {value} className = {value===propertyData.furnishType ? "active" : ""} onClick={handleChange}>{value}</button>
                            ))}
                    </div>
                </div>
                }
                {/*{propertyData.purposeType==="PG/Co-Living" && <div className="form_input_div">*/}
                {/*    <span style={{color:"red", fontSize:"large"}}>*</span>*/}
                {/*    <label>PG is For</label>*/}
                {/*    <div className="option">*/}
                {/*        { arrPgFor.map(value => (*/}
                {/*            <button name="pgFor" value = {value} className = {value===propertyData.pgFor ? "active" : ""} onClick={handleChange}>{value}</button>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                }
                {/*{propertyData.purposeType === "PG/Co-Living" && <div className="form_input_div">*/}
                {/*    <label>Best Suited For</label>*/}
                {/*    <div className="option">*/}
                {/*        {arrSuitedFor.map(value => (*/}
                {/*            <button name="suitedFor" value={value}*/}
                {/*                    className={value === propertyData.suitedFor ? "active" : ""}*/}
                {/*                    onClick={handleChange}>{value}</button>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*}*/}
                <h2>Address</h2>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>House No, streetNo, colony</label>
                    <div className="option">
                        <input type="text" name="houseNo" value = {propertyData.houseNo} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Location</label>
                    <div className="option">
                        <input type="text" name="location" value = {propertyData.location} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>District</label>
                    <div className="option">
                        <input type="text" name="district" value = {propertyData.district} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <label>Pin Code</label>
                    <div className="option">
                        <input type="text" name="pinCode" value = {propertyData.pinCode} onChange={handleChange}/>
                    </div>
                </div>

                <h2>Upload Images</h2>
                <div className="form_input_div">
                    <span style={{color:"red", fontSize:"large"}}>*</span>
                    <div className="option">
                        <input type="file" name="imageFiles" multiple={true} accept="image/jpg, image/png, image/jpeg" name="image" onChange={handleFileChange}/>
                    </div>
                </div>


                {
                    <div className={error ? "blockButton" : "submitButton"}>
                    <button disabled={error} onClick={!error && uploadProperty}>Submit</button>
                    </div>
                }

                <div className="displayUploadImage">
                    {displayImages.map((content) => (
                        <img src = {content} alt=""/>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default UploadProperty;
