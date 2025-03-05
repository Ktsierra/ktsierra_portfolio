import { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className= {`${styles.paddingX}  w-full flex items-center py-5 fixed top-0 z-20 bg-primary ease-in-out transition-all duration-300`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={()=>{
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="bg-[linear-gradient(225deg,_#565656_0%,_#1f1f1f_100%)] h-9 w-9 rounded-xl flex items-center justify-center">
            <img src={logo} alt="logo" className="h-7 w-7 object-contain" />
          </div>
          <p className="flex text-white text-md font-bold cursor-pointer"> Jose Sierra &nbsp;
            <span className=" sm:block hidden text-secondary">| Software Engineer</span>
          </p>
        </Link>

        {/* desktop nav bar */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((navLink)=> (
            <li key={navLink.id} className={`${active === navLink.title ? "text-white" : "text-secondary"} hover:text-white cursor-pointer font-medium`}
              onClick={()=>{setActive(navLink.title);}}
            >
              <a href={`#${navLink.id}`} >
                {navLink.title}
              </a>
            </li>
          ))}
        </ul>

        {/* mobile nav bar */}
        <div className="sm:hidden flex flex-1 justify-end items-center">

          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] cursor-pointer select-none"
            onClick={()=>{setToggle(!toggle);}}
          />

          <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((navLink)=> (
                <li key={navLink.id} className={`${active === navLink.title ? "text-white" : "text-secondary"} font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={()=>{
                    setActive(navLink.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={ `#${navLink.id}`} >
                    {navLink.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;




