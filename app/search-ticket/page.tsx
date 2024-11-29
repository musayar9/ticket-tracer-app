"use client"
import { useGlobalContext } from '@/context/ticket-tracer-context'
import React from 'react'

const SearchTicket = () => {
const {searchTicket} = useGlobalContext();
console.log(searchTicket,"searchTicket")
  return (
    <div className='max-w-6xl mx-auto p-8'>search dara</div>
  )
}

export default SearchTicket