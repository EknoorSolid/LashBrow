# Lash & Brow Beauty Booking Website

A modern, responsive beauty service booking website built with React, Tailwind CSS, and Formspree.

## Features

- **Multi-step Form**: 10-step booking process with smooth transitions
- **Service Selection**: Lash Extension, Lash Lift & Brow Lamination, Waxing, and Facial
- **Dynamic Service Details**: Different form fields based on selected service
- **Medical History**: Comprehensive health questionnaire
- **Consent Forms**: Professional liability and consent acknowledgments
- **Digital Signature**: Typed signature with date confirmation
- **Responsive Design**: Mobile-first, fully responsive layout
- **Premium Aesthetic**: Minimal, feminine design with pastel colors
- **Form Validation**: Real-time validation with helpful error messages
- **Smooth Animations**: Fade and slide transitions between steps
- **Formspree Integration**: Direct form submission to email

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS 3
- **Form Handling**: Formspree
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel or Netlify

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Formspree

1. Visit [Formspree.io](https://formspree.io/)
2. Sign up or log in to your account
3. Create a new form
4. Copy your form's endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID from step 2.

### 4. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the environment variable `VITE_FORMSPREE_ENDPOINT` in Vercel settings
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add the environment variable `VITE_FORMSPREE_ENDPOINT` in Netlify settings
6. Deploy!

## Project Structure

```
src/
├── components/
│   ├── steps/
│   │   ├── Step1.jsx          # Basic Information
│   │   ├── Step2.jsx          # Emergency Contact
│   │   ├── Step3.jsx          # Service Selection
│   │   ├── Step4.jsx          # Medical History
│   │   ├── Step5.jsx          # Service Details
│   │   ├── Step6To9.jsx       # Acknowledgments, Consent, Aftercare, Photography
│   │   └── Step10.jsx         # Signature
│   ├── ProgressBar.jsx        # Progress indicator
│   └── Success.jsx            # Success confirmation page
├── utils/
│   └── validation.js          # Form validation logic
├── App.jsx                    # Main application component
├── index.css                  # Tailwind CSS setup
└── main.jsx                   # React entry point
```

## Form Data Flow

The application manages all form data in a single state object in `App.jsx`:

- **Steps 1-2**: Basic information and emergency contact
- **Step 3**: Service selection
- **Step 4**: Medical and skin history
- **Step 5**: Service-specific questions
- **Steps 6-9**: Acknowledgments, consents, aftercare, and photography
- **Step 10**: Digital signature and submission

## Validation

Each step has validation rules:
- Step 1: Required fields (name, phone, email) with format validation
- Step 3: Service selection required
- Step 5: Service-specific required fields
- Step 7: All consent checkboxes required
- Step 10: Signature name and date required

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
- Rose 50-300 (pastel pink) used for primary colors
- Adjust these values to match your brand

### Services
Modify the service list in `Step3.jsx` to add or remove services

### Form Fields
Add new fields by:
1. Adding to the `formData` state in `App.jsx`
2. Creating a new step component or modifying existing ones
3. Adding validation in `utils/validation.js`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this template for your beauty business!

## Support

For issues with:
- **Formspree Integration**: Visit [Formspree Docs](https://formspree.io/docs)
- **React/Tailwind**: Check official documentation
- **Deployment**: Refer to Vercel or Netlify documentation
