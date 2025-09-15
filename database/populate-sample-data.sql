-- Check if RBAC tables have data and populate if needed
-- This script checks existing data and adds sample data if tables are empty

-- Check if permission_categories has data
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.permission_categories LIMIT 1) THEN
        -- Insert permission categories
        INSERT INTO public.permission_categories (name, display_name, description, icon, display_order) VALUES
        ('course-management', 'Course Management', 'Tasks related to creating, editing, and managing courses', '📚', 1),
        ('content-management', 'Content Management', 'Tasks related to creating and managing course content', '📝', 2),
        ('question-bank', 'Question Bank Management', 'Tasks related to managing questions and assessments', '❓', 3),
        ('user-management', 'User Management', 'Tasks related to managing users and their accounts', '👥', 4),
        ('enrollment-access', 'Enrollment & Access', 'Tasks related to student enrollment and access control', '🎓', 5),
        ('analytics-reporting', 'Analytics & Reporting', 'Tasks related to viewing analytics and generating reports', '📊', 6),
        ('communication', 'Communication', 'Tasks related to messaging and communication features', '💬', 7),
        ('system-administration', 'System Administration', 'Tasks related to system configuration and maintenance', '⚙️', 8),
        ('financial-management', 'Financial Management', 'Tasks related to pricing, payments, and financial operations', '💰', 9),
        ('support-help', 'Support & Help', 'Tasks related to customer support and help systems', '🆘', 10);
        
        RAISE NOTICE 'Permission categories inserted';
    ELSE
        RAISE NOTICE 'Permission categories already exist';
    END IF;
END $$;

-- Check if roles has data
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.roles LIMIT 1) THEN
        -- Insert roles
        INSERT INTO public.roles (name, display_name, description, is_system_role) VALUES
        ('super_admin', 'Super Admin', 'Full system access with all permissions', true),
        ('admin', 'Admin', 'Administrative access with most permissions', true),
        ('course_creator', 'Course Creator', 'Can create and manage courses', false),
        ('instructor', 'Instructor', 'Teaching role with course management capabilities', false),
        ('teaching_assistant', 'Teaching Assistant', 'Limited teaching support role', false),
        ('content_editor', 'Content Editor', 'Can create and edit content', false),
        ('content_reviewer', 'Content Reviewer', 'Can review and approve content', false),
        ('course_manager', 'Course Manager', 'Can manage courses and users', false),
        ('student', 'Student', 'Student role with limited access', true),
        ('guest_user', 'Guest User', 'Very limited access for guests', true),
        ('support_agent', 'Support Agent', 'Customer support role', false),
        ('finance_manager', 'Finance Manager', 'Financial operations role', false),
        ('marketing_manager', 'Marketing Manager', 'Marketing and communication role', false),
        ('quality_assurance', 'Quality Assurance', 'Quality control and review role', false),
        ('system_administrator', 'System Administrator', 'System management role', false);
        
        RAISE NOTICE 'Roles inserted';
    ELSE
        RAISE NOTICE 'Roles already exist';
    END IF;
END $$;

-- Check if permissions has data
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.permissions LIMIT 1) THEN
        -- Insert permissions (abbreviated version for brevity)
        INSERT INTO public.permissions (name, display_name, description, category) VALUES
        -- Course Management
        ('create_course', 'Create Course', 'Create new courses', 'course-management'),
        ('edit_course', 'Edit Course', 'Edit existing courses', 'course-management'),
        ('delete_course', 'Delete Course', 'Delete courses', 'course-management'),
        ('publish_course', 'Publish Course', 'Publish courses for students', 'course-management'),
        ('archive_course', 'Archive Course', 'Archive courses', 'course-management'),
        ('duplicate_course', 'Duplicate Course', 'Duplicate existing courses', 'course-management'),
        ('import_course', 'Import Course', 'Import courses from external sources', 'course-management'),
        ('export_course', 'Export Course', 'Export courses to external formats', 'course-management'),
        
        -- Content Management
        ('create_lesson', 'Create Lesson', 'Create new lessons', 'content-management'),
        ('edit_lesson', 'Edit Lesson', 'Edit existing lessons', 'content-management'),
        ('delete_lesson', 'Delete Lesson', 'Delete lessons', 'content-management'),
        ('reorder_lessons', 'Reorder Lessons', 'Reorder lesson sequence', 'content-management'),
        ('upload_resources', 'Upload Resources', 'Upload course resources', 'content-management'),
        ('manage_media', 'Manage Media', 'Manage media files', 'content-management'),
        ('create_quiz', 'Create Quiz', 'Create quizzes', 'content-management'),
        ('edit_quiz', 'Edit Quiz', 'Edit existing quizzes', 'content-management'),
        ('delete_quiz', 'Delete Quiz', 'Delete quizzes', 'content-management'),
        ('grade_quiz', 'Grade Quiz', 'Grade student quiz submissions', 'content-management'),
        
        -- Question Bank Management
        ('create_question', 'Create Question', 'Create new questions', 'question-bank'),
        ('edit_question', 'Edit Question', 'Edit existing questions', 'question-bank'),
        ('delete_question', 'Delete Question', 'Delete questions', 'question-bank'),
        ('review_question', 'Review Question', 'Review questions for quality', 'question-bank'),
        ('approve_question', 'Approve Question', 'Approve questions for use', 'question-bank'),
        ('reject_question', 'Reject Question', 'Reject questions', 'question-bank'),
        ('assign_questions', 'Assign Questions', 'Assign questions to quizzes', 'question-bank'),
        ('import_questions', 'Import Questions', 'Import questions from external sources', 'question-bank'),
        ('export_questions', 'Export Questions', 'Export questions to external formats', 'question-bank'),
        
        -- User Management
        ('create_user', 'Create User', 'Create new user accounts', 'user-management'),
        ('edit_user', 'Edit User', 'Edit user account information', 'user-management'),
        ('delete_user', 'Delete User', 'Delete user accounts', 'user-management'),
        ('suspend_user', 'Suspend User', 'Suspend user accounts', 'user-management'),
        ('activate_user', 'Activate User', 'Activate suspended user accounts', 'user-management'),
        ('reset_password', 'Reset Password', 'Reset user passwords', 'user-management'),
        ('assign_roles', 'Assign Roles', 'Assign roles to users', 'user-management'),
        ('manage_permissions', 'Manage Permissions', 'Manage user permissions', 'user-management'),
        ('bulk_user_operations', 'Bulk User Operations', 'Perform bulk operations on users', 'user-management'),
        
        -- Enrollment & Access
        ('enroll_students', 'Enroll Students', 'Enroll students in courses', 'enrollment-access'),
        ('unenroll_students', 'Unenroll Students', 'Remove students from courses', 'enrollment-access'),
        ('manage_enrollments', 'Manage Enrollments', 'Manage student enrollments', 'enrollment-access'),
        ('grant_access', 'Grant Access', 'Grant access to courses', 'enrollment-access'),
        ('revoke_access', 'Revoke Access', 'Revoke access to courses', 'enrollment-access'),
        ('view_student_progress', 'View Student Progress', 'View student progress in courses', 'enrollment-access'),
        ('track_completion', 'Track Completion', 'Track course completion', 'enrollment-access'),
        
        -- Analytics & Reporting
        ('view_analytics', 'View Analytics', 'View system analytics', 'analytics-reporting'),
        ('generate_reports', 'Generate Reports', 'Generate various reports', 'analytics-reporting'),
        ('export_data', 'Export Data', 'Export system data', 'analytics-reporting'),
        ('view_student_performance', 'View Student Performance', 'View student performance data', 'analytics-reporting'),
        ('course_analytics', 'Course Analytics', 'View course-specific analytics', 'analytics-reporting'),
        ('user_analytics', 'User Analytics', 'View user-specific analytics', 'analytics-reporting'),
        ('revenue_analytics', 'Revenue Analytics', 'View revenue and financial analytics', 'analytics-reporting'),
        
        -- Communication
        ('send_announcements', 'Send Announcements', 'Send announcements to users', 'communication'),
        ('send_emails', 'Send Emails', 'Send emails to users', 'communication'),
        ('manage_notifications', 'Manage Notifications', 'Manage system notifications', 'communication'),
        ('create_forums', 'Create Forums', 'Create discussion forums', 'communication'),
        ('moderate_discussions', 'Moderate Discussions', 'Moderate forum discussions', 'communication'),
        ('send_messages', 'Send Messages', 'Send messages to users', 'communication'),
        
        -- System Administration
        ('system_settings', 'System Settings', 'Configure system settings', 'system-administration'),
        ('security_settings', 'Security Settings', 'Configure security settings', 'system-administration'),
        ('backup_data', 'Backup Data', 'Backup system data', 'system-administration'),
        ('restore_data', 'Restore Data', 'Restore system data', 'system-administration'),
        ('view_logs', 'View Logs', 'View system logs', 'system-administration'),
        ('maintenance_mode', 'Maintenance Mode', 'Enable/disable maintenance mode', 'system-administration'),
        ('api_management', 'API Management', 'Manage API settings', 'system-administration'),
        ('integration_settings', 'Integration Settings', 'Configure integrations', 'system-administration'),
        
        -- Financial Management
        ('manage_pricing', 'Manage Pricing', 'Manage course pricing', 'financial-management'),
        ('process_payments', 'Process Payments', 'Process payment transactions', 'financial-management'),
        ('handle_refunds', 'Handle Refunds', 'Process refunds', 'financial-management'),
        ('view_transactions', 'View Transactions', 'View financial transactions', 'financial-management'),
        ('generate_invoices', 'Generate Invoices', 'Generate invoices', 'financial-management'),
        ('manage_subscriptions', 'Manage Subscriptions', 'Manage user subscriptions', 'financial-management'),
        
        -- Support & Help
        ('manage_support_tickets', 'Manage Support Tickets', 'Manage customer support tickets', 'support-help'),
        ('respond_to_queries', 'Respond to Queries', 'Respond to user queries', 'support-help'),
        ('create_help_articles', 'Create Help Articles', 'Create help documentation', 'support-help'),
        ('manage_faq', 'Manage FAQ', 'Manage frequently asked questions', 'support-help'),
        ('live_chat_support', 'Live Chat Support', 'Provide live chat support', 'support-help');
        
        RAISE NOTICE 'Permissions inserted';
    ELSE
        RAISE NOTICE 'Permissions already exist';
    END IF;
END $$;
