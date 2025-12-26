"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import { Badge } from "@/design-system/components/ui/badge";
import { User, Mail, Shield, Calendar, Edit, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AvatarUpload } from "@/components/AvatarUpload";

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: user?.email || "",
      });
    }
  }, [profile, user]);

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: user?.email || "",
    });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!profile) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      // Refresh profile data
      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-muted rounded-full mx-auto flex items-center justify-center mb-6">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Profile Access Required
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You need to be signed in to view and manage your profile. Please
              sign in to continue.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => (window.location.href = "/auth")}>
                Sign In
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
            <p className="text-sm text-muted-foreground mt-2">
              User: {user.email}
            </p>
            <Button
              onClick={async () => {
                console.log("Manual profile refresh...");
                await refreshProfile();
              }}
              className="mt-4"
              variant="outline"
            >
              Refresh Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Profile Information</CardTitle>
                  <CardDescription>
                    Your personal details and account information
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={handleEdit} size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" disabled={loading}>
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={handleCancel} size="sm" variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-sm text-green-600 text-sm">
                  {success}
                </div>
              )}

              {/* Avatar Section */}
              <div className="flex items-start space-x-4">
                <AvatarUpload
                  currentAvatar={profile.avatar_url}
                  userName={`${profile.first_name} ${profile.last_name}`}
                  userId={profile.id}
                  userEmail={user.email}
                  googleAvatar={
                    user.user_metadata?.avatar_url ||
                    user.user_metadata?.picture ||
                    null
                  }
                  onAvatarUpdate={() => refreshProfile()}
                  size="md"
                />
                <div className="flex-1 pt-2">
                  <h3 className="font-semibold text-foreground text-lg">
                    {profile.first_name} {profile.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to choose from multiple avatar options
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        placeholder="Enter first name"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-sm">
                        {profile.first_name || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        placeholder="Enter last name"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-sm">
                        {profile.last_name || "Not set"}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="p-3 bg-muted rounded-sm flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Details</CardTitle>
              <CardDescription>
                Your account status and role information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Role</p>
                    <p className="text-sm text-muted-foreground">
                      Your account permissions
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    profile.role === "admin"
                      ? "secondary"
                      : profile.role === "teacher"
                      ? "outline"
                      : profile.role === "content_manager"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {profile.role === "admin"
                    ? "Administrator"
                    : profile.role === "teacher"
                    ? "Teacher"
                    : profile.role === "content_manager"
                    ? "Content Manager"
                    : "Student"}
                </Badge>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">
                      Account Status
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your account verification status
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Verified
                </Badge>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      When you joined
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(profile.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      Profile last modified
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(profile.updated_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
