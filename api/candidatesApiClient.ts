﻿import fetch from "node-fetch";
export interface ListResponse<T> {
    items: T[];
    totalNumberOfItems: number;
    page: number;
    nextPage: string;
    previousPage: string;
}
export interface Candidate{
    id: number;
    firstName: string;
    lastName: string;
    guid: string;
}

export async function getCandidates(): Promise<ListResponse<Candidate>> {
    const apiURL=`https://testswitch-api-staging.herokuapp.com/`;
    const response = await fetch(`${apiURL}/candidates`);
    if(response.ok){
        return await response.json();
    }
    else
    {
        throw Error;
    }
}
export async function getCandidateById(id:number) {
    const apiURL=`https://testswitch-api-staging.herokuapp.com/`;
    const response = await fetch(`${apiURL}/candidates/${id}`);
    if(response.ok){
        const data =  await response.json();
        console.log(data.items);
        return data.items;
    }
    else
    {
        throw Error;
    }
}
