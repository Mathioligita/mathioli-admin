
"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../../../utlis";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MdInstallMobile } from "react-icons/md";

const ShippingRegion = () => {
  const [regions, setRegions] = useState([]);
  const [regionDialog, setRegionDialog] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    states: [{ name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }],
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipping-regions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRegions(response.data);
    } catch (error) {
      console.error("Error fetching shipping regions", error);
    }
  };

  const openNewRegionDialog = () => {
    setFormData({ country: "", states: [{ name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }] });
    setRegionDialog(true);
    setEditing(false);
    setCurrentId(null);
  };

  const editRegion = (region) => {
    setFormData(region);
    setRegionDialog(true);
    setEditing(true);
    setCurrentId(region.id);
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
      states: [...prev.states, { name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }],
    }));
  };

  const addDistrict = (stateIndex) => {
    const updatedStates = [...formData.states];
    updatedStates[stateIndex].districts.push({ name: "", minWeight: 0, maxWeight: 0, rate: 0 });
    setFormData({ ...formData, states: updatedStates });
  };

  const saveRegion = async () => {
    try {
      if (editing) {
        await axios.put(`${API_BASE_URL}/shipping-regions/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/shipping-regions`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      setRegionDialog(false);
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
        <h1>Shipping Regions</h1>
        {/* <Button label="New Region" icon="pi pi-plus" onClick={openNewRegionDialog} /> */}
        {/* <DataTable value={regions} paginator rows={5} responsiveLayout="scroll">
              <Column field="country" header="Country" sortable />
              <Column
                header="Actions"
                body={(rowData) => (
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editRegion(rowData)} />
                )}
              />
            </DataTable> */}

        {/* <Dialog visible={regionDialog} style={{ width: "700px" }} header="Shipping Region" modal footer={ */}
        {/* <>
                <Button label="Save" icon="pi pi-check" onClick={saveRegion} />
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setRegionDialog(false)} />
              </>
            } onHide={() => setRegionDialog(false)}> */}

        <div className="p-fluid">
          <Row>
            <Col>
              <div className="field">
                <label htmlFor="country">Country</label>
                <InputText id="country" value={formData.country} onChange={(e) => handleFormChange(e, undefined, undefined, "country")} />
              </div>
            </Col>
          </Row>


          <Row>
            {formData.states.map((state, stateIndex) => (
              <Col key={stateIndex} md={6}>

                <Card className="p-2 mb-3">
                  <div className="field">
                    <label htmlFor={`state-${stateIndex}`}>State</label>
                    <InputText id={`state-${stateIndex}`} value={state.name} onChange={(e) => handleFormChange(e, stateIndex, undefined, "name")} />
                  </div>
                  {
                    state.districts.map((district, districtIndex) => (
                      <div key={districtIndex} style={{ marginLeft: "0px" }}>

                        <Card className="p-2 mb-3">
                          <div className="d-flex flex-warp flex-md-row">
                            <div className="">
                              <div className="field mr-2">
                                <label>District</label>
                                <InputText value={district.name} onChange={(e) => handleFormChange(e, stateIndex, districtIndex, "name")} className="" />
                              </div>
                              <div className="field mr-2">
                                <label>Min Weight</label>
                                <InputNumber value={district.minWeight} onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "minWeight")} />
                              </div>
                            </div>
                            <div className="">
                              <div className="field mr-2">
                                <label>Max Weight</label>
                                <InputNumber value={district.maxWeight} onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "maxWeight")} />
                              </div>
                              <div className="field">
                                <label>Rate</label>
                                <InputNumber value={district.rate} onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "rate")} />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))
                  }

                  <div className="d-flex flex-warp flex-md-row">
                    <div className="mr-2 mb-3">< Button label="Add District" icon="pi pi-plus" className=" mb-3 " onClick={() => addDistrict(stateIndex)} /></div>
                    <div className=""><Button label="Add State" icon="pi pi-plus" className=" mb-3 " onClick={addState} /></div>
                  </div>

                </Card>
              </Col>
            ))}
          </Row >

        </div >
        {/* </Dialog> */}
      </ Container>
    </div>

  );
};

export default ShippingRegion;
