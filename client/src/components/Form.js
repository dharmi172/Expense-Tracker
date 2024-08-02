import React from "react";
import {useForm} from 'react-hook-form';
import List from './List';
import {default as api} from '../store/apiSlice';


export default function Form(){

    const{register,handleSubmit,resetField} = useForm();
    const[addTranscation] = api.useAddTransactionMutation()

    const onSubmit= async(data) => {
        if(!data) return{};
        await addTranscation(data).unwrap();
        resetField('name');
        resetField('amount');
    }

    return(
        <div className="form max-w-sm mx-auto ml-16">
            <h1 className="font-bold pb-4 text-xl ml-32">Transcation</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 w-72 ml-32">
                    <div className="input-group w-72">
                        <input type="text" {...register("name")} placeholder="Salary,House Rent ,SIP" className="form-input"></input>
                    </div>
                    <select className="form-input w-64" {...register("type")}>
                        <option value="Investment" defaultValue>Investment</option>
                        <option value="Expense">Expense</option>
                        <option value="Savings">Savings</option>
                    </select>
                    <div className="input-group">
                        <input type="text" {...register("amount")} placeholder="Amount" className="form-input"></input>
                    </div>
                    <div className="submit-btn w-72">
                        <button className="border py-2 text-white bg-indigo-500 w-full">Make Transcation</button>
                    </div>
                </div>
            </form>
            <List></List>
        </div>
    )
}