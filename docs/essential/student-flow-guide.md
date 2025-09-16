# Student Flow Guide - ShriArya LMS

This document explains the complete student journey in the ShriArya LMS, from initial registration to course completion.

## Table of Contents

1. [Student Registration & Authentication](#student-registration--authentication)
2. [Onboarding Process](#onboarding-process)
3. [Course Discovery](#course-discovery)
4. [Course Enrollment](#course-enrollment)
5. [Payment Process](#payment-process)
6. [Learning Experience](#learning-experience)
7. [Dashboard & Progress Tracking](#dashboard--progress-tracking)
8. [Student Support Features](#student-support-features)

---

## Student Registration & Authentication

### Initial Registration

- **Entry Point**: Students visit the homepage (`/`) and click "Sign Up"
- **Authentication**: Uses Supabase Auth with email/password
- **Role Assignment**: All new users are automatically assigned the "student" role [[memory:7715928]]
- **Redirect**: After successful registration, students are redirected to the onboarding flow

### Authentication Flow

- **Login**: Students can sign in at `/auth`
- **Password Reset**: Available at `/auth/forgot-password` and `/auth/reset-password`
- **Session Management**: Uses Supabase Auth with persistent sessions
- **Role-based Access**: Students can only access student-specific features

---

## Onboarding Process

### Onboarding Flow Overview

The onboarding process consists of 5 steps designed to personalize the student experience:

1. **Welcome Step** (`/onboarding`)

   - Introduction to the platform
   - Overview of available features
   - Can be skipped

2. **Preferences Step**

   - Educational background selection
   - Board selection (CBSE, IBDP, ICSE, IGCSE)
   - Exam type selection
   - Learning preferences

3. **Profile Completion Step**

   - Personal information collection
   - Profile picture upload
   - Contact details
   - Academic information

4. **Course Discovery Step**

   - Browse available courses
   - Course recommendations based on preferences
   - Course selection for enrollment

5. **Completion Step**
   - Review selected preferences
   - Final confirmation
   - Redirect to dashboard

### Onboarding Features

- **Progress Tracking**: Visual progress bar showing completion status
- **Step Navigation**: Students can move forward/backward between steps
- **Skip Options**: Non-essential steps can be skipped
- **Data Persistence**: All onboarding data is saved to Supabase
- **Resume Capability**: Students can resume onboarding if interrupted

### Onboarding Data Storage

```typescript
interface OnboardingData {
  currentStep: number;
  preferences: {
    educationalBackground: string;
    selectedBoard: string;
    selectedExam: string;
    selectedCourses: string[];
  };
  profileData: {
    fullName: string;
    profilePicture: string;
    contactInfo: object;
  };
  skippedSteps: string[];
  isCompleted: boolean;
}
```

---

## Course Discovery

### Course Discovery Page (`/courses/discover`)

Students can browse and search for courses using multiple filters:

#### Search & Filter Options

- **Text Search**: Search by course title, description, or keywords
- **Curriculum Filter**: CBSE, IBDP, ICSE, IGCSE
- **Subject Filter**: Mathematics, Physics, Chemistry, etc.
- **Grade Filter**: Class 10, Class 11, Class 12, Higher Level, Standard Level
- **Price Filter**: Free courses, Paid courses, All courses
- **Sort Options**: Popularity, Rating, Newest, Title, Price, Duration

#### View Modes

- **Grid View**: Card-based layout with course thumbnails
- **List View**: Detailed list with course information

#### Course Information Display

Each course shows:

- Course title and description
- Price (Free or Paid)
- Curriculum and subject tags
- Creation date
- Course status (Published/Draft)
- Enrollment button

---

## Course Enrollment

### Enrollment Process

#### Free Courses

1. **Enrollment Button**: Click "Enroll for Free" on course page
2. **Immediate Access**: Student is enrolled immediately
3. **Database Update**: Enrollment record created in `enrollments` table
4. **Redirect**: Student is redirected to course content

#### Paid Courses

1. **Enrollment Button**: Click "Enroll Now" with price display
2. **Payment Redirect**: Student is redirected to payment page (`/courses/[slug]/payment`)
3. **Payment Process**: Complete payment through Razorpay
4. **Enrollment Activation**: After successful payment, enrollment is activated
5. **Access Granted**: Student gains full access to course content

### Enrollment Data Structure

```typescript
interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  is_active: boolean;
  payment_status?: string;
}
```

### Enrollment Verification

- **Access Control**: System checks enrollment status before allowing course access
- **Real-time Updates**: Enrollment status is checked in real-time
- **Error Handling**: Clear error messages for enrollment issues

---

## Payment Process

### Payment Integration

- **Provider**: Razorpay payment gateway
- **Supported Methods**: UPI, Cards, Net Banking, Digital Wallets
- **Currency**: INR (Indian Rupees)
- **Countries**: Currently optimized for India

### Payment Flow

1. **Payment Page**: Student selects course and proceeds to payment
2. **Payment Method Selection**: Choose from available payment methods
3. **Order Creation**: Payment order created via Razorpay API
4. **Payment Processing**: Student completes payment
5. **Verification**: Payment is verified on the server
6. **Enrollment Activation**: Course access is granted upon successful payment
7. **Confirmation**: Student receives confirmation and access to course

### Payment Security

- **Server-side Verification**: All payments are verified server-side
- **Secure API**: Payment data is handled securely
- **Error Handling**: Comprehensive error handling for failed payments
- **Refund Policy**: 7-day money-back guarantee

---

## Learning Experience

### Course Access

Students can access courses through:

- **Direct URL**: `/courses/[slug]`
- **Dashboard**: Click on enrolled courses
- **Course Discovery**: Browse and access courses

### Course Content Structure

- **Course Overview**: Title, description, instructor information
- **Syllabus**: Detailed course structure and topics
- **Lessons**: Individual lesson content with videos, PDFs, and resources
- **Progress Tracking**: Visual progress indicators

### Lesson Navigation

- **Lesson Access**: `/courses/[slug]/lesson/[lessonSlug]`
- **Navigation Controls**: Previous/Next lesson buttons
- **Lesson Content**: Video content, PDFs, key points, notes
- **Preview Access**: Some lessons available as previews for non-enrolled students

### Content Types

- **Video Content**: Embedded video players with thumbnails
- **PDF Resources**: Downloadable study materials
- **Interactive Content**: Mathematical expressions and formulas
- **Key Points**: Summarized lesson highlights
- **Notes**: Additional study notes

---

## Dashboard & Progress Tracking

### Student Dashboard (`/dashboard`)

The dashboard provides a comprehensive overview of the student's learning journey:

#### Dashboard Features

- **Welcome Message**: Personalized greeting with student name
- **Enrolled Courses**: Display of recently enrolled courses
- **Quick Actions**: Direct links to continue learning
- **Progress Overview**: Visual progress indicators
- **Course Statistics**: Number of courses, completion rates

#### Course Management

- **My Courses**: View all enrolled courses (`/courses/enrolled`)
- **Continue Learning**: Quick access to resume courses
- **Course Progress**: Track completion percentage
- **Recent Activity**: Show recently accessed lessons

### Progress Tracking

- **Visual Progress Bars**: Show completion percentage for each course
- **Lesson Completion**: Track individual lesson completion
- **Time Tracking**: Monitor time spent on courses
- **Achievement System**: Track learning milestones

### Dashboard Navigation

Students have access to:

- **My Courses**: View enrolled courses
- **Progress**: Track learning progress
- **Profile**: Manage personal information
- **Settings**: Account and preference settings

---

## Student Support Features

### Help & Support

- **FAQ Section**: Common questions and answers
- **Contact Support**: Direct communication with support team
- **Help Documentation**: Comprehensive guides and tutorials

### Account Management

- **Profile Settings**: Update personal information
- **Password Management**: Change password, reset password
- **Notification Preferences**: Manage email notifications
- **Privacy Settings**: Control data sharing preferences

### Learning Tools

- **Bookmarks**: Save important lessons and resources
- **Notes**: Take personal notes during lessons
- **Downloads**: Access downloaded course materials
- **Offline Access**: Some content available offline

---

## Technical Implementation Details

### Authentication & Authorization

- **Supabase Auth**: Handles user authentication
- **Role-based Access Control**: Students can only access student features
- **Session Management**: Persistent login sessions
- **Security**: Secure password handling and data protection

### Data Management

- **Supabase Database**: All student data stored securely
- **Real-time Updates**: Live updates for enrollment and progress
- **Data Backup**: Regular backups of student data
- **Privacy Compliance**: GDPR and data protection compliance

### Performance Optimization

- **CDN Integration**: Fast content delivery
- **Caching**: Optimized content loading
- **Mobile Responsive**: Works on all device sizes
- **Progressive Loading**: Efficient content loading strategies

---

## Student Journey Summary

1. **Registration** → Student creates account
2. **Onboarding** → Personalizes learning experience
3. **Course Discovery** → Finds relevant courses
4. **Enrollment** → Enrolls in free or paid courses
5. **Payment** → Completes payment for paid courses
6. **Learning** → Accesses course content and lessons
7. **Progress Tracking** → Monitors learning progress
8. **Support** → Gets help when needed

This comprehensive flow ensures students have a smooth, intuitive learning experience from registration to course completion.
