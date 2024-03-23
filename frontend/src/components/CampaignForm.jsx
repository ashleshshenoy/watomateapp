import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Select, 
  Option,
  Spinner
} from "@material-tailwind/react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { createCampaign } from "../util/campaign";
import { getAllSegment } from '../util/segment';
import React from 'react'
import { generateImage, regenerateMessage } from "../util/gpt";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/24/solid";


export  default function CampaignForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null)
  const [segments, setSegments] = useState([])
  const [inputValues, setInputValues] = useState({
    message : "",
  });
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [subText, setText] = useState("")
  const [action, setAction] = useState("");

  const handleAction = async (e)=>{
    setIsLoading(true);
    setAction(e);
    console.log(e)
    const result = await regenerateMessage({action : e, sentence : inputValues.message});
    console.log(result);
    setInputValues({
      ...inputValues,
      message : result
    })
    setIsLoading(false);
  }
  const handleSelection = (e)=>{
    setSelectedSegment(e);
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  function formValid(){
    if(!selectedSegment){
      setText("please select a segment");
      setTimeout(()=>{ setText("")},3000);
      return false;
    }
    if(!inputValues.message){
      setText("Please provide a valid message");
      setTimeout(()=>{ setText("")},3000);
      return false;
    }
    return true;
  }

  async function handleImageGeneration(){
    setIsLoading(true);
    const image = await generateImage({prompt: inputValues.message});
    if(image)
      setImageUrl(image.url)
    setIsLoading(false)
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!formValid()) return;
    console.log(selectedSegment)
    const body = inputValues;
    body.segment_id = parseInt(selectedSegment);
    if(imageUrl) body.image_url = imageUrl;
    console.log(body)
    const result = await createCampaign(body);
    if(result){
      window.location.reload();
    }
  }


  async function fetchSegments(){
      const results = await getAllSegment();
      console.log(results)
      if(results){
          setSegments(results);
      }
  }


  useEffect(()=>{
      fetchSegments();
  },[])
  
  return (
     <Card color="transparent" className="campagin-form">
      <Typography variant="h4" color="blue-gray">
        Start Campaign
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Send templated messages to a specific segment.
      </Typography>
      <form className="mt-8 mb-2" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">


         <Typography variant="paragraph" color="blue-gray" className="-mb-3">
            Select segment 
          </Typography>
          <Select label="Select Version" id="segment_id" onChange={handleSelection} >
            {
              segments.map((data)=>{
                return(
                  <Option key={data.id} value={""+data.id}>{data.name}</Option>
                )
              })
            }
          </Select>

          <Typography variant="paragraph" color="blue-gray" className="-mb-6">
            Message 
          </Typography>
            <div className="">
            <div className="">
            <Textarea label="Message" value={inputValues.message} className=" " id="message"  onChange={handleChange}/>
            </div>
            <div className="mt-1">
              <Select label="Regenerate with Ai"  value={action} onChange={handleAction} >
                <Option value="formal">Formal</Option>
                <Option value="emojis and mordern">Young</Option>
                <Option value="summarise">Summarise</Option>
                <Option value="elaborate">Elaborate</Option>
              </Select>
            </div>
          </div>

        </div>
        <Typography variant="small"  className="mb-3 grey-100 flex gap-2">
            <InformationCircleIcon  className="w-6 h-6"/> Make use of &#123;name&#125; to represent username and &#123;phone&#125;  to represent phone number.
            Regenerate your message using AI.
          </Typography>


        <div className="flex flex-row  mt-8 gap-5">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {imageUrl ? (
              <>
                <div className="flex flex-col gap-5">
                  <ArrowPathIcon className="w-5 h-5 text-black" onClick={handleImageGeneration} />
                  <XCircleIcon className="w-5 h-5 text-black" onClick={() => setImageUrl(null)} /> {/* Corrected onClick */}
                </div>
                <img src={imageUrl} height={100} width={100} alt="" />
              </>
            ) : (
              <Checkbox label="Generate image" onClick={handleImageGeneration} />
            )}
          </>
        )}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Publish Campaign
        </Button>
        <Typography 
              variant="small"
              color="red"
              className="flex items-center font-normal mt-3"
              >
              {subText}
          </Typography>
      </form>
    </Card>
  );
}