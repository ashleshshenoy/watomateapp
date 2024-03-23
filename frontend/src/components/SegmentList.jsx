import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import LetteredAvatar from 'react-lettered-avatar';
import { useNavigate } from "react-router-dom";

export function SegmentList(props) {
    const navigate = useNavigate();
    return (
      <Card className=" flex items-center min-h-full	" >
         {
            
          (props.data.length >0)?(
            <List className="w-full">

             { props.data.reverse().map((item)=>{
                return (  
                <ListItem key={item.id} onClick={()=>{props.setSelectedSegment(item)}} >
                  <ListItemPrefix>
                  <LetteredAvatar name={item.name[0]}  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {item.name}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {item.description}
                  </Typography>
                </div>
              </ListItem>)
                })}

          </List>
          ):(
            <img 
              src="/segment.jpg"
              width={350}
              height={350}
              alt="Your Image Alt Text"
            />
          )
         
         }


      </Card>
    );
  }