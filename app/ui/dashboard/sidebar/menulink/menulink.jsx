
import React from 'react'
import "../sidebar.scss";
export default function Menulink({item}) {
  // const { backgroundColor, textColor, fontFamily } = useUserContext();
  return (
    <div >
         <a href={item.to} className="p-ripple" tabIndex={0}>
                                        <i className={`layout-menuitem-icon ${item.icon} `} style={{fontSize:"30px"}}></i>
                                        <span className="layout-menuitem-text">{item.label}</span>
                                    </a>
    </div>
  )
}
