import { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom'
import RouteLinks from "../../../RouteLinks";
import DummyLogo from "../../DummyLogo";
import MainBtn from "../../MainBtn";
import AsideLink from "./AsideLink";
import AsideLinkWithSubLinks from "./AsideLinkWithSubLinks";
import { useSelector } from "react-redux";
import { generalLayoutContext } from "../../../context/GeneralLayoutContext";
import { TbLogout2 } from "react-icons/tb";


export default function DashboardAside({shrinkAside=false}) {

    const {pathname} = useLocation()

    const {setLogoutModal} = generalLayoutContext()

    const {userDetails} = useSelector((state) => state.userDetails) // GETS LOGGED IN USER ROLE DETAILS
    const {role}= userDetails

    // const [hideSubMenu, setHideSubMenu] = useState('')

    // const handleHideSubMenu = (name) => {
    //     // e.stopPropagation()
    //     setHideSubMenu((prev) => {
    //         if(prev == name){
    //             return ''
    //         }else{
    //             return name
    //         }
    //     })
    // }

  return (
    <div className='w-full h-full flex flex-col'>
        <div className="px-4 w-full h-24 logo flex items-center">
            <DummyLogo />
        </div>
        <hr className="border-slate-400" />

        <div className="p-4 w-full flex flex-col gap-2 h-full overflow-y-auto">
            {asideNavLinks.map((link, index) => {
                let active = link.status == 1 ? true : false
                let hasSubLinks = (link.subLinks && link.subLinks.length > 0) ? true : false
                if(active && !hasSubLinks){
                    return (
                        <div key={index}>
                            <AsideLink to={link.to} shrinkAside={shrinkAside} name={link.name} icon={link.icon} />
                        </div>
                    )
                }
                if(active && hasSubLinks){
                    // let subLinkList = link.subLinks.filter(value => value.to).map(item => { //any of all open
                    //     if(item.to){
                    //         return item.to
                    //     }
                    // })
                    let subLinkList = []
                    link.subLinks.forEach(item =>{
                        if(item.to){
                            subLinkList.push(item.to)
                        }else if(item.subLinks?.length > 0){
                            item.subLinks.forEach(item => {
                                subLinkList.push(item.to)
                            })
                        }
                    })
                    // console.log('subLinkList', subLinkList)
                    return (
                    <div key={index} className="w-full">
                        {link.title &&
                            <h1 className="px-4 py-2 text-12 text-slate-400 font-semibold uppercase mt-3 mb-1 border-b border-slate-800">{link.title}</h1>
                        }
                        <AsideLinkWithSubLinks shrinkAside={shrinkAside} name={link.name} icon={link.icon} isOpen={subLinkList.includes(pathname)} >
                            <>
                            {link.subLinks.map((subItem, index)=>{
                                let active = subItem.status == 1 ? true : false
                                let hasSubLinks = (subItem.subLinks && subItem.subLinks.length > 0) ? true : false
                                if(active && !hasSubLinks){
                                    return (
                                    <div key={index}>
                                        <AsideLink key={index} to={subItem.to} shrinkAside={shrinkAside} name={subItem.name} icon={subItem.icon} />
                                    </div>
                                )
                                }else if(active && hasSubLinks){
                                    let subLinkList = subItem.subLinks.filter(value => value.to).map(item => { // specific open
                                        if(item.to){
                                            return item.to
                                        }
                                    })
                                    return(
                                        <AsideLinkWithSubLinks shrinkAside={shrinkAside} name={subItem.name} icon={subItem.icon} isOpen={subLinkList.includes(pathname)}>
                                            <>
                                            {subItem.subLinks.map((item, index)=>{
                                                let active = item.status == 1 ? true : false
                                                if(active){
                                                    return (
                                                    <div key={index}>
                                                        <AsideLink key={index} to={item.to} shrinkAside={shrinkAside} name={item.name} icon={item.icon} />
                                                    </div>
                                                )
                                                }
                                            })}
                                            </>
                                        </AsideLinkWithSubLinks>
                                    )
                                }else{
                                    return null
                                }
                            })}
                            </>
                        </AsideLinkWithSubLinks>
                    </div>
                    )
                }
            })}
        </div>

        <div className='px-4 py-2'>
            <div className="bg-primary dark:bg-primary-dark rounded w-full flex justify-center items-center gap-2">
                <MainBtn
                    shrinkAside={shrinkAside} 
                    text='Logout' 
                    className="w-full text-center flex justify-center gap-2 items-center" 
                    onClick={()=>setLogoutModal(true)}
                >
                    <TbLogout2 className="text-base" />
                </MainBtn>
            </div>
        </div>
    </div>
  )
}

const asideNavLinks = [
    {name:'Dashboard', status:1, icon: 'dashboard', to: RouteLinks.homePage},
    {name:'Salary Loan', title:'Loan', status:1, icon: 'money', subLinks: [
        {name: 'Selected Loans', status:1, icon: 'dot', to: RouteLinks.selectedLoanPage},
        {name: 'Applications', status:1, icon: 'dot', to: RouteLinks.applicationsLoanPage},
        {name: 'Approved Loans', status:1, icon: 'dot', to: RouteLinks.approvedLoansPage},
        {name: 'Disbursements', status:1, icon: 'dot', to: RouteLinks.disbursementsLoanPage},
        {name: 'Payments', status:1, icon: 'dot', to: ''},
        {name: 'Configurations', status:1, icon: 'dot', subLinks: [
            {name: 'Loan Offers', status:1, icon: 'dot', to: RouteLinks.loanOffersPage },
            ]
        },
        ],
    },
    // {name:'Product 2', title:'Product 2', status:1, icon: 'product', subLinks: [
    //     {name: 'Applications', status:1, icon: 'dot', to: ''},
    //     ]
    // },
    // {name:'Product 3', title:'Product 3', status:1, icon: 'product', subLinks: [
    //     {name: 'Applications', status:1, icon: 'dot', to: ''},
    //     {name: 'Configuration', status:1, icon: 'dot', to: ''},
    //     ]
    // },
    // {name:'Administration', title:'Admin', status:1, icon: 'people', subLinks: [
    //     {name: 'Users', status:1, icon: 'dot', to: RouteLinks.usersPage},
    //     ]
    // },
]
