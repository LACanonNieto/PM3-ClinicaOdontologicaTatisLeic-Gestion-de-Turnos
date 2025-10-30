# USER STORIES

1. **Autenticacion del Usuario:**
-Como usuario quiero porder registrarme o logearme en la aplicacion. 

-Criterios de aceptacion:
- El usuario debe porder registrarse y crear su cuenta proporcionando la informacion como nombre y apellido, email, direccion, celular, foto y contraseña.
- El usuario deberia validar que la contraseña tenga cacteres, letras mayusculas o minusculas, numeros y que no sea mayor de 8 items.
- El Usuario deberia validar que el email tenga el @, .toUpperCase(), y que sea .com.
- El usuario deberia poder personalizar su foto de perfil o modificarla.
- El usuario debe poder logearse usando el correo y la contraseña.
- El usuario no podra generar un turno si antes estar registrado o logeado.

2. **Reserva de Turnos:**
- Como usuario resgisttrado quiero poder agendar un turno en una fecha y hora especifica.
- usuarios diferentes pueden agendar los servicios en el mismo horario y misma fecha.

-Criterios de aceptacion:
- El usuario solo podra seleccionar de la lista desplegable los servicios que se ofrece.
- El usuario solo podra seleccionar una fecha que este despues del dia de hoy, es decir que si selecciona fechas anteriores o de hoy debe salir una alerta, tambien se deben tener en cuenta los fines de semana y feriados.
- El usuario solo podra seleccionar los horarios entre las 8 am a 4pm, igualmente solo podra seleccionar de la lista desplegable con los horarios que estan activos.
- Al momento de la aceptacion de agendar el turno, debe salir alerta con turno agendado o salga los todos los campos son obligatorios, si falta alguno.
-Al agendar un turno debe enviar una confirmacion del turno al correo electronico.
- El usuario debe ver la pagina de MIS TURNOS, cuando ya haya agendado el servicio.

3. **Visualizador de Turnos:**
- Como usuario autenticado debo poder ver mis historial de turnos.

-Criterios de aceptacion:
- El usuario debe ver su historial de turnos activos y cancelados.

4. **Cancelacion de turnos:**
-Como usuario autenticado, quiero cancelar un turno agendado hasta un dia antes de la fecha asignada.

-Criterios de aceptacion:
- El usuario solo puede cancelar su turno un dia antes de este.
- El usuario no puede cancelar un turno el mismo dia o posterior, alerta.
- Al cancelar el turno debe salir alertas haciendo la confirmacion de que desea cancelar el turno.
- Al cancelar el turno en el historial ya debe aparecer con status cancelado.
- Al cancelar la cita debe enviar una confirmacion por correo electronico. 

5. **SALIR DE MI PERFIL**
-Como usuario autenticado debo poder hacer logout (cerrar Sesion).

-Criterios de aceptacion:
- El usuario debe poder cerrar la sesion y que tenga una alerta de esta seguro cerrar la sesion. 