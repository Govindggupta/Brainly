import axios from "axios";
import Dustbin from "../icons/Dustbin";
import ShareIcon from "../icons/ShareIcon";

interface CardProps {
  id : string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: () => void;
}


const Card = ({ id , title, link, type, onDelete }: CardProps) => {

  const handleDelete = async (id: string) => {

    const response = await axios.delete("http://localhost:3000/api/v1/content", {
      headers: {
        "authorization" : localStorage.getItem("token")
      },
      data: {
        contentId: id
      }
    })

    if (response.status === 200) {
      onDelete?.();
    }
  }

  return (
    <>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border h-fit">
        <div className="justify-between flex text-md items-center ">
          <div className="flex gap-2">
            <ShareIcon size="md" />
            <div className="font-bold">{title}</div>
          </div>
          <div className="flex gap-2">
            <div onClick={() => {id && handleDelete(id)}}  className="cursor-pointer">
              <Dustbin />
            </div>
            <a href={link} target="_blank" rel="noreferrer">
              <ShareIcon size="md" />
            </a>
          </div>
        </div>
        {type === "youtube" && (
          <div className="w-full pt-4">
            <iframe
              className="w-full rounded-md"
              src={link.replace("watch?v=", "embed/")}
            >
              {" "}
            </iframe>
          </div>
        )}

        {type === "twitter" && (
          <div className="w-full pt-4">
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
