document.addEventListener('DOMContentLoaded', () => {
    // 1. Operating Rhythm Interactivity
    const nodes = document.querySelectorAll('.rhythm-node');
    const desc = document.getElementById('rhythm-description');

    if (nodes.length > 0 && desc) {
        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                desc.innerHTML = `<strong>${node.textContent}:</strong> ${node.dataset.content}`;
            });
        });
    }

    // 2. Dynamic KPI Counter (Triggered on Scroll)
    const animateKpis = () => {
        const values = document.querySelectorAll('.kpi .value');
        values.forEach(val => {
            const text = val.innerText;
            const match = text.match(/\d+/);
            if (match) {
                const target = parseInt(match[0]);
                let count = 0;
                const duration = 1500; 
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        val.innerText = text.replace(/\d+/, Math.round(count));
                        requestAnimationFrame(updateCount);
                    } else {
                        val.innerText = text;
                    }
                };
                updateCount();
            }
        });
    };

    // Intersection Observer to trigger KPI animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateKpis();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const caseStudySection = document.querySelector('#case-studies');
    if (caseStudySection) observer.observe(caseStudySection);
});
