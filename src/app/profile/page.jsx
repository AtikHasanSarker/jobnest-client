"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import {
  UserRound,
  Camera,
  Mail,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/actions/users";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();

  const user = session?.user;

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Clean up the previous preview URL without updating state in an effect.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleEdit = () => {
    setName(user?.name || "");
    setSelectedFile(null);
    setPreviewUrl("");
    setIsEditing(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setSelectedFile(null);
    setPreviewUrl("");
    setIsEditing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  // Upload selected image to ImgBB and return its URL.
  const handleImgUpload = async (file) => {
    if (!file) return null;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.data?.url) {
      throw new Error(
        data?.error?.message || "Failed to upload image to ImgBB.",
      );
    }

    return data.data.url;
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (isSaving) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsSaving(true);

    try {
      // Keep the existing image if the user does not select a new one.
      let imageUrl = user?.image || "";

      // Step 1: Upload the selected file and get its URL.
      if (selectedFile) {
        imageUrl = await handleImgUpload(selectedFile);
      }

      // Step 2: Update the user through the existing PATCH action.
      const result = await updateUser({
        name: trimmedName,
        image: imageUrl,
      });

      // Handle unsuccessful API responses.
      if (
        result?.success === false ||
        result?.error ||
        result?.matchedCount === 0
      ) {
        throw new Error(
          result?.message ||
            result?.error?.message ||
            "Failed to update your profile.",
        );
      }

      // Step 3: Refresh the Better Auth session when supported.
      if (typeof refetch === "function") {
        await refetch();
      }

      setSelectedFile(null);
      setPreviewUrl("");
      setIsEditing(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error?.message || "An error occurred while updating your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <div className="size-7 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] px-5 text-white">
        <Card className="w-full max-w-md border border-white/10 bg-[#1b1b1b] p-8 text-center">
          <UserRound className="mx-auto mb-4 size-10 text-zinc-400" />

          <h1 className="text-xl font-semibold">Sign in required</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Please sign in to view your profile.
          </p>

          <Button
            className="mt-6 bg-white text-black"
            onPress={() => {
              window.location.href = "/signin?redirect=/profile";
            }}
          >
            Sign In
          </Button>
        </Card>
      </main>
    );
  }

  const displayedImage = previewUrl || user.image || "";

  return (
    <main className="mt-20 min-h-screen px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wider text-violet-400">
            ACCOUNT SETTINGS
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Manage your personal information and profile appearance.
          </p>
        </div>

        <Card className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] p-0 shadow-none">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-violet-950 via-[#252044] to-[#171717] sm:h-40" />

          <form onSubmit={handleSave} className="px-5 pb-7 sm:px-8">
            {/* Profile Header */}
            <div className="-mt-12 mb-7 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#1b1b1b] bg-[#292929] sm:size-28">
                  {displayedImage ? (
                    <img
                      src={displayedImage}
                      alt="Profile"
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-10 text-zinc-400" />
                  )}

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Change profile image"
                      className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                    >
                      <Camera className="size-6" />
                    </button>
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="truncate text-xl font-semibold">
                    {isEditing ? name || "Your Name" : user.name || "Your Name"}
                  </h2>

                  <p className="mt-1 truncate text-sm text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {!isEditing && (
                <Button
                  type="button"
                  onPress={handleEdit}
                  className="h-10 shrink-0 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white hover:bg-white/10"
                >
                  <Pencil className="size-4" />
                  Edit Profile
                </Button>
              )}

              {isEditing && (
                <Button
                  type="button"
                  isDisabled={isSaving}
                  onPress={() => fileInputRef.current?.click()}
                  className="h-10 shrink-0 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white hover:bg-white/10"
                >
                  <Camera className="size-4" />
                  Change Photo
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing || isSaving}
            />

            {isEditing && selectedFile && (
              <p className="mb-5 text-xs text-violet-300">
                Selected: {selectedFile.name}
              </p>
            )}

            <div className="mb-7 border-t border-white/10" />

            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <p className="mt-1 text-sm text-zinc-400">
                {isEditing
                  ? "Make your changes and save when you're ready."
                  : "Your account information and profile details."}
              </p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Full Name
                </label>

                <div
                  className={`flex items-center gap-3 rounded-xl border px-4 transition-colors ${
                    isEditing
                      ? "border-violet-500/50 bg-[#111111] focus-within:border-violet-400"
                      : "border-white/10 bg-[#151515]"
                  }`}
                >
                  <UserRound className="size-4 shrink-0 text-zinc-500" />

                  <input
                    id="profile-name"
                    type="text"
                    value={isEditing ? name : user.name || ""}
                    onChange={(event) => setName(event.target.value)}
                    readOnly={!isEditing}
                    required
                    maxLength={100}
                    className={`h-12 min-w-0 flex-1 bg-transparent text-sm outline-none ${
                      isEditing ? "text-white" : "cursor-default text-zinc-300"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151515] px-4">
                  <Mail className="size-4 shrink-0 text-zinc-500" />

                  <input
                    id="profile-email"
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="h-12 min-w-0 flex-1 cursor-default bg-transparent text-sm text-zinc-400 outline-none"
                  />

                  <ShieldCheck className="size-4 shrink-0 text-emerald-400" />
                </div>

                <p className="mt-2 text-xs text-zinc-500">
                  Email address cannot be changed from this page.
                </p>
              </div>
            </div>

            {/* Actions only appear in edit mode */}
            {isEditing && (
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  isDisabled={isSaving}
                  onPress={handleCancel}
                  className="h-11 border-white/15 text-zinc-300 hover:bg-white/5"
                >
                  <X className="size-4" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isDisabled={isSaving}
                  className="h-11 bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white"
                >
                  <Save className="size-4" />
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </main>
  );
}
