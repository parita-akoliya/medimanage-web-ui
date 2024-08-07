import { faDashcube } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const AdminSideBarNav = [
    {
      link: "/admin",
      section: "dashboard",
      icon: faDashcube,
      text: "Dashboard",
      roles: ['Admin','Doctor','FrontDesk']
    },
    {
      link: "/admin/users",
      section: "users",
      icon: faHome,
      text: "Users",
      roles: ['Admin']
    },
    {
      link: "/admin/clinic",
      section: "clinic",
      icon: faHome,
      text: "Clinic",
      roles: ['Admin']
    },
    {
      link: "/admin/appointment",
      section: "appointment",
      icon: faHome,
      text: "Appointment",
      roles: ['Doctor']
    }
  ];
  
  export default AdminSideBarNav;