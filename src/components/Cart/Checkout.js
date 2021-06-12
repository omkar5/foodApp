import React from 'react';
import classes from './Checkout.module.css';
import {useRef} from 'react';
const Checkout = (props) =>{
    const nameInputRef=useRef();
    const addressInputRef=useRef();
    const confirmHandler =(event) =>{
        event.preventDefault();

        const enteredName= nameInputRef.current.value;
        const enteredAddress= addressInputRef.current.value;
        if(enteredName.trim().length === 0 || enteredAddress.trim().length===0)
        {
            return;
        }
        props.onConfirm({
            firstName:enteredName,
            address: enteredAddress
        });
    };
    return <form>
        <div className={classes.control}>
            <label htmlFor='firstName'>Your Name : </label>
            <input type='text' id='firstName' ref={nameInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor='address'>Your Address : </label>
            <input type='text' id='address' ref={addressInputRef}/>
        </div>
    <button onClick={confirmHandler}>Confirm</button>
    <button type="button" onClick={props.onCancel}>Cancel</button>
    </form>
};

export default Checkout;