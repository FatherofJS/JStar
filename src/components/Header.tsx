// import { MOCK_CHART } from '../data/mockData';



import { useEffect, useState } from "react";
import './Header.css';

type HeaderProps = {
  isClosed: boolean;
};

export function Header({ isClosed }: HeaderProps) {
   
    const [activeBox, setActiveBox] = useState<string | null>(null);

    const [now, setNow] = useState(new Date());

 
    const [stepValue, setStepValue] = useState(1);
    const [unit, setUnit] = useState("day");


    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(prev => {
                const next = new Date(prev);
                next.setSeconds(next.getSeconds() + 1);
                return next;
            });
        }, 1000);

        return () => clearInterval(intervalId);  
    }, []);   
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `Ngày ${day}/${month}/${year}`;

   
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

   
    function resetNow() {
        setNow(new Date());
    }

    return (
        <>
        <div  className={`home ${isClosed ? "expand" : ""}`}>

                <div className="header">
                    <div className="topbar">
                        <div className="align-j traine">
                            <div className="timeline">
                            <div>
                                <p className="htext nowchart">Now Chart</p>
                            </div>
                            <div className="container">
                                <div className="time" id="time">{timeString}</div>
                                <div className="date" id="date">{dateString}</div>
                            </div>
                        </div>
                        </div>


                        <div className="align-j">
                            <div className="hmenu">
                                <div className="menu0 ">

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

                        

                    </div>
                    
                        <div className="bottombar">

                            <div className="hheader">
                                <div className="hicons" onClick={() => changeDate(-1)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="giam icons icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" /></svg></div>

                                    
                                <div className="bang">

                                    <input type="number" value={stepValue} min={1} max={100} className="hbottom" id="value"
                                        onChange={(e) => setStepValue(parseInt(e.target.value) || 1)} />
                                    <div className="chonsl">
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


                                <div className="hicons" onClick={() => changeDate(1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="tang icons icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" /></svg>
                                </div>
                            </div>

                            <div className="align reset">
                                <div className=" hbottom " onClick={() => resetNow()}>

                                    <div className="align space">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                    </div>
                                    <div className="align space resetnow">
                                        <span className="htext ">Now</span>
                                    </div>

                                </div>
                            </div>
                            



                        </div>
                    </div>


                </div>
            
            
           
       
            
        </>
    )
}
