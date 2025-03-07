
// 'use client';

// import Link from 'next/link';
// import { classNames } from 'primereact/utils';
// import React, { useEffect, useState } from 'react';
// import { Chip } from 'primereact/chip';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import axiosInstance from '../../../../axiosConfig';
// import "./navba.scss";

// const Navbar = () => {

//     return (
//         <div className="layout-topbar">
//             <Link href="/" className="layout-topbar-logo">
//                 <span>Mathioli</span>
//             </Link>

//             <div className={classNames('layout-topbar-menu')}>
//                 <Link href="/dashboard/profile">
//                     <Chip
//                         key="profile-chip"
//                         label="Profile"
//                         image={ "/killer.avif"}
//                         className="profile-chip"
//                     />
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
// import axiosInstance from '../../../../axiosConfig';
// import { Chip } from 'primereact/chip';
'use client';
import { classNames } from 'primereact/utils';
import React from 'react';
import Link from 'next/link';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./navba.scss";
import { InputText } from 'primereact/inputtext';
import { Menu } from "primereact/menu";

const Navbar = () => {




    const items = [
        { label: "Profile", icon: "pi pi-user" },
        { label: "Settings", icon: "pi pi-cog" },
        { label: "Logout", icon: "pi pi-sign-out" },
    ];

    const menu = React.useRef(null);
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo mr-5 d-flex flex-column flex-sm-row">
                <span>Mathioli</span>
            </Link>

            <div className={`justify-content-between d-flex flex-fill ${classNames('layout-topbar-menu')}`}            >
                {/* <Link href="/dashboard/profile">
                profile
                    <Chip
                        label="Profile"
                        image="/killer.avif"
                        className="profile-chip"
                    />
                </Link> */}
                <div className="d-flex flex-columns flex-sm-row flex-fill">
                    <div className="p-inputgroup" style={{ width: "100%", maxWidth: "300px" }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            style={{ textIndent: "5px" }}
                        />
                    </div>


                    <div className="header-container flex-fill">
                        <i className="pi pi-bell bell-icon"></i>
                        <div className="profile-dropdown" onClick={(e) => menu.current.toggle(e)}>
                            <span role="img" aria-label="profile" className="profile-emoji">
                                🧑‍💻
                            </span>
                            <span className="profile-name">John Doe</span>
                            <i className="pi pi-chevron-down dropdown-icon"></i>
                        </div>
                        <Menu model={items} popup ref={menu} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
