# tp1-cursojs
## Proyecto de aplicación para carga y obtención de recetas de cocina. Comienza a desarrollarse como entregable del curso JS flex de Coderhouse

# 1º Actualización
La siguiente aplicación busca brindar una solución a los usuarios que requieran resolver un menú. Como etapa inicial se dispone de una base de datos en formato de array de objetos, dentro del mismo archivo js, de la cual el usuario obtiene los datos que vaya requiriendo, pudiendo optar por especificar la cantidad de porciones deseadas. Como etapa final se prentende que el usuario pueda agregar sus propias recetas, y a manera inversa (que es lo que creo que será lo más útil e interesante) cargar los ingredientes con los que cuenta y que la aplicación devuelva las posibles recetas que puede preparar en base a eso.

# 2ª Actualización
>Se trabaja sobre el código en general, agregando interacción sobre los botones, mejorando la información que se muestra en cada momento (o lista de recetas o lista de ingredientes/preparación).
>Se agrega un sistema de almacenamiento de receta favorita, con posibilidad de recuperarla directamente en el futuro.

# 3ª Actualización
>Se separa la base de datos del código, en un archivo JSON aparte.
>Se agrega una barra buscadora, para posibilitar la búsqueda de recetas por nombre.
>Se trabaja sobre las funciones, haciéndolas más escalables y reutilizables.
>Se trabaja sobre la lista de favoritos, agregando fecha.
>Se actualizan todos los alerts y prompts con la libreria SweetAlert 2.
>Se agrega un bloque try catch anidado para cargar la base de datos desde el archivo o local o el repositorio, ya que estaba dando fallos en el deploy.
