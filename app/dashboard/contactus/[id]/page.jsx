"use client"

import React from 'react'
import EditcontactForm from '../EditcontactForm'
import { useParams } from 'next/navigation'

export default function page() {
    const { id } = useParams()
    console.log(id,"id")
    return (
        <div>

            <EditcontactForm id={id} />
        </div>
    )
}
