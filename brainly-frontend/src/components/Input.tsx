
export const Input = ({
  placeholder,
  onchange,
  refrence
}: {
  placeholder: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refrence?: any;
}) => {
  return (
    <div>
      <input
        type={"text"}
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2"
        onChange={onchange}
        ref={refrence}
      />
    </div>
  );
};