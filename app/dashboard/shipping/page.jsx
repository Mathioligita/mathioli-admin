"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import Cookies from "js-cookie";
// import axios from "axios";
// import { API_BASE_URL } from "../../utlis";
import { CompanyShipping, ShippingDElete, ShippingPATCH, ShippingPOST } from "../../../api/page";

const ShippingRegion = () => {
  const [shippingRegions, setShippingRegions] = useState([]);
  const [regionDialog, setRegionDialog] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    states: [{ name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }],
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    fetchShippingRegions();
  }, []);

  const fetchShippingRegions = async () => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      //   "Content-Type": "application/json",
      // };
      // const response = await axios.get(`${API_BASE_URL}/shippingregion`, { headers });
      const response = await CompanyShipping()
      if(response){

        setShippingRegions(response.data.countrystates || []);
      }
    } catch (error) {
      console.error("Error fetching shipping regions:", error);
    }
  };

  const openNewRegionDialog = () => {
    setFormData({ country: "", states: [{ name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }] });
    setRegionDialog(true);
    setEditing(false);
    setCurrentId(null);
  };

  const saveRegion = async () => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      //   "Content-Type": "application/json",
      // };

      if (editing) {
        // await axios.put(`${API_BASE_URL}/shippingregion/${currentId}`, formData, { headers });
        const data = formData
        const response = await ShippingPATCH(data,currentId)
      } else {
        const data = formData
        const response = await ShippingPOST(data)
        // await axios.post(`${API_BASE_URL}/shippingregion`, formData, { headers });
      }

      fetchShippingRegions();
      setRegionDialog(false);
    } catch (error) {
      console.error("Error saving region:", error);
    }
  };

  const editRegion = (region) => {
    setFormData(region);
    setEditing(true);
    setCurrentId(region._id);
    setRegionDialog(true);
  };

  const deleteRegion = async (id) => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      //   "Content-Type": "application/json",
      // };
      // await axios.delete(`${API_BASE_URL}/shippingregion/${id}`, { headers });
      const response = await ShippingDElete(id)
      if(response){

        fetchShippingRegions();
      }
    } catch (error) {
      console.error("Error deleting region:", error);
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
      states: [...prev.states, { name: "", districts: [{ name: "", minWeight: 0, maxWeight: 0, rate: 0 }] }],
    }));
  };

  const addDistrict = (stateIndex) => {
    const updatedStates = [...formData.states];
    updatedStates[stateIndex].districts.push({ name: "", minWeight: 0, maxWeight: 0, rate: 0 });
    setFormData({ ...formData, states: updatedStates });
  };

  const dialogFooter = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setRegionDialog(false)} />
      <Button label="Save" icon="pi pi-check" onClick={saveRegion} />
    </div>
  );

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text"
          onClick={() => editRegion(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-text"
          onClick={() => deleteRegion(rowData._id)}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Shipping Regions</h1>
      <Button label="New Region" icon="pi pi-plus" onClick={openNewRegionDialog} />
      <DataTable value={shippingRegions} responsiveLayout="scroll">
        <Column field="country" header="Country" />
        <Column
          body={(rowData) =>
            rowData.states.map((state, index) => (
              <div key={index}>
                <strong>{state.name}</strong>
                <ul>
                  {state.districts.map((district, i) => (
                    <li key={i}>
                      {district.name} (Min: {district.minWeight}, Max: {district.maxWeight}, Rate: {district.rate})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
          header="States & Districts"
        />
        <Column body={actionTemplate} header="Actions" />
      </DataTable>

      <Dialog
        visible={regionDialog}
        style={{ width: "700px" }}
        header="Shipping Region"
        modal
        footer={dialogFooter}
        onHide={() => setRegionDialog(false)}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="country">Country</label>
            <InputText
              id="country"
              value={formData.country}
              onChange={(e) => handleFormChange(e, undefined, undefined, "country")}
            />
          </div>
          {formData.states.map((state, stateIndex) => (
            <div key={stateIndex}>
              <div className="field">
                <label htmlFor={`state-${stateIndex}`}>State</label>
                <InputText
                  id={`state-${stateIndex}`}
                  value={state.name}
                  onChange={(e) => handleFormChange(e, stateIndex, undefined, "name")}
                />
              </div>
              {state.districts.map((district, districtIndex) => (
                <div key={districtIndex} style={{ marginLeft: "20px" }}>
                  <div className="field">
                    <label htmlFor={`district-${stateIndex}-${districtIndex}`}>District</label>
                    <InputText
                      id={`district-${stateIndex}-${districtIndex}`}
                      value={district.name}
                      onChange={(e) => handleFormChange(e, stateIndex, districtIndex, "name")}
                    />
                  </div>
                  <div className="field">
                    <label>Min Weight</label>
                    <InputNumber
                      value={district.minWeight}
                      onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "minWeight")}
                    />
                  </div>
                  <div className="field">
                    <label>Max Weight</label>
                    <InputNumber
                      value={district.maxWeight}
                      onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "maxWeight")}
                    />
                  </div>
                  <div className="field">
                    <label>Rate</label>
                    <InputNumber
                      value={district.rate}
                      onValueChange={(e) => handleFormChange(e, stateIndex, districtIndex, "rate")}
                    />
                  </div>
                </div>
              ))}
              <Button label="Add District" icon="pi pi-plus" onClick={() => addDistrict(stateIndex)} />
            </div>
          ))}
          <Button label="Add State" icon="pi pi-plus" onClick={addState} />
        </div>
      </Dialog>
    </div>
  );
};

export default ShippingRegion;
