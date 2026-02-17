// import { MOCK_CHART } from '../data/mockData';
import { MOCK_CHART } from '../data/mockData';
import { useEffect, useState } from "react";
import './Sidebar.css';



const body =document.querySelector('body'),
    sidebar=document.querySelector('.sidebar'),
    toggle=document.querySelector('.toggle');

    toggle?.addEventListener('click',()=>{
        sidebar?.classList.toggle("close");
    });


const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('click', () => {

        boxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active');

    });
});

let now = new Date();
function updateDateTime(){

    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth()+1).padStart(2,'0');
    const year = now.getFullYear();
    (document.getElementById("time") as HTMLInputElement).innerText =
        hours + ":" + minutes + ":" + seconds;

    (document.getElementById("date") as HTMLInputElement).innerText =
        "Ngày " + day + "/" + month + "/" + year;
}


function changeDate(direction:number){
    const value = parseInt(
    (document.getElementById("value") as HTMLInputElement).value ) || 0;
  const unit = (document.getElementById("unit") as HTMLSelectElement).value;

      if(unit === "minute"){
        now.setMinutes(now.getMinutes() + direction * value);
    }
    else if(unit === "hour"){
        now.setHours(now.getHours() + direction * value);
    }
    else if(unit === "day"){
        now.setDate(now.getDate() + direction * value);
    }
    else if(unit === "month"){
        now.setMonth(now.getMonth() + direction * value);
    }
    else if(unit === "year"){
        now.setFullYear(now.getFullYear() + direction * value);
    }

    updateDateTime();
}

setInterval(()=>{
    now.setSeconds(now.getSeconds() + 1);
    updateDateTime();
},1000);
updateDateTime();

function resetNow(){
    now = new Date();
    updateDateTime();
}    
    


export function Sidebar() {
    return (
        <><nav className="sidebar close ">
            <header>

                <div className="img_items">

                    <a href="" className="Logo-text text otext">Astrologer</a>


                    <div className="toggle ">
                        <i className="fa-solid fa-angle-left himg icons toggle rotate"></i>
                    </div>
                </div>



                <div>
                    <button className="newsj">
                        <i className="fa-solid fa-plus fa-2x add himg plus"></i>
                        <span className="text sbtext otext">New Subject</span>
                    </button>
                </div>


            </header>

            <div className="menu_bar">
                <div className="menu">


                    <ul className="menu1 menu">
                        <h3 className="menu_text otext">Workspace</h3>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-house mimg"></i>

                            </a><span className="link_text otext">Home</span>
                        </li>
                        <li className="a1link">
                            <a href="">
                                <i className="fa-solid fa-inbox mimg"></i>

                            </a><span className="link_text otext">Subject</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-file mimg"></i>

                            </a><span className="link_text otext">Save Calculations</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-brands fa-slack mimg"></i>

                            </a><span className="link_text otext">Ephemeris</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-calendar mimg"></i>

                            </a><span className="link_text otext">Transits Timeline</span>
                        </li>
                    </ul>


                    <ul className="menu2 menu">
                        <h3 className="menu_text otext">Charts</h3>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-person mimg"></i>

                            </a><span className="link_text otext">Natal Chart</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-bolt mimg"></i>

                            </a><span className="link_text otext">Transits</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-heart mimg"></i>

                            </a><span className="link_text otext">Synastry</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-key mimg"></i>

                            </a><span className="link_text otext">Composite</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-sun mimg"></i>

                            </a><span className="link_text otext">Solar Return</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-moon mimg"></i>

                            </a><span className="link_text otext">Lunar Return</span>
                        </li>
                    </ul>


                    <ul className="menu3 menu">
                        <h3 className="menu_text otext">System</h3>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-gear mimg"></i>

                            </a><span className="link_text otext">Setting</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-question mimg"></i>

                            </a><span className="link_text otext">User Manual</span>
                        </li>
                        <li className="a1link">
                            <a href="" className="center">
                                <i className="fa-solid fa-handcuffs mimg"></i>

                            </a><span className="link_text otext">Policies</span>
                        </li> </ul>
                    </div>
            </div>

            <div className="bottom">

                <div className="bottom1 account">
                    <div className="bottom1">
                        <a href="" className="tktext otext">tentaikhoan</a>
                        <div className='bimg'><i className="fa-solid fa-ghost fa-2x "></i></div>
                    </div>
                    <ul className="drop-down">
                        <li>
                            <a href="" className="text texttk">
                                Information
                            </a>
                        </li>
                        <li>
                            <a href="" className="text texttk">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="mode">
                    <div className="moon-sun">
                        <i className="fa-solid fa-moon moon moonimg"></i>
                    </div>
                    <span className="mode-text text otext">Dark Mode </span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>

                </div>

            </div>

        </nav><div className="home">

                <div className="header">
                    <div className="topbar">
                        <div className="timeline">
                            <div>
                                <p className="htext nowchart">Now Chart</p>
                            </div>
                            <div className="container">
                                <div className="time" id="time"></div>
                                <div className="date" id="date"></div>
                            </div>
                        </div>

                        <div className="hmenu">
                            <div className="menu0 ">

                                <li className="Chart limenu box">
                                    <span className="htext">Chart</span>
                                </li>
                                <li className="Aspects limenu box ">
                                    <span className="htext">Aspects</span>
                                </li>
                                <li className="Data limenu box ">
                                    <span className="htext">Data</span>
                                </li>
                                <li className="Interpretation limenu box ">
                                    <span className="htext">Interpretation</span>
                                </li>

                            </div>
                        </div>

                        <div>
                            <span className="savesj htext cursor">Save as Subject</span>
                        </div>
                        <div className="print">
                            <span className="printt htext cursor">Print</span>
                        </div>

                    </div>
                    <div>
                        <div className="bottombar">

                            <div className="hheader">
                                <div className="hicons" onClick={() => changeDate(-1)}><i className="fa-solid fa-arrow-down icons giam "></i></div>

                                <div className="bang">

                                    <input type="number" value="1" min="1" max="100" className="hbottom" id="value">
                                        <div className="chonsl">
                                            <select name="" className="hbottom " id="unit">
                                                <option value="minute" className="xt">Phút</option>
                                                <option value="hour" className="xt">Giờ</option>
                                                <option value="day" selected className="xt">Ngày</option>
                                                <option value="month" className="xt">Tháng</option>
                                                <option value="year" className="xt">Năm</option>
                                            </select>
                                        </div>
                                    
                                    </input>

                                    </div>
                                <div className="hicons" onClick={() => changeDate(1)}><i className="fa-solid fa-arrow-down icons tang "></i></div>
                            </div>
                            <div className="reset hbottom " onClick={() => resetNow()}>

                                <div className="align space">
                                    <i className="fa-solid fa-arrow-rotate-left icons"></i>

                                </div>
                                <div className="align space">
                                    <span className="htext">Now</span>
                                </div>

                            </div>
                            <div>

                            </div>

                            <div>

                            </div>
                        </div>
                    </div>


                </div>
            </div></>





       
    
    )
    
}

