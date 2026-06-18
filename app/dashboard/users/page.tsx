"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UserTable } from "./UserTable";
import { getColumns } from "./columns";
import HeaderTable from "./HeaderTable";
import { BulkEditDialog } from "./BulkEditDialog";
import { useRouter, useSearchParams } from "next/navigation";
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
import NewUserForm from "./NewUserForm";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [bulkEditOpen, setBulkEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const isCreateOpen = searchParams.get("create") === "true";
  const selectedUserId = searchParams.get("edit");

  // ✅ اصلاح: اطمینان از اینکه users آرایه است و find روی آن اجرا می‌شود
  const editingUser = Array.isArray(users)
    ? users.find((user) => user.id === selectedUserId) || null
    : null;

  const isEditOpen = !!selectedUserId && !!editingUser;

  const columns = getColumns(t);

  const openCreateModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set("create", "true");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeCreateModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("create");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const openEditModal = (userId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("edit", userId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeEditModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("edit");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const fetchUsers = useCallback(async () => {
    console.log("Fetching users..."); // ← اضافه کن
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      console.log("Users data:", data); // ← اضافه کن
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (isMounted) setUsers([]);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);
  const handleSelectedRowsChange = useCallback((rows: User[]) => {
    setSelectedUsers(rows);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    openEditModal(user.id);
  }, []);

  const handleSaveEdit = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch(`/api/users/${selectedUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      console.log("Edit response status:", res.status); // ← این رو اضافه کن
      if (res.ok) {
        console.log("Edit successful, fetching users..."); // ← این رو اضافه کن
        await fetchUsers();
        closeEditModal();
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
      await fetchUsers();
      setSelectedUsers([]);
      setBulkEditOpen(false);
    }
  };

  const handleForm = async (
    name: string,
    email: string,
    password: string,
    role: string,
    status: string,
  ) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role, status }),
    });

    if (res.ok) {
      await fetchUsers();
      closeCreateModal();
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

  const memoUsers = useMemo(() => users, [users]);

  return (
    <div className="w-full px-3 p-10 flex justify-center items-center min-h-screen sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="w-full mx-auto">
        <HeaderTable
          selectedCount={selectedUsers.length}
          onEditSelected={handleEditSelected}
          onDeleteSelected={handleDeleteSelected}
          onFormSelected={openCreateModal}
        />

        <div className="mt-4 sm:mt-6">
          <UserTable
            columns={columns}
            data={memoUsers}
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

        <NewUserForm
          open={isCreateOpen}
          onOpenCreate={closeCreateModal}
          onSave={handleForm}
        />

        <Dialog open={isEditOpen} onOpenChange={closeEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.users?.edit || "Edit User"}</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-4">
                <div>
                  <Label>{t.users?.table?.name || "Name"}</Label>
                  <Input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>{t.users?.table?.email || "Email"}</Label>
                  <Input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>{t.users?.table?.role || "Role"}</Label>
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
                      <SelectItem value="User">
                        {t.roles?.user || "User"}
                      </SelectItem>
                      <SelectItem value="Admin">
                        {t.roles?.admin || "Admin"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.users?.table?.status || "Status"}</Label>
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
                      <SelectItem value="Active">
                        {t.status?.active || "Active"}
                      </SelectItem>
                      <SelectItem value="Inactive">
                        {t.status?.inactive || "Inactive"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={closeEditModal}>
                {t.users?.cancel || "Cancel"}
              </Button>
              <Button onClick={handleSaveEdit}>
                {t.users?.save || "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={!!deleteUser}
          onOpenChange={() => setDeleteUser(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t.users?.confirmDelete || "Are you sure?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t.users?.confirmDeleteDesc?.replace(
                  "{name}",
                  deleteUser?.name || "",
                ) ||
                  `This will permanently delete ${deleteUser?.name}'s account.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {t.users?.cancel || "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                {t.users?.delete || "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
