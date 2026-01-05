import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";

const Card = () => {


  return (
    <>

    {/* Youtube */}
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
      <div className="justify-between flex text-md items-center ">
        <div className="flex gap-2">
          <ShareIcon size="md" />
          <div className="font-bold">Porject Ideas </div>
        </div>
        <div className="flex gap-2">
          <PlusIcon size="md" />
          <ShareIcon size="md" />
        </div>
      </div>

      <div className="w-full pt-4">
        <iframe className="w-full rounded-md" src="https://www.youtube.com/embed/RREeZD2L5vA" frameBorder="0"> </iframe>
      </div>
    </div>


{/* twitter  */}
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
      <div className="justify-between flex text-md items-center ">
        <div className="flex gap-2">
          <ShareIcon size="md" />
          <div className="font-bold">Porject Ideas </div>
        </div>
        <div className="flex gap-2">
          <PlusIcon size="md" />
          <ShareIcon size="md" />
        </div>
      </div>

{/* let make it show loading when loading  */}
    <div className="w-full pt-4">
        <blockquote className="twitter-tweet"> 
            <a href="https://twitter.com/kirat_tw/status/2008256057471336574?s=20"></a>
        </blockquote>
      </div>
    </div>
</>
  );
};

export default Card;
