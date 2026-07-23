document.addEventListener("DOMContentLoaded", () => {
    const botaoMenu = document.querySelector(".menu-botao");
    const menu = document.querySelector(".menu");
    const linksMenu = document.querySelectorAll(".menu a");

    function fecharMenu() {
        if (!botaoMenu || !menu) {
            return;
        }

        botaoMenu.classList.remove("ativo");
        menu.classList.remove("ativo");
        document.body.classList.remove("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    }

    function abrirMenu() {
        if (!botaoMenu || !menu) {
            return;
        }

        botaoMenu.classList.add("ativo");
        menu.classList.add("ativo");
        document.body.classList.add("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", "true");
        botaoMenu.setAttribute("aria-label", "Fechar menu");
    }

    if (botaoMenu && menu) {
        botaoMenu.addEventListener("click", () => {
            const menuEstaAberto = menu.classList.contains("ativo");

            if (menuEstaAberto) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });

        linksMenu.forEach((link) => {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                fecharMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                fecharMenu();
            }
        });
    }

    const elementosAnimados = document.querySelectorAll(
        ".secao-cabecalho, " +
        ".aplicativo-card, " +
        ".diferencial-card, " +
        ".chamada-conteudo"
    );

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("animar-entrada");
    });

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (!entrada.isIntersecting) {
                        return;
                    }

                    entrada.target.classList.add("visivel");
                    observer.unobserve(entrada.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        elementosAnimados.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visivel");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const destino = link.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elementoDestino = document.querySelector(destino);

            if (!elementoDestino) {
                return;
            }

            event.preventDefault();

            elementoDestino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const cabecalho = document.querySelector(".cabecalho");

    function atualizarCabecalho() {
        if (!cabecalho) {
            return;
        }

        if (window.scrollY > 20) {
            cabecalho.classList.add("rolado");
        } else {
            cabecalho.classList.remove("rolado");
        }
    }

    atualizarCabecalho();

    window.addEventListener("scroll", atualizarCabecalho, {
        passive: true
    });
});
