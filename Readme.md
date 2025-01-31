![image](https://github.com/user-attachments/assets/e2e92c46-83c1-4cd9-ade9-507abe415c13)el proyecto utiliza node 18
si hay errores con npm i:
-nvm install 18
-nvm use 18

Se debe aplicar un env. con las credenciales de la bd
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Informatica.2024
DB_DATABASE=horarios2

se utiliza MySQL pero si da error se tiene que especificar en db.js
import mysql from 'mysql2';

el proyecto para que funcione requiere la key de firebase la cual se encuentra en el rar key, y se coloca en carpeta backend

key psswd: rodrigo2

**Errores de redireccionamiento pueden surgir por autentificación de nuevos usuarios alumno con correo que termina en gmail
**Último commit se ha cambiado la redirección de registro por lo cual si se auentica un usuarios alumno con correo que termina en gmail no quedará asociado a un fk_carrera o fk_carrera_nivel
**En AddSolicitud.jsx, la solicitud se agrega con el uid academico de ro.villablanca@duocuc.cl, si hay problemas para manejar una solicitud como academico, deberá manejarse ese parámetro cambiando la auto inserccion del post con el uid del usuario academico actual en el cuerpo de la solicitud

