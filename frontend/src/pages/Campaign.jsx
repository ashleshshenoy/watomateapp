import React from 'react'
import Sidebar from '../components/Sidebar'
import './Campaign.css'
import Topbar from '../components/Topbar'
import {Input} from "@nextui-org/react";
import CampaignForm from '../components/CampaignForm';
import { CampaignList } from '../components/CampaignList';
import { Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCampaigns } from '../util/campaign';
import { isAuthenticated } from '../util/auth';
import { useNavigate } from 'react-router-dom';

export default function Campaign() {
    const navigate = useNavigate()
    const [compaigns, setCampaigns] = useState([])

    async function fetchCampaign(){
        const results = await getCampaigns();
        if(results){
            setCampaigns(results);
        }
    }   

    useEffect(()=>{
        fetchCampaign()
    },[])
    return (
        <div className='divi'>
            <Sidebar active="campaign" />
            <Topbar/>
            <div className='campaign-container'>
                <div className="campaign-form-container">
                    <CampaignForm />
                </div>
                <div className="campaigns">
                   <CampaignList type="campaign" data={compaigns}/>
                </div>

            </div>
        </div>
    )
}
