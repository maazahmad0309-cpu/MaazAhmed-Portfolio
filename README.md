# Maaz Ahmed: Portfolio

Personal portfolio of Maaz Ahmed, Junior Frontend Developer. Built with HTML5, CSS3,
Bootstrap 5, vanilla JavaScript, Bootstrap Icons and Google Fonts. No build step or backend.

## Run it
Unzip, then open `index.html` in a browser. An internet connection is needed for
Bootstrap, the icons and the fonts, which load from CDNs.

## Structure
    index.html
    css/style.css
    js/script.js
    assets/Maaz-Ahmed-Resume.pdf    your resume (used by Download Resume)
    assets/images/                  photo placeholder and project illustrations
    assets/icons/favicon.svg        "MA" favicon (replace if you like)

## Features
Responsive navigation, smooth scrolling, active nav links, scroll reveal, animated
skill cards, project card interactions, dark/light theme, back-to-top button,
automatic copyright year.

## Customise
- **Photo:** add a square image such as `assets/images/profile.jpg` (about 800x800,
  under 200 KB). In `index.html`, change `profile-placeholder.svg` to your file name
  and update the `alt` text to "Maaz Ahmed".
- **Resume:** replace `assets/Maaz-Ahmed-Resume.pdf`, keeping the same name.
- **Project images:** the SVGs are illustrations, not screenshots. Replace them with
  real 16:9 screenshots and update the `alt` text.
- **Live demo:** none is listed. Once a project is deployed, add a link with class
  `btn-ghost` next to its GitHub button using the real URL.
- **Colours:** edit the variables at the top of `css/style.css`.

## Contact form
The form does not send messages itself. It opens a pre-filled draft in the visitor's
email app, and the visitor presses Send. This depends on an email app being set up, so
the email address is also shown as a direct link.

## Download button
Browsers normally honour the `download` attribute on a hosted site. When `index.html`
is opened directly from disk, some browsers open the PDF instead.

## Deploy
- **Netlify:** drag the project folder onto Netlify Drop.
- **Vercel:** import the GitHub repository; no build command is needed.
- **GitHub Pages:** push the files, then enable Pages for the branch in repository settings.

## Before sharing
- [ ] Open every GitHub and LinkedIn link and confirm it is your page.
- [ ] Add your photo.
- [ ] Check that the dates and "16 months" are still correct.
- [ ] Check icons, fonts and layout in your browser and on your phone.
- [ ] Remember the phone number is public on the site and in the resume PDF.
