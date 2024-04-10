document.addEventListener("DOMContentLoaded", function () {
    const initButton = document.getElementById('init');
    let mediaRecorder;

    initButton.addEventListener('click', async () => {
        if (initButton.value === "▶️ Start") {
            // Iniciar la grabación
            const media = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: { ideal: 3840, max: 3840 }, // Ancho ideal y máximo de 3840px (4K)
                    height: { ideal: 2160, max: 2160 }, // Altura ideal y máxima de 2160px (4K)
                    frameRate: { ideal: 60 } // Velocidad de cuadros ideal de 60fps
                },
                audio: true // Incluir captura de audio

            });
            mediaRecorder = new MediaRecorder(media, {
                mimeType: 'video/webm;codecs=vp8,opus' // Utiliza el codec VP9 para obtener la mejor calidad
            });
            mediaRecorder.start();

            const [video] = media.getVideoTracks();
            video.addEventListener("ended", () => {
                mediaRecorder.stop();
                initButton.value = "▶️ Start";
            });

            mediaRecorder.addEventListener("dataavailable", (e) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(e.data);
                link.download = "captura.mp4";
                link.click();
            });

            // Cambiar el valor del botón a "⏸ Detener"
            initButton.value = "⏸ Stop";
        } else {
            // Detener la grabación
            mediaRecorder.stop();

            // Cambiar el valor del botón a "▶️ Iniciar"
            initButton.value = "▶️ Start";
        }
    });
});
