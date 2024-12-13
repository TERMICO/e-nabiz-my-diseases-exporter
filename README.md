# e-Nabız My Diseases Exporter

## 📋 **Descripción**
Este script de Tampermonkey permite exportar los datos de la sección **"Mis Enfermedades"** desde la plataforma **e-Nabız** a un archivo Excel. Facilita el análisis o almacenamiento de la información de manera local y genera un archivo con la fecha y hora actuales en su nombre.

## ✨ **Características principales**
- **Extrae la tabla completa de "Mis Enfermedades"** de la página de e-Nabız.
- **Divide las líneas de "Pre-Diagnosis"** en filas separadas dentro del archivo Excel.
- **Carga todos los resultados automáticamente**, haciendo clic en "Mostrar más" hasta que no queden más registros.
- **Genera un archivo Excel automático** con los siguientes campos:
  - **Fecha** (Date)
  - **Diagnóstico** (Diagnosis)
  - **Clínica** (Clinic)
  - **Médico** (Physician)
  - **Pre-Diagnóstico** (Pre-Diagnosis)
- **Nombre del archivo dinámico**, que incluye la fecha y la hora actuales:  
  `my_diseases_YYYYMMDD_HHMMSS.xlsx`  
  *(donde YYYYMMDD es la fecha y HHMMSS la hora de creación).*

## 📥 **Instalación**
1. **Instala Tampermonkey** en tu navegador desde [aquí](https://www.tampermonkey.net/).
2. **Descarga el script** desde la siguiente URL (GitHub Raw):  https://raw.githubusercontent.com/TERMICO/e-nabiz-my-diseases-exporter/main/e-nabiz-my-diseases-exporter.user.js
3. El script se ejecutará automáticamente cada vez que accedas a la sección **"Mis Enfermedades"** de e-Nabız.

## 🚀 **Cómo usarlo**
1. **Accede a la página de "Mis Enfermedades"** en e-Nabız:  
[Ir a Mis Enfermedades](https://enabiz.gov.tr/HastaBilgileri/Hastalik)
2. **Espera a que cargue la lista completa** de enfermedades. El script hará clic automáticamente en "Mostrar más" hasta que no haya más registros.
3. **Haz clic en el botón "Exportar Datos"** que aparecerá en la esquina inferior derecha de la pantalla.
4. **Descarga el archivo Excel generado**, que tendrá un nombre como:  
`my_diseases_20241213_184532.xlsx`  
*(donde 2024-12-13 es la fecha y 18:45:32 es la hora de creación del archivo).*

## 📂 **Estructura del archivo Excel**
El archivo Excel contendrá los siguientes campos organizados en columnas:
- **Fecha (Date)**: La fecha del registro.
- **Diagnóstico (Diagnosis)**: El diagnóstico médico.
- **Clínica (Clinic)**: La clínica donde se realizó el diagnóstico.
- **Médico (Physician)**: El médico responsable.
- **Pre-Diagnóstico (Pre-Diagnosis)**: Esta columna puede tener **múltiples filas para el mismo registro**, ya que cada línea de texto de "Pre-Diagnosis" se divide en una fila separada.

## ⚠️ **Notas importantes**
- **Este script solo funciona en la sección "Mis Enfermedades"** de e-Nabız.
- **Las líneas de Pre-Diagnosis se dividen en filas separadas** en la columna correspondiente del archivo Excel.
- **Las ventanas emergentes deben estar habilitadas** en tu navegador para que el script pueda interactuar correctamente con los modales de detalles.
- **El botón "Exportar Datos" se muestra automáticamente** cuando la tabla de datos está cargada.

## 📃 **Licencia**
Este proyecto está licenciado bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---
**Autor**: TERMICO - [Abarcamos.com](https://www.abarcamos.com)

