import { gsap, Power3 } from "gsap";

export function useOpenMovieDetailsAnimation() {
    const t4 = gsap.timeline({ paused: true });
    const movieDetail = document.querySelector(".gs_to_top");

    return t4.to(movieDetail, {
        transform: "translate(0, 0)",
        duration: 1,
        ease: Power3.easeInOut,
    });
}
