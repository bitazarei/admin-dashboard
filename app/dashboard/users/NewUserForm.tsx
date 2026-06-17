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
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
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
          <DialogTitle>{t.users?.createTitle || "Create New User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label>{t.users?.table?.name || "Name"} :</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.users?.namePlaceholder || "Enter name"}
            />
          </div>
          <div>
            <Label>{t.users?.table?.email || "Email"} :</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.users?.emailPlaceholder || "Enter email address"}
            />
          </div>
          <div>
            <Label>{t.users?.password || "Password"} :</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.users?.passwordPlaceholder || "Enter password"}
            />
          </div>
          <div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder={t.users?.selectRole || "Select role"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">{t.roles?.user || "User"}</SelectItem>
                <SelectItem value="Admin">{t.roles?.admin || "Admin"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder={t.users?.selectStatus || "Select status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">{t.status?.active || "Active"}</SelectItem>
                <SelectItem value="Inactive">{t.status?.inactive || "Inactive"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenCreate(false)}>
            {t.users?.cancel || "Cancel"}
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!email || !password}
            className="bg-green-500 hover:bg-green-600"
          >
            {t.users?.create || "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}