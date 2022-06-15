import React from 'react'
import { useSession } from 'next-auth/react'

const SidebarMenuItem = ({text, Icon, active}) => {
    const { data: session } = useSession();
  return (
    <div className='hover__effect flex items-center justify-center text-gray-700 xl:justify-start text-lg space-x-3'>
        <Icon className="h-7" />
        <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem