// Centralized icon registry for commonly used icons
// This reduces bundle size by importing only needed icons

export {
  // Navigation & Actions
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  
  // UI Elements
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Minus,
  Download,
  Upload,
  Send,
  Filter,
  Settings,
  MoreHorizontal,
  Search,
  
  // Status & Feedback
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Check,
  
  // Content & Media
  BookOpen,
  FileText,
  Video,
  Play,
  Pause,
  Image,
  
  // Users & Social
  Users,
  User,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  
  // Business & Data
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Award,
  Target,
  Scale,
  
  // Security & Access
  Lock,
  Unlock,
  Shield,
  Key,
  
  // Layout & Design
  Layout,
  Palette,
  Grid,
  List,
  
  // System & Technical
  Database,
  Zap,
  RefreshCw,
  HelpCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Flag,
  
  // Education Specific
  GraduationCap,
  Bookmark,
  Calendar,
  MapPin,
  Globe,
  Bell,
  Gift,
  Percent,
  Truck,
  Smartphone,
  Infinity,
  Home
} from 'lucide-react'

// Re-export commonly used icon combinations
export const IconSets = {
  navigation: ['ArrowLeft', 'ArrowRight', 'ChevronDown', 'ChevronUp'],
  actions: ['Edit', 'Trash2', 'Plus', 'Minus', 'Download', 'Upload'],
  status: ['CheckCircle', 'XCircle', 'AlertCircle', 'Clock', 'Star'],
  content: ['BookOpen', 'FileText', 'Video', 'Play', 'Image'],
  users: ['Users', 'User', 'Mail', 'Phone', 'MessageCircle'],
  business: ['BarChart3', 'TrendingUp', 'DollarSign', 'Award'],
  security: ['Lock', 'Unlock', 'Shield', 'Key'],
  system: ['Database', 'Zap', 'RefreshCw', 'HelpCircle', 'Settings']
} as const
