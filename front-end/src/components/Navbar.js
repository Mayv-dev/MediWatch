import { useState } from "react"

function Navbar(props) {
    //The nav element is a template taken from https://flowbite.com/docs/components/navbar/ , modified to suit our project
    
    return (
        <>
            <nav class={props.navColour + " border-gray-200 dark:bg-gray-900 absolute top-0 w-screen"}>
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <span class={props.textColour + " self-center text-4xl font-semibold whitespace-nowrap"}>MediWatch</span>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                        <a href="#" onClick={e => props.LDModeSwitch(e)} class={props.textColour + " block py-2 " + props.navColour}>Switch mode</a>
                        </li>
                        {props.page == "login" || props.page == "register" ? 
                        <>
                            <li>
                            <a href="#" onClick={() => props.pageChange("login")} class={props.textColour + " block py-2 " + props.navColour}>Login</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => props.pageChange("register")} class={props.textColour + " block py-2 " + props.navColour}>Register</a>
                            </li>
                        </>
                        :
                        <>
                            <li>
                            <a href="#" onClick={() => props.pageChange("home")} class={props.textColour + " block py-2 " + props.navColour}>Home</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => props.pageChange("schedule")} class={props.textColour + " block py-2 " + props.navColour}>Doses</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => props.pageChange("calendar")} class={props.textColour + " block py-2 " + props.navColour}>Calendar</a>
                            </li>
                        </>
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar