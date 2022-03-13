import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'

const Profile = ()=> {
    const [mypics,setPic] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
          fetch('/mypost',{
             headers:{
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
             }   
          }).then(res=>res.json())
          .then(results=>{
                setPic(results.mypost)
          })
    })
    return (
        <div className="myprofile" style={{ maxWidth: "550px", margin: "0px auto"}}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px",borderBottom:"1px solid gray"}}>
                <div className="profilepic">
                <img src="https://images.unsplash.com/photo-1620751807252-46dd26db740c?
                  ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="line">
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{ display: "flex",width: "108%",justifyContent: "space-between"}}>
                        <h6>40 post</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                  {
                mypics.map(item=>{
                    return (
                        <img key={item._id} className="items" src={item.photo}/>
                    )
                })
            }
        </div>
        </div>
    )
}

export default Profile
