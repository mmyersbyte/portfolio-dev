const starContainer = document.createElement('div');
        starContainer.classList.add('starfall-background');
        document.body.appendChild(starContainer);

        function createStar() {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`; 
            star.style.animationDuration = `${Math.random() * 2 + 1}s`; 
            starContainer.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 3000);
        }

        setInterval(createStar, 200);



// front form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            const response = await fetch('https://portfolio-dev-1uzm.onrender.com/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                Swal.fire({
                    title: 'Thanksss!',
                    text: 'Thank you, your message has been sent!',
                    icon: 'success',
                    confirmButtonColor: '#0d6efd',
                    background: '#1a1a2e', 
                    color: '#ffffff', 
                    customClass: {
                        confirmButton: 'swal-confirm-button' 
                    }
                });
                form.reset();
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonColor: '#0d6efd', 
                    background: '#1a1a2e', 
                    color: '#ffffff', 
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erro de conexão!',
                text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
                icon: 'error',
                confirmButtonColor: '#0d6efd', 
                background: '#1a1a2e',
                color: '#ffffff', 
            });
        }
    });
});