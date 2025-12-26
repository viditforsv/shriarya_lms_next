"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { X, User, Mail, Sparkles } from "lucide-react";
import { Button } from "@/design-system/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/design-system/components/avatar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/design-system/components/tabs";
import { cn } from "@/lib/utils";

interface AvatarPickerProps {
  currentAvatar?: string | null;
  userName: string;
  userId: string;
  googleAvatar?: string | null;
  onAvatarUpdate?: (avatarUrl: string) => void;
  size?: "sm" | "md" | "lg";
  isOpen: boolean;
  onClose: () => void;
}

// DiceBear Micah avatar seeds - these generate unique avatars
// Using varied seeds to get different combinations
const AVATAR_SEEDS = [
  "John",
  "Emma",
  "Michael",
  "Sophia",
  "David",
  "Olivia",
  "James",
  "Isabella",
  "William",
  "Charlotte",
  "Richard",
  "Amelia",
  "Joseph",
  "Mia",
  "Thomas",
  "Harper",
  "Charles",
  "Evelyn",
  "Christopher",
  "Abigail",
  "Daniel",
  "Emily",
  "Matthew",
  "Elizabeth",
  "Anthony",
  "Sofia",
  "Mark",
  "Avery",
  "Donald",
  "Ella",
  "Steven",
  "Scarlett",
  "Paul",
  "Victoria",
  "Andrew",
  "Madison",
  "Joshua",
  "Luna",
  "Kenneth",
  "Grace",
  "Kevin",
  "Chloe",
  "Brian",
  "Penelope",
  "George",
  "Layla",
  "Timothy",
  "Riley",
  "Ronald",
  "Zoey",
  "Edward",
  "Nora",
  "Jason",
  "Lily",
  "Jeffrey",
  "Aurora",
  "Ryan",
  "Hannah",
  "Jacob",
  "Leah",
  "Gary",
  "Ellie",
  "Nicholas",
  "Natalie",
];

