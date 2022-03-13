import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(results => {
                console.log(results)
                setData(results.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(results => {
                // console.log(results)
                const newData = data.map(item => {
                    if (item._id == results._id) {
                        return results
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(results => {
                // console.log(results)
                const newData = data.map(item => {
                    if (item._id == results._id) {
                        return results
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
    }
    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(results => {
                console.log(results)
                const newData = data.map(item => {
                    if (item._id == results._id) {
                        return results
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const deletePost = (id) => {
        fetch(`/deletepost/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(results => {
                console.log(results)
                const newData = data.filter(item => {
                    return item._id !== results._id
                })
                setData(newData)
            })
    }
    // const deleteComment = (id) => {
    //     fetch('/deletecomment',{
    //         method: "delete",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             postId: id
    //         })
    //     }).then(res => res.json())
    //         .then(results => {
    //             console.log(results)
    //             const newData = data.filter(item => {
    //                 return item._id !== results._id
    //             })
    //             setData(newData)
    //         })
    // }
return (
    <div className="home">
        {
            data.map(item => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h4>{item.postedby.name}{item.postedby._id == state._id && <i className="material-icons" style={{ float: "right", marginTop: "10px", cursor: "pointer" }} onClick={() => deletePost(item._id)}>delete</i>}</h4>
                        <div className="imgwi">
                            <img src={item.photo} />
                        </div>
                        <div className="linese">
                            <i className="material-icons" style={{ color: "red" }}>
                                favorite
                                {item.likes.includes(state._id) ? <i className="material-icons" style={{ color: "black", cursor: "pointer" }} onClick={() => { unlikePost(item._id) }}>thumb_down</i> : <i className="material-icons" style={{ color: "black", cursor: "pointer" }} onClick={() => { likePost(item._id) }}>thumb_up</i>}
                            </i>
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record => {
                                    return (
                                        <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedby.name}</span>{record.text}
                                        {/* {item.postedby.name}{item.postedby._id == state._id && <i className="material-icons" style={{ float: "right", marginTop: "10px", cursor: "pointer" }} onClick={() => deleteComment(item._id)}>delete</i>} */}
                                        </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="add a comment" />
                            </form>
                        </div>
                    </div>
                )
            })
        }
    </div>
)
}

export default Home
