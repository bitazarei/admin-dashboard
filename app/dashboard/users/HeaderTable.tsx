"use client";

import { Pencil, Trash2 , UserPlus  } from "lucide-react";


interface HeaderTableProps {
  selectedCount: number;
  onEditSelected: () => void;
  onDeleteSelected: () => void;
  onFormSelected: () => void;
}

export default function HeaderTable({
  selectedCount,
  onEditSelected,
  onDeleteSelected,
  onFormSelected,
}: HeaderTableProps) {
  console.log("count:", selectedCount);

  return (
    <div className="flex justify-between flex-wrap gap-2 sm:gap-4  items-center p-2 sm:p-4 border-b mb-4">
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
        <div className="text-sm font-medium">
          {selectedCount} selected
        </div>
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          onClick={onEditSelected}
        >
          <Pencil className="h-4 w-4" />
          <p>Edit Selected</p>
        </div>
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-red-600"
          onClick={onDeleteSelected}
        >
          <Trash2 className="h-4 w-4" />
          <p>Delete Selected</p>
        </div>
      </div>
      <div>
        <div 
        className="flex flex-wrap gap-1 sm:gap-2 items-center cursor-pointer hover:text-green-500"
        onClick={onFormSelected}
        >
          <UserPlus className="w-4 h-4"/>
          <p>User Create</p>
        </div>
      </div>
    </div>
  );
}