"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function UserCard({ user, isSelected, onSelect, onEdit, onDelete }: UserCardProps) {
  return (
    <div className={`border rounded-lg p-4 mb-3 ${isSelected ? "bg-blue-50 border-blue-300" : "bg-white"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={onSelect}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="font-semibold text-lg">{user.name}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Email:</span>
          <span className="text-gray-700">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Role:</span>
          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
            {user.role}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <Badge className={user.status === "Active" ? "bg-green-500" : "bg-red-500"}>
            {user.status}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Joined:</span>
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}