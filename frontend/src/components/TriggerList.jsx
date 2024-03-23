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
import { deletePoll } from "../util/shopify";
  
  export function TriggerList(props) {  
      

    async function removePoll(id){
      const result = await deletePoll(id)
      console.log("delete :"+ result);
      if(result){
        props.fetchPolls()
      }
    }

  
    return (
      <Card className="flex items-center h-full overflow-auto">
        {(props.data.length > 0) ? (
          <List className="w-full">
            {props.data.reverse().map((item, idx) => (
              <ListItem key={idx} className="items-start">
                <ListItemPrefix>
                  <LetteredAvatar name={item.type[0]} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {item.type}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {item.message}
                  </Typography>
                </div>
                <ListItemSuffix onClick={()=>{removePoll(item.id)}}>
                   <Chip value="delete" variant="ghost"  />
                </ListItemSuffix>
                <hr className="my-2 border-blue-gray-10" />
              </ListItem>
            ))}
          </List>
        ) : (
          <img 
            src="/events.jpg"
            width={350}
            height={350}
            alt="Your Image Alt Text"
          />
        )}
      </Card>
    );
  }
  