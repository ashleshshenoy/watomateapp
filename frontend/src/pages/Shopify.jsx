import React from 'react'
import Sidebar from '../components/Sidebar'
import './Shopify.css'
import Topbar from '../components/Topbar'
import Form from '../components/TriggerForm';
import { useState, useEffect } from 'react'
import { getAllSegment } from '../util/segment';
import { useNavigate } from 'react-router-dom';
import { TriggerList } from '../components/TriggerList';
import { createPoll, getPolls } from '../util/shopify';

export default function Shopify() {
    const [polls, setPolls] = useState([])
    //todo : fetch segments 

    const navigate = useNavigate()

    async function fetchPolls(){
        const results = await getPolls();
        if(results){
            setPolls(results);
        }
    }

 

    useEffect(()=>{
      fetchPolls()
    },[])


    return (
        <div className='divi'>
            <Sidebar active="shopify"/>
            <Topbar/>
            <div className='event-container'>
              <div className="event-form-container flex w-full flex-wrap md:flex-nowrap gap-4">
                <Form/>
              </div>
              <div className="events">  
                <TriggerList fetchPolls={fetchPolls} data={polls}  />
              </div>
            </div>
        </div>
    )
}
