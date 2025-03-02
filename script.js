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
          alert('Mensagem enviada! 🚀');
          form.reset();
        } else {
          alert('Erro: ' + result.message);
        }
      } catch (error) {
        alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      }
    });
  });
        