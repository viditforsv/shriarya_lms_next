# CLI Scripts

This directory contains command-line tools for managing Shrividhya Classes LMS.

## 📋 Available Scripts

### `create-course.ts`

Creates courses via Supabase API with full 5-tier hierarchy support.

**Usage:**
```bash
# Using npm script
npm run create-course <course-data.json>

# Direct execution
npx tsx scripts/create-course.ts <course-data.json>

# With instructor ID
npx tsx scripts/create-course.ts <course-data.json> <instructor-id>
```

**Example:**
```bash
npm run create-course scripts/example-course.json
```

**Prerequisites:**
- Environment variables set in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL_DEV` or `NEXT_PUBLIC_SUPABASE_URL_PROD`
  - `SUPABASE_SERVICE_ROLE_KEY_DEV` or `SUPABASE_SERVICE_ROLE_KEY_PROD`
  - `NEXT_PUBLIC_ENVIRONMENT=dev` or `prod`

**Course JSON Format:**
See `example-course.json` for a complete example.

**Features:**
- ✅ Creates course with all metadata
- ✅ Creates full 5-tier hierarchy (Units → Chapters → Topics → Lessons)
- ✅ Supports draft/published status
- ✅ Automatic slug generation
- ✅ Environment-aware (uses dev/prod based on config)

---

### `verify-env.ts`

Verifies environment configuration and shows which database will be used.

**Usage:**
```bash
npm run verify-env
# or
npx tsx scripts/verify-env.ts
```

**Output:**
- Current environment (dev/prod)
- Supabase URL being used
- Which environment variables are set
- Validation status

---

### `sync-google-sheets.ts`

Syncs local CSV file with Google Sheets using service account authentication.

**Usage:**
```bash
# Using npm script
npm run sync-google-sheets

# Direct execution
npx tsx scripts/sync-google-sheets.ts
```

**Prerequisites:**
1. **Service Account Authentication (choose one method):**
   - **Method 1:** Set `GOOGLE_SERVICE_ACCOUNT_JSON` environment variable with the full JSON key content
   - **Method 2:** Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable with path to JSON key file
   - **Method 3:** Set `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable with path to JSON key file
   - **Method 4:** Place JSON key file as `google-service-account-key.json` in project root

2. **Share Google Sheet with Service Account:**
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email: `question-bank-manager@svi-question-bank-manager.iam.gserviceaccount.com`
   - Give it "Editor" permissions

3. **Environment Variables (optional):**
   - `GOOGLE_SERVICE_ACCOUNT_JSON` - Full JSON key content as string (recommended for CI/CD)
   - `GOOGLE_APPLICATION_CREDENTIALS` - Path to service account JSON key file (standard Google env var)
   - `GOOGLE_SERVICE_ACCOUNT_KEY` - Path to service account JSON key file (custom env var)
   - `GOOGLE_SHEETS_URL` - Full Google Sheets URL (default: uses the URL from your request)

**What it does:**
- Reads `Docs for me/master_map sheets/gre_quant.csv`
- Extracts spreadsheet ID and sheet ID from the Google Sheets URL
- Authenticates using the service account
- Clears existing data in the sheet
- Updates the sheet with CSV data (headers + rows)

**Features:**
- ✅ Automatic spreadsheet ID extraction from URL
- ✅ Supports specific sheet tabs (via gid parameter)
- ✅ Clears old data before syncing
- ✅ Preserves CSV structure (slug, pdf_url, solution_url)

**Example Output:**
```
🔄 Starting Google Sheets sync...

📄 Reading CSV from: /path/to/gre_quant.csv
   Found 83 rows

🔐 Authenticating with Google Sheets...
   Service Account Key: google-service-account-key.json
   ✅ Authenticated successfully

📋 Using sheet: Sheet1

📊 Syncing 83 rows to Google Sheets...
   Spreadsheet ID: 1Xezvw0_BXHTzZxw6lh4_4A1ybktAiZTwBFkgwx6bk8k
   Sheet Name: Sheet1
✅ Successfully synced CSV to Google Sheets!
   Updated 83 data rows (plus header row)

✨ Sync completed successfully!
```

**Troubleshooting:**

- **"No service account credentials found"**
  - Set one of the environment variables: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_APPLICATION_CREDENTIALS`, or `GOOGLE_SERVICE_ACCOUNT_KEY`
  - Or place the key file at `google-service-account-key.json` in the project root

- **"The caller does not have permission"**
  - Share the Google Sheet with the service account email: `question-bank-manager@svi-question-bank-manager.iam.gserviceaccount.com`
  - Give it "Editor" permissions

- **"Invalid Google Sheets URL"**
  - Ensure the URL format is: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/...`
  - Or set `GOOGLE_SHEETS_URL` environment variable

---

## 📝 Course JSON Structure

```json
{
  "title": "Course Title",
  "slug": "course-slug",
  "description": "Course description",
  "curriculum": "CBSE",
  "subject": "Mathematics",
  "grade": "9",
  "level": "intermediate",
  "price": 0,
  "validity_days": 365,
  "status": "draft",
  "template_data": {
    "units": [
      {
        "unit_name": "Unit Name",
        "unit_order": 1,
        "description": "Unit description",
        "chapters": [
          {
            "chapter_name": "Chapter Name",
            "chapter_order": 1,
            "description": "Chapter description",
            "topics": [
              {
                "topic_name": "Topic Name",
                "topic_order": 1,
                "lessons": [
                  {
                    "title": "Lesson Title",
                    "slug": "lesson-slug",
                    "lesson_order": 1,
                    "description": "Lesson description",
                    "type": "document"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "tags": ["tag1", "tag2"],
    "learningOutcomes": ["Outcome 1", "Outcome 2"],
    "prerequisites": ["Prerequisite 1"]
  }
}
```

---

## 🔧 Installation

If `tsx` is not installed globally, it will be used via `npx`:

```bash
# Install tsx globally (optional)
npm install -g tsx
```

---

## 📚 Related Documentation

- [Course Structure Setup Guide](../DOCS_FOR_AI_AGENT/COURSE_STRUCTURE_SETUP_GUIDE.md)
- [Environment Setup Guide](../DOCS_FOR_AI_AGENT/ENVIRONMENT_BASED_DATABASE_SETUP.md)

---

## 🐛 Troubleshooting

### "Missing Supabase credentials" error

**Solution:** Ensure `.env.local` has the correct environment variables:
- `NEXT_PUBLIC_ENVIRONMENT=dev` or `prod`
- `NEXT_PUBLIC_SUPABASE_URL_DEV` or `NEXT_PUBLIC_SUPABASE_URL_PROD`
- `SUPABASE_SERVICE_ROLE_KEY_DEV` or `SUPABASE_SERVICE_ROLE_KEY_PROD`

### "Failed to create course" error

**Solution:**
1. Check that the slug is unique
2. Verify all required fields are present
3. Check Supabase connection
4. Verify you have the correct permissions

### "tsx: command not found"

**Solution:**
- Use `npx tsx` instead of just `tsx`
- Or install tsx: `npm install -g tsx`

---

## ✅ Quick Start

1. **Create a course JSON file:**
   ```bash
   cp scripts/example-course.json scripts/my-course.json
   # Edit my-course.json with your course data
   ```

2. **Run the script:**
   ```bash
   npm run create-course scripts/my-course.json
   ```

3. **Verify the course:**
   - Check Supabase dashboard
   - Visit `/courses/<slug>` in your app
   - Or use the admin panel at `/admin/course-creator`

---

**Happy course creating!** 🚀

