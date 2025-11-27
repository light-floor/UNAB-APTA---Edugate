console.log("APTA MVP cargado");

document.querySelectorAll(".accordion-title").forEach(title => {
    title.addEventListener("click", () => {
        const content = title.nextElementSibling;
        const arrow = title.querySelector(".arrow");
        if (content && content.classList.contains("accordion-content")) {
            content.classList.toggle("show");
            arrow.classList.toggle("rotate");
        }
    });
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.getElementById("sidebarClose");

if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.add("sidebar-open");
    });
}

if (sidebarClose && sidebar) {
    sidebarClose.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-open");
    });
}

document.addEventListener("click", (e) => {
    if (
        sidebar.classList.contains("sidebar-open") &&
        !sidebar.contains(e.target) &&
        e.target !== mobileMenuBtn
    ) {
        sidebar.classList.remove("sidebar-open");
    }
});
const outlookFab = document.getElementById("outlookFab");
const outlookPopup = document.getElementById("outlookPopup");
const outlookClose = document.getElementById("outlookClose");
const mailItems = document.querySelectorAll(".mail-item");
const resumeIA = document.getElementById("resumeIA");

if (outlookFab && outlookPopup && outlookClose) {
    outlookFab.addEventListener("click", () => {
        outlookPopup.style.display =
            outlookPopup.style.display === "flex" ? "none" : "flex";
    });

    outlookClose.addEventListener("click", () => {
        outlookPopup.style.display = "none";
    });
}

mailItems.forEach(item => {
    item.addEventListener("click", () => {
        const link = item.getAttribute("data-link") || "https://outlook.office.com/mail/";
        window.open(link, "_blank");
    });
});

if (resumeIA) {
    resumeIA.addEventListener("click", () => {
        alert("Aquí iría el resumen con IA de tus correos no leídos en Edugate.");
    });
}
const calendarTitleEl = document.getElementById("calendarTitle");
const calendarSubTitleEl = document.getElementById("calendarSubTitle");
const calendarGridHeaderEl = document.getElementById("calendarGridHeader");
const calendarGridEl = document.getElementById("calendarGrid");
const sidebarListEl = document.getElementById("sidebarList");
const viewButtons = document.querySelectorAll(".cal-view-btn");
const todayBtn = document.getElementById("todayBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const chips = document.querySelectorAll(".chip");

const weekdaysShort = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const weekdaysLong = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const months = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

const calendarState = {
    view: "week",
    baseDate: new Date(),
    filters: new Set(["clase","tarea","evaluacion","otro"])
};

const events = [
    { date: "2025-11-28", title: "Laboratorio Programación: listas y bucles", course: "Programación I", type: "clase", status: "pendiente" },
    { date: "2025-11-29", title: "Tarea 2 Programación: funciones y arrays", course: "Programación I", type: "tarea", status: "pendiente" },
    { date: "2025-11-30", title: "Entrega de tareas: Proyecto 1 Cálculo", course: "Cálculo I", type: "tarea", status: "pendiente" },
    { date: "2025-12-01", title: "Control 1 Cálculo: límites y derivadas", course: "Cálculo I", type: "evaluacion", status: "pendiente" },
    { date: "2025-12-02", title: "Entrega de tarea: Funciones y arrays", course: "Programación I", type: "tarea", status: "pendiente" },
    { date: "2025-12-03", title: "Laboratorio Física: Dinámica y cinemática", course: "Física General", type: "clase", status: "pendiente" },
    { date: "2025-12-04", title: "Solemne: Estructuras de Datos", course: "Estructuras de Datos", type: "evaluacion", status: "pendiente" },
    { date: "2025-12-05", title: "Tarea 3 Programación: Algoritmos en C", course: "Programación I", type: "tarea", status: "pendiente" }
];

function formatDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function startOfWeek(date) {
    const d = new Date(date);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return d;
}

function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

function dateInRange(date, start, end) {
    return date >= start && date <= end;
}

function renderCalendar() {
    if (!calendarGridEl || !calendarGridHeaderEl) return;

    calendarGridHeaderEl.innerHTML = "";
    calendarGridEl.innerHTML = "";

    let startDate, endDate, cols;

    if (calendarState.view === "month") {
        const base = new Date(calendarState.baseDate.getFullYear(), calendarState.baseDate.getMonth(), 1);
        const start = startOfWeek(base);
        startDate = start;
        endDate = addDays(start, 41);
        cols = 7;
        calendarTitleEl.textContent = `${months[calendarState.baseDate.getMonth()]} ${calendarState.baseDate.getFullYear()}`;
        calendarSubTitleEl.textContent = "Vista mensual · Clases, tareas y evaluaciones en un solo lugar";

    } else if (calendarState.view === "week") {
        const start = startOfWeek(calendarState.baseDate);
        startDate = start;
        endDate = addDays(start, 6);
        cols = 7;
        calendarTitleEl.textContent = `Semana del ${start.getDate()} al ${endDate.getDate()} de ${months[endDate.getMonth()]}`;
        calendarSubTitleEl.textContent = "Vista semanal · Organización fina de tu carga académica";

    } else {
        const base = new Date(calendarState.baseDate);
        startDate = base;
        endDate = addDays(base, 2);
        cols = 3;
        calendarTitleEl.textContent = "Próximos 3 días";
        calendarSubTitleEl.textContent = "Vista corta · Foco en lo urgente";
    }

    const headerDays = cols;
    for (let i = 0; i < headerDays; i++) {
        const span = document.createElement("span");
        span.textContent = weekdaysShort[i];
        calendarGridHeaderEl.appendChild(span);
    }

    calendarGridHeaderEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    calendarGridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const todayKey = formatDateKey(new Date());

    let current = new Date(startDate);
    while (current <= endDate) {
        const cell = document.createElement("div");
        cell.className = "cal-cell";

        if (calendarState.view === "month") {
            if (current.getMonth() !== calendarState.baseDate.getMonth()) {
                cell.classList.add("cal-cell-outmonth");
            }
        }

        if (formatDateKey(current) === todayKey) {
            cell.classList.add("cal-cell-today");
        }

        const dayNumber = document.createElement("div");
        dayNumber.className = "cal-day-number";

        const numSpan = document.createElement("span");
        numSpan.textContent = current.getDate();

        const dotSpan = document.createElement("span");
        dotSpan.className = "cal-day-dot";

        dayNumber.appendChild(numSpan);
        dayNumber.appendChild(dotSpan);
        cell.appendChild(dayNumber);

        const key = formatDateKey(current);
        const dayEvents = events.filter(ev =>
            ev.date === key && calendarState.filters.has(ev.type)
        );

        const hasPending = dayEvents.some(ev => ev.status !== "entregado");
        if (hasPending) {
            cell.classList.add("cal-cell-has-pending");
        }

        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement("div");
            eventsContainer.className = "cal-events";

            dayEvents.slice(0, 2).forEach(ev => {
                const pill = document.createElement("div");
                pill.className = `cal-event-pill cal-event-${ev.type}`;
                pill.textContent = ev.title;
                eventsContainer.appendChild(pill);
            });

            if (dayEvents.length > 2) {
                const more = document.createElement("div");
                more.className = "cal-more";
                more.textContent = `+${dayEvents.length - 2} más`;
                eventsContainer.appendChild(more);
            }

            cell.appendChild(eventsContainer);
        }

        calendarGridEl.appendChild(cell);
        current = addDays(current, 1);
    }

    renderSidebar(startDate, endDate);
}

