import * as React from 'react';
import s from './modal.module.css'

const Modal = ({active, setActive, children}) => {
    console.log(active)
        /*${styles.sideMenu} ${this.props.menuOpen ? styles.inactive : styles.active}`*/
    return (
        <div className={`${s.modal} ${active ? s.active : s.inactive}`} onClick={() => setActive(false)}>
            <div className={s.content} onClick={ e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;