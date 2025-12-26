"use client";

import { useState, useEffect } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { User, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingStepProps } from "../../OnboardingFlow";
import Select from "react-select";

export function ProfileCompletionStep({ onNext }: OnboardingStepProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    country: "",
    city: "",
    bio: "",
  });

  const [customCountry, setCustomCountry] = useState("");
  const [customCity, setCustomCity] = useState("");

  // Limited country and city options
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "United States of America (the)", label: "USA" },
    { value: "United Arab Emirates (the)", label: "UAE" },
    { value: "Australia", label: "Australia" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "other", label: "Other (specify)" },
  ];

  // City data for supported countries
  const getCitiesByCountry = (country: string) => {
    const cityData: { [key: string]: string[] } = {
      India: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Kolkata",
        "Hyderabad",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Surat",
        "Lucknow",
        "Kanpur",
        "Nagpur",
        "Indore",
        "Thane",
      ],
      "United States of America (the)": [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "Jacksonville",
        "Fort Worth",
        "Columbus",
        "Charlotte",
      ],
      "United Arab Emirates (the)": [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "Ras Al Khaimah",
        "Fujairah",
        "Umm Al Quwain",
        "Al Ain",
        "Al Dhaid",
        "Khor Fakkan",
      ],
      Australia: [
        "Sydney",
        "Melbourne",
        "Brisbane",
        "Perth",
        "Adelaide",
        "Gold Coast",
        "Newcastle",
        "Canberra",
        "Wollongong",
        "Hobart",
        "Geelong",
        "Townsville",
        "Cairns",
        "Darwin",
        "Toowoomba",
      ],
      "Saudi Arabia": [
        "Riyadh",
        "Jeddah",
        "Mecca",
        "Medina",
        "Dammam",
        "Khobar",
        "Dhahran",
        "Taif",
        "Buraidah",
        "Tabuk",
        "Hail",
        "Jubail",
        "Khamis Mushait",
        "Hafar Al-Batin",
        "Al Mubarraz",
      ],
    };
    return cityData[country] || [];
  };

  // Initialize form data with mock data
  useEffect(() => {
    // MOCK VERSION - Use hardcoded profile data for testing
    const mockProfile = {
      first_name: "John",
      last_name: "Doe",
      email: user?.email || "john.doe@example.com",
    };

    setFormData({
      first_name: mockProfile.first_name || "",
      last_name: mockProfile.last_name || "",
      date_of_birth: "",
      country: "",
      city: "",
      bio: "",
    });
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Get final values including custom inputs
      const finalCountry = getFinalCountry();
      const finalCity = getFinalCity();

      // Save profile data to Supabase
      const profileResponse = await fetch("/api/user-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          date_of_birth: formData.date_of_birth || null,
          country: finalCountry,
          city: finalCity,
          bio: formData.bio || null,
        }),
      });

      if (!profileResponse.ok) {
        throw new Error("Failed to save profile data");
      }

      // Update onboarding progress
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStep: 2, // Profile completion step
          profileData: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            date_of_birth: formData.date_of_birth,
            country: finalCountry,
            city: finalCity,
            bio: formData.bio,
          },
        }),
      });

      setSuccess("Profile updated successfully!");

      // Move to next step after a short delay
      setTimeout(() => {
        onNext();
      }, 1000);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get the final country and city values (including custom inputs)
  const getFinalCountry = () => {
    if (formData.country === "other") {
      return customCountry.trim();
    }
    return formData.country;
  };

  const getFinalCity = () => {
    if (formData.country === "other") {
      return customCity.trim();
    }
    if (formData.city === "other") {
      return customCity.trim();
    }
    return formData.city;
  };

  const isFormValid =
    formData.first_name.trim() &&
    formData.last_name.trim() &&
    getFinalCountry() &&
    getFinalCity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#e27447]/10 rounded-full flex items-center justify-center mx-auto">
          <User className="w-6 h-6 text-[#e27447]" />
        </div>
        <h2 className="text-lg font-semibold">Complete Your Profile</h2>
        <p className="text-sm text-muted-foreground">
          Help us personalize your learning experience by completing your
          profile information.
        </p>
      </div>

      {/* Current Profile Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#e27447]/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#e27447]" />
            </div>
            <div>
              <p className="font-medium text-sm">Email Address</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name" className="text-sm font-medium">
              First Name *
            </Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              placeholder="Enter your first name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="last_name" className="text-sm font-medium">
              Last Name *
            </Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              placeholder="Enter your last name"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date_of_birth" className="text-sm font-medium">
            Date of Birth
          </Label>
          <Input
            id="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Country Selection */}
        <div>
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <Select
            id="country"
            options={countryOptions}
            value={countryOptions.find(
              (option) => option.value === formData.country
            )}
            onChange={(selectedOption) => {
              handleInputChange("country", selectedOption?.value || "");
              // Reset city and custom inputs when country changes
              handleInputChange("city", "");
              setCustomCity("");
            }}
            placeholder="Select your country"
            isSearchable
            isClearable
            className="mt-1"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "40px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "2px",
                "&:hover": {
                  border: "1px solid hsl(var(--border))",
                },
                "&:focus": {
                  border: "2px solid #e27447",
                  boxShadow: "0 0 0 2px rgba(226, 116, 71, 0.1)",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "hsl(var(--muted-foreground))",
              }),
            }}
          />

          {/* Custom Country Input */}
          {formData.country === "other" && (
            <Input
              id="customCountry"
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
              placeholder="Enter your country"
              className="mt-2"
            />
          )}
        </div>

        {/* City Selection */}
        <div>
          <Label htmlFor="city" className="text-sm font-medium">
            City
          </Label>

          {formData.country === "other" ? (
            // Custom city input for "Other" country
            <Input
              id="customCity"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="Enter your city"
              className="mt-1"
            />
          ) : formData.country ? (
            // City dropdown for selected countries
            <>
              <Select
                id="city"
                options={[
                  ...getCitiesByCountry(formData.country).map((city) => ({
                    value: city,
                    label: city,
                  })),
                  { value: "other", label: "Other (specify)" },
                ]}
                value={
                  getCitiesByCountry(formData.country).find(
                    (city) => city === formData.city
                  )
                    ? {
                        value: formData.city,
                        label: formData.city,
                      }
                    : formData.city === "other"
                    ? { value: "other", label: "Other (specify)" }
                    : null
                }
                onChange={(selectedOption) => {
                  if (selectedOption?.value === "other") {
                    handleInputChange("city", "other");
                  } else {
                    handleInputChange("city", selectedOption?.value || "");
                    setCustomCity("");
                  }
                }}
                placeholder="Select your city"
                isSearchable
                isClearable
                className="mt-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "2px",
                    "&:hover": {
                      border: "1px solid hsl(var(--border))",
                    },
                    "&:focus": {
                      border: "2px solid #e27447",
                      boxShadow: "0 0 0 2px rgba(226, 116, 71, 0.1)",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "hsl(var(--muted-foreground))",
                  }),
                }}
              />

              {/* Custom City Input for selected countries */}
              {formData.city === "other" && (
                <Input
                  id="customCitySelected"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="Enter your city"
                  className="mt-2"
                />
              )}
            </>
          ) : (
            <div className="mt-1 p-3 border border-border rounded-sm bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Please select a country first
              </p>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="mt-1 w-full px-3 py-2 border border-input rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      {/* Error/Success Messages */}
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

      {/* Action Button */}
      <Button
        onClick={handleSave}
        disabled={!isFormValid || loading}
        className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
        size="lg"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </Button>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground text-center">
        * Required fields. If your country or city is not listed, select
        &quot;Other (specify)&quot; and enter manually. You can update this
        information later in your profile settings.
      </p>
    </div>
  );
}