export function AvatarPicker({
  currentAvatar,
  userName,
  userId,
  googleAvatar,
  onAvatarUpdate,
  size = "md",
  isOpen,
  onClose,
}: AvatarPickerProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"default" | "google" | "dicebear">(
    "default"
  );
  const supabase = createClient();

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleAvatarSelect = (seed: string) => {
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(
      seed
    )}`;
    setSelectedAvatar(seed);
    setPreviewUrl(avatarUrl);
    setError(null);
  };

  const handleSave = async () => {
    if (!previewUrl && activeTab === "dicebear") return;
    if (!selectedAvatar && activeTab === "dicebear") return;

    setIsUpdating(true);
    setError(null);

    try {
      // Update profile with selected avatar URL (null for default initials)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: previewUrl })
        .eq("id", userId);

      if (updateError) {
        throw new Error("Failed to save avatar");
      }

      onAvatarUpdate?.(previewUrl || "");
      setSuccess("Avatar saved successfully!");

      // Close after a short delay to show success message
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Avatar save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save avatar");
    } finally {
      setIsUpdating(false);
    }
  };


  const [success, setSuccess] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedAvatar(null);
      setPreviewUrl(null);
      setError(null);
      setSuccess(null);
      setActiveTab("default");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#1e293b]">
                Choose Avatar
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Select an emoji avatar or upload your own image
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-sm text-green-600 text-sm">
                ✓ {success}
              </div>
            )}

            {/* Current Avatar Preview */}
            <div className="mb-6 pb-6 border-b space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Current Avatar
                </p>
                <div className="flex items-center space-x-4">
                  <Avatar className={cn(sizeClasses[size])}>
                    {currentAvatar && (
                      <AvatarImage src={currentAvatar} alt={userName} />
                    )}
                    <AvatarFallback className="bg-[#e27447] text-white text-lg font-semibold">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentAvatar ? "Custom avatar" : "Default avatar"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Selected Avatar */}
              {previewUrl && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Preview (Click Save to apply)
                  </p>
                  <div className="flex items-center space-x-4">
                    <Avatar className={cn(sizeClasses[size])}>
                      <AvatarImage src={previewUrl} alt="Preview" />
                      <AvatarFallback className="bg-[#e27447] text-white text-lg font-semibold">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#e27447]">New Avatar</p>
                      <p className="text-sm text-muted-foreground">
                        Click Save to update
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Options with Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                setActiveTab(v as "default" | "google" | "dicebear");
                setSelectedAvatar(null);
                setPreviewUrl(null);
              }}
            >
              <TabsList className="grid w-full grid-cols-3 rounded-sm mb-4">
                <TabsTrigger value="default" className="rounded-sm">
                  <User className="w-4 h-4 mr-2" />
                  Default
                </TabsTrigger>
                <TabsTrigger
                  value="google"
                  className="rounded-sm"
                  disabled={!googleAvatar}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </TabsTrigger>
                <TabsTrigger value="dicebear" className="rounded-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  DiceBear
                </TabsTrigger>
              </TabsList>

              {/* Default Initials Option */}
              <TabsContent value="default" className="mt-0">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Use your initials as your avatar
                  </p>
                  <button
                    onClick={() => {
                      setPreviewUrl(""); // Empty string to clear avatar
                      setSelectedAvatar("default");
                    }}
                    className={cn(
                      "w-full p-4 border-2 rounded-sm transition-all hover:bg-accent/10",
                      previewUrl === "" &&
                        selectedAvatar === "default" &&
                        "border-[#e27447] bg-accent/20"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className={cn(sizeClasses[size])}>
                        <AvatarFallback className="bg-[#e27447] text-white text-lg font-semibold">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-medium">{userName}</p>
                        <p className="text-sm text-muted-foreground">
                          Initials only
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </TabsContent>

              {/* Google Photo Option */}
              <TabsContent value="google" className="mt-0">
                <div className="space-y-4">
                  {googleAvatar ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Use your Google profile picture
                      </p>
                      <button
                        onClick={() => {
                          setPreviewUrl(googleAvatar);
                          setSelectedAvatar("google");
                        }}
                        className={cn(
                          "w-full p-4 border-2 rounded-sm transition-all hover:bg-accent/10",
                          previewUrl === googleAvatar &&
                            "border-[#e27447] bg-accent/20"
                        )}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className={cn(sizeClasses[size])}>
                            <AvatarImage src={googleAvatar} alt="Google" />
                            <AvatarFallback className="bg-[#e27447] text-white text-lg font-semibold">
                              {getInitials(userName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="font-medium">{userName}</p>
                            <p className="text-sm text-muted-foreground">
                              Google photo
                            </p>
                          </div>
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No Google photo available. Sign in with Google to use
                        this option.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* DiceBear Avatar Grid */}
              <TabsContent value="dicebear" className="mt-0">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose from our collection of avatars
                  </p>
                  <div className="grid grid-cols-8 gap-2">
                    {AVATAR_SEEDS.map((seed, index) => (
                      <button
                        key={index}
                        onClick={() => handleAvatarSelect(seed)}
                        disabled={isUpdating}
                        className={cn(
                          "aspect-square rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 disabled:opacity-50 border-2 border-transparent",
                          selectedAvatar === seed &&
                            "ring-2 ring-[#e27447] border-[#e27447]"
                        )}
                      >
                        <Image
                          src={`https://api.dicebear.com/7.x/micah/svg?seed=${seed}`}
                          alt={seed}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer with Save Button */}
          <div className="p-6 border-t bg-gray-50 space-y-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-sm"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  (activeTab === "dicebear" && !selectedAvatar) || isUpdating
                }
                className="flex-1 bg-[#e27447] hover:bg-[#d1653a] text-white rounded-sm"
              >
                {isUpdating ? "Saving..." : "Save Avatar"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              💡 Choose an option and click Save to update your profile picture
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
