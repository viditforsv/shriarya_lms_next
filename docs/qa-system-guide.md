# Quality Assurance (QA) System Guide

## 🎯 **How to Mark Questions as Edited and QC Approved**

The QA system provides a comprehensive workflow for tracking question edits and quality control approvals. Here's how to use it:

### **📋 QA Workflow States**

1. **Pending Review** - Initial state for all questions
2. **In Review** - Currently being reviewed by QA team
3. **Needs Revision** - Requires changes before approval
4. **Approved** - Passed QC and ready for use
5. **Rejected** - Failed QC and needs major changes
6. **Archived** - Retired or deprecated questions

### **🔄 How to Use the QA System**

#### **1. Access QA Management**

- Navigate to any question detail page: `/question-bank/[id]`
- Scroll down to see the "Quality Assurance" section
- This section appears on every question page

#### **2. Mark Question as Edited**

When a question is edited:

1. **Change Status to "Needs Revision"**:

   - Use the status dropdown to select "Needs Revision"
   - Add revision notes explaining what was changed
   - Click "Update" to save

2. **Add Comments**:

   - Use the comments section to document specific changes
   - Select comment type (Content, Solution, Formatting, etc.)
   - Add detailed feedback about the edits

3. **Update Quality Ratings**:
   - Rate the question on 4 criteria (1-5 scale):
     - Content Accuracy
     - Difficulty Appropriateness
     - Clarity
     - Solution Quality

#### **3. Mark as QC Approved**

When QC approves a question:

1. **Change Status to "Approved"**:

   - Use the status dropdown to select "Approved"
   - Add review notes confirming approval
   - Click "Update" to save

2. **Use Quick Actions**:

   - Click the green "Approve" button for instant approval
   - Or use the status dropdown for more control

3. **Add Final Comments**:
   - Document any final notes or feedback
   - Mark any resolved issues as resolved

### **🚩 Flagging System**

**When to Flag Questions**:

- Content errors or inconsistencies
- Solution problems
- Formatting issues
- Difficulty level concerns

**How to Flag**:

1. Toggle the "Flag this question" switch
2. Add a detailed flag reason
3. The question will show a red "Flagged" badge

### **⭐ Quality Ratings**

Rate questions on a 1-5 scale:

- **5/5**: Excellent - No issues
- **4/5**: Good - Minor improvements needed
- **3/5**: Average - Some issues to address
- **2/5**: Poor - Significant problems
- **1/5**: Very Poor - Major revision needed

### **📊 Tracking & History**

The system automatically tracks:

- **Revision Count**: How many times the question was revised
- **Last Revision Date**: When it was last modified
- **QA History**: Complete audit trail of all status changes
- **Comments Timeline**: All feedback and discussions

### **🎯 Best Practices**

#### **For Editors**:

1. Always change status to "Needs Revision" after editing
2. Add detailed revision notes
3. Update quality ratings if needed
4. Flag any issues you notice

#### **For QC Reviewers**:

1. Review all flagged questions first
2. Check revision notes and comments
3. Rate questions objectively
4. Use "Approved" status only when satisfied
5. Provide constructive feedback in comments

#### **For Administrators**:

1. Monitor QA dashboard for pending reviews
2. Check revision counts for problematic questions
3. Review QA history for audit purposes
4. Use priority levels to manage workload

### **🔍 QA Status Indicators**

Questions show visual indicators:

- **Status Badge**: Current QA status with color coding
- **Priority Badge**: Review priority (Low/Medium/High/Urgent)
- **Flag Badge**: Red warning for flagged questions
- **Rating Badge**: Star rating for approved questions

### **📈 QA Metrics**

Track quality improvements:

- **Approval Rate**: Percentage of questions approved
- **Revision Count**: Average revisions per question
- **Rating Trends**: Quality scores over time
- **Flag Resolution**: Time to resolve flagged issues

### **🛠️ API Integration**

The QA system integrates with:

- **Question Bank API**: Automatic QA record creation
- **User Management**: Reviewer tracking
- **Audit Logs**: Complete change history
- **Reporting**: Quality metrics and analytics

---

## **🎉 Ready to Use!**

The QA system is now fully integrated into your question bank. Every question automatically gets a QA record, and you can track the complete lifecycle from creation to approval.

**Next Steps**:

1. Visit `/question-bank` to see QA status badges
2. Click on any question to access QA management
3. Start using the workflow for your question reviews
4. Monitor quality improvements over time

The system will help you maintain high-quality questions with proper review workflows, collaborative feedback, and comprehensive quality tracking! 🎓✨
