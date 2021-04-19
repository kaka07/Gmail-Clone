import React from 'react'
import './SendMail.css'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import {db,firebase} from './firebase';
function SendMail() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit=(data)=>{
        console.log(data);
        db.collection("emails").add({
            to:data.to,
            subject:data.subject,
            message:data.message,
            timetamp:firebase.firestore.FieldValue.serverTimestamp(),
        });

        dispatch(closeSendMessage());
    };
    const dispatch=useDispatch();
    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon onClick={()=>dispatch(closeSendMessage())}  className="sendMail__close"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
            
                <input id="to" placeholder="To" type="email" {...register('to', {required: true})}/>  
                {errors.to && <p className="sendMail__error">To is required!</p>}     

                <input id="subject"  type="text" placeholder="Subject" {...register('subject', {required: true})} />
                {errors.subject && <p className="sendMail__error">Subject is required!</p>}

                <input id="message" type="text" placeholder="Message" className="sendMail__message" {...register('message', {required: true})}/>
                {errors.message && <p className="sendMail__error">Message is required!</p>}

                <div className="sendMail__options">
                    <Button variant="contained" color="primary" className="sendMail__send" type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}
export default SendMail
