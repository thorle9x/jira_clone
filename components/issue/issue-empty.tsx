"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IssueSelectType } from "./issue-select-type";
import { Button } from "../ui/button";
import { MdCheck, MdClose } from "react-icons/md";
import { Spinner } from "../ui/spinner";
import { type IssueType } from "@/utils/types";

const EmtpyIssue: React.FC<{
  className?: string;
  onCreate: (payload: {
    name: string;
    type: IssueType["type"];
    parentKey: IssueType["key"] | null;
  }) => void;
  onCancel: () => void;
  isCreating: boolean;
  isSubtask?: boolean;
  parentKey?: IssueType["key"];
}> = ({
  onCreate,
  onCancel,
  isCreating,
  className,
  isSubtask,
  parentKey,
  ...props
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<IssueType["type"]>(
    isSubtask ? "SUBTASK" : "TASK"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusInput();
  }, [props]);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSelect(type: IssueType["type"]) {
    setType(type);
    setTimeout(() => focusInput(), 50);
  }
  function handleCreateIssue(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("create issue", type);

      onCreate({ name, type, parentKey: parentKey ?? null });
      setName("");
    }
  }

  return (
    <div
      {...props}
      className={clsx(
        "relative flex items-center gap-x-2 border-2 border-blue-400 bg-white p-1.5",
        className
      )}
    >
      {isSubtask ? (
        <div className="py-4" />
      ) : (
        <IssueSelectType
          currentType={type}
          dropdownIcon
          onSelect={handleSelect}
        />
      )}
      <input
        ref={inputRef}
        autoFocus
        type="text"
        placeholder="What needs to be done?"
        className=" w-full pl-2 pr-20 text-sm focus:outline-none"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={handleCreateIssue}
      />
      {isCreating ? (
        <div className="absolute right-2 z-10">
          <Spinner size="sm" />
        </div>
      ) : (
        <div className="absolute right-2 z-10 flex gap-x-1">
          <Button
            className="aspect-square shadow-md"
            onClick={() => onCancel()}
          >
            <MdClose className="text-sm" />
          </Button>
          <Button
            className="aspect-square shadow-md"
            onClick={() =>
              onCreate({
                name,
                type,
                parentKey: parentKey ?? null,
              })
            }
          >
            <MdCheck className="text-sm" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmtpyIssue };