fetch('scripts/data.json')
    .then(response => response.json())
    .then(data => {
        // Ici, on sélectionne le parent
        const analogiesParent = document.querySelector(".analogies");

        data.forEach(result => {
            const analogyContainer = document.createElement('div');
            analogyContainer.classList.add('analogies__container');
            analogyContainer.innerHTML = `
                <div class="analogies__content">
                    <h2 class="analogies__title analogies__title--mobile">
                        a ${result.analogy}, i would be the ${result.analogy} ${result.value}
                    </h2>
                    <h2 class="analogies__title analogies__title--desk">
                        a ${result.analogy}, i would <br> be the ${result.analogy} ${result.value}
                    </h2>
                    <p class="analogies__text">${result.explanation}</p>
                </div>
                <div class="analogies__image-container"> 
                    <img src="${result.img}" alt="Image representing the color pink" class="analogies__img">
                    <div class="analogies__overlay"></div>
                </div>
            `;

            analogiesParent.appendChild(analogyContainer);

            gsap.fromTo(analogyContainer.querySelector(".analogies__overlay"),
                { x: "0%" },
                {
                    x: "-100%", duration: 5, paused: true, scrollTrigger: {
                        trigger: analogyContainer,
                        start: "top 80%",
                    }
                    
                }

            );

            
        });
    });



    
