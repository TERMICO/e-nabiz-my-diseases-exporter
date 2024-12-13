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
2. **Descarga el script** desde la siguiente URL (GitHub Raw):  
