# BINGOSofkaUCan2
## Los repo se encuentran en ramas individuales de este repositorio...ir a las ramas para ver el codigo

## Juego de Bingo Virtual
Se desarrolla una aplicación para jugar Bingo multiusuario en linea, para el desarrollo de esta aplicacion se implemento un Backend con Node.js, que se encargara de gestionar todo lo relacionado con los datos de los jugadores, como registrarse e iniciar sesion.  Se implemento un Backend con SpringBoot que se encargara de gestionar 
todos los datos sobre le juego y desarrollar la lógica del juego, se puede interactuar entre los dos backend si se requiere.  Se implemento un Frontend con React para
la interface grafica que interactuara con el cliente o jugador.  A continuación se describe los requerimientos para el desarrollo de esa aplicación:

- Se requiere que el jugador pueda registrarse al juego.
- Se requiere que el jugador pueda iniciar sesion al juego.
- Se requiere que le jugador despues de iniciar sesion sea rederigido a una sala de espera
- Se requiere que halla un temporizador que indique cuando empiece el próximo juego.
- Se requiere que en la sala de espera se vea un listado de los jugadores que iniciarón sesion.
- Se requiere que al terminar el temporizador el jugador sea rederigido a la sala de juego.
- Se requiere que cuando el jugador inicie sesion y halla un juego en curso, se de un aviso al jugador de que espere o vuelva despues para empezar un nuevo juego.
- Se requiere que cuando le jugador este en la sala de juego se vea un listado de los jugadores que participaran de esa partida y su estado.
- Se requiere que se genere un carton de bingo aleatoriamente en diferentes rangos de numeros por cada letra:
  columna letra B(1-15), letra I(16-30), letra N(31-45), letra G(46-60), legra O(61-75), el espacio del centro no debe llevar número, no se debe repetir ningun número.
- Se requiere que se genere una balota aleatoriamente y que el jugador pueda marcar su carton a medida que coincida con la balota, en el carton se debe resaltar de alguna manera.
- Se requiere que solamente se pueda resaltar si la balota ya salio, de lo contrario no se debe resaltar la casilla en el carton.
- Se requiere que se vea las balotas que ya han salido.
- Se requiere que las formas de ganar sea todas las columnas verticales, todas las columnas horizontales, las diagonales.
- Se requiere que solo se pueda ganar si el jugador no oprime el boton de bingo, si el jugador no lleno bien el carton y le dio click al boton de bingo sera descalificado y todos los demas jugadores deberan ver en el listado el cambio de estado.
- Se requiere que al ganar un jugador todos los demas vean un mensaje que les indique que acabo el juego y quien fue el ganador.
- Se requiere que cuando el jugador sea descalificado sea sacado del juego y no pueda volver a entrar al mismo juego, tendra que esperar el proximo juego.
- Se requier que el jugador pueda volver a ingresar al juego que empezo si aun no ha terminado.

## Demostración de Funcionamiento
https://youtu.be/A9ZOS4LdcOM
  
     
