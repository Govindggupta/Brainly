import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModel from "../components/CreateContentModel";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import SideBar from "../components/SideBar";

function Dashboard() {
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
        <div className="flex gap-5">
          <Card
            title="Test Title"
            link="https://www.youtube.com/watch?v=3XQOY0nx6yw"
            type="youtube"
          />

          <Card
            title="twitter"
            link="https://x.com/Praneeth1757/status/2008196437717520668?s=20"
            type="twitter"
          />
          <Card
            title="Test Twitter"
            link="https://x.com/kirat_tw/status/2008256057471336574?s=20"
            type="twitter"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
