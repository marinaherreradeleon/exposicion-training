export const particlesOptions = {
    particles: {
        number: {
            value: 100, // Menos partículas para que cada una sea más visible
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#b2aabf", "#5e54a1", "#29179c"] // Diferentes tonos de rojo y naranja
        },
        shape: {
            type: "circle", // Forma de las partículas
        },
        opacity: {
            value: 0.6, // Opacidad no muy alta para el efecto de lava
            random: true, // Opacidad aleatoria para más variedad
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3, // Tamaño de las partículas
            random: true, // Tamaños aleatorios
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: false // Sin líneas entre partículas para un efecto más fluido
        },
        move: {
            enable: true,
            speed: 5, // Velocidad lenta para simular movimiento de lava
            direction: "none", // Dirección aleatoria
            random: true, // Movimiento aleatorio
            out_mode: "out", // Las partículas se desplazan fuera del canvas
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse" // Las partículas se alejan al pasar el cursor
            },
            onclick: {
                enable: true,
                mode: "push" // Añade partículas al hacer clic
            }
        }
    },
    retina_detect: true
};
