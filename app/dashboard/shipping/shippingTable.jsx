"use client"
import { API_BASE_URL } from '../../utlis';
import axios from 'axios';
import { Column } from 'jspdf-autotable';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'

import Cookies from "js-cookie"
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import './shippingTable.scss'

export default function ShippingTable() {
    const [shippingRegions, setShippingRegions] = useState([]);
    const accessToken = Cookies.get("accessToken");
    const router = useRouter()
    useEffect(() => {
        fetchShippingRegions();
    }, []);

    const fetchShippingRegions = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            const response = await axios.get(`${API_BASE_URL}/shippingregion`, { headers });
            setShippingRegions(response.data.data.countrystates || []);
        } catch (error) {
            console.error("Error fetching shipping regions:", error);
        }
    };


    const saveRegion = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };

            if (editing) {
                await axios.put(`${API_BASE_URL}/shippingregion/${currentId}`, formData, { headers });
            } else {
                await axios.post(`${API_BASE_URL}/shippingregion`, formData, { headers });
            }

            fetchShippingRegions();
            setRegionDialog(false);
        } catch (error) {
            console.error("Error saving region:", error);
        }
    };

    const editRegion = (region) => {
        // setFormData(region);
        // setEditing(true);
        router.push(`/dashboard/shipping/${region._id}`)
        setCurrentId(region._id);
        // setRegionDialog(true);
    };

    const deleteRegion = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            await axios.delete(`${API_BASE_URL}/shippingregion/${id}`, { headers });
            fetchShippingRegions();
        } catch (error) {
            console.error("Error deleting region:", error);
        }
    };

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setRegionDialog(false)} />
            <Button label="Save" icon="pi pi-check" onClick={saveRegion} />
        </div>
    );

    const checkboxs = (rowData) => {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                </label>
            </div>

        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div className='d-flex justify-content-center'>
                <div >

                    <Button
                        // label="Edit"
                        style={{ all: "unset" }}
                        icon="pi pi-pencil"
                        className="p-button-text"
                        onClick={() => editRegion(rowData)}
                    />
                </div>
                <div>
                    <Button
                        icon="pi pi-eye"
                        style={{ all: "unset" }}
                        className="p-button-text"
                    // onClick={}
                    />
                </div>
                <div>
                    <Button
                        // label="Delete"
                        icon="pi pi-trash"
                        style={{ all: "unset" }}
                        className="p-button-text"
                        onClick={() => deleteRegion(rowData._id)}
                    />
                </div>
            </div>
        );
    };
    return (
        <div className='p-5'>
            <div className="d-flex">
                <div className="flex-fill"><h3 className="quote-page-title text-start" >Shipping</h3></div>
                <div className="">
                    <div className='text-end'>

                        <Button onClick={() => router.push("/dashboard/shipping/create")}> Add Shpping</Button>
                    </div>
                </div>
            </div>
            <DataTable value={shippingRegions} responsiveLayout="scroll">

                {/* <Column header="S.No" body={(rowData) => console.log(rowData,"dfgj")} /> */}
                <Column headerStyle={{ width: "3rem" }} body={checkboxs} />
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
                <Column body={actionTemplate} className="text-center" header="Actions" />
            </DataTable>
        </div>
    )
}