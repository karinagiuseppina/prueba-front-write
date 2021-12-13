
# Write Me In
Write Me In es un sistema web dirigido principalmente a escritores noveles y extensible a cualquier escritor que desee planificar las historias que desea escribir. 
El sistema tendrá funcionalidades disponibles para usuarios no registrados que les permitirá obtener ideas aleatorias sobre posibles líneas de actuación (writing prompts) dentro de una historia de un específico género literario, así como la obtención de ideas aleatorias sobre personajes (personajes generados) que pueden incluirse en sus historias, se ofrecerán al usuario datos como: nombre, apellido, edad, ocupación y personalidad. 

Al mismo tiempo, a los usuarios registrados se les da la opción de poder guardar los writing prompts y personajes generados que más le gusten para acceder a ellos en un futuro. 

Dentro del sistema web, un usuario registrado puede planificar su historia de distintas maneras, para ello cuenta con la creación de tres elementos que le ayudarán a almacenar toda la información necesaria en una misma página:

-	Plots: línea de actuación de la historia en donde se puede definir el posible título de la novela, sinopsis y género literario. Así como los eventos que ocurrirán dentro de él especificando por cada uno la fecha y una breve descripción. 

-	Personajes propios: personajes desarrollados por el usuario en donde se puede definir su nombre, apodo, edad, nacionalidad, género, ocupación, orientación sexual, personalidad, apariencia, color de cabello, color de piel, color de ojos. 

-	Sociedades: descripción de un territorio o especie sobre la que se basa una historia, el concepto de sociedades puede ser utilizado de distintas maneras dependiendo de cómo se desee implementar, el primer caso es a través de la descripción de un nuevo territorio, por ejemplo, el mundo de Arda para El Señor de los Anillos. Sin embargo, también es posible describir detalles sobre nuevas especies, por ejemplo, los magos en Harry Potter. 

## Sistema Web desplegado
https://write-me-in.herokuapp.com/

## Edición del código
### Back-End:
1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Run the application: `$ pipenv run start`


### Front-End:
1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

