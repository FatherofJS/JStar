// ============================================================================
// FIX 1 (Top-level DOM queries): Removed document.querySelector() calls that
// ran at import time—before React mounted any DOM elements. Replaced with
// React useState + onClick handlers so toggling and active-state tracking
// are managed through React's rendering cycle.
//
// FIX 2 (getElementById in updateDateTime): Removed document.getElementById()
// calls that set innerText imperatively. Replaced with React useState so the
// time, date, step-value, and unit are all tracked as state and rendered
// declaratively via JSX.
//
// FIX 3 (Top-level setInterval): Moved the 1-second interval timer from the
// module scope into a useEffect hook. This ensures the timer only starts
// after the component mounts and is properly cleaned up (clearInterval) when
// the component unmounts, preventing memory leaks.
// ============================================================================

import { useEffect, useState } from "react";
import './Sidebar.css';


export function Sidebar() {
    // ── FIX 1 ────────────────────────────────────────────────────────────
    // Sidebar open/close state.  Replaces:
    //   const sidebar = document.querySelector('.sidebar');
    //   sidebar.classList.toggle("close");
    const [isClosed, setIsClosed] = useState(true);

    // Active tab state.  Replaces:
    //   boxes.forEach(b => b.classList.remove('active'));
    //   box.classList.add('active');
    const [activeBox, setActiveBox] = useState<string | null>(null);

    // ── FIX 2 ────────────────────────────────────────────────────────────
    // Current date/time as React state.  Replaces:
    //   let now = new Date();
    //   document.getElementById("time").innerText = ...
    //   document.getElementById("date").innerText = ...
    const [now, setNow] = useState(new Date());

    // Controlled form inputs.  Replaces:
    //   document.getElementById("value").value
    //   document.getElementById("unit").value
    const [stepValue, setStepValue] = useState(1);
    const [unit, setUnit] = useState("day");

    // ── FIX 3 ────────────────────────────────────────────────────────────
    // Timer effect.  The original code ran setInterval() at module scope,
    // which executed before the component mounted and never cleaned up.
    // useEffect ensures it runs after mount and clearInterval on unmount.
    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(prev => {
                const next = new Date(prev);
                next.setSeconds(next.getSeconds() + 1);
                return next;
            });
        }, 1000);

        return () => clearInterval(intervalId);   // cleanup on unmount
    }, []);   // empty deps = run once on mount

    // ── FIX 2 (derived values) ───────────────────────────────────────────
    // Display strings are derived from state and flow into JSX directly—
    // no more imperative DOM updates via innerText.
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `Ngày ${day}/${month}/${year}`;

    // ── FIX 2 (changeDate) ───────────────────────────────────────────────
    // Now reads stepValue and unit from React state instead of
    // document.getElementById().  Updates `now` via the state setter.
    function changeDate(direction: number) {
        setNow(prev => {
            const next = new Date(prev);
            if (unit === "minute") next.setMinutes(next.getMinutes() + direction * stepValue);
            else if (unit === "hour") next.setHours(next.getHours() + direction * stepValue);
            else if (unit === "day") next.setDate(next.getDate() + direction * stepValue);
            else if (unit === "month") next.setMonth(next.getMonth() + direction * stepValue);
            else if (unit === "year") next.setFullYear(next.getFullYear() + direction * stepValue);
            return next;
        });
    }

    // ── FIX 2 (resetNow) ────────────────────────────────────────────────
    // Simply sets state to a fresh Date, triggering a re-render.
    function resetNow() {
        setNow(new Date());
    }

    return (
        <>
            {/* FIX 1: className driven by React state instead of classList.toggle */}
            <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
                <header>

                    <div className="img_items">

                        <a href="" className="Logo-text text otext">Astrologer</a>

                        {/* FIX 1: React onClick replaces addEventListener('click', ...) */}
                        <div className="toggle" onClick={() => setIsClosed(prev => !prev)}>
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
                                {/* FIX 2: Rendered from React state, not getElementById */}
                                <div className="time" id="time">{timeString}</div>
                                <div className="date" id="date">{dateString}</div>
                            </div>
                        </div>

                        <div className="hmenu">
                            <div className="menu0 ">

                                {/* FIX 1: onClick + conditional 'active' class from state */}
                                <li className={`Chart limenu box ${activeBox === 'Chart' ? 'active' : ''}`} onClick={() => setActiveBox('Chart')}>
                                    <span className="htext">Chart</span>
                                </li>
                                <li className={`Aspects limenu box ${activeBox === 'Aspects' ? 'active' : ''}`} onClick={() => setActiveBox('Aspects')}>
                                    <span className="htext">Aspects</span>
                                </li>
                                <li className={`Data limenu box ${activeBox === 'Data' ? 'active' : ''}`} onClick={() => setActiveBox('Data')}>
                                    <span className="htext">Data</span>
                                </li>
                                <li className={`Interpretation limenu box ${activeBox === 'Interpretation' ? 'active' : ''}`} onClick={() => setActiveBox('Interpretation')}>
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

                                    {/* FIX 2: Controlled input — value from state, onChange updates state */}
                                    <input type="number" value={stepValue} min={1} max={100} className="hbottom" id="value"
                                        onChange={(e) => setStepValue(parseInt(e.target.value) || 1)} />
                                    <div className="chonsl">
                                        {/* FIX 2: Controlled select — value from state, onChange updates state */}
                                        <select className="hbottom " id="unit" value={unit}
                                            onChange={(e) => setUnit(e.target.value)}>
                                            <option value="minute" className="xt">Phút</option>
                                            <option value="hour" className="xt">Giờ</option>
                                            <option value="day" className="xt">Ngày</option>
                                            <option value="month" className="xt">Tháng</option>
                                            <option value="year" className="xt">Năm</option>
                                        </select>
                                    </div>

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
