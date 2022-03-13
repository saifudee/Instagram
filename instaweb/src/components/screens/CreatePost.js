import React,{useState,useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost= ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    
    useEffect(()=>{
        if(url)
        {
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post successfully",classes:"#ea80fc purple accent-1"})
                history.push("/")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","ins-clone")
        data.append("cloud_name","saifudeen")
        fetch("https://api.cloudinary.com/v1_1/saifudeen/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    return (
        <div className="mypos">
            <div className="card input-field">
                <input type="text" 
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)} 
                />
                <input type="text" 
                placeholder="Body"
                value={body}
                onChange={(e)=>setBody(e.target.value)} 
                />
                <div className="file-field input-field">
                    <div className="waves-effect waves-light btn #64b5f6 blue darken-1">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                </div>
                <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={()=>postDetails()}>
                    Submit Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
