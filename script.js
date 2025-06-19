// Feriados de ejemplo (formato: 'YYYY-MM-DD')
const feriados = [
    '2025-01-01', // Año Nuevo
    '2025-02-24', // Carnaval
    '2025-02-25', // Carnaval
    '2025-03-24', // Día Nacional de la Memoria por la Verdad y la Justicia
    '2025-03-28', // Viernes Santo
    '2025-04-02', // Día del Veterano y de los Caídos en la Guerra de Malvinas
    '2025-05-01', // Día del Trabajador
    '2025-05-25', // Día de la Revolución de Mayo
    '2025-06-20', // Día Paso a la Inmortalidad del General Manuel Belgrano
    '2025-07-09', // Día de la Independencia
    '2025-08-17', // Paso a la Inmortalidad del General José de San Martín
    '2025-10-12', // Día del Respeto a la Diversidad Cultural
    '2025-11-24', // Día de la Soberanía Nacional
    '2025-12-08', // Inmaculada Concepción de María
    '2025-12-25'  // Navidad
];

// Elementos del DOM
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const calendarDays = document.getElementById('calendar-days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const leapYearStatus = document.getElementById('leap-year-status');

// Fecha actual
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nombres de los meses
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Días de la semana
const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Función para verificar si un año es bisiesto
function esBisiesto(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Función para obtener los días en un mes
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Función para obtener el primer día del mes (0-6, donde 0 es domingo)
function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
}

// Función para formatear la fecha como YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para renderizar el calendario
function renderCalendar() {
    // Actualizar el mes y año en la interfaz
    monthElement.textContent = monthNames[currentMonth];
    yearElement.textContent = currentYear;
    
    // Verificar si el año es bisiesto
    const esAnioBisiesto = esBisiesto(currentYear);
    leapYearStatus.textContent = esAnioBisiesto ? 'Sí' : 'No';
    
    // Limpiar días anteriores
    calendarDays.innerHTML = '';
    
    // Obtener el primer día del mes y la cantidad de días
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    // Ajustar el primer día de la semana (0=Domingo, 1=Lunes, etc.)
    let firstDayOfWeek = firstDay === 0 ? 6 : firstDay - 1; // Ajuste para que la semana empiece en Lunes
    
    // Agregar días del mes anterior
    for (let i = firstDayOfWeek; i > 0; i--) {
        const day = daysInPrevMonth - i + 1;
        const date = new Date(currentYear, currentMonth - 1, day);
        const dayElement = createDayElement(day, true, date);
        calendarDays.appendChild(dayElement);
    }
    
    // Agregar días del mes actual
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;
    
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = isCurrentMonth && i === today.getDate();
        const dayElement = createDayElement(i, false, date, isToday);
        calendarDays.appendChild(dayElement);
    }
    
    // Calcular cuántos días del próximo mes mostrar
    const totalDaysShown = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    const daysFromNextMonth = totalDaysShown - (firstDayOfWeek + daysInMonth);
    
    // Agregar días del próximo mes
    for (let i = 1; i <= daysFromNextMonth; i++) {
        const date = new Date(currentYear, currentMonth + 1, i);
        const dayElement = createDayElement(i, true, date);
        calendarDays.appendChild(dayElement);
    }
}

// Función para crear un elemento de día
function createDayElement(day, isOtherMonth, date, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    
    // Establecer atributo de fecha para referencia
    const formattedDate = formatDate(date);
    dayElement.setAttribute('data-date', formattedDate);
    
    // Marcar si es un día de otro mes
    if (isOtherMonth) {
        dayElement.classList.add('day--other-month');
    }
    
    // Marcar si es hoy
    if (isToday) {
        dayElement.classList.add('day--today');
    }
    
    // Marcar si es feriado
    if (feriados.includes(formattedDate)) {
        dayElement.classList.add('day--holiday');
    }
    
    // Agregar tooltip con la fecha completa
    dayElement.title = `${day} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
    
    return dayElement;
}

// Event listeners para los botones de navegación
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Inicializar el calendario
document.addEventListener('DOMContentLoaded', () => {
    // Establecer el mes y año actuales
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    
    // Renderizar el calendario
    renderCalendar();
    
    // Desplazarse al día actual
    const todayElement = document.querySelector('.day--today');
    if (todayElement) {
        todayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Event listener para el teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevMonthBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextMonthBtn.click();
    }
});
