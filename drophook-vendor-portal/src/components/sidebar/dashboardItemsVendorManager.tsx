import { SidebarItemsType } from "../../types/sidebar";
import { BookOpen, Heart, List } from "react-feather";
import "./sidebar.css";
import { ReactComponent as calendar } from "./assets/calendar-icon.svg";
import { ReactComponent as cart } from "./assets/cart-icon.svg";
import { ReactComponent as dashboard } from "./assets/dashboard-icon.svg";
import { ReactComponent as messenger } from "./assets/messenger-icon.svg";
import { ReactComponent as product } from "./assets/product-icon.svg";
import { ReactComponent as profile } from "./assets/profile-icon.svg";
import { ReactComponent as merchant } from "./assets/merchant-icon.svg";
import { ReactComponent as promotions } from "./assets/profile-icon.svg";
import { ReactComponent as faq } from "./assets/faq-icon.svg";
import { ReactComponent as settings } from "./assets/settings-icon.svg";

const pagesSectionVendor = [
  {
    href: "/dashboard/default",
    icon: dashboard,
    title: "Dashboard",
  },
  {
    href: "/pages/profile",
    icon: profile,
    title: "Profile",
  },
  {
    href: "/products",
    icon: product,
    title: "Products",
  },
  {
    href: "/orders",
    icon: cart,
    title: "Orders",
  },
  {
    href: "/calendar",
    icon: calendar,
    title: "Calendar",
  },
  {
    href: "/messenger",
    icon: messenger,
    title: "Messenger",
  },
] as SidebarItemsType[];

const elementsSection = [
  {
    href: "/components/alerts",
    icon: merchant,
    title: "Merchants",
    //   children: [
    //     {
    //       href: "/components/alerts",
    //       title: "Alerts",
    //     },
    //     {
    //       href: "/components/accordion",
    //       title: "Accordion",
    //     },
    //     {
    //       href: "/components/avatars",
    //       title: "Avatars",
    //     },
    //     {
    //       href: "/components/badges",
    //       title: "Badges",
    //     },
    //     {
    //       href: "/components/buttons",
    //       title: "Buttons",
    //     },
    //     {
    //       href: "/components/cards",
    //       title: "Cards",
    //     },
    //     {
    //       href: "/components/chips",
    //       title: "Chips",
    //     },
    //     {
    //       href: "/components/dialogs",
    //       title: "Dialogs",
    //     },
    //     {
    //       href: "/components/lists",
    //       title: "Lists",
    //     },
    //     {
    //       href: "/components/menus",
    //       title: "Menus",
    //     },
    //     {
    //       href: "/components/pagination",
    //       title: "Pagination",
    //     },
    //     {
    //       href: "/components/progress",
    //       title: "Progress",
    //     },
    //     {
    //       href: "/components/snackbars",
    //       title: "Snackbars",
    //     },
    //     {
    //       href: "/components/tooltips",
    //       title: "Tooltips",
    //     },
    //   ],
    // },
    // {
    //   href: "/charts",
    //   icon: PieChart,
    //   title: "Charts",
    // },
    // {
    //   href: "/forms",
    //   icon: CheckSquare,
    //   title: "Forms",
    //   children: [
    //     {
    //       href: "/forms/pickers",
    //       title: "Pickers",
    //     },
    //     {
    //       href: "/forms/selection-controls",
    //       title: "Selection Controls",
    //     },
    //     {
    //       href: "/forms/selects",
    //       title: "Selects",
    //     },
    //     {
    //       href: "/forms/text-fields",
    //       title: "Text Fields",
    //     },
    //     {
    //       href: "/forms/editors",
    //       title: "Editors",
    //     },
    //     {
    //       href: "/forms/formik",
    //       title: "Formik",
    //     },
    //   ],
  },
  {
    href: "/tables",
    icon: promotions,
    title: "Promotions",
    // children: [
    //   {
    //     href: "/tables/simple-table",
    //     title: "Vendor Table",
    //   },
    //   // {
    //   //   href: "/tables/advanced-table",
    //   //   title: "Advanced Table",
    //   // },
    //   // {
    //   //   href: "/tables/data-grid",
    //   //   title: "Data Grid",
    //   // },
    // ],
  },
  {
    href: "/icons",
    icon: Heart,
    title: "Integrations",
    // children: [
    //   {
    //     href: "/icons/material-icons",
    //     title: "Material Icons",
    //   },
    //   {
    //     href: "/icons/feather-icons",
    //     title: "Feather Icons",
    //   },
    // ],
  },
  // {
  //   href: "/maps",
  //   icon: Map,
  //   title: "Maps",
  //   children: [
  //     {
  //       href: "/maps/google-maps",
  //       title: "Google Maps",
  //     },
  //     {
  //       href: "/maps/vector-maps",
  //       title: "Vector Maps",
  //     },
  //   ],
  // },
] as SidebarItemsType[];

const docsSection = [
  {
    href: "/documentation/welcome",
    icon: BookOpen,
    title: "Academy",
  },
  {
    href: "/changelog",
    icon: List,
    title: "Contact",
    // badge: "v3.2.1",
  },
] as SidebarItemsType[];

const faqSection = [
  {
    href: "/documentation/welcome",
    icon: faq,
    title: "FAQ",
  },
] as SidebarItemsType[];

const settingsSection = [
  {
    href: "/documentation/welcome",
    icon: settings,
    title: "Academy",
  },
] as SidebarItemsType[];

const navItems = [
  {
    title: "NAVIGATION",
    pages: pagesSectionVendor,
  },
  {
    title: "GROWTH MANAGEMENT",
    pages: elementsSection,
  },
  {
    title: "HELP CENTER",
    pages: docsSection,
  },
  {
    title: "FAQ",
    pages: faqSection,
  },
  {
    title: "Settings",
    pages: settingsSection,
  },
];

export default navItems;