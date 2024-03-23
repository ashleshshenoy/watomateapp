import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ArrowPathIcon,
  UsersIcon,

}from "@heroicons/react/24/solid";
import './Sidebar.css' 
import { useNavigate } from "react-router-dom";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { logout } from "../util/logout";


export default function DefaultSidebar(props) {
  const navigate = useNavigate();


  async function logoutUser(){
    const result = await logout();
    if(result){
      navigate("/")
    }
  }

  return (
    <Card className="h-[calc(100vh)] nav-bar p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-4 flex items-center gap-4 p-4" onClick={()=>{ navigate('/')}} >
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8 " />
        <Typography variant="h5" color="blue-gray">
          Wato-mate
        </Typography>
      </div>
      <hr className="my-2 border-blue-gray-50 " />
      <List >
        <ListItem className={(props.active == "campaign")? "text-blue-800":""} onClick={()=>{ navigate('/campaign')}}>
          <ListItemPrefix>
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />

          </ListItemPrefix>
          Campaign
        </ListItem>
        <ListItem className={(props.active == "segment")? "text-blue-800":""} onClick={()=>{ navigate('/segment')}}>
          <ListItemPrefix>
          <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
            Segments
        </ListItem>
        <ListItem className={(props.active == "shopify")? "text-blue-800":""} onClick={()=>{ navigate('/shopify')}}>
          <ListItemPrefix>
            <ArrowPathIcon className="h-5 w-5" />
          </ListItemPrefix>
          Events
        </ListItem>
        <ListItem onClick={()=>logoutUser()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
