import s from "./profileInfoSmall.module.css"
import defaultAvatar from "../../assets/avatar.jpg"
import * as React from 'react';
import {useHistory} from "react-router-dom";
const ProfileInfoSmall = () =>
{
    const history = useHistory();
    let userName = "Иван Иванов"
    let navigate = () => {
        history.push('/groups')
    }
    return (
        <div className={s.profileInfo}>
            <div className={s.picture} onClick={navigate}>
                <img className={s.picture} src={defaultAvatar} alt="AVATAR"/>
            </div>
            <div className={s.text}>
                {userName}
            </div>
        </div>
    )
}

export default ProfileInfoSmall;