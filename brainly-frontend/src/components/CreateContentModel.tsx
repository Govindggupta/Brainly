import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";
import axios from "axios";

//@ts-ignore
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Image = "image",
}
const CreateContentModel = ({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const contentModel = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  const handleClickOutside = () => {
    onClose();
  };

  //@ts-ignore
  useOnClickOutside(contentModel, handleClickOutside);

  const createContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    const response = await axios.post(
      "http://localhost:3000/api/v1/content",
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      onClose();
      onSuccess?.();
    }
  };
  return (
    <>
      {open && (
        <div className="bg-slate-500/60 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
          <div
            className="bg-white opacity-100 p-4 rounded-md border border-slate-300 flex flex-col gap-2"
            ref={contentModel}
          >
            <div className="flex justify-end" onClick={onClose}>
              <CrossIcon />
            </div>
            <div>
              <Input placeholder="Title" refrence={titleRef} />
              <Input placeholder="Link" refrence={linkRef} />
            </div>
            <div className="flex justify-center">Type : </div>
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                text="#youtube"
                varient={type === ContentType.Youtube? "primary" : "secondary"}
                onclick={() => {
                  setType(ContentType.Youtube);
                }}
              />
              <Button
                size="sm"
                text="#twitter"
                varient={type === ContentType.Twitter? "primary" : "secondary"}
                onclick={() => {
                  setType(ContentType.Twitter);
                }}
              />
            </div>

            <div className="flex justify-center">
              <Button
                size="md"
                varient="primary"
                text="Add Content"
                onclick={createContent}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModel;
