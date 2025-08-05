import React from 'react'

export default function Label({name, htmlfor, error}) {
  return (
    <label className='text-black font-semibold flex gap-1 items-center' htmlFor={htmlfor}>{name} {error && <span className='text-red-500 text-sm'>{error}</span>}</label>
  )
}
