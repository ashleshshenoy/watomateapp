import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Select, 
    Option
  } from "@material-tailwind/react";
import { useState } from "react";
import { createSegment } from "../util/segment";

  export  default function SegmentForm(props) {




      

    const [inputValues, setInputValues] = useState({
      name: '',
      description: '',
    });

    const [subText, setText] = useState("")
  

    const handleChange = (e) => {
      const { id, value } = e.target;
      setInputValues({
        ...inputValues,
        [id]: value,
      });
    };

    function formValid(){
      if(!inputValues.name){
        setText("please provide a name for segments");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      if(!inputValues.description){
        setText("please provide a description for segments");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      return true;
    }

    async function handleSubmit(e){
      e.preventDefault();
      if(!formValid()) return;
      const result = await createSegment(inputValues);
      setInputValues({
        name: '',
        description: '',
      })
      if(result){
        props.fetchSegments();
      }
    }

    return (
       <Card color="transparent" className="campagin-form">
        <Typography variant="h4" color="blue-gray">
          Create new segments.
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Create a segement of customers with common traits.
        </Typography>
        <form className="mt-8 mb-2"  onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Segment Name
            </Typography>
            <Input
              onChange={handleChange}
              value={inputValues.name}
              size="lg"
              id="name"
              placeholder="xyz-user-segment"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Description 
            </Typography>
            <Textarea  value={inputValues.description} label="Description" id="description" onChange={handleChange}/>



           


          </div>
              <Typography 
                variant="small"
                color="gray"
                className="flex items-center font-normal mt-3"
              >
                ** Update customer entries after creating the segment.
              </Typography>
              
          <Button className="mt-6 mb-5" fullWidth type="submit">
            Create segment
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