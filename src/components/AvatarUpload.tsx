"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/design-system/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/design-system/components/avatar";
import { cn } from "@/lib/utils";
import { AvatarPicker } from "./AvatarPicker";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  userName: string;
  userId: string;
  userEmail?: string;
  googleAvatar?: string | null;
  onAvatarUpdate?: (avatarUrl: string) => void;
  size?: "sm" | "md" | "lg";
}

export function AvatarUpload({
  currentAvatar,
  userName,
  userId,
  userEmail,
  googleAvatar,
  onAvatarUpdate,
  size = "lg",
}: AvatarUploadProps) {
  // userEmail is part of the interface but not currently used
  void userEmail;
  const [avatar, setAvatar] = useState<string | null>(currentAvatar || null);
  const [showPicker, setShowPicker] = useState(false);

  // Sync avatar state with currentAvatar prop
  useEffect(() => {
    setAvatar(currentAvatar || null);
  }, [currentAvatar]);

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

  const displayAvatar = avatar;
  const showAvatar = !!displayAvatar;

  return (
    <div className="relative group">
      <div className="relative">
        <Avatar className={cn(sizeClasses[size])}>
          {showAvatar && (
            <AvatarImage
              src={displayAvatar || undefined}
              alt={userName}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-[#e27447] text-white text-lg font-semibold">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        {/* Click overlay to choose avatar */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
          onClick={() => setShowPicker(true)}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Action button */}
      <div className="flex justify-center mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPicker(true)}
          className="text-xs"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Change Avatar
        </Button>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPicker
        currentAvatar={avatar}
        userName={userName}
        userId={userId}
        googleAvatar={googleAvatar}
        onAvatarUpdate={(newAvatar) => {
          setAvatar(newAvatar);
          onAvatarUpdate?.(newAvatar);
        }}
        size={size}
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
      />
    </div>
  );
}
