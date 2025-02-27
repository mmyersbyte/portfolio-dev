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




        