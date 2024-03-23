import './Session.css'
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { Spinner , Typography} from "@material-tailwind/react";



export default function Session(props) {
  const socket = io("https://ashlesh-shenoy.in",{
    withCredentials: true
  });
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [containerWidth, setContainerWidth] = useState(null);
  const [qr, setQr] = useState("")
  const [isQrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
    }
  }, [qr]);



  useEffect(()=>{
    socket.on("connect", () => {
      socket.emit("session")
  });
  },[])
    
  socket.on("code",(qr)=>{ 
    setQr(qr);
    setQrReady(true);
    console.log(qr)
  })
  
  socket.on("ready", ()=>{
    socket.disconnect();
    navigate('/campaign')
  })

  return (
    <div className='container-session'>
    {
    
      !isQrReady?
          (
            <div className='flex flex-col gap-6 justify-center items-center'>
              <Spinner className="h-12 w-12" />
              <Typography 
                variant="small"
                color="gray"
                className="flex items-center font-normal mt-3"
                >
                Loading please be patient 👾  
              </Typography>
            </div>
           
            )
          :(<div className='qr-container' >
            <Card className="py-4 px-4 card-container" ref={containerRef}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <small className="text-default-500">SCAN this QR code in your whatsapp to connect</small>
                <h4 className="font-bold text-large">Whatsapp Linked devices</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 "  >
              <QRCode   value={qr} size={containerWidth * 0.85}   logoImage="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" logoWidth={containerWidth * 0.4} />
              </CardBody>
            </Card>
          </div>)
      
    }
    </div>

  )
}
