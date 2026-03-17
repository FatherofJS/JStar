//import { MOCK_CHART } from '../data/mockData';


import './Header.css';
import Button1 from './Deco/generatebutton' ;
import Button2 from "./Deco/chartbutton";
import Button3 from "./Deco/chartbutton2";
import SaveButton from "./Deco/savebutton";
import LogButton from "./Deco/loginbutton";
import Switch from "./Deco/nightlightbt";
export function Header() {
   

    return (
        <>


                <div className="header">
                    <div className="topbar">
                        <div className="align-j traine">
                            <div className="logogen">
                                <div className="astrologer-text">
                                    <span>J</span>
                                    <span></span>
                                    <span> </span>
                                    <span>S</span>
                                    <span>T</span>
                                    <span>A</span>
                                    <span>R</span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="genbutton">
                                    <Button1></Button1>

                                </div>    
                            </div>
                        </div>

                        <div className="menubutton">
                            <div className="chartbt">
                                <Button2></Button2>
                            </div>

                            <div className="chartbt">
                                <Button3></Button3>
                            </div>                            
                        </div>
                        

                        <div className="ENDH ">
                            <div className="logsave">
                                <div className="savebt">
                                    <SaveButton></SaveButton>
                                </div>
                              <div className="char">
                                    <Switch></Switch>
                                </div>
                            </div>


                        </div>
 
 
                    </div>





                </div>
                    
                      
                

                <div className="align reset">
                    <div className=" hbottom " >

                        <div className="reseticon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </div>

                    </div>
                </div>
                <div className='hey'>

                </div>


            
            
           
       
            
        </>
    )
}
