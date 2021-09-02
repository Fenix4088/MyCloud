import React from 'react';
import s from './Registration.module.scss';


export const Registration = () => {
    return (
        <div className={s['wrapper']}>
            <form className={s['form']}>
                <h2>Registration</h2>
                <input type="text" placeholder={'Enter your name...'}/>
                <input type="text" placeholder={'Enter your surname...'}/>
                <input type="email" placeholder={'Enter your email...'}/>
                <input type="password" placeholder={'Enter your password...'}/>
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}