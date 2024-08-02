import React from "react";
import 'boxicons';
import {default as api} from '../store/apiSlice';



export default function List(){

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    const[deleteTransaction] = api.useDeleteTransactionMutation()
    let Transcations;

    const handlerClick = (e) =>{
        if(!e.target.dataset.id) return 0;
        deleteTransaction({_id:e.target.dataset.id})
    }

    if(isFetching){
        Transcations = <div>Fetching</div>;
    }else if(isSuccess){
        Transcations = data.map((v,i) => <Transcation key={i} category={v} handler={handlerClick}></Transcation>);
    }else if(isError){
        Transcations = <div>Error</div>
    }



    return(
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl ml-32">History</h1>
            {Transcations}
        </div>
    )
}

function Transcation({category,handler}){
    if(!category)return null;
    return(
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r w-72 ml-32" style={{borderRight:'8px solid ${category.color ?? "#e5e5e"}'}}>
            <button className="absolute right-24" onClick={handler}><box-icon data-id={category._id??''} color={category.color??"#e5e5e"} size="15px" name="trash"></box-icon></button>
            <span className="block">
                {category.name??''}
            </span>
        </div>
    )
}