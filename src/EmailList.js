import React, { useEffect, useState } from 'react'
import './EmailList.css'
import {Checkbox,IconButton} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import Section from './Section'
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EmailRow from './EmailRow';
import {db} from './firebase';


function EmailList() {
    const[emails,setEmails]=useState([]);

   useEffect(()=>{
    db.collection("emails")
        .orderBy("timetamp","desc")
        .onSnapshot((snapshot)=>
            setEmails(
                snapshot.docs.map((doc)=>({
                    id: doc.id,
                    data:doc.data(),
                    
                }))
            ))
             
   },[])

    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft"> 
                    <Checkbox/>
                     <IconButton>
                         <ArrowDropDownIcon/>
                     </IconButton>
                     <IconButton>
                         <RedoIcon/>
                     </IconButton>
                     <IconButton>
                       <MoreVertIcon/>  
                     </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ArrowLeftIcon/>
                    </IconButton>
                    <IconButton>
                        <ArrowRightIcon/>
                    </IconButton>
                    <IconButton>
                        <KeyboardIcon/>
                    </IconButton>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </div>
            </div>    
            <div className="emailList__sections">
                <Section Icon={InboxIcon} title="Primary" color="red" selected></Section>
                <Section Icon={PeopleIcon} title="Social" color="#1A73E8" ></Section>
                <Section Icon={LocalOfferIcon} title="Promotions" color="green" ></Section>
            </div>
            <div className="emailList__list">
                {emails.map(({id,data:{to,subject,message,timetamp}})=>(
                    <EmailRow
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timetamp?.seconds*1000).toUTCString()}
                    />
                ))}
                <EmailRow
                        title="Twitch"
                        subject="Hey fellow streamer!!!"
                        description="This is a test"
                        time="10pm"
                />
                <EmailRow
                        title="Twitch"
                        subject="Whats'up!!!"
                        description="This is another test"
                        time="11pm"
                />
                    
            </div>
        </div>
    );
}

export default EmailList
