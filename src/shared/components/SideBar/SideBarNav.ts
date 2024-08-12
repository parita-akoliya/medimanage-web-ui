import { faTachometerAlt, faUsers, faClinicMedical, faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

const AdminSideBarNav = [
    {
        link: "/admin",
        section: "dashboard",
        icon: faTachometerAlt, 
        text: "Dashboard",
        roles: ['Admin', 'Doctor', 'FrontDesk']
    },
    {
        link: "/admin/users",
        section: "users",
        icon: faUsers, 
        text: "Users",
        roles: ['Admin']
    },
    {
        link: "/admin/clinic",
        section: "clinic",
        icon: faClinicMedical, 
        text: "Clinic",
        roles: ['Admin']
    },
    {
        link: "/admin/appointment",
        section: "appointment",
        icon: faCalendarAlt, 
        text: "Appointment",
        roles: ['Doctor']
    },
    {
        link: "/admin/lookup",
        section: "lookup",
        icon: faSearch, 
        text: "Lookup Data",
        roles: ['Admin']
    }
];

export default AdminSideBarNav;
