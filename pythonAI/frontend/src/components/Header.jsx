import React from 'react'

const Header = () => {
  return (
    <header>
      <div>
        <span className='logo'>Font Recognition</span>
        <ul className='nav'>
            <li>Про сайт</li>
            <li>Контакти</li>
        </ul>
      </div>
      <div className='presentation'><p className='Header_text'>Розпізнавання Шрифту</p></div>
    </header>
  )
}

export default Header