# 🚀 TechCorp Careers - Professional Job Application Website

A stunning, modern single-page React.js website for job applications with comprehensive form validation and beautiful UI/UX design.

![Website Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green)

## ✨ Features

### 🎯 Modern Website Design
- **Professional Header**: Fixed navigation with smooth scrolling
- **Hero Section**: Eye-catching gradient background with animated elements
- **Job Details Section**: Beautiful card-based layout with icons and animations
- **Application Form**: Modern form design with glassmorphism effects
- **Footer**: Complete company information and social links

### 💼 Job Details Display
- **Position Overview**: Interactive cards showing role, salary, experience, and location
- **Job Description**: Comprehensive job information with modern typography
- **Requirements**: Checkmark-styled list with smooth animations
- **Responsibilities**: Bullet-point format with hover effects
- **Benefits & Perks**: Star-icon styled benefits list

### 📝 Advanced Application Form
The form includes all required fields with robust validation:

#### Required Fields:
- **Candidate Name** ✅: Full name validation
- **Address** ✅: Complete address (textarea)
- **Skills** ✅: Multi-input skills with animated tag display
- **GitHub Link** ✅: Valid GitHub URL validation
- **Age** ✅: Numeric validation (18-60 years)
- **Resume Upload** ✅: PDF/DOC files only, max 5MB
- **Education** ✅: College name and passing year with year validation
- **Email** ✅: Proper email format validation

#### Optional Fields:
- **Phone Number** 📱: 10-digit numeric validation if provided

### 🔒 Comprehensive Validation
- **Real-time validation**: Errors clear as user types
- **Visual feedback**: Color-coded error states and success indicators
- **File validation**: Type and size restrictions for resume uploads
- **URL validation**: GitHub link format verification
- **Age range validation**: 18-60 years with numeric input
- **Year validation**: Realistic passing year (1950-current year)
- **Email validation**: RFC-compliant email format checking

### 🎨 UI/UX Excellence
- **Fully Responsive**: Perfect on desktop, tablet, and mobile
- **Modern Animations**: Fade-in effects, hover transitions, and micro-interactions
- **Glassmorphism Design**: Backdrop blur effects and transparent elements
- **Gradient Backgrounds**: Beautiful color gradients throughout
- **Interactive Elements**: Hover effects, button animations, and smooth transitions
- **Accessibility**: Proper focus states, ARIA labels, and keyboard navigation
- **Success Feedback**: Animated success message with checkmark animation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd C:\Users\Singh\CascadeProjects\job-application-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
job-application-page/
├── public/
│   └── index.html                 # Main HTML template
├── src/
│   ├── components/
│   │   ├── Header.js             # Navigation header
│   │   ├── Header.css            # Header styles
│   │   ├── Hero.js               # Hero section
│   │   ├── Hero.css              # Hero styles
│   │   ├── JobDetails.js         # Job information
│   │   ├── JobDetails.css        # Job details styles
│   │   ├── ApplicationForm.js    # Application form
│   │   ├── ApplicationForm.css   # Form styles
│   │   ├── Footer.js             # Website footer
│   │   └── Footer.css            # Footer styles
│   ├── App.js                    # Main app component
│   ├── App.css                   # App-level styles
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🎯 Website Sections

### 1. Header Navigation
- Fixed position with backdrop blur
- Smooth scroll navigation
- Mobile-responsive hamburger menu
- Active section highlighting

### 2. Hero Section
- Gradient background with animated patterns
- Job position highlight with badges
- Call-to-action buttons
- Floating animated elements
- Interactive job card preview

### 3. Job Details Section
- Position overview with icon cards
- Detailed job information
- Requirements with checkmarks
- Responsibilities with bullets
- Benefits with star icons

### 4. Application Form Section
- Glassmorphism design
- Real-time validation
- File upload with drag-and-drop styling
- Skills tagging system
- Success animation

### 5. Footer
- Company information
- Social media links
- Contact details
- Legal links

## 🔧 Form Validation Rules

### Required Fields:
| Field | Validation Rule |
|-------|----------------|
| **Name** | Cannot be empty |
| **Address** | Cannot be empty |
| **Skills** | At least one skill required |
| **GitHub** | Must be valid GitHub URL |
| **Age** | Must be 18-60 years |
| **Resume** | PDF/DOC only, max 5MB |
| **College** | Cannot be empty |
| **Year** | Must be 1950-current year |
| **Email** | Must be valid email format |

### Optional Fields:
| Field | Validation Rule |
|-------|----------------|
| **Phone** | If provided, must be 10 digits |

## 🛠️ Technologies Used

- **React.js 18.2.0**: Modern React with hooks
- **CSS3**: Advanced styling with flexbox, grid, and animations
- **HTML5**: Semantic markup for accessibility
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach
- **CSS Animations**: Smooth transitions and micro-interactions

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

- **Color Scheme**: Professional blue-purple gradients
- **Typography**: Modern sans-serif fonts with proper hierarchy
- **Spacing**: Consistent spacing system
- **Icons**: Emoji-based icons for universal compatibility
- **Animations**: CSS keyframe animations for smooth interactions
- **Responsive**: Mobile-first responsive design

## 🚀 Performance Features

- **Optimized CSS**: Efficient selectors and minimal reflows
- **Smooth Scrolling**: Hardware-accelerated smooth scrolling
- **Lazy Loading**: Efficient component rendering
- **Minimal Bundle**: Optimized React build

## 🔮 Future Enhancements

- **Backend Integration**: REST API for form submission
- **Database Storage**: PostgreSQL/MongoDB integration
- **Email Notifications**: Automated email responses
- **Application Tracking**: Status dashboard for applicants
- **Admin Panel**: HR management interface
- **Multiple Jobs**: Support for multiple job listings
- **Search & Filter**: Job search functionality
- **User Accounts**: Candidate profile management
- **Analytics**: Application tracking and metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by the development team

---

**Ready to launch your career website? This template provides everything you need for a professional job application portal!** 🚀
