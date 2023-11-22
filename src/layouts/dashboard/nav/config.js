// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  // c:\Users\nazir\Downloads\ic_floor.svg
  {
    title: "floor",
    path: "/dashboard/floorCreation",
    icon: icon("ic_floor"),
  },
  {
    title: "shop",
    path: "/dashboard/shopCreate",
    icon: icon("ic_shop"),
  },
  // {
  //   title: "product",
  //   path: "/dashboard/products",
  //   icon: icon("ic_cart"),
  // },
  // {
  //   title: "Add User",
  //   path: "/dashboard/createUser",
  //   icon: icon("ic_createUser"),
  // },
  {
    title: "ammenities",
    path: "/dashboard/createAmmenities",
    icon: icon("ic_createUser"),
  },
  {
    title: "maintenance requests",
    path: "/dashboard/maintenance",
    icon: icon("ic_maintenance"),
  },
  {
    title: "booking requests",
    path: "/dashboard/requests",
    icon: icon("ic_request"),
  },

  {
    title: "Wellness Board",
    path: "/dashboard/wellnessboard",
    icon: icon("ic_wellness"),
  },
  // {
  //   title: "Ammenity Slots",
  //   path: "/dashboard/createAmmenitySlots",
  //   icon: icon("ic_createUser"),
  // },
  // {
  //   title: "blog",
  //   path: "/dashboard/blog",
  //   icon: icon("ic_blog"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic_disabled"),
  // },
];

export default navConfig;
