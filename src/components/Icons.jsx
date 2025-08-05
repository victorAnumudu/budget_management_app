import React, { memo } from 'react'
import { AiFillProduct, AiOutlineDashboard } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { FaEye, FaRegMoneyBill1, FaRegCircleQuestion } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { IoPeople, IoTrash } from 'react-icons/io5'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { IoMdSettings } from "react-icons/io";
import { LuMessageSquareText } from "react-icons/lu";
import { LuPanelRight } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { FcSalesPerformance } from "react-icons/fc";
import { FaLongArrowAltRight, FaFilter, FaDigitalOcean } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { LuBadgeX } from "react-icons/lu";



const Icons = memo(({name, className}) => {
  return (
    <>
    {name.toLowerCase() == 'dashboard' ?
    <AiOutlineDashboard className={`text-base ${className}`} />
    : name.toLowerCase() == 'money' ?
    <FaRegMoneyBill1 className={`text-base ${className}`} />
    :name.toLowerCase() == 'dot' ?
    <GoDotFill className={`text-base ${className}`} />
    :name.toLowerCase() == 'people' ?
    <IoPeople className={`text-base ${className}`} />
    :name.toLowerCase() == 'product' ?
    <AiFillProduct className={`text-base ${className}`} />
    :name.toLowerCase() == 'trash' ?
    <IoTrash className={`text-base ${className}`} />
    :name.toLowerCase() == 'eye' ?
    <FaEye className={`text-base ${className}`} />
    :name.toLowerCase() == 'next' ?
    <TbPlayerTrackNext className={`text-base ${className}`} />
    :name.toLowerCase() == 'prev' ?
    <TbPlayerTrackPrev className={`text-base ${className}`} />
    :name.toLowerCase() == 'edit' ?
    <FaEdit className={`text-base ${className}`} />
    :name.toLowerCase() == 'settings' ?
    <IoMdSettings className={`text-base ${className}`} />
    :name.toLowerCase() == 'message' ?
    <LuMessageSquareText className={`text-base ${className}`} />
    :name.toLowerCase() == 'right-panel' ?
    <LuPanelRight className={`text-base ${className}`} />
    :name.toLowerCase() == 'google' ?
    <FcGoogle className={`text-base ${className}`} />
    :name.toLowerCase() == 'apple' ?
    <IoLogoApple className={`text-base ${className}`} />
    :name.toLowerCase() == 'sales' ?
    <FcSalesPerformance className={`text-base ${className}`} />
    :name.toLowerCase() == 'arrow-right' ?
    <FaLongArrowAltRight className={`text-base ${className}`} />
    :name.toLowerCase() == 'arrow-down' ?
    <TiArrowSortedDown className={`text-base ${className}`} />
    :name.toLowerCase() == 'logout' ?
    <TbLogout2 className={`text-base ${className}`} />
    :name.toLowerCase() == 'filter' ?
    <FaFilter className={`text-base ${className}`} />
    :name.toLowerCase() == 'good' ?
    <GrStatusGood className={`text-base ${className}`} />
    :name.toLowerCase() == 'bad' ?
    <LuBadgeX className={`text-base ${className}`} />
    :name.toLowerCase() == 'economy' ?
    <FaDigitalOcean className={`text-base ${className}`} />
    :name.toLowerCase() == 'question' ?
    <FaRegCircleQuestion className={`text-base ${className}`} />
    :
    null
    }
    </>
  )
})


export default Icons