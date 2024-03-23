import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import LetteredAvatar from 'react-lettered-avatar';
import { useFetcher, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteCustomerEntry } from "../util/customerentry";

  export function CustomerList(props) {
    const navigate = useNavigate();
    async function deleteCustomer(id){
      const result = await deleteCustomerEntry(id)
      console.log(result);
      if(result){
        props.fetchCustomerEntry()
      }
    }


    return (
      <Card className=" flex items-center min-h-full	" >
         {
            
          (props.data.length >0)?(
            <List className="w-full">

             { props.data.reverse().map((item)=>{
                return (  
                <ListItem key={item.id}  >
                  <ListItemPrefix>
                  <LetteredAvatar name={item.name} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {item.name}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {item.phone}
                  </Typography>
                </div>
                <ListItemSuffix onClick={()=>{deleteCustomer(item.id)}}>
                <Chip value="delete" variant="ghost"  />
                </ListItemSuffix>
              </ListItem>)
                })}

          </List>
          ):(
            <img 
              src="/customerentry.jpg"
              width={350}
              height={350}
              alt="Your Image Alt Text"
            />
          )
         
         }


      </Card>
    );
  }