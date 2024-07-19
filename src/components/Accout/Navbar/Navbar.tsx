import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
    const [selectedNavItem, setSelectedNavItem] = useState(null);

    const handleNavItemClick = (id: any) => {
        setSelectedNavItem(id);
    };
    return (
        <>
            <div className='account-navbar'>
                <hr className="mt-10 border-slate-200" />
                <div className="accout-navbar__container flex space-x-8 md:space-x-14 overflow-x-auto overflow-y-hidden">
                    <NavLink to={''} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'infomation' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('infomation')}>Account info</NavLink>
                    <NavLink to={'shipping-address'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'sh' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('shipping-address')}>Shipping address</NavLink>
                    <NavLink to={'savelists'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'savelists' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('savelists')}>Save lists</NavLink>
                    <NavLink to={'myorder'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'myorder' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('myorder')}> My order</NavLink>
                    <NavLink to='updatepassword' className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'updatepassword' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('updatepassword')}>Change password</NavLink>
                    <NavLink to={'bill'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'bill' ? 'border-b-2 border-cyan-500 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('bill')}>Change Billing</NavLink>
                </div>
                <hr className="border-slate-200 " />
            </div>

        </>
    )
}

export default Navbar