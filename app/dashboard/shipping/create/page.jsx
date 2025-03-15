// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import "react-icons/md";
// import { API_BASE_URL } from "../../../utlis";
// import Swal from "sweetalert2";

// const ShippingRegion = () => {
//   // const [regions, setRegions] = useState([]);
//   // const [regionDialog, setRegionDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     country: "",
//     states: [
//       {
//         name: "",
//         districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }],
//       },
//     ],
//   });
//   const [editing, setEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const accessToken = Cookies.get("accessToken");

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
//     // try {
//     const headers = { Authorization: `Bearer ${accessToken}` };

//     const response = await axios.post(
//       `${API_BASE_URL}/shippingregion`,
//       formData,
//       { headers }
//     );
//     console.log(response,"response");

//     if (response) {
//       Swal.fire("Shipping created");
//       window.location.href = "/dashboard/shipping";
//     }
//     //   }
//   };

//   const container = {
//     padding: "20px",
//   };

//   return (
//     <div className="" style={container}>
//       <Container className="container">
//         <h1>Shipping Regions</h1>

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
//                               <label>District</label>
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
//                               <label>Min Weight</label>
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
//                               <label>Max Weight</label>
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
//                               <label>Rate</label>
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

// export default ShippingRegion;
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

const ShippingRegion = () => {
  const [formData, setFormData] = useState({
    country: "",
    states: [
      {
        name: "",
        districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }],
      },
    ],
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditing(true);
      setCurrentId(id);
      fetchRegion(id);
    }
  }, [id]);

  const fetchRegion = async (regionId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shippingregion/${regionId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const regionData = response.data.data;
      setFormData({
        country: regionData.countrystate.country,
        states: regionData.countrystate.states.map((state) => ({
          name: state.name,
          districts: state.districts.map((district) => ({
            name: district.name,
            minWeight: district.minWeight,
            maxWeight: district.maxWeight,
            rate: district.rate,
          })),
        })),
      });
    } catch (error) {
      console.error("Error fetching shipping region", error);
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
      const headers = { Authorization: `Bearer ${accessToken}` };
      let response;

      if (editing && currentId) {
        response = await axios.put(
          `${API_BASE_URL}/shippingregion/${currentId}`,
          formData,
          { headers }
        );
        Swal.fire("Shipping Updated");
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/shippingregion`,
          formData,
          { headers }
        );
        if (response.data.success) {
          Swal.fire("Shipping Created");
          window.location.href = "/dashboard/shipping";
        }
      }
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
        <h1>{editing ? "Edit Shipping Region" : "Create Shipping Region"}</h1>

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
                              <label>District</label>
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
                              <label>Min Weight</label>
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
                              <label>Max Weight</label>
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
                              <label>Rate</label>
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
                              // label="Remove District"
                              icon="pi pi-trash"
                              style={{ all: "unset" }}
                              className="p-button-danger mb-3"
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
                    <div className="ms-auto">
                      <Button
                        // label="Remove State"
                        icon="pi pi-trash"
                        style={{ all: "unset" }}
                        className="p-button-danger mb-3"
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
          <Button onClick={() => saveRegion()}>
            {editing ? "Update Region" : "Save Region"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ShippingRegion;
