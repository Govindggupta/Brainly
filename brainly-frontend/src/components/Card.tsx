import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border h-fit">
        <div className="justify-between flex text-md items-center ">
          <div className="flex gap-2">
            <ShareIcon size="md" />
            <div className="font-bold">{title}</div>
          </div>
          <div className="flex gap-2">
            <PlusIcon size="md" />
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
