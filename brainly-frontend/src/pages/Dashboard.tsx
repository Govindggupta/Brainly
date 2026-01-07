import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModel from "../components/CreateContentModel";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import SideBar from "../components/SideBar";
import useContent from "../hooks/useContent";

function Dashboard() {

  const Content = useContent();
  const [contentModelOpen, setContentModelOpen] = useState<boolean>(false);

  return (
    <div >
      <SideBar />
      <div className="p-4 ml-76 min-h-screen bg-gray-100">
        <CreateContentModel
          open={contentModelOpen}
          onClose={() => {
            setContentModelOpen(false);
          }}
        />
        <div className="flex justify-end gap-5 ">
          <Button
            size="md"
            varient="primary"
            text="Add Content"
            startIcon={<PlusIcon size="md" />}
            onclick={() => {
              setContentModelOpen(true);
            }}
          />

          <Button
            size="md"
            varient="secondary"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
          />
        </div>
        <div className="grid grid-cols-5 gap-5">
          {Content.map(({title , link , type}) => <Card title={title} link={link} type={type} />)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
