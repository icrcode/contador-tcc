window.addEventListener("DOMContentLoaded", () => {

    const start = new Date("2026-02-11T00:00:00");
    const end = new Date("2026-06-22T00:00:00");

    const bar = document.getElementById("tcc-bar");
    const percentEl = document.getElementById("tcc-percent");
    const timeEl = document.getElementById("tcc-time");
    const statusEl = document.getElementById("tcc-status");

    function update() {
        const now = new Date();

        const total = end - start;
        const passed = now - start;

        let percent = (passed / total) * 100;
        percent = Math.max(0, Math.min(100, percent));

        // força atualização visual
        bar.style.width = percent + "%";
        percentEl.textContent = percent.toFixed(1) + "%";

        const diff = end - now;

        if (diff <= 0) {
            timeEl.textContent = "> entrega concluída";
            statusEl.textContent = "> status: finalizado";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        timeEl.textContent = `> tempo restante: ${d}d ${h}h ${m}m ${s}s`;

        // status dinâmico
        let status = "";

        if (percent < 30) status = "início";
        else if (percent < 60) status = "em andamento";
        else if (percent < 85) status = "fase final";
        else status = "prazo crítico";

        statusEl.textContent = `> status: ${status}`;

        // cor dinâmica da barra
        if (percent > 85) {
            bar.style.backgroundColor = "var(--error-color)";
        } else {
            bar.style.backgroundColor = "var(--terminal-green)";
        }
    }

    setInterval(update, 1000);
    update();
});
