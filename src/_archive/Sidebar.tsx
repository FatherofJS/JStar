

import './Sidebar.css';


type SidebarProps = {
    isClosed: boolean;
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenBirthForm: () => void;
};

export function Sidebar({ isClosed, setIsClosed, onOpenBirthForm }: SidebarProps) {
    return (
        <>
            <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
                <header>

                    <div className="img_items">

                        <a href="" className="Logo-text text otext">Astrologer</a>


                        <div className="toggle" onClick={() => setIsClosed(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-right himg icons toggle rotate"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" /></svg>

                        </div>
                    </div>



                    <div className="align">
                        <button className="newsj" onClick={onOpenBirthForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus add himg plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>

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

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-home mimg"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" /></svg>

                                </a><span className="link_text otext">Home</span>
                            </li>
                            <li className="a1link">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mimg icon icon-tabler icons-tabler-outline icon-tabler-object-scan"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /><path d="M8 10a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2l0 -4" /></svg>

                                </a><span className="link_text otext">Subject</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mimg icon icon-tabler icons-tabler-outline icon-tabler-ikosaedr"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 8.007v7.986a2 2 0 0 1 -1.006 1.735l-7 4.007a2 2 0 0 1 -1.988 0l-7 -4.007a2 2 0 0 1 -1.006 -1.735v-7.986a2 2 0 0 1 1.006 -1.735l7 -4.007a2 2 0 0 1 1.988 0l7 4.007a2 2 0 0 1 1.006 1.735" /><path d="M3.29 6.97l4.21 2.03" /><path d="M20.71 6.97l-4.21 2.03" /><path d="M20.7 17h-17.4" /><path d="M11.76 2.03l-4.26 6.97l-4.3 7.84" /><path d="M12.24 2.03q 2.797 4.44 4.26 6.97t 4.3 7.84" /><path d="M12 17l-4.5 -8h9l-4.5 8" /><path d="M12 17v5" /></svg>
                                </a><span className="link_text otext">Save Calculations</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-book"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21.5 5.134a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -7.5 -.266v-15.174a10 10 0 0 1 8.5 .708m-10.5 -.707l.001 15.174a8 8 0 0 0 -7.234 .117l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -13.068a1 1 0 0 1 .5 -.866a10 10 0 0 1 8.5 -.707" /></svg>
                                </a><span className="link_text otext">Ephemeris</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-timeline-event"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17c1.306 0 2.418 .835 2.83 2h5.17a1 1 0 0 1 0 2h-5.171a3.001 3.001 0 0 1 -5.658 0h-5.171a1 1 0 0 1 0 -2h5.17a3.001 3.001 0 0 1 2.83 -2z" /><path d="M17 2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2.586l-1.707 1.707a1 1 0 0 1 -1.32 .083l-.094 -.083l-1.708 -1.707h-2.585a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-8a2 2 0 0 1 2 -2h10z" /></svg>

                                </a><span className="link_text otext">Transits Timeline</span>
                            </li>
                        </ul>


                        <ul className="menu2 menu">
                            <h3 className="menu_text otext">Charts</h3>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-cookie-man"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.007 1l.238 .005a6 6 0 0 1 5.405 3.974l.078 .233a6 6 0 0 1 -.182 4.08l-.093 .21l.05 -.002a2.94 2.94 0 0 1 2.638 1.511l.081 .158a2.887 2.887 0 0 1 -1.234 3.764l-.19 .096l-1.798 .821v.963l1.166 1.166l.14 .154a2.96 2.96 0 0 1 -.17 4.002c-1.087 1.088 -2.827 1.161 -4.03 .144l-.16 -.146l-1.946 -1.948l-1.946 1.947a2.96 2.96 0 0 1 -3.95 .22l-.15 -.128c-1.17 -1.073 -1.284 -2.879 -.234 -4.12l.146 -.158l1.134 -1.134v-.962l-1.834 -.84l-.181 -.093a2.88 2.88 0 0 1 -1.205 -3.75a2.93 2.93 0 0 1 2.646 -1.661l.13 .003l-.03 -.064a6.1 6.1 0 0 1 -.503 -1.968l-.017 -.26v-.217a6 6 0 0 1 5.775 -5.996l.224 -.004zm.003 15h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2m0 -3h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2m0 -5h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2m-2 -3h-.01a1 1 0 1 0 0 2h.01a1 1 0 0 0 0 -2m4 0h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2" /></svg>

                                </a><span className="link_text otext">Natal Chart</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mimg icon icon-tabler icons-tabler-outline icon-tabler-timeline"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 16l6 -7l5 5l5 -6" /><path d="M14 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M9 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M3 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>

                                </a><span className="link_text otext">Transits</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mimg icon icon-tabler icons-tabler-outline icon-tabler-cake-roll"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 15c-4.97 0 -9 -2.462 -9 -5.5s4.03 -5.5 9 -5.5s9 2.462 9 5.5s-4.03 5.5 -9 5.5" /><path d="M12 6.97c3 0 4 1.036 4 1.979c0 2.805 -8 2.969 -8 -.99c0 -2.11 1.5 -3.959 4 -3.959" /><path d="M21 9.333v5.334c0 2.945 -4.03 5.333 -9 5.333c-4.97 0 -9 -2.388 -9 -5.333v-5.334" /></svg>

                                </a><span className="link_text otext">Synastry</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mimg icon icon-tabler icons-tabler-outline icon-tabler-components"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12l3 3l3 -3l-3 -3l-3 3" /><path d="M15 12l3 3l3 -3l-3 -3l-3 3" /><path d="M9 6l3 3l3 -3l-3 -3l-3 3" /><path d="M9 18l3 3l3 -3l-3 -3l-3 3" /></svg>

                                </a><span className="link_text otext">Composite</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" /><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" /><path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>

                                </a><span className="link_text otext">Solar Return</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>

                                </a><span className="link_text otext">Lunar Return</span>
                            </li>
                        </ul>


                        <ul className="menu3 menu">
                            <h3 className="menu_text otext">System</h3>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6" /></svg>

                                </a><span className="link_text otext">Setting</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-help-hexagon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.425 1.414a3.33 3.33 0 0 1 3.026 -.097l.19 .097l6.775 3.995l.096 .063l.092 .077l.107 .075a3.224 3.224 0 0 1 1.266 2.188l.018 .202l.005 .204v7.284c0 1.106 -.57 2.129 -1.454 2.693l-.17 .1l-6.803 4.302c-.918 .504 -2.019 .535 -3.004 .068l-.196 -.1l-6.695 -4.237a3.225 3.225 0 0 1 -1.671 -2.619l-.007 -.207v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098zm1.575 13.586a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z" /></svg>

                                </a><span className="link_text otext">User Manual</span>
                            </li>
                            <li className="a1link">
                                <a href="" className="center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mimg icon icon-tabler icons-tabler-filled icon-tabler-shield-checkered"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.013 12v9.754a13 13 0 0 1 -8.733 -9.754h8.734zm9.284 3.794a13 13 0 0 1 -7.283 5.951l-.001 -9.745h8.708a12.96 12.96 0 0 1 -1.424 3.794zm-9.283 -13.268l-.001 7.474h-8.986c-.068 -1.432 .101 -2.88 .514 -4.282a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.192 -2.256l.276 -.219zm1.999 7.474v-7.453l-.09 -.073a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717c.413 1.403 .582 2.85 .514 4.282h-8.96z" /></svg>

                                </a><span className="link_text otext">Policies</span>
                            </li> </ul>
                    </div>
                </div>

                <div className="bottom">

                    <div className="bottom1 account">
                        <div className="bottom1">
                            <a href="" className="tktext otext">tentaikhoan</a>
                            <div className='bimg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-ghost"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a8 8 0 0 1 7.996 7.75l.004 .25l-.001 6.954l.01 .103a2.78 2.78 0 0 1 -1.468 2.618l-.163 .08c-1.053 .475 -2.283 .248 -3.129 -.593l-.137 -.146a.65 .65 0 0 0 -1.024 0a2.65 2.65 0 0 1 -4.176 0a.65 .65 0 0 0 -.512 -.25c-.2 0 -.389 .092 -.55 .296a2.78 2.78 0 0 1 -4.859 -2.005l.008 -.091l.001 -6.966l.004 -.25a8 8 0 0 1 7.996 -7.75zm2.82 10.429a1 1 0 0 0 -1.391 -.25a2.5 2.5 0 0 1 -2.858 0a1 1 0 0 0 -1.142 1.642a4.5 4.5 0 0 0 5.142 0a1 1 0 0 0 .25 -1.392zm-4.81 -4.429l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993zm4 0l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993z" /></svg>                                </div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="moonimg icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>
                        </div>
                        <span className="mode-text text otext">Dark Mode </span>
                        <div className="toggle-switch">
                            <span className="switch"></span>
                        </div>

                    </div>

                </div>

            </nav></>


    )

}