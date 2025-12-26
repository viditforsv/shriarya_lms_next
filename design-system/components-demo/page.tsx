"use client"

import { useState } from "react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Separator,
  Skeleton,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  RadioGroup,
  RadioGroupItem,
  Progress,
  Breadcrumb,
  MascotVideo,
  Typewriter,
} from "@/design-system/components"
import { Toaster } from "@/design-system/components"
import { toast } from "sonner"

export default function ComponentsDemo() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [progress, setProgress] = useState(33)

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Components Demo</h1>
          <p className="text-muted-foreground">
            Showcase of all components in the design-system/components folder
          </p>
        </div>

        {/* Mascot Video */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Mascot Video</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Celebration</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <MascotVideo variant="celebration" className="w-32 h-32" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Explaining</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <MascotVideo variant="explaining" className="w-32 h-32" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Thinking</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <MascotVideo variant="thinking" className="w-32 h-32" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typewriter */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Typewriter</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg">
                Welcome to <Typewriter words={["Preppeo", "Test Prep", "Success"]} />
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Buttons</h2>
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="coral">Coral</Button>
              <Button variant="loadMore">Load More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>More content here.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Form Elements</h2>
          <Card>
            <CardHeader>
              <CardTitle>Input & Label</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Enter your message" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Select */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Select</h2>
          <Card>
            <CardContent className="pt-6">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </section>

        {/* Dropdown Menu */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dropdown Menu</h2>
          <Card>
            <CardContent className="pt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </section>

        {/* Avatar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Avatar</h2>
          <Card>
            <CardContent className="pt-6 flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        </section>

        {/* Badge */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Badge</h2>
          <Card>
            <CardContent className="pt-6 flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>
        </section>

        {/* Separator */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Separator</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>Content above</div>
              <Separator />
              <div>Content below</div>
            </CardContent>
          </Card>
        </section>

        {/* Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skeleton</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </CardContent>
          </Card>
        </section>

        {/* Dialog */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dialog</h2>
          <Card>
            <CardContent className="pt-6">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog description. You can add any content here.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        {/* Sheet */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Sheet</h2>
          <Card>
            <CardContent className="pt-6">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button>Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>
                      This is a sheet component that slides in from the side.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <p>Sheet content goes here.</p>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </section>

        {/* Radio Group */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Radio Group</h2>
          <Card>
            <CardContent className="pt-6">
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </section>

        {/* Progress */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Progress</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 25))}>
                  Decrease
                </Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 25))}>
                  Increase
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Breadcrumb */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Breadcrumb</h2>
          <Card>
            <CardContent className="pt-6">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Design System", href: "/design-system" },
                  { label: "Components Demo" },
                ]}
              />
            </CardContent>
          </Card>
        </section>

        {/* Toast Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Toast (Sonner)</h2>
          <Card>
            <CardContent className="pt-6 flex flex-wrap gap-4">
              <Button
                onClick={() => toast.success("Success toast!")}
                variant="primary"
              >
                Success Toast
              </Button>
              <Button
                onClick={() => toast.error("Error toast!")}
                variant="destructive"
              >
                Error Toast
              </Button>
              <Button
                onClick={() => toast.info("Info toast!")}
                variant="outline"
              >
                Info Toast
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

