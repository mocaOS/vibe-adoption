document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('artworkGallery');
    const modal = document.getElementById('artworkModal');
    const modalTitle = document.getElementById('modalArtworkTitle');
    const modalId = document.getElementById('modalArtworkId');
    const modalImage = document.getElementById('modalArtworkImage');
    const modalPriceHeader = document.getElementById('modalArtworkPriceHeader');
    const modalDescription = document.getElementById('modalArtworkDescription');
    const modalConfession = document.getElementById('modalArtworkConfession');
    const codexLink = document.getElementById('codexLink');
    const closeBtn = document.querySelector('.close');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    const buyBtn = document.getElementById('buyBtn');

    // Fetch artworks data from the API
    fetch('/api/artworks')
        .then(response => response.json())
        .then(artworks => {
            // Render artworks in the gallery
            artworks.forEach(artwork => {
                const artworkCard = document.createElement('div');
                artworkCard.className = 'artwork-card';
                artworkCard.innerHTML = `
                    <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image">
                    <div class="artwork-info">
                        <h3>${artwork.title}</h3>
                        <p>Art DeCC0 #${artwork.id}</p>
                        <p class="artwork-price">${artwork.price} ETH</p>
                    </div>
                `;

                // Add click event to open modal
                artworkCard.addEventListener('click', (e) => {
                    // Prevent click when user is scrolling
                    if (Math.abs(gallery.scrollLeft - (gallery.scrollLeftAtClickStart || 0)) > 5) {
                        return;
                    }
                    openModal(artwork);
                });

                // Store scroll position on mousedown to detect scrolling vs clicking
                artworkCard.addEventListener('mousedown', () => {
                    gallery.scrollLeftAtClickStart = gallery.scrollLeft;
                });

                gallery.appendChild(artworkCard);
            });
        })
        .catch(error => {
            console.error('Error loading artworks:', error);
            gallery.innerHTML = '<p class="error">Failed to load artworks. Please try again later.</p>';
        });

    // Function to open modal with artwork details
    function openModal(artwork) {
        modalTitle.textContent = artwork.title;
        modalId.textContent = `Art DeCC0 #${artwork.id}`;
        modalImage.src = artwork.image;
        modalImage.alt = artwork.title;
        modalPriceHeader.textContent = `${artwork.price} ETH`;
        modalDescription.textContent = artwork.description || 'No description available.';

        // Display confession if available
        if (artwork.confession) {
            modalConfession.textContent = artwork.confession;
        } else {
            modalConfession.textContent = 'No confession available.';
        }

        // Set Codex link with the correct ID
        codexLink.href = `https://codex.decc0s.com/${artwork.id}`;

        // Set dynamic buy button URL
        const buyUrl = `https://www.raster.art/token/ethereum/0x97f69e1f54a4b10d934ff67e65b7ecfbab6ec652/${artwork.id}`;
        buyBtn.href = buyUrl;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Production-ready mouse wheel scrolling with momentum
    let scrollTimeout;
    let isScrolling = false;
    let scrollVelocity = 0;
    let lastScrollTime = 0;
    let lastScrollPos = 0;
    let momentumId;

    // Enhanced scrolling functionality
    gallery.addEventListener('wheel', (event) => {
        // Only handle vertical wheel events for horizontal scrolling
        if (event.deltaY !== 0) {
            event.preventDefault();

            // Calculate scroll amount with easing
            const easeFactor = 0.8; // Adjust for sensitivity (lower = slower)
            const scrollAmount = event.deltaY * easeFactor;

            // Apply the scroll immediately
            gallery.scrollLeft += scrollAmount;

            // Calculate velocity for momentum
            const now = Date.now();
            const deltaTime = now - lastScrollTime;
            if (deltaTime > 0) {
                scrollVelocity = scrollAmount / deltaTime;
            }

            lastScrollTime = now;
            lastScrollPos = gallery.scrollLeft;

            // Clear any existing momentum
            if (momentumId) {
                cancelAnimationFrame(momentumId);
            }

            // Clear any existing timeout
            clearTimeout(scrollTimeout);

            // Set flag to indicate scrolling
            isScrolling = true;

            // Reset scrolling flag after a delay
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                // Start momentum scrolling
                startMomentumScrolling();
            }, 100); // Reduced delay for more responsive feel
        }
    });

    // Momentum-based scrolling
    function startMomentumScrolling() {
        // Only apply momentum if we have significant velocity
        if (Math.abs(scrollVelocity) > 0.01) {
            // Apply damping
            scrollVelocity *= 0.95; // Friction coefficient

            // Apply momentum scroll
            gallery.scrollLeft += scrollVelocity * 10;

            // Continue momentum if still significant
            if (Math.abs(scrollVelocity) > 0.01) {
                momentumId = requestAnimationFrame(startMomentumScrolling);
            }
        }
    }

    // Arrow key navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'block') return; // Don't scroll gallery when modal is open
        if (isScrolling) return; // Don't process keys during wheel scroll

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            gallery.style.scrollBehavior = 'smooth';
            gallery.scrollLeft -= 400; // Scroll by card width + gap
            resetScrollBehavior();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            gallery.style.scrollBehavior = 'smooth';
            gallery.scrollLeft += 400; // Scroll by card width + gap
            resetScrollBehavior();
        }
    });

    // Navigation arrow buttons
    leftArrow.addEventListener('click', () => {
        if (isScrolling) return; // Don't process during wheel scroll
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft -= 400; // Scroll by card width + gap
        resetScrollBehavior();
    });

    rightArrow.addEventListener('click', () => {
        if (isScrolling) return; // Don't process during wheel scroll
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft += 400; // Scroll by card width + gap
        resetScrollBehavior();
    });

    // Reset scroll behavior after a delay
    function resetScrollBehavior() {
        setTimeout(() => {
            gallery.style.scrollBehavior = 'auto';
        }, 300);
    }
});
