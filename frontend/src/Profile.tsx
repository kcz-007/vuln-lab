import { useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import dayjs from 'dayjs';

export default function Profile(){
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);

    //这里先在前端去调用后端的端口通过id去获取user信息之后把res的内容解析成json格式后赋值给前端的user用于展示数据
    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then( res => res.json())
        .then( data => {
            console.log("API 返回：", data)
            setUser(data.data);
        })
    }, [id])

    if(!user){
        return <div>Loading...</div>
    }
    return(
        <div>
            <h1> User Profile</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <div>created at: {dayjs(user.created_at).format('YYYY-MM-DD  HH:ss')}</div>
        </div>
    )
}
