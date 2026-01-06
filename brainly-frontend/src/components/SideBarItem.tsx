import type { ReactElement } from "react"

const SideBarItem = ({icon , text}: {icon: ReactElement, text : string}) => {
  return (
    <div className="flex gap-3 items-center text-lg font-bold text-gray-700"> 
      {icon} {text}
    </div>
  )
}

export default SideBarItem