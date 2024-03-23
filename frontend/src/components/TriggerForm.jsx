import {
    Card,
    Button,
    Typography,
    Textarea,
    Select, 
    Option,
    Spinner,
  } from "@material-tailwind/react";
  import { useState } from "react";
  import React from 'react'
  import {  regenerateMessage } from "../util/gpt";
  import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { createPoll } from "../util/shopify";
  
  
  export  default function TriggerForm() {
    const [isLoading, setIsLoading] = useState(false);
    const options = ["Customer Created", 'Product Published','Abandoned Checkouts']
    const infoTexts =[
      "Make use of {name} to represent username and {phone}  to represent phone number.",
      "Make use of {name} to represent username, {phone}  to represent phone number and {product} to represent product title  ",
      "Make use of {name} to represent username, {phone}  to represent phone number and {checkout_url} to represent checkout completion link",

    ]
    const [inputValues, setInputValues] = useState({
      message : "",
    });
    const [pollType, setPollType] = useState(null);
    const [subText, setText] = useState("")
    const [action, setAction] = useState("");
    const [info, setInfo] = useState("Regenerate your message using AI")

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
      setInfo(infoTexts[parseInt(e)])
      setPollType(e);
    }

    const handleChange = (e) => {
      const { id, value } = e.target;
      setInputValues({
        ...inputValues,
        [id]: value,
      });
    };
  
    function formValid(){
      if(!pollType){
        console.log(pollType)
        setText("please select a trigger");
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
  

    async function handleSubmit(e){
      e.preventDefault();
    
      if(!formValid()) return;
      let idx = parseInt(pollType)
      const body = inputValues;
      body.type = options[idx];
      console.log(body)
      const result = await createPoll(body,idx);
      if(result){
        window.location.reload();
      }
    }
  
    
    return (
       <Card color="transparent" className="event-form">
        <Typography variant="h4" color="blue-gray">
          Subscribe to an event.
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Send Messages to customer based on Triggered events.
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
  
  
           <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Select a trigger.
            </Typography>
            <Select label="Select Trigger" id="trigger_id" onChange={handleSelection} >
                  <Option value="0">Customer Created</Option>
                  <Option value="1">Product Published</Option>
                  <Option value="2">Abandoned Checkouts</Option>
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
              <InformationCircleIcon  className="w-6 h-6"/> 
              {info}
            </Typography>



            {isLoading &&
          <Spinner />
           }

          <Button className="mt-6" fullWidth type="submit">
            Create event
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