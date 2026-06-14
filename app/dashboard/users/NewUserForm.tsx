"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type } from "os";

type NewUserForm = {
  open: boolean;
  onOpenCreate: (open: boolean) => void;
  onSave: (
    name: string,
    email: string,
    password: string,
    role: string,
    status: string,
  ) => void;
};

export default function NewUserForm({
  open,
  onOpenCreate,
  onSave,
}: NewUserForm) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    onSave(name, email, password, role, status);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setStatus("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenCreate}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label>Name :</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Name"
            />
          </div>
          <div>
            <Label>Email :</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input Email Address"
            />
          </div>
          <div>
            <Label>Password :</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input Password"
            />
          </div>
          <div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status :" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenCreate(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!email || !password}
            className="bg-green-500"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
