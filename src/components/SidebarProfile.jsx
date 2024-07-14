import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { Dropdown } from 'react-bootstrap'
import './Sidebar.css'
import AddPost from './AddPost'
import AddPostProfile from './AddPost/AddPostProfile'

function SidebarProfile() {
    const [sidebar, setSidebar] = useState(true)
    const uname = localStorage.getItem('uname')
    const profileImg = localStorage.getItem('img')
    const activeLink = 'text-success'
    const normalLink = 'text-dark'
    const removeToken = () =>{
        localStorage.removeItem('USER_ID')
       }
    const showSidebar = () => setSidebar(!sidebar)
    const id = localStorage.getItem('id')
  return (
    <>
    <div className="navbar">
        <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        <h2 style={{marginLeft:'240px'}}>Profile</h2>
       
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
            <li className="navbar-toggle">  
                <img src="https://user-images.githubusercontent.com/80618060/209421785-aa078881-83eb-41e3-ae28-9b05ee0d5dc0.png" style={{width:'40px'}} alt="" srcset="" />
                <h2>Tweeder</h2>
                <Link to='#' className='menu-bars' style={{display:'none'}}>
                    <AiIcons.AiOutlineClose/>
                </Link>
            </li>
            {SidebarData.map((item, index)=>{
                return(
                    <li key={index} className={item.cName}>
                        <NavLink to={item.path}
                        className={({isActive})=>
                        isActive ? activeLink : normalLink
                        }
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </NavLink>
                    </li>
                )
            })}
            <li id='add-post-btn'>
                <AddPostProfile/>
            </li>
            <li>
            <Dropdown>
            <Dropdown.Toggle id='btn-logout' className='text-dark' style={{textDecoration:'none'}}>
                <img id='profile-img' src={profileImg} alt="" />
                <h2 id='profile-uname'>{uname}</h2>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/login" onClick={()=>removeToken()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </li>
        </ul>
            
    </nav>
    </>
  )
}

export default SidebarProfile