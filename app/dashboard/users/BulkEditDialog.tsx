"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

type BulkEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onSave: (role: string, status: string) => void;
};

export function BulkEditDialog({
  open,
  onOpenChange,
  selectedCount,
  onSave,
}: BulkEditDialogProps) {
  const { t } = useLanguage();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    onSave(role, status);
    setRole("");
    setStatus("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.users?.bulkEditTitle || "Bulk Edit Users"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {t.users?.selectedCount?.replace("{count}", selectedCount.toString()) ||
              `You have selected ${selectedCount} users.`}
          </p>
          <div>
            <Label>{t.users?.table?.role || "Role"}</Label>
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
            <Label>{t.users?.table?.status || "Status"}</Label>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.users?.cancel || "Cancel"}
          </Button>
          <Button onClick={handleSave} disabled={!role && !status}>
            {t.users?.applyChanges || "Apply Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}