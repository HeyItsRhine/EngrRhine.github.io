document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const subtitleElement = document.getElementById('subtitle');

    // Check if subtitle element exists
    if (!subtitleElement) {
        console.error("Subtitle element not found!");
        return; // Exit function if element not found
    }

    // Typing animation variables
    const alternateTexts = ["Computer Engineer", "Safety Officer 2", "Cyber-Security Analyst", "System Network Administrator", "Information Technology Support"];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let isDeleting = false;

    // Function to type the subtitle
    function typeSubtitle() {
        currentText = alternateTexts[textIndex];
        if (isDeleting) {
            subtitleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitleElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            setTimeout(typeSubtitle, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % alternateTexts.length;
            setTimeout(typeSubtitle, 200);
        } else {
            setTimeout(typeSubtitle, 100);
        }
    }

    setTimeout(typeSubtitle, 2000); // Initial delay before starting typing animation

    // Event listeners for navigation links
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get target section id without '#'
            navigateToSection(targetId);

            // Add rotate class to the clicked link
            link.classList.add('rotate');

            // Remove rotate class after animation ends
            setTimeout(() => {
                link.classList.remove('rotate');
            }, 500); // The duration should match the animation duration in CSS
        });
    });

    // Function to navigate to a section
    function navigateToSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Function to preview certificate
    function previewCertificate(pdfUrl) {
        const viewer = document.getElementById('certificate-viewer');
        const iframe = viewer.querySelector('iframe');
        iframe.src = pdfUrl;
        viewer.style.display = 'block';
    }

    // Function to close certificate viewer
    function closeViewer() {
        const viewer = document.getElementById('certificate-viewer');
        const iframe = viewer.querySelector('iframe');
        iframe.src = '';
        viewer.style.display = 'none';
    }

    // Attach previewCertificate function to window object
    window.previewCertificate = previewCertificate;
    window.closeViewer = closeViewer;

    // Data for proficiency levels
    const proficiencyData = [
        { label: 'Python', percent: 50 },
        { label: 'C++', percent: 45 },
        { label: 'Arduino-Uno', percent: 55 },
        { label: 'PHP', percent: 60 },
        { label: 'HTML, CSS, JS-Script', percent: 45 }
    ];

    // Function to create bar chart
    function createBarChart(elementId, label, percent) {
        const canvas = document.getElementById(elementId);
        if (!canvas) {
            console.error(`Canvas element with id "${elementId}" not found.`);
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Failed to get 2D context for canvas with id "${elementId}".`);
            return;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [label],
                datasets: [{
                    label: label,
                    data: [percent],
                    backgroundColor: '#DC143C', // Adjust color as needed
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Create bar charts for each proficiency graph
    proficiencyData.forEach(data => {
        createBarChart(data.label.toLowerCase().replace(/[\s,]+/g, '-'), data.label, data.percent);
    });

    // Function to generate PDF
    function generatePDF() {
        const { jsPDF } = window.jspdf;

        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const message = document.getElementById('message') ? document.getElementById('message').value : '';

        const doc = new jsPDF();
        doc.text(`Name: ${name}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Message: ${message}`, 10, 30);

        doc.save('Contact_Info.pdf');
    }

    function downloadCV(myCV) {
        generatePDF(); // Call the PDF generation function
    }

    // Add event listener for form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Call the downloadCV function when the form is submitted
            downloadCV('Rhine Resume.pdf');
        });
    }
});
