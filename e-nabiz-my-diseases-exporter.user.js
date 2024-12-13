// ==UserScript==
// @name         Exportador de Mis Enfermedades de e-Nabız
// @namespace    http://tampermonkey.net/
// @version      2024-12-13.32
// @author       Jorge abarcamos.com
// @description  Exportar datos de "My Diseases" desde e-Nabız. Cada línea de Pre-Diagnosis en una fila separada y nombre de archivo con fecha/hora.
// @match        https://enabiz.gov.tr/HastaBilgileri/Hastalik
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js
/* global XLSX, YillaGoreHastalikGetir */
// ==/UserScript==

(function () {
    'use strict';

    async function main() {
        console.log("Iniciando exportación...");
        await loadAllResults();
        const data = await extractData();
        console.log("Datos extraídos:", data);
        generateExcel(data);
    }

    /**
     * Clic repetido hasta que #btnHastalikGetir tenga display: none (indicando que no hay más resultados).
     */
    async function loadAllResults() {
        for (let attempt = 1; attempt <= 50; attempt++) {
            const parentDiv = document.querySelector("#btnHastalikGetir");
            if (!parentDiv) {
                console.log(`Intento ${attempt}: no existe el div#btnHastalikGetir. Suponemos fin de resultados.`);
                break;
            }

            const displayValue = window.getComputedStyle(parentDiv).display;
            console.log(`Intento ${attempt}: display="#btnHastalikGetir" => "${displayValue}"`);

            if (displayValue === "none") {
                console.log("El div#btnHastalikGetir está oculto. Fin de la carga.");
                break;
            }

            const showMoreLink = parentDiv.querySelector("a.btn.btn-circle.btn-large.btn-red");
            if (!showMoreLink) {
                console.warn("No se encontró <a> dentro de #btnHastalikGetir. Fin de la carga.");
                break;
            }

            console.log(`Clic en "Show More Results" (intento ${attempt})`);
            showMoreLink.click();

            await delay(2000); // Esperar a que carguen filas nuevas
        }
        console.log("Fin de loadAllResults(). Se asume que están todos los resultados cargados.");
    }

    async function extractData() {
        const rows = document.querySelectorAll("#hastalikList tr");
        const data = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;

            const cells = row.querySelectorAll("td");
            if (cells.length < 4) continue; // Evitar filas vacías o cabeceras

            const detailsButton = row.querySelector("a.btn-outline");
            const rowData = {
                date: cells[0]?.innerText.trim() || "",
                diagnosis: cells[1]?.innerText.trim() || "",
                clinic: cells[2]?.innerText.trim() || "",
                physician: cells[3]?.innerText.trim() || "",
                // getDetails() retornará un string con posibles saltos de línea
                preDiagnosis: detailsButton ? await getDetails(detailsButton) : ""
            };

            if (rowData.date) {
                data.push(rowData);
            }
        }
        return data;
    }

    async function getDetails(button) {
        button.click();
        await delay(1000);

        const modal = document.querySelector(".modal.fade.in");
        if (!modal) return "";

        let detailText = "";
        const detailsTable = modal.querySelector("table tbody");
        if (detailsTable) {
            // Capturar la primera fila de la tabla o ajusta según tu estructura
            const firstRowCells = detailsTable.querySelectorAll("tr:nth-child(1) td");
            if (firstRowCells.length > 0) {
                // Este texto puede contener saltos de línea (\n)
                detailText = firstRowCells[0].innerText.trim();
            }
        }

        // Cerrar modal
        const closeButton = modal.querySelector("button.close");
        if (closeButton) {
            closeButton.click();
            await new Promise(resolve => {
                const checkModalClosed = setInterval(() => {
                    const isModalClosed = !document.querySelector(".modal.fade.in");
                    if (isModalClosed) {
                        clearInterval(checkModalClosed);
                        resolve();
                    }
                }, 100);
            });
        }
        return detailText;
    }

    /**
     * Genera Excel con varias filas si "preDiagnosis" tiene varias líneas.
     * El nombre del archivo incluye la fecha/hora actual.
     */
    function generateExcel(data) {
        // Construimos la cabecera de la hoja
        const worksheetData = [["Date", "Diagnosis", "Clinic", "Physician", "Pre-Diagnosis"]];

        // Creamos múltiples filas si 'preDiagnosis' tiene saltos de línea
        data.forEach(row => {
            // Divide por saltos de línea (Windows o Unix)
            const lines = row.preDiagnosis.split(/\r?\n+/);

            if (lines.length <= 1) {
                // Solo una línea
                worksheetData.push([
                    row.date,
                    row.diagnosis,
                    row.clinic,
                    row.physician,
                    row.preDiagnosis
                ]);
            } else {
                // Múltiples líneas => varias filas
                lines.forEach((line, index) => {
                    if (index === 0) {
                        // La primera línea conserva todos los datos
                        worksheetData.push([
                            row.date,
                            row.diagnosis,
                            row.clinic,
                            row.physician,
                            line
                        ]);
                    } else {
                        // Filas siguientes: dejar columnas vacías (o replicar data si lo deseas)
                        worksheetData.push(["", "", "", "", line]);
                    }
                });
            }
        });

        // Creamos el workbook y la hoja
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "My Diseases");

        // Construimos el nombre de archivo con fecha/hora actual
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const fileName = `my_diseases_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`;

        // Generar y descargar
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function addExportButton() {
        const button = document.createElement("button");
        button.id = "export-button";
        button.textContent = "Exportar Datos";
        Object.assign(button.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer"
        });
        document.body.appendChild(button);

        button.addEventListener("click", main);
    }

    // Añadimos el botón cuando exista la tabla #hastalikList
    const checkAndAddButton = setInterval(() => {
        if (!document.querySelector("#export-button") && document.querySelector("#hastalikList")) {
            addExportButton();
            clearInterval(checkAndAddButton);
        }
    }, 1000);
})();
