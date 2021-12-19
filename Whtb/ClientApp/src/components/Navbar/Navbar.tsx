import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import * as React from 'react';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.items}>
            <div className={s.item}>
                <NavLink  to ="/account">Личный кабинет</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/friends">Мои друзья</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/groups">Мои группы</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/calendar">Календарь</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/balance">Баланс</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/about">О приложении</NavLink>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;