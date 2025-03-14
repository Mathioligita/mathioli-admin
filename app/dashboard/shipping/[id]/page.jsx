// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { useParams } from "next/navigation";
// import Swal from "sweetalert2";
// import { API_BASE_URL } from "../../../utlis";

// const ShippingRegionEdit = () => {
//   const [regions, setRegions] = useState([]);
//   const { id } = useParams();

//   console.log(regions.countrystate, "regions>>>>>>>>>>>>>>>");
//   const [formData, setFormData] = useState({
//     country: regions.countrystate?.country || "",
//     states:
//       regions.countrystate?.states.map((state) => ({
//         name: state.name,
//         districts: state.districts.map((district) => ({
//           name: district.name,
//           minWeight: district.minWeight,
//           maxWeight: district.maxWeight,
//           rate: district.rate,
//         })),
//       })) || [],
//   });
//   const [accessToken] = useState(Cookies.get("accessToken"));

//   useEffect(() => {
//     fetchRegions();
//   }, []);

//   useEffect(() => {
//     if (regions.countrystate) {
//       setFormData({
//         country: regions.countrystate.country,
//         states: regions.countrystate.states.map((state) => ({
//           name: state.name,
//           districts: state.districts.map((district) => ({
//             name: district.name,
//             minWeight: district.minWeight,
//             maxWeight: district.maxWeight,
//             rate: district.rate,
//           })),
//         })),
//       });
//     }
//   }, [regions]);

//   const fetchRegions = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/shippingregion/${id}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       setRegions(response.data.data);
//     } catch (error) {
//       console.error("Error fetching shipping regions", error);
//     }
//   };

//   const handleFormChange = (e, stateIndex, districtIndex, field) => {
//     const { value } = e.target;
//     const updatedForm = { ...formData };

//     if (districtIndex !== undefined) {
//       updatedForm.states[stateIndex].districts[districtIndex][field] = value;
//     } else if (stateIndex !== undefined) {
//       updatedForm.states[stateIndex][field] = value;
//     } else {
//       updatedForm[field] = value;
//     }
//     setFormData(updatedForm);
//   };

//   const addState = () => {
//     setFormData((prev) => ({
//       ...prev,
//       states: [
//         ...prev.states,
//         {
//           name: "",
//           districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }],
//         },
//       ],
//     }));
//   };

//   const addDistrict = (stateIndex) => {
//     const updatedStates = [...formData.states];
//     updatedStates[stateIndex].districts.push({
//       name: "",
//       minWeight: 0,
//       maxWeight: 0,
//       rate: 0,
//     });
//     setFormData({ ...formData, states: updatedStates });
//   };

//   const saveRegion = async () => {
//     try {
//       if (id) {
//         const response = await axios.put(
//           `${API_BASE_URL}/shippingregion/${id}`,
//           formData,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         if (response.success) {
//           Swal.fire("Shipping Updated");
//           window.location.href = "dashboard/shipping";
//         }
//       } else {
//         const response = await axios.post(
//           `${API_BASE_URL}/shippingregion`,
//           formData,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         if (response) {
//           Swal.fire("Shipping Updated");
//           window.location.href = "dashboard/shipping";
//         }
//       }
//       fetchRegions();
//     } catch (error) {
//       console.error("Error saving region", error);
//     }
//   };

//   const container = {
//     padding: "20px",
//   };

//   return (
//     <div className="" style={container}>
//       <Container className="container">
//         <h1>Shipping Regions Edit</h1>

//         <div className="p-fluid">
//           <Row>
//             <Col>
//               <div className="field">
//                 <label htmlFor="country">Country</label>
//                 <InputText
//                   id="country"
//                   value={formData.country}
//                   onChange={(e) =>
//                     handleFormChange(e, undefined, undefined, "country")
//                   }
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             {formData.states.map((state, stateIndex) => (
//               <Col key={stateIndex} md={6}>
//                 <Card className="p-2 mb-3">
//                   <div className="field">
//                     <label htmlFor={`state-${stateIndex}`}>State</label>
//                     <InputText
//                       id={`state-${stateIndex}`}
//                       value={state.name}
//                       onChange={(e) =>
//                         handleFormChange(e, stateIndex, undefined, "name")
//                       }
//                     />
//                   </div>
//                   {state.districts.map((district, districtIndex) => (
//                     <div key={districtIndex} style={{ marginLeft: "0px" }}>
//                       <Card className="p-2 mb-3">
//                         <div className="d-flex flex-warp flex-md-row">
//                           <div className="">
//                             <div className="field mr-2">
//                               <label htmlFor="district">District</label>
//                               <InputText
//                                 value={district.name}
//                                 onChange={(e) =>
//                                   handleFormChange(
//                                     e,
//                                     stateIndex,
//                                     districtIndex,
//                                     "name"
//                                   )
//                                 }
//                                 className=""
//                               />
//                             </div>
//                             <div className="field mr-2">
//                               <label htmlFor="minweight">Min Weight</label>
//                               <InputNumber
//                                 value={district.minWeight}
//                                 onValueChange={(e) =>
//                                   handleFormChange(
//                                     e,
//                                     stateIndex,
//                                     districtIndex,
//                                     "minWeight"
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div className="">
//                             <div className="field mr-2">
//                               <label htmlFor="maxweight">Max Weight</label>
//                               <InputNumber
//                                 value={district.maxWeight}
//                                 onValueChange={(e) =>
//                                   handleFormChange(
//                                     e,
//                                     stateIndex,
//                                     districtIndex,
//                                     "maxWeight"
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div className="field">
//                               <label htmlFor="rate">Rate</label>
//                               <InputNumber
//                                 value={district.rate}
//                                 onValueChange={(e) =>
//                                   handleFormChange(
//                                     e,
//                                     stateIndex,
//                                     districtIndex,
//                                     "rate"
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </Card>
//                     </div>
//                   ))}

//                   <div className="d-flex flex-warp flex-md-row">
//                     <div className="mr-2 mb-3">
//                       <Button
//                         label="Add District"
//                         icon="pi pi-plus"
//                         className=" mb-3 "
//                         onClick={() => addDistrict(stateIndex)}
//                       />
//                     </div>
//                     <div className="">
//                       <Button
//                         label="Add State"
//                         icon="pi pi-plus"
//                         className=" mb-3 "
//                         onClick={addState}
//                       />
//                     </div>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//         <div className="text-end">
//           <Button onClick={() => saveRegion()}>Save Region</Button>
//         </div>
//         {/* </Dialog> */}
//       </Container>
//     </div>
//   );
// };

// export default ShippingRegionEdit;
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import Cookies from "js-cookie";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../utlis";

const ShippingRegionEdit = () => {
  const [regions, setRegions] = useState([]);
  const { id } = useParams();

  console.log(regions.countrystate, "regions>>>>>>>>>>>>>>>");
  const [formData, setFormData] = useState({
    country: regions.countrystate?.country || "",
    states:
      regions.countrystate?.states.map((state) => ({
        name: state.name,
        districts: state.districts.map((district) => ({
          name: district.name,
          minWeight: district.minWeight,
          maxWeight: district.maxWeight,
          rate: district.rate,
        })),
      })) || [],
  });
  const [accessToken] = useState(Cookies.get("accessToken"));

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (regions.countrystate) {
      setFormData({
        country: regions.countrystate.country,
        states: regions.countrystate.states.map((state) => ({
          name: state.name,
          districts: state.districts.map((district) => ({
            name: district.name,
            minWeight: district.minWeight,
            maxWeight: district.maxWeight,
            rate: district.rate,
          })),
        })),
      });
    }
  }, [regions]);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shippingregion/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setRegions(response.data.data);
    } catch (error) {
      console.error("Error fetching shipping regions", error);
    }
  };

  const handleFormChange = (e, stateIndex, districtIndex, field) => {
    const { value } = e.target;
    const updatedForm = { ...formData };

    if (districtIndex !== undefined) {
      updatedForm.states[stateIndex].districts[districtIndex][field] = value;
    } else if (stateIndex !== undefined) {
      updatedForm.states[stateIndex][field] = value;
    } else {
      updatedForm[field] = value;
    }
    setFormData(updatedForm);
  };

  const addState = () => {
    setFormData((prev) => ({
      ...prev,
      states: [
        ...prev.states,
        {
          name: "",
          districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }],
        },
      ],
    }));
  };

  const addDistrict = (stateIndex) => {
    const updatedStates = [...formData.states];
    updatedStates[stateIndex].districts.push({
      name: "",
      minWeight: 0,
      maxWeight: 0,
      rate: 0,
    });
    setFormData({ ...formData, states: updatedStates });
  };

  const removeState = (stateIndex) => {
    const updatedStates = formData.states.filter(
      (_, index) => index !== stateIndex
    );
    setFormData({ ...formData, states: updatedStates });
  };

  const removeDistrict = (stateIndex, districtIndex) => {
    const updatedStates = [...formData.states];
    updatedStates[stateIndex].districts = updatedStates[
      stateIndex
    ].districts.filter((_, index) => index !== districtIndex);
    setFormData({ ...formData, states: updatedStates });
  };

  const saveRegion = async () => {
    try {
      if (id) {
        const response = await axios.put(
          `${API_BASE_URL}/shippingregion/${id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.success) {
          Swal.fire("Shipping Updated");
          window.location.href = "dashboard/shipping";
        }
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/shippingregion`,
          formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.success) {
          Swal.fire("Shipping Updated");
          window.location.href = "dashboard/shipping";
        }
      }
      fetchRegions();
    } catch (error) {
      console.error("Error saving region", error);
    }
  };

  const container = {
    padding: "20px",
  };

  return (
    <div className="" style={container}>
      <Container className="container">
        <h1>Shipping Regions Edit</h1>

        <div className="p-fluid">
          <Row>
            <Col>
              <div className="field">
                <label htmlFor="country">Country</label>
                <InputText
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    handleFormChange(e, undefined, undefined, "country")
                  }
                />
              </div>
            </Col>
          </Row>

          <Row>
            {formData.states.map((state, stateIndex) => (
              <Col key={stateIndex} md={6}>
                <Card className="p-2 mb-3">
                  <div className="field">
                    <label htmlFor={`state-${stateIndex}`}>State</label>
                    <InputText
                      id={`state-${stateIndex}`}
                      value={state.name}
                      onChange={(e) =>
                        handleFormChange(e, stateIndex, undefined, "name")
                      }
                    />
                  </div>
                  {state.districts.map((district, districtIndex) => (
                    <div key={districtIndex} style={{ marginLeft: "0px" }}>
                      <Card className="p-2 mb-3">
                        <div className="d-flex flex-warp flex-md-row">
                          <div className="">
                            <div className="field mr-2">
                              <label htmlFor="district">District</label>
                              <InputText
                                value={district.name}
                                onChange={(e) =>
                                  handleFormChange(
                                    e,
                                    stateIndex,
                                    districtIndex,
                                    "name"
                                  )
                                }
                                className=""
                              />
                            </div>
                            <div className="field mr-2">
                              <label htmlFor="minweight">Min Weight</label>
                              <InputNumber
                                value={district.minWeight}
                                onValueChange={(e) =>
                                  handleFormChange(
                                    e,
                                    stateIndex,
                                    districtIndex,
                                    "minWeight"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="">
                            <div className="field mr-2">
                              <label htmlFor="maxweight">Max Weight</label>
                              <InputNumber
                                value={district.maxWeight}
                                onValueChange={(e) =>
                                  handleFormChange(
                                    e,
                                    stateIndex,
                                    districtIndex,
                                    "maxWeight"
                                  )
                                }
                              />
                            </div>
                            <div className="field">
                              <label htmlFor="rate">Rate</label>
                              <InputNumber
                                value={district.rate}
                                onValueChange={(e) =>
                                  handleFormChange(
                                    e,
                                    stateIndex,
                                    districtIndex,
                                    "rate"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="">
                            <Button
                              // label="District"
                              icon="pi pi-trash"
                              className="p-button-danger  mb-3"
                              style={{ all: "unset" }}
                              onClick={() =>
                                removeDistrict(stateIndex, districtIndex)
                              }
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}

                  <div className="d-flex flex-warp flex-md-row">
                    <div className="mr-2 mb-3">
                      <Button
                        label="Add District"
                        icon="pi pi-plus"
                        className=" mb-3 "
                        onClick={() => addDistrict(stateIndex)}
                      />
                    </div>
                    <div className="">
                      <Button
                        label="Add State"
                        icon="pi pi-plus"
                        className=" mb-3 "
                        onClick={addState}
                      />
                    </div>
                    <div className="ms-auto ">
                      <Button
                        // label="Remove State"
                        icon="pi pi-trash"
                        className="p-button-danger mb-3"
                        style={{ all: "unset" }}
                        onClick={() => removeState(stateIndex)}
                      />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="text-end">
          <Button onClick={() => saveRegion()}>Save Region</Button>
        </div>
        {/* </Dialog> */}
      </Container>
    </div>
  );
};

export default ShippingRegionEdit;
