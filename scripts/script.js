// Charger les données depuis le fichier JSON
fetch('scripts/data.json')
    .then(response => response.json())
    .then(data => {
        // Sélectionner l'élément parent des analogies
        const analogiesParent = document.querySelector(".analogies");

        // Boucle sur les résultats JSON
        data.forEach(result => {
            // Créer un conteneur pour chaque analogie
            const analogyContainer = document.createElement('div');
            analogyContainer.classList.add('analogies__container');
            analogyContainer.innerHTML = `
                <div class="analogies__content">
                    <h2 class="analogies__title analogies__title--mobile">
                        ${result.analogy}, I would be the ${result.analogy} ${result.value}
                    </h2>
                    <h2 class="analogies__title analogies__title--desk">
                         ${result.analogy}, I would <br> be the ${result.analogy} ${result.value}
                    </h2>
                    <p class="analogies__text">${result.explanation}</p>
                </div>
                <div class="analogies__image-container"> 
                    <img src="${result.img}" alt="Image representing the ${result.analogy}" class="analogies__img">
                    <div class="analogies__overlay"></div>
                </div>
            `;

            // Ajouter la nouvelle analogie au parent
            analogiesParent.appendChild(analogyContainer);

            // Animation GSAP pour chaque conteneur, uniquement au scroll
            gsap.fromTo(
                analogyContainer.querySelector(".analogies__overlay"),
                { x: "0%" }, // L'overlay est visible au début
                {
                    x: "-100%", // L'overlay disparaît vers la gauche
                    duration: 1.5, // Durée de l'animation
                    scrollTrigger: {
                        trigger: analogyContainer, // Déclenchement de l'animation pour chaque conteneur
                        start: "top 80%", // Lorsque le haut de l'élément atteint 80% du viewport
                        end: "top 30%", // Fin de l'animation lorsque l'élément atteint 30% du viewport
                        toggleActions: "play none none none", // L'animation joue seulement une fois
                        markers: false // Décommenter pour voir les marqueurs
                    }
                }
            );
        });

        // Gestion de la soumission du formulaire
        let envoyer = document.querySelector('.form-section__submit');
        envoyer.addEventListener('click', function () {
            // Construction de l'URL de l'API avec les champs du formulaire
            let urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=maria.ouedraogo&courriel=" + document.querySelector('input#email').value + "&message=Si j'étais " + document.querySelector('input#analogy').value + " je serais " + document.querySelector('input#response').value + " car " + document.querySelector('input#detail').value + " lien de l'image : " + document.querySelector('input#image-url').value;

            // Requête Fetch pour envoyer les données
            fetch(urlVisitee)
                .then(response => response.json())
                .then(data => {
                    console.log("Réponse reçue : ", data);

                    // Création d'une nouvelle analogie basée sur les champs du formulaire
                    const newAnalogyContainer = document.createElement('div');
                    newAnalogyContainer.classList.add('analogies__container');
                    newAnalogyContainer.innerHTML = `
                        <div class="analogies__content">
                            <h2 class="analogies__title analogies__title--mobile">
                                ${document.querySelector('input#analogy').value}, I would be the ${document.querySelector('input#analogy').value} ${document.querySelector('input#response').value}
                            </h2>
                            <h2 class="analogies__title analogies__title--desk">
                                ${document.querySelector('input#analogy').value}, I would <br> be the ${document.querySelector('input#analogy').value} ${document.querySelector('input#response').value}
                            </h2>
                            <p class="analogies__text">
                                ${document.querySelector('input#detail').value}
                            </p>
                        </div>
                        <div class="analogies__image-container"> 
                            <img src="${document.querySelector('input#image-url').value}" alt="Image representing ${document.querySelector('input#response').value}" class="analogies__img">
                            <div class="analogies__overlay"></div>
                        </div>
                    `;

                    // Ajouter la nouvelle analogie à la liste
                    analogiesParent.appendChild(newAnalogyContainer);

                    // Ajouter l'animation pour la nouvelle analogie
                    gsap.fromTo(
                        newAnalogyContainer.querySelector(".analogies__overlay"),
                        { x: "0%" },
                        {
                            x: "-100%", duration: 1.5, scrollTrigger: {
                                trigger: newAnalogyContainer,
                                start: "top 80%",
                                end: "top 30%",
                                toggleActions: "play none none none"
                            }
                        }
                    );

                    // Log de la nouvelle analogie ajoutée
                    let divUnique = document.querySelector('div.analogies div:last-child');
                    console.log(divUnique);
                });
        });
    });
