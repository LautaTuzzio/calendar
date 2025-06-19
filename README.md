# Calendario Interactivo

Un calendario web interactivo desarrollado con HTML, CSS y JavaScript que muestra los días del mes, resalta fechas especiales y permite navegar entre meses.

## Características

- Visualización del mes actual con días de la semana
- Navegación entre meses
- Resaltado del día actual
- Indicación de días feriados
- Detección de año bisiesto
- Diseño responsivo
- Navegación por teclado

## Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Variables CSS)
- JavaScript Vanilla

## Estructura del Proyecto

```
calendar/
├── index.html          # Estructura principal del calendario
├── styles.css          # Estilos y diseño responsivo
├── script.js           # Lógica del calendario
└── README.md           # Documentación del proyecto
```

## Cómo Usar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LautaTuzzio/calendar.git
   cd calendar
   ```

2. Abre el archivo `index.html` en tu navegador web preferido.

3. Utiliza los botones de navegación para cambiar entre meses o las teclas de flecha izquierda/derecha.

## Funcionalidades Principales

### Navegación
- Botones de mes anterior/siguiente
- Navegación por teclado (flechas izquierda/derecha)

### Fechas Especiales
- Día actual resaltado
- Feriados marcados
- Año bisiesto indicado

### Diseño
- Interfaz limpia y moderna
- Totalmente responsiva
- Compatible con dispositivos móviles

## Personalización

Puedes personalizar los feriados editando el array `feriados` en el archivo `script.js`:

```javascript
const feriados = [
    '2025-01-01', // Año Nuevo
    '2025-02-24', // Carnaval
    // Agrega más fechas según sea necesario
];
```

## Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No se requiere instalación de dependencias adicionales

## Autor

- [LautaTuzzio](https://github.com/LautaTuzzio)

---

*Proyecto desarrollado como parte del curso de Implementación de Sitios web Dinámicos - EEST N.º 1 "Eduardo Ader" Vicente López*
