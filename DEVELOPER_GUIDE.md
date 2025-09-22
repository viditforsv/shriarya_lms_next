# Developer Onboarding Guide

## 🚀 Quick Start for New Engineers

### Prerequisites

- Node.js 18+ installed
- Git configured with SSH keys
- Supabase CLI installed (`npm install -g supabase`)
- Access to project repository
- Supabase project credentials

### Setup Process (5 minutes)

1. **Clone Repository**

   ```bash
   git clone [repo-url]
   cd shriarya_lms_next
   ```

2. **Install Dependencies**

   ```bash
   npm run setup
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Verify Setup**
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Login and verify role-based access
   ```

### Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Develop and test locally
   - Follow TypeScript strict mode
   - Use ESLint standards

3. **Code Review**

   - Self-review and testing
   - Ensure all tests pass
   - Update documentation if needed

4. **Push Changes**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Merge Process**
   - Manual review before merging to `dev`
   - Merge `dev` → `main` when ready for production

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow configured rules
- **Components**: Document with comments
- **Error Handling**: Always handle errors gracefully
- **Security**: Consider security implications

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Check TypeScript types
- `npm run audit` - Check for security vulnerabilities
- `npm run clean` - Clean build artifacts
- `npm run setup` - Full setup for new developers

### Security Guidelines

- **Never commit** `.env.local` to repository
- **Use service role key** for API operations
- **Test all changes** locally before pushing
- **Review code** before merging to `dev`
- **Update documentation** for new features

### Getting Help

- Check `/docs` folder for detailed documentation
- Review existing code for patterns
- Ask team members for guidance
- Follow established conventions

## 🎯 Ready to Code!

You're now set up to contribute safely to the ShriArya LMS project.
