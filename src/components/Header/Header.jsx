import {useRef,useEffect, useContext}from 'react'
import logo from "../../assets/Images/Neuron1.png"
import userImg from "../../assets/Images/userImg.png"
import {NavLink, Link} from "react-router-dom"
import {BiMenu} from "react-icons/bi"
import { authContext } from '../../context/AuthContext'


const navLinks=[
  {
    path:'/home',
    display:'Home'
  },

{
    path:'/professionals',
    display:'Find a profisional'

},
{
  path:'/service',
  display:'Services'
},
{
  path:'/contact',
  display:'Contact'
},
]

const Header = () => {

const headerRef=useRef(null)
const menuRef=useRef(null)
const{user,role,token}=useContext(authContext)

const handleStickyHeader=()=>{
  window.addEventListener('scroll',()=>{
    if(document.body.scollTop>80 || document.documentElement.scrollTop>80){
      headerRef.current.classList.add('sticky_header')
    }
    headerRef.current.classList.remove('sticky_header')
  })
}


useEffect(()=>{
  handleStickyHeader()
  return()=>window.removeEventListener('scroll',handleStickyHeader)
})


const toggleMenu=()=> menuRef.current.classList.toggle('show_menu')




  return <header className='header flex items-center' ref={headerRef}>
    <div className='container'>
      <div className='flex item-center justify-between '>
        {/* ============== logo =========== */}
        <div className='w-[80px] rounded-full'>
          <img src={logo} alt=''/>
        </div>
      
   {/* {-----menu-----} */}
       
      <div className='navigation' ref={menuRef} onClick={toggleMenu}>
        <ul className='menu flex item-center gap-[2.7rem]'>
          {
            navLinks.map((link,index)=><li key={index}>
              <NavLink to={link.path} className={navClass=> 
                navClass.isActive?
                'text-irisBlueColor text-[16px] leading-7 font-[600]' :
                'text-primaryColor text-[16px] leading-7 font-[500]'}>
                  {link.display}
                  </NavLink>
            </li>)
          }

        </ul>
      </div>

      <div className='flex items-center gap-4'>
        
         { token && user? (
         
         <div>
        
        
          <Link to='/'>
            <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
              <img src={userImg} className='w-full rounded-full' alt=''/>
            </figure>
            </Link> 
        </div>

         ):(

          
      <Link to='/login'>
        <button className='btn bg-primaryColor py-2 px-6  text-white font-[600] h-[44px] 
        flex items-center rounder-[50px]'>
          Login
        </button>
      </Link>
       )}
      <span className='md:hidden' onClick={toggleMenu}>
        <BiMenu className='w-6 h-6 cursor-pointer'/>
      </span>
      </div>
      </div>
    </div>
  </header>
}

export default Header
