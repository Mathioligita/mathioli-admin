
"use client"
import React from 'react'
import EditBookForm from '../EditBookForm'
import { useParams } from 'next/navigation'

export default function page() {
    const {id} =useParams()
    return (
        <div>
            <EditBookForm id={id} />
        </div>
    )
}
