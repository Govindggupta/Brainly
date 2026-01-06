import { useRef, useState, type ReactElement } from "react";
import { useOnClickOutside } from "usehooks-ts";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";

const CreateContentModel = ({ open, onClose } : {open : boolean , onClose : () => void}) => {
  const contentModel = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    onClose();
  };

  //@ts-ignore
  useOnClickOutside(contentModel, handleClickOutside);
  return (
    <>
      {open && (
        <div className="bg-slate-500/60 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
          <div
            className="bg-white opacity-100 p-4 rounded-md border border-slate-300"
            ref={contentModel}
          >
            <div className="flex justify-end" onClick={onClose} >
              <CrossIcon />
            </div>
            <div>
              <Input placeholder="Title" />
              <Input placeholder="Link" />
            </div>

            <div className="flex justify-center">
              <Button size="md" varient="primary" text="Add Content" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({
  placeholder,
  onchange,
}: {
  placeholder: string;
  onchange: () => void;
}) => {
  return (
    <div>
      <input
        type={"text"}
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2"
        onChange={onchange}
      />
    </div>
  );
};

export default CreateContentModel;