function renderSidebar(startDate, endDate) {
    if (!sidebarListEl) return;
    sidebarListEl.innerHTML = "";

    const filteredEvents = events
        .filter(ev => calendarState.filters.has(ev.type))
        .map(ev => ({ ...ev, _dateObj: new Date(ev.date) }))
        .filter(ev => dateInRange(ev._dateObj, startDate, endDate))
        .sort((a, b) => a._dateObj - b._dateObj);

    if (filteredEvents.length === 0) {
        const empty = document.createElement("div");
        empty.className = "sidebar-item";
        empty.textContent = "No hay eventos para este rango.";
        sidebarListEl.appendChild(empty);
        return;
    }

    filteredEvents.forEach(ev => {
        const item = document.createElement("div");
        item.className = "sidebar-item";

        const header = document.createElement("div");
        header.className = "sidebar-item-header";

        const title = document.createElement("div");
        title.className = "sidebar-item-title";
        title.textContent = ev.title;

        const tag = document.createElement("span");
        tag.className = `sidebar-item-tag tag-${ev.type}`;
        tag.textContent =
            ev.type === "clase" ? "Clase" :
            ev.type === "tarea" ? "Tarea" :
            ev.type === "evaluacion" ? "Evaluación" : "Otro";

        header.appendChild(title);
        header.appendChild(tag);
        item.appendChild(header);

        const dateLabel = document.createElement("div");
        dateLabel.className = "sidebar-item-meta";
        const d = ev._dateObj;
        dateLabel.textContent = `${weekdaysLong[(d.getDay() + 6)%7]} ${d.getDate()} ${months[d.getMonth()]}`;

        item.appendChild(dateLabel);

        const statusRow = document.createElement("div");
        statusRow.className = "sidebar-item-meta";

        const statusPill = document.createElement("span");
        statusPill.className = `status-pill status-${ev.status}`;
        statusPill.textContent =
            ev.status === "pendiente" ? "Pendiente" :
            ev.status === "entregado" ? "Entregado" :
            "Atrasado";

        statusRow.appendChild(statusPill);
        item.appendChild(statusRow);

        sidebarListEl.appendChild(item);
    });
}

viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        viewButtons.forEach(b => b.classList.remove("cal-view-btn-active"));
        btn.classList.add("cal-view-btn-active");
        calendarState.view = btn.getAttribute("data-view") || "week";
        renderCalendar();
    });
});

if (todayBtn) {
    todayBtn.addEventListener("click", () => {
        calendarState.baseDate = new Date();
        renderCalendar();
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
        if (calendarState.view === "month") {
            calendarState.baseDate = new Date(
                calendarState.baseDate.getFullYear(),
                calendarState.baseDate.getMonth() - 1,
                1
            );
        } else if (calendarState.view === "week") {
            calendarState.baseDate = addDays(calendarState.baseDate, -7);
        } else {
            calendarState.baseDate = addDays(calendarState.baseDate, -3);
        }
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        if (calendarState.view === "month") {
            calendarState.baseDate = new Date(
                calendarState.baseDate.getFullYear(),
                calendarState.baseDate.getMonth() + 1,
                1
            );
        } else if (calendarState.view === "week") {
            calendarState.baseDate = addDays(calendarState.baseDate, 7);
        } else {
            calendarState.baseDate = addDays(calendarState.baseDate, 3);
        }
        renderCalendar();
    });
}

chips.forEach(chip => {
    chip.addEventListener("click", () => {
        const type = chip.getAttribute("data-type");
        if (!type) return;
        if (calendarState.filters.has(type)) {
            calendarState.filters.delete(type);
            chip.classList.remove("chip-active");
        } else {
            calendarState.filters.add(type);
            chip.classList.add("chip-active");
        }
        renderCalendar();
    });
});
renderCalendar();
