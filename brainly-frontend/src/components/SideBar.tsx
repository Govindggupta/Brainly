import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  return (
    <div className="h-screen border-r border-gray-300 w-76 fixed top-0 left-0 p-4 flex flex-col gap-5 ">
      <div className="flex items-center gap-2 pt-4">
        <Logo />
        <div className="font-bold text-4xl">Brainly</div>
      </div>
      <div className="pl-5 flex flex-col gap-4">
        <SideBarItem text="Twitter" icon={<TwitterIcon />} />
        <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};

export default SideBar;
