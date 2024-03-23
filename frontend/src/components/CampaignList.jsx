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

export function CampaignList(props) {  
    
  const navigate = useNavigate();

  return (
    <Card className="flex items-center h-full overflow-auto">
      {(props.data.length > 0) ? (
        <List className="w-full">
          {props.data.reverse().map((item, idx) => (
            <ListItem key={idx} className="items-start">
              <ListItemPrefix>
                <LetteredAvatar name={item.name[0]} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {item.name}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {item.message}
                </Typography>
              </div>
              <hr className="my-2 border-blue-gray-10" />
            </ListItem>
          ))}
        </List>
      ) : (
        <img 
          src="/campaign.jpg"
          width={350}
          height={350}
          alt="Your Image Alt Text"
        />
      )}
    </Card>
  );
}
