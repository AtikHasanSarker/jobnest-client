"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import {
  UserRound,
  Camera,
  Mail,
  Save,
  X,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please sign in to update your profile.");
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsSaving(true);

    try {
      let updatedImage = imageUrl;

      // Upload selected image to ImgBB first.
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult.success) {
          throw new Error(uploadResult.message || "Image upload failed.");
        }

        updatedImage = uploadResult.imageUrl;
      }

      // Update the Better Auth user profile.
      const { data, error } = await authClient.updateUser({
        name: trimmedName,
        ...(selectedFile ? { image: updatedImage } : {}),
      });

      if (error) {
        throw new Error(error.message || "Profile update failed.");
      }

      if (!data) {
        throw new Error("Could not confirm the profile update.");
      }

      setName(trimmedName);
      setImageUrl(updatedImage);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Profile updated successfully.");

      // Refresh server-rendered content; the session hook
      // should update the Navbar when the session changes.
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <LoaderCircle className="size-7 animate-spin text-violet-400" />
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
            Please sign in to view and update your profile.
          </p>

          <Button
            className="mt-6 bg-white text-black"
            onPress={() => router.push("/signin?redirect=/profile")}
          >
            Sign In
          </Button>
        </Card>
      </main>
    );
  }

  const displayedImage = previewUrl || imageUrl;

  return (
    <main className="min-h-screen bg-[#111111] px-5 mt-20 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-violet-400">
            ACCOUNT SETTINGS
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Manage your personal information and profile appearance.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] p-0 shadow-none">
            {/* Profile banner */}
            <div className="h-32 bg-gradient-to-r from-violet-950 via-[#252044] to-[#171717] sm:h-40" />

            <div className="px-5 pb-7 sm:px-8">
              {/* Avatar */}
              <div className="-mt-12 mb-7 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#1b1b1b] bg-[#292929] sm:size-28">
                    {displayedImage ? (
                      <img
                        src={displayedImage}
                        alt="Profile preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound className="size-10 text-zinc-400" />
                    )}

                    {isSaving && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <LoaderCircle className="size-6 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 pb-1">
                    <h2 className="truncate text-xl font-semibold">
                      {user.name || "Your Name"}
                    </h2>
                    <p className="mt-1 truncate text-sm text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  isDisabled={isSaving}
                  onPress={() => fileInputRef.current?.click()}
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Camera className="size-4" />
                  Change Photo
                </Button>
              </div>

              <div className="mb-7 border-t border-white/10" />

              {/* Personal information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Update the name and profile photo associated with your
                  account.
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

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111] px-4 transition-colors focus-within:border-violet-500/60">
                    <UserRound className="size-4 shrink-0 text-zinc-500" />

                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      maxLength={100}
                      required
                      disabled={isSaving}
                      className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
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
                      className="h-12 min-w-0 flex-1 bg-transparent text-sm text-zinc-400 outline-none"
                    />

                    <ShieldCheck
                      className="size-4 shrink-0 text-emerald-400"
                      aria-label="Account email"
                    />
                  </div>

                  <p className="mt-2 text-xs text-zinc-500">
                    Email address cannot be changed from this page.
                  </p>
                </div>

                {/* Image status */}
                {selectedFile && (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-violet-300">
                        {selectedFile.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        Image ready to upload ·{" "}
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <Button
                      type="button"
                      isIconOnly
                      aria-label="Remove selected image"
                      variant="ghost"
                      isDisabled={isSaving}
                      onPress={() => {
                        setSelectedFile(null);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="shrink-0 text-zinc-400"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  isDisabled={isSaving}
                  onPress={handleCancel}
                  className="border-white/15 text-zinc-300"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isDisabled={isSaving}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}
