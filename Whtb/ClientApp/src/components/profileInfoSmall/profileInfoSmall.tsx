import s from "./profileInfoSmall.module.css"
import defaultAvatar from "../../assets/avatar.jpg"
import * as React from 'react';

const ProfileInfoSmall = () =>
{
    let userName = "Иван Иванов"
    return (
        <div className={s.profileInfo}>
            <div className={s.picture}>
                <img className={s.picture} src={defaultAvatar} alt="AVATAR PICTURE"/>
            </div>
            <div className={s.text}>
                {userName}
            </div>
        </div>
    )
}

export default ProfileInfoSmall;