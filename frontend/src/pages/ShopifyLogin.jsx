import React from 'react'
import Sidebar from '../components/Sidebar'
import './Shopify.css'
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import ShopifyLoginForm from '../components/ShopifyLoginForm';

export default function ShopifyLogin() {

    const navigate = useNavigate()


    return (
        <div className='divi'>
            <Sidebar active="shopify"/>
            <Topbar/>
            <div className='event-container'>
              <div className="event-form-container flex w-full flex-wrap md:flex-nowrap gap-4">
                <ShopifyLoginForm/>
              </div>
              <div className="events">  
                <Card className="flex items-center h-full overflow-auto">
                    <img src="/shopify.jpg" height={300} width={300} alt="" />
                </Card>
              </div>
            </div>
        </div>
    )
}
