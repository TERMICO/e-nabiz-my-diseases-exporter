# e-Nabız My Diseases Exporter

## Descripción
Este script de Tampermonkey permite exportar los datos de la sección "Mis Enfermedades" desde la plataforma e-Nabız a un archivo Excel (`my_diseases.xlsx`), facilitando el análisis o almacenamiento de información personal de manera local.

## Características
- Extrae información de la tabla de "Mis Enfermedades".
- Incluye detalles adicionales mostrados en ventanas modales.
- Genera un archivo Excel con los campos:
  - Fecha
  - Diagnóstico
  - Clínica
  - Médico
  - Detalles del diagnóstico

## Instalación
1. Instala [Tampermonkey](https://www.tampermonkey.net/) en tu navegador.
2. Descarga el script desde la siguiente URL (GitHub Raw): https://raw.githubusercontent.com/TERMICO/e-nabiz-my-diseases-exporter/main/e-nabiz-my-diseases-exporter.user.js
3. El script se ejecutará automáticamente cuando accedas a la sección "Mis Enfermedades" de e-Nabız.

## Uso
1. Ve a la página de "Mis Enfermedades" en e-Nabız:  
`https://enabiz.gov.tr/HastaBilgileri/Hastalik`
2. Haz clic en el botón "Exportar Datos" que aparecerá en la parte inferior derecha de la pantalla.
3. Descarga el archivo Excel generado (`my_diseases.xlsx`).

## Notas
- Este script solo funciona en la sección "Mis Enfermedades" de e-Nabız.
- Asegúrate de que las ventanas emergentes (modales) estén habilitadas en tu navegador para que el script funcione correctamente.

## Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
