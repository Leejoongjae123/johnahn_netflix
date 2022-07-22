import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css"


const Nav = () => {
  const [show,setShow]=useState(false);
  const [searchValue,setSearchValue]=useState("")
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      console.log(window.scrollY)
      if (window.scrollY>50){
        setShow(true)
      } else{
        setShow(false)
      }
    })
    // return () => {
    //   window.removeEventListener('scroll',()=>{})
    // };
  }, []);
  
  const handleChange=(e)=>{
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  return (
    <>
    <nav className={`nav ${show && 'nav__black'}`}>
      <img
        alt='Netflix logo'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
        className='nav__logo'
        onClick={()=>{navigate('/');setSearchValue("")}}

      />      
      <input 
      value={searchValue} 
      type="text" 
      onChange={handleChange} 
      className="nav__input" 
      placeholder='영화를 검색해주세요'
      />
      <img
        alt="mypage logo"
        src='https://reyena16.co.kr/web/upload/unfold_design119/mypage_icon_01.svg'
        className='nav__avatar'
      />
    </nav>
    <div className='test__box'></div>
    </>
  );
}

export default Nav;
