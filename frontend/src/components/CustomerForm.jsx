import { HomeIcon } from "@heroicons/react/24/outline";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Select, 
    Breadcrumbs,
    Option
  } from "@material-tailwind/react";
import { useState } from "react";
import { Link} from "react-router-dom";
import { createCustomerEntry } from "../util/customerentry";
import { uploadCustomerEntryFile } from "../util/customerentry";

export  default function CustomerForm(props) {

  async function handleFile(event){
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    const postData = {
      file : selectedFile,
      segment_id : props.segment.id
    }
    const result = await uploadCustomerEntryFile(postData);
    if(result){
      props.fetchCustomerEntry();
    }
  }

    const [inputValues, setInputValues] = useState({
      name: '',
      phone: '',
      segment_id : props.segment.id,
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
      const regex = /^[0-9-+]{1,}$/;
      if(!inputValues.name){
        setText("please provide a username for customer");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      if(!inputValues.phone){
        setText("please provide the phone number");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      if(!regex.test(inputValues.phone)){
        setText("Please provide a valid phone number");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      return true;
    }

    async function handleSubmit(e){
      e.preventDefault();
      if(!formValid()) return;
      const result = await createCustomerEntry(inputValues);
      setInputValues({
        name: '',
        phone: '',
        segment_id : props.segment.id,
      })
      if(result){
        props.fetchCustomerEntry();
      }
    }


    return (
       <Card color="transparent" className="campagin-form">
          <Breadcrumbs className="mb-5 ">  
              <Link to="/"><HomeIcon className="h-4 w-4" /></Link>
              <a href="/segment">segments</a>
              <Link>{props.segment.name}</Link>
        </Breadcrumbs>

        <Typography className="mt-5" variant="h4" color="blue-gray">
          Create Customer Entry
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Add customers to {props.segment.name}.
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Customer name
            </Typography>
            <Input
              id="name"
              value={inputValues.name}
              onChange={handleChange}
              size="lg"
              placeholder="eg: ashles shenoy"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Customer Phone no (include country code)
            </Typography>
           <Input
              id="phone"
              value ={inputValues.phone}
              onChange={ handleChange }
              size="lg"
              placeholder="eg : +916361284091"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />  
                
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Create entry
          </Button>
          <Typography 
              variant="small"
              color="red"
              className="flex items-center font-normal mt-3"
              >
              {subText}
          </Typography>
        </form>
        <div className="flex items-center gap-2 mt-5 mb-5	">
        <hr className="w-1/2" /> or <hr className="w-1/2" />

        </div>

        <input type="file" className="bg-gray-200 mt-5" onChange={files => handleFile(files)}>
        
        </input>
      </Card>
    );
  }