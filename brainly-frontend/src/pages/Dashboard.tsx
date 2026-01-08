import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModel from "../components/CreateContentModel";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import SideBar from "../components/SideBar";
import useContent from "../hooks/useContent";
import axios from "axios";

function Dashboard() {

  const { contents, refetch } = useContent();
  const [contentModelOpen, setContentModelOpen] = useState<boolean>(false);

  const ShareBrain = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/brain/share",
        { share: true },
        {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }
      )

      if (response.status === 200) {
        alert(response.data.hash);
        refetch();
      }
      if (response.status === 409) {
        alert(response.data.hash);
        refetch();
      }

    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("Failed to share brain. Please try again.");
    }
  }

  return (
    <div >
      <SideBar />
      <div className="p-4 ml-76 min-h-screen bg-gray-100">
        <CreateContentModel
          open={contentModelOpen}
          onClose={() => {
            setContentModelOpen(false);
          }}
          onSuccess={refetch}
        />
        <div className="flex justify-end gap-5 pb-4 ">
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
            onclick={ShareBrain}
          />
        </div>
        <div className="grid grid-cols-5 gap-5">
          {contents.map(({title , link , type , _id}) => <Card key={_id} title={title} link={link} type={type} id={_id} onDelete={refetch}/>)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
