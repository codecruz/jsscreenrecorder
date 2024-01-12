document.addEventListener("DOMContentLoaded", function () {
    const initButton = document.getElementById('init');
    let mediaRecorder;

    initButton.addEventListener('click', async () => {
        if (initButton.value === "▶️ Iniciar") {
            // Iniciar la grabación
            const media = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: { ideal: 30 } }
            });
            mediaRecorder = new MediaRecorder(media, {
                mimeType: 'video/webm;codecs=vp8,opus'
            });
            mediaRecorder.start();

            const [video] = media.getVideoTracks();
            video.addEventListener("ended", () => {
                mediaRecorder.stop();
                initButton.value = "▶️ Iniciar";
            });

            mediaRecorder.addEventListener("dataavailable", (e) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(e.data);
                link.download = "captura.webm";
                link.click();
            });

            // Cambiar el valor del botón a "⏸ Detener"
            initButton.value = "⏸ Detener";
        } else {
            // Detener la grabación
            mediaRecorder.stop();

            // Cambiar el valor del botón a "▶️ Iniciar"
            initButton.value = "▶️ Iniciar";
        }
    });
});