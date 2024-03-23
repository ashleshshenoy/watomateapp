import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { shopifyAuth } from "../util/shopify";

export  default function ShopifyLoginForm(props) {

    const [inputValue, setInputValue] = useState("");
    const navigate = new useNavigate();
    const [subText, setText] = useState("")
  

    const handleChange = (e) => {
      const { id, value } = e.target;
      setInputValue(value);
    }


    //fix : validation
    function formValid(){
      var regexPattern = /(?:https:\/\/)?(?:[a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.myshopify\.com/;
      if(!regexPattern.test(inputValue)){
        setText("Please provide a valid link");
        setTimeout(()=>{ setText("")},3000);
        return false;
      }
      return true;
    }

    async function handleSubmit(e) {
      e.preventDefault();
      if (!formValid()) return;
  
      let shopUrl = inputValue;
      if (shopUrl.startsWith("https://")) {
          shopUrl = shopUrl.substring(8); // Remove "https://"
      }
      console.log(shopUrl);
      window.location.href = 'https://xrgrzjfd-5000.inc1.devtunnels.ms/shopify/auth?shop=' + shopUrl;
  }
  


    return (
       <Card color="transparent" className="campagin-form">
        <Typography className="mt-5" variant="h4" color="blue-gray">
          Link shopify Store
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Install watomate app to shopify to setup automated workflows.   
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="paragraph" color="blue-gray" className="-mb-3">
              Shopify Store URL
            </Typography>
            <Input
              id="link"
              value={inputValue}
              onChange={handleChange}
              size="lg"
              placeholder="https://{exampleshop}.myshopify.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
           
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Install watomate
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