if (matchMedia("(pointer: fine)").matches) {
    const cards = [...document.querySelectorAll(".link-card")];

    function setMouseLight(event) {
        document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
        document.body.style.setProperty("--mouse-y", `${event.clientY}px`);

        let nearestDistance = Infinity;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const nearestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
            const nearestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
            nearestDistance = Math.min(
                nearestDistance,
                Math.hypot(event.clientX - nearestX, event.clientY - nearestY)
            );
        });

        const distanceOpacity = 1 - Math.max(0, Math.min(1, (nearestDistance - 80) / 420));
        document.body.style.setProperty("--mouse-opacity", distanceOpacity.toFixed(2));
    }

    window.addEventListener("pointermove", (event) => {
        setMouseLight(event);
    });

    document.documentElement.addEventListener("mouseleave", () => {
        document.body.style.setProperty("--mouse-opacity", "0");
    });

    document.documentElement.addEventListener("mouseenter", () => {
        document.body.style.setProperty("--mouse-opacity", "1");
    });

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
        });
    });
}