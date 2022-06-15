import React from 'react'

const SidebarMenuItem = ({text, Icon, active}) => {
  return (
    <div className='hover__effect flex items-center justify-center text-gray-700 xl:justify-start text-lg space-x-3'>
        <Icon className="h-7" />
        <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem