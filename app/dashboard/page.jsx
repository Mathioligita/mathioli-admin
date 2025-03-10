import styles from "../ui/dashboard/dashboard.scss"
import Card from "../ui/dashboard/card/card"
import Transctionpage from "../ui/dashboard/transctions/transctions";
import Chart from "../ui/dashboard/chart/chart";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import Link from "next/link";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Charts from "../ui/dashboard/chart/chart";
export default function Dashboardpage() {
  return (
    <>
    <div>
      <h1>Dashboard</h1>
      <p>Hi, Samantha. Welcome back  to Mathioli Admin!</p>
    </div>
    </>
   
//     <div className="grid">
//     <div className="col-12 lg:col-6 xl:col-12">
//        <Card/>
//      </div>
//      <div className="col-12 lg:col-6 xl:col-6">
//      <Charts/>
//      </div>
//      <div className="col-12 lg:col-6 xl:col-12">
//      {/* <Transctionpage/> */}
//      </div>
//      <div className="col-12 lg:col-6 xl:col-3">
//      {/* <Rightbar/> */}
//      </div>
   
   
//  </div>
 
  );
}
