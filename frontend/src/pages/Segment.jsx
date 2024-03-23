import React from 'react'
import Sidebar from '../components/Sidebar'
import './Segment.css'
import Topbar from '../components/Topbar'
import Form from '../components/SegmentForm';
import { SegmentList } from '../components/SegmentList';
import { Typography } from '@material-tailwind/react';
import CustomerForm from '../components/CustomerForm';
import { useState, useEffect } from 'react'
import { getAllSegment } from '../util/segment';
import { getAllFromSegment } from '../util/customerentry';
import { CustomerList } from '../components/CustomerList';
import { useNavigate } from 'react-router-dom';

export default function Segment() {
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [segments, setSegments] = useState([])
    const [customerEntry, setCustomerEntry] = useState([]);
    //todo : fetch segments 

    const navigate = useNavigate()

    async function fetchSegments(){
        const results = await getAllSegment();
        if(results){
            setSegments(results);
        }
    }

    async function fetchCustomerEntry(){
        if(!selectedSegment) return;
        const result = await getAllFromSegment(selectedSegment.id);
        if(result){
            setCustomerEntry(result);
        }
    }

    useEffect(()=>{
        fetchSegments();
    },[])

    useEffect(()=>{
        fetchCustomerEntry()
    },[selectedSegment])

    return (
        <div className='divi'>
            <Sidebar active="segment"/>
            <Topbar/>
            <div className='segment-container'>
                {
                    (selectedSegment)?( 
                        <>
                            <div className="segment-form-container flex-col w-full flex-wrap md:flex-nowrap gap-4">
                                <CustomerForm fetchCustomerEntry={fetchCustomerEntry} segment={selectedSegment}/>
                            </div>
                            <div className="segments">
                                <CustomerList fetchCustomerEntry={fetchCustomerEntry} data={customerEntry}/>
                            </div>
                        </>

                    ):
                    (
                        <>
                            <div className="segment-form-container flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Form fetchSegments={fetchSegments}/>
                            </div>
                            <div className="segments">
                            <SegmentList data={segments} setSelectedSegment={setSelectedSegment} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
