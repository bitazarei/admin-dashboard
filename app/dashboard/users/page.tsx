"use client";

import { useState, useEffect, useCallback } from "react";
import { UserTable } from "./UserTable";
import { columns } from "./columns";
import HeaderTable from "./HeaderTable";
import { BulkEditDialog } from "./BlukEditDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [bulkEditOpen, setBulkEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  // گرفتن کاربران از API
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  const handleSelectedRowsChange = useCallback((rows: User[]) => {
    setSelectedUsers(rows);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = useCallback((user: User) => {
    setEditUser(user);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  }, []);

  const handleSaveEdit = async () => {
    if (!editUser) return;

    try {
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        await fetchUsers();
        setEditUser(null);
      }
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  const handleDelete = useCallback((user: User) => {
    setDeleteUser(user);
  }, []);

  const handleConfirmDelete = async () => {
    if (!deleteUser) return;

    try {
      const res = await fetch(`/api/users/${deleteUser.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchUsers();
        setDeleteUser(null);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleBulkEdit = async (role: string, status: string) => {
    const ids = selectedUsers.map((u) => u.id);

    const res = await fetch("/api/bulk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, role, status }),
    });

    if (res.ok) {
      fetchUsers();
      setSelectedUsers([]);
      setBulkEditOpen(false);
    }
  };

  const handleEditSelected = () => {
    if (selectedUsers.length === 0) return;
    setBulkEditOpen(true);
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return;

    const ids = selectedUsers.map((u) => u.id);

    try {
      const res = await fetch("/api/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (res.ok) {
        await fetchUsers();
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="max-w-[1400px] mx-auto">
        <HeaderTable
          selectedCount={selectedUsers.length}
          onEditSelected={handleEditSelected}
          onDeleteSelected={handleDeleteSelected}
        />

        <div className="mt-4 sm:mt-6">
          <UserTable
            columns={columns}
            data={users}
            onSelectedRowsChange={handleSelectedRowsChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <BulkEditDialog
          open={bulkEditOpen}
          onOpenChange={setBulkEditOpen}
          selectedCount={selectedUsers.length}
          onSave={handleBulkEdit}
        />

        {/* مودال ویرایش تکی */}
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent className="text-black gap-2 mb-2">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="mb-2">Email</Label>
                <Input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="mb-2">Role</Label>
                <Select
                  value={editData.role}
                  onValueChange={(value) =>
                    setEditData({ ...editData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2">Status</Label>
                <Select
                  value={editData.status}
                  onValueChange={(value) =>
                    setEditData({ ...editData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog
          open={!!deleteUser}
          onOpenChange={() => setDeleteUser(null)}
        >
          <AlertDialogContent className="text-black">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {deleteUser?.name} account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
