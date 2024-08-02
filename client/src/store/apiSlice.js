import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints: builder => ({
        //get categories
        getCategories:builder.query({
            query:()=>'/api/categories',
            providesTags:['categories']
        }),
        //get labels
        getLabels:builder.query({
            query:()=>'/api/labels',
            providesTags:['transaction']
        }),
        //add new Transcation
        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method:'POST',
                body:initialTransaction
            }),
            invalidatesTags:['transaction']
        }),
        //delete record
        deleteTransaction:builder.mutation({
            query:recordid=>({
                url:'/api/transaction',
                method:'DELETE',
                body:recordid
            }),
            invalidatesTags:['transaction']
        })
    })
})

export default apiSlice;