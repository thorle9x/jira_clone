"use client";
import { type ReactNode, createContext, useContext, useState } from "react";

type FiltersContextProps = {
  assignees: string[];
  setAssignees: React.Dispatch<React.SetStateAction<string[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  epics: string[];
  setEpics: React.Dispatch<React.SetStateAction<string[]>>;
  issueTypes: string[];
  setIssueTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

const FiltersContext = createContext<FiltersContextProps>({
  assignees: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAssignees: () => {},
  search: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearch: () => {},
  epics: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEpics: () => {},
  issueTypes: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIssueTypes: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [assignees, setAssignees] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [epics, setEpics] = useState<string[]>([]);
  const [issueTypes, setIssueTypes] = useState<string[]>([]);

  return (
    <FiltersContext.Provider
      value={{
        assignees,
        setAssignees,
        search,
        setSearch,
        epics,
        setEpics,
        issueTypes,
        setIssueTypes,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
