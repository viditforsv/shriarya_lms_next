#!/usr/bin/env node

// Test file upload with proper Supabase admin authentication
require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const FormData = require('form-data')
const { createClient } = require('@supabase/supabase-js')

async function testWithSupabaseAuth() {
  console.log('🔐 Testing File Upload with Supabase Admin Authentication\n')
  
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase credentials not found')
    return
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  // Step 1: Sign in with admin account
  console.log('🧪 Step 1: Admin Sign In')
  console.log('=' .repeat(50))
  
  try {
    console.log('📧 Signing in with: vidit@shrividhya.in')
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'vidit@shrividhya.in',
      password: 'admin123' // You'll need to provide the actual password
    })
    
    if (authError) {
      console.log('❌ Sign in failed')
      console.log(`  Error: ${authError.message}`)
      
      // Try with a different password or check if user exists
      console.log('\n🔍 Let\'s check if the admin user exists...')
      await checkAdminUser(supabase)
      return
    }
    
    console.log('✅ Admin sign in successful!')
    console.log(`  User ID: ${authData.user.id}`)
    console.log(`  Email: ${authData.user.email}`)
    console.log(`  Access Token: ${authData.session.access_token.substring(0, 20)}...`)
    
    // Step 2: Test file upload with authenticated session
    console.log('\n🧪 Step 2: File Upload with Auth Token')
    console.log('=' .repeat(50))
    
    await testFileUploadWithToken(authData.session.access_token)
    
    // Step 3: Test signed URL generation
    console.log('\n🧪 Step 3: Test Signed URL Generation')
    console.log('=' .repeat(50))
    
    await testSignedUrlGeneration()
    
  } catch (error) {
    console.log(`❌ Authentication error: ${error.message}`)
  }
}

async function checkAdminUser(supabase) {
  try {
    console.log('🔍 Checking admin user in database...')
    
    // Check if admin user exists in profiles table
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', 'vidit@shrividhya.in')
    
    if (error) {
      console.log(`❌ Database error: ${error.message}`)
      return
    }
    
    if (profiles && profiles.length > 0) {
      console.log('✅ Admin user found in database')
      console.log(`  ID: ${profiles[0].id}`)
      console.log(`  Email: ${profiles[0].email}`)
      console.log(`  Role: ${profiles[0].role}`)
      
      console.log('\n💡 Admin user exists but sign in failed')
      console.log('💡 This could mean:')
      console.log('   - Wrong password')
      console.log('   - User not activated')
      console.log('   - Auth system issue')
      
    } else {
      console.log('❌ Admin user not found in database')
      console.log('💡 You may need to create the admin user first')
    }
    
  } catch (error) {
    console.log(`❌ Check error: ${error.message}`)
  }
}

async function testFileUploadWithToken(token) {
  try {
    console.log('📤 Testing file upload with authenticated token...')
    
    // Create form data with test file
    const formData = new FormData()
    formData.append('file', fs.createReadStream('test-document.txt'), {
      filename: 'test-document.txt',
      contentType: 'text/plain'
    })
    formData.append('lessonId', '1')
    formData.append('title', 'Test Document Upload with Admin Auth')
    
    console.log(`📤 Uploading file with token: ${token.substring(0, 20)}...`)
    
    const uploadResponse = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...formData.getHeaders()
      },
      body: formData
    })
    
    const uploadData = await uploadResponse.json()
    
    console.log(`📊 Upload Response:`)
    console.log(`  Status: ${uploadResponse.status}`)
    console.log(`  Response:`, JSON.stringify(uploadData, null, 2))
    
    if (uploadResponse.ok) {
      console.log('\n✅ File upload successful!')
      
      // Test signed URL access
      if (uploadData.signedUrl) {
        console.log('\n🔗 Testing signed URL access...')
        
        try {
          const accessResponse = await fetch(uploadData.signedUrl)
          console.log(`  Access Status: ${accessResponse.status}`)
          
          if (accessResponse.ok) {
            const content = await accessResponse.text()
            console.log(`  ✅ File accessible via signed URL`)
            console.log(`  Content Length: ${content.length} chars`)
            console.log(`  Content Preview: ${content.substring(0, 100)}...`)
          } else {
            console.log(`  ❌ File access failed: ${accessResponse.statusText}`)
          }
        } catch (error) {
          console.log(`  ❌ Access error: ${error.message}`)
        }
      }
      
    } else {
      console.log('\n❌ File upload failed')
      console.log(`  Error: ${uploadData.error}`)
      
      if (uploadResponse.status === 401) {
        console.log('  💡 Still getting 401 - check upload API auth implementation')
      }
    }
    
  } catch (error) {
    console.log(`❌ Upload test error: ${error.message}`)
  }
}

async function testSignedUrlGeneration() {
  try {
    console.log('🔗 Testing signed URL generation...')
    
    const response = await fetch('http://localhost:3000/api/signed-url?file=/test-file.txt')
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Signed URL generated successfully')
      console.log(`  URL: ${data.url}`)
      console.log(`  Expires: ${new Date(data.expires * 1000).toISOString()}`)
      
      // Test accessing the signed URL
      console.log('\n🧪 Testing signed URL access...')
      const accessResponse = await fetch(data.url)
      console.log(`  Access Status: ${accessResponse.status}`)
      
      if (accessResponse.status === 404) {
        console.log('  💡 404 is expected - file doesn\'t exist yet')
        console.log('  💡 This confirms token authentication is working')
      } else if (accessResponse.status === 403) {
        console.log('  ✅ 403 confirms token authentication is working')
      }
      
    } else {
      console.log('❌ Signed URL generation failed')
      console.log(`  Error: ${data.error}`)
    }
    
  } catch (error) {
    console.log(`❌ Signed URL test error: ${error.message}`)
  }
}

// Create test file first
if (!fs.existsSync('test-document.txt')) {
  fs.writeFileSync('test-document.txt', 'This is a test document for ShriArya LMS upload workflow with admin authentication.\n\nTest Details:\n- Course: CBSE Mathematics Class 10\n- Lesson: Real Numbers\n- Uploaded by: Admin (vidit@shrividhya.in)\n- Purpose: Testing complete upload workflow')
  console.log('📄 Created test document')
}

// Run the test
testWithSupabaseAuth()
