import {useLocation} from 'react-router-dom'
import RouteLinks from "../../../RouteLinks";
import DummyLogo from "../../DummyLogo";
import MainBtn from "../../btn/MainBtn";
import AsideLink from "./AsideLink";
import AsideLinkWithSubLinks from "./AsideLinkWithSubLinks";
import { useSelector } from "react-redux";
import { generalLayoutContext } from "../../../context/GeneralLayoutContext";
import Icons from "../../Icons";
import ImgCom from '../../img/ImgCom';
import localImgLoader from '../../../helpers/localImageLoader';
import notAuthorizeUser from '../../../helpers/notAuthorizeUser';



export default function DashboardAside() {

    const {pathname} = useLocation()

    const {setLogoutModal, activeMenu, handleActiveMenu} = generalLayoutContext()

    const {userDetails:{firstname, lastname, email, role}} = useSelector((state) => state.userDetails) // GETS LOGGED IN USER ROLE DETAILS

    return (
    <div className='w-full h-full flex flex-col'>
        <div className="mb-3 w-full h-24 logo flex items-center">
            <DummyLogo />
        </div>
        {/* <hr className="border-slate-400" /> */}

        <div className="aside-scroll-design w-full h-full overflow-y-auto">
            {asideNavLinks.map((link, index) => {
                let active = notAuthorizeUser(role, link.notAllowedUsers) == 1 ? true : false
                let hasSubLinks = (link.subLinks && link.subLinks.length > 0) ? true : false
                if(active && !hasSubLinks){
                    return (
                        <div key={link.name}>
                            <AsideLink to={link.to} name={link.name} icon={link.icon} />
                        </div>
                    )
                }
                if(active && hasSubLinks){
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
                    return (
                    <div key={link.name} className="w-full flex flex-col gap-2">
                        {link.title &&
                            <h1 className="px-4 py-2 text-sm sm:text-sm text-slate-500 dark:text-slate-high font-semibold uppercase mt-3 mb-1 border-b border-slate-higher dark:border-slate-high">{link.title}</h1>
                        }
                        <AsideLinkWithSubLinks name={link.name} icon={link.icon} isOpen={subLinkList.includes(pathname) || index==1} >
                            <>
                            {link.subLinks.map((subItem, index)=>{
                                let active = notAuthorizeUser(role, subItem.notAllowedUsers) == 1 ? true : false
                                let hasSubLinks = (subItem.subLinks && subItem.subLinks.length > 0) ? true : false
                                if(active && !hasSubLinks){
                                    return (
                                    <div key={subItem.name}>
                                        <AsideLink to={subItem.to} name={subItem.name} icon={subItem.icon} />
                                    </div>
                                )
                                }else if(active && hasSubLinks){
                                    let subLinkList = subItem.subLinks.filter(value => value.to).map(item => { // specific open
                                        if(item.to){
                                            return item.to
                                        }
                                    })
                                    return(
                                        <AsideLinkWithSubLinks key={subItem.name} name={subItem.name} icon={subItem.icon} isOpen={subLinkList.includes(pathname)}>
                                            <>
                                            {subItem.subLinks.map((item, index)=>{
                                                let active = isAuthorizeUser(role, item.notAllowedUsers) == 1 ? true : false
                                                if(active){
                                                    return (
                                                    <div key={index}>
                                                        <AsideLink key={index} to={item.to} name={item.name} icon={item.icon} />
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

        <div className='py-2 mt-4 relative'>
            <div className="group w-full flex items-center gap-2">
                <div className="w-full flex items-center gap-2">
                    <ImgCom src={'user_avatar.jpg'} alt='user avatar' className='w-12 h-12 p-1 rounded-full' />
                    <div>
                        {/* <p className="text-sm font-bold text-black-body dark:text-white-body">{firstname ? `${firstname} ${lastname}` : 'Username'}</p> */}
                        <p className="text-12 text-slate-higher dark:text-slate-high">{email ? email : 'username@gmail.com'}</p>
                    </div>
                </div>
                <button onClick={()=>handleActiveMenu('settings')}  className="peer text-slate-higher dark:text-slate-high">
                    <Icons name='settings' className='text-3xl' />
                </button>
                <div className="hidden group-hover:block pop-modal-down absolute w-full bg-white dark:bg-black-box left-0 bottom-[60%] overflow-hidden rounded shadow-round_black dark:shadow-round_white">
                    <div className="w-full flex flex-col justify-between gap-4">
                        <div className="p-4 py-2 flex flex-col gap-2 text-white dark:text-slate-higher bg-primary dark:bg-black-box text-sm sm:text-base">
                            <h3 className="font-semibold">{firstname ? `${firstname} ${lastname}` : 'Username'}</h3>
                            <p className="-mt-2">{email ? email : 'username@gmail.com'}</p>
                        </div>
                        <div className="min-h-28"></div>
                        <div className="rounded w-full flex items-center gap-2">
                            <MainBtn
                                text='Logout' 
                                className="text-black-body hover:text-red-500 dark:text-white-body font-bold text-lg" 
                                onClick={()=>setLogoutModal(true)}
                                icon='logout'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const asideNavLinks = [
    {name:'Dashboard', status:1, icon: 'dashboard', to: RouteLinks.homePage, notAllowedUsers: []},
    {name:'Payment Vouchers', title:'', status:1, icon: 'sales', notAllowedUsers: ['user'], subLinks: [
        {name: 'PVs', status:1, icon: 'dot', to: RouteLinks.paymentVouchers, notAllowedUsers: []},
        {name: 'Add PV', status:1, icon: 'dot', to: RouteLinks.addPV, notAllowedUsers: []},
        // {name: 'Configurations', status:1, icon: 'arrow-right', subLinks: [
        //     {name: 'Loan Offers', status:1, icon: 'dot', to: RouteLinks.offers },
        //     ]
        // },
        ],
    },
    {name:'MDAs', title:'', status:1, icon: 'product', notAllowedUsers: ['user'], subLinks: [
        {name: 'View MDA', status:1, icon: 'dot', to: RouteLinks.mdaList, notAllowedUsers: [] },
        {name: 'Add MDA', status:1, icon: 'dot', to: RouteLinks.addMDA, notAllowedUsers: [] },
        ]
    },
    {name:'Economic Line', title:'', status:1, icon: 'economy', notAllowedUsers: ['user'], subLinks: [
        {name: 'Economic Lines', status:1, icon: 'dot', to: RouteLinks.economicLines, notAllowedUsers: [] },
        {name: 'Add Economic Item', status:1, icon: 'dot', to: RouteLinks.addEconomicLine, notAllowedUsers: [] },
        ]
    },
     {name:'Users', title:'', status:1, icon: 'people', notAllowedUsers: ['user'], subLinks: [
        {name: 'View Users', status:1, icon: 'dot', to: RouteLinks.users, notAllowedUsers: [] },
        // {name: 'Add User', status:1, icon: 'dot', to: RouteLinks.addUser },
        ]
    },
]
