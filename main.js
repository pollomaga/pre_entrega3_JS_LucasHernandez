// DECLARACION DE ARRAYS Y VARIABLES 
let especialidades = ['Medicina General', 'Cardiología', 'Oftalmología'];
let medicos = {
    'Medicina General': ['Dr. Dibu Martinez', 'Dr. Franco Armani'],
    'Cardiología': ['Dr. Cuti Romero', 'Dr. Nico Otamendi'],
    'Oftalmología': ['Dr. Rodri De Paul', 'Dr. Fideo Di Maria']
};
let horarios = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

// CARGA DE HORARARIOS Y ESPECIALIDADES AL INICIAR EL SISTEMA
document.addEventListener("DOMContentLoaded", () => {
    cargarEspecialidades();
    cargarHorarios();
});


// FUNCION PARA CARGAR LAS ESPECIALIDADES
function cargarEspecialidades() {
    let selectEspecialidad = document.getElementById("especialidad");
    let selectFiltro = document.getElementById("filtrarEspecialidad");

    especialidades.forEach(especialidad => {
        let option = document.createElement("option");
        option.value = especialidad;
        option.textContent = especialidad;
        selectEspecialidad.appendChild(option);

        // FILTRO PARA TRABAJAR CON LA ESPECIALIDAD
        let optionFiltro = option.cloneNode(true);
        selectFiltro.appendChild(optionFiltro);
    });
}

// FUNCION PARA CARGAR LOS HORARIOS
function cargarHorarios() {
    let selectHorario = document.getElementById("horario");
    horarios.forEach(horario => {
        let option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;
        selectHorario.appendChild(option);
    });
}


// SEGUN CAMBIO EN ESPECIALIDAD ACTUALIZO MEDICO
document.getElementById("especialidad").addEventListener("change", function () {
    let especialidadSeleccionada = this.value;
    cargarMedicos(especialidadSeleccionada);
});

// FUNCION PARA CARGAR MEDICO SEGUN ESPECIALIDAD
function cargarMedicos(especialidad) {
    let selectMedico = document.getElementById("medico");
    selectMedico.innerHTML = ''; // Limpiar opciones anteriores

    medicos[especialidad].forEach(medico => {
        let option = document.createElement("option");
        option.value = medico;
        option.textContent = medico;
        selectMedico.appendChild(option);
    });
}

// FUNCION PARA HACER LA RESERVA
document.getElementById("formReserva").addEventListener("submit", function (e) {
    e.preventDefault();

    let nombrePaciente = document.getElementById("nombrePaciente").value;
    let especialidad = document.getElementById("especialidad").value;
    let medico = document.getElementById("medico").value;
    let horario = document.getElementById("horario").value;

    if (nombrePaciente && especialidad && medico && horario) {
        let reserva = { paciente: nombrePaciente, especialidad: especialidad, medico: medico, horario: horario };
        reservas.push(reserva);
        guardarReservas();
        alert("¡Reserva realizada correctamente!");
    } else {
        alert("Por favor, complete todos los campos.");
    }
});



// GUARDO RESERVA EN LOCAL STORAGE
function guardarReservas() {
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

// RECUPERO RESERVA DEL LOCAL STORAGE
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// FUNCION PARA BUSCAR UNA RESERVA
document.getElementById("buscarReservaBtn").addEventListener("click", function () {
    let nombrePaciente = document.getElementById("buscarNombrePaciente").value;
    let resultadoBusqueda = document.getElementById("resultadoBusqueda");

    let reservaEncontrada = reservas.find(reserva => reserva.paciente === nombrePaciente);

    if (reservaEncontrada) {
        resultadoBusqueda.textContent = `Reserva encontrada: ${reservaEncontrada.especialidad}, ${reservaEncontrada.medico}, ${reservaEncontrada.horario}`;
    } else {
        resultadoBusqueda.textContent = "No se encontraron reservas para " + nombrePaciente;
    }
});

// FUNCION PARA CANCELAR UNA RESERVA
document.getElementById("cancelarReservaBtn").addEventListener("click", function () {
    let nombrePaciente = document.getElementById("cancelarNombrePaciente").value;

    let indiceReserva = reservas.findIndex(reserva => reserva.paciente === nombrePaciente);

    if (indiceReserva !== -1) {
        if (confirm("¿Está seguro que desea cancelar la reserva de " + reservas[indiceReserva].paciente + "?")) {
            reservas.splice(indiceReserva, 1);
            guardarReservas();
            alert("La reserva ha sido cancelada.");
        }
    } else {
        alert("No se encontró ninguna reserva a nombre de " + nombrePaciente);
    }
});



// FILTRO RESERVA POR ESPECIALIDAD
document.getElementById("filtrarReservaBtn").addEventListener("click", function () {
    let especialidad = document.getElementById("filtrarEspecialidad").value;
    let resultadoFiltro = document.getElementById("resultadoFiltro");

    let reservasFiltradas = reservas.filter(reserva => reserva.especialidad === especialidad);

    if (reservasFiltradas.length > 0) {
        resultadoFiltro.innerHTML = `Reservas en ${especialidad}:<br>` + 
            reservasFiltradas.map(r => `${r.paciente}, ${r.medico}, ${r.horario}`).join("<br>");
    } else {
        resultadoFiltro.textContent = "No se encontraron reservas para la especialidad seleccionada.";
    }
});
