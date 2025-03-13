import styles from "../card/card.scss"
import Chart from "../chart/chart"
import Rightbar from "../rightbar/rightbar"
import Transctionpage from "../transctions/transctions"
import { Card } from 'primereact/card';

export default function Cardpage() {
  return (
<>
<div className="card  flex grid justify-content-between ">
            <Card className="p-0" >
                  <p>card1</p>
                    <p className="">
                        Lorem ipsum dolor sit 
                    </p>
       
            </Card>
            
           
        </div>
</>
  )
}
