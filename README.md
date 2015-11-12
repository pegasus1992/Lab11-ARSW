Laboratorio ROCA (Resource Oriented Services Architecture)-Angular-HTML5-Js
===========================================================================

Este ejercicio permite crear una aplicación que utiliza un servicio web
REST que para una aplicación de dibujo de *planos* básica.

Parte I
=======

Repositorio
-----------

Clone el proyecto [spring-angular-js](https://github.com/ARSW-ECI/spring-angular-js).

* Cree un nuevo repositorio utilizando la interface web de Github, en
  la pestaña de repositorios seleccione la opción de crear un nuevo
  repositorio.

* Coloque un nombre y seleccione el tipo de repositorio público.

* Verifique el host del repositorio actual
`````bash
git remote -v
`````
  
* Redireccione el repositorio clonado al nuevo repositorio:
`````bash
git remote set-url origin <url-repositorio>
`````
donde `<url-repositorio>` es el nombre del repositorio creado en su cuenta

* Verifique que el repositorio fue modificado.

Revisión
--------

* Ejecute la aplicación, y revise la funcionalidad del API incluido en el mismo, accediendo a la URL 
[/blueprints](http://localhost:8080/blueprints)

* Revise  el  módulo  definido  en  el  archivo  de  javascript  `appmodule.js`,  e identifique el nombre asignado al mismo.

* Habilite la página principal (index.html) como una aplicación de `Angular.js` incluyendo la directiva `ng-app` en el tag `<html>`:
````xml
<html ng-app="<nombre_del_modulo>">
````
* En  el cuerpo  de  la  página `index.html`,  agregue  una expresión `angular`, por  ejemplo, `{{23+17}}`, ejecute  la  aplicación  y  verifique que la  expresión se interpreta  correctamente  (con  esto  se  garantiza  que  todo está correctamente configurado).

Parte II
========

El objetivo de la segunda parte del taller es crear una aplicación Javascript con las siguientes características:

* Liste los *planos* disponibles en el API REST.
* Al seleccionar un plano, la aplicación lo grafique.

Angular
-------

* Cree un nuevo controlador asociado al módulo de javascript:
````Js
app.controller('plan_control', 
    function($scope,$http){
        
    }
};
````

* Dentro de la función del controlador, 
inicialice un atributo de tipo arreglo dentro del `$scope`, 
para mantener la lista de los nombres de los planos del API, 
y agregue una variable en la que se almacene el nombre del plano seleccionado.

* En  la  página  html agregue un  formulario  con  un  elemento  de  tipo `<select>`,
en  el  cual  se  mostrará  el  listado  de  planos  disponibles,
y  se podrá  seleccionar  uno. 
Haga  que  dicho  formulario  esté  asociado  al controlador  definido  anteriormente
mediante  la  directiva  `ng-controller`,  y que el elemento `<select>` quede 
asociado a la variable del controlador en la que se almacenará 
el nombre del plano seleccioando. Adicionalmente, las opciones  de  este 
`<select>` debe  corresponder  a  los  elementos  de  la variable  de  `$scope` 
en  la  que  se almacena  la  lista  de  los  nombres  de  los planos.

````xml
<select ng-model="<blueprint_controller_variable>">
    <option  ng-repeat="o in <var_blueprints>" value="{{o}}">
    {{o}}
    </option>
</select>
````

* Agregue al controlador una  función  que  permita  consultar  al  API  REST
la  lista  de  los  nombres  de los  planos y cuando obtenga la respuesta 
de la petición GET correspondiente, el resultado de la misma debe asignarse 
a la variable de `$scope` que definió para mantener la lista de los planos. 

```Js
$scope.loadData = function() {
    var configList = {
        method: "GET",
        url: "blueprints"
    };

    var response=$http(configList);

    response.success(function(data, status, headers, config) {
        $scope.<var_blueprints> = data;
    });

    response.error(function(data, status, headers, config) {
        alert("The petition has failed. HTTP Status:"+status);
    });
};
```

* Agregue  un  botón *Load blueprints* que  invoque  dicha  función,
y  verifique que el elemento `<select>` muestra el listado una vez
el botón sea oprimido.

* Agregue al *html* un  elemento  `Canvas`  de  al  menos  800x600  pixeles,
sin  olvidar asociarle un identificador.

* En el controlador, agregue una función que consulte el plano seleccionado
actualmente (a partir de su nombre, haciendo una petición GET al recurso 
`blueprints/{nombre_del_blueprint}`,   y   que   una   vez   reciba
la respuesta lo grafique en el Canvas. 

* Para poder acceder al contexto de un canvas (para dibujar), la sintaxis en JavaScript es:

````Js
var cnv= document.getElementById("identificador_del_canvas");
var ctx = cnv.getContext("2d");
````

Para  graficar,  usando  dicho  contexto,  revise los [ejemplos](www.w3schools.com/html/html5_canvas.asp) 
y la  referencia  completa  en [w3schools](http://www.w3schools.com/tags/ref_canvas.asp).

* Agregar el botón *Draw*, el cual invoque la función creada para dibujar el plano seleccionado.

* Agregue al *html* un elemento `svg` de al menos 800x600 pixeles, sin olvidar asociarle un identificador. 
Añada el código necesario para que el dibujo se grafique en el elemento `svg`. Para pintar en el svg,
revise los [ejemplos](http://www.w3schools.com/svg/svg_inhtml.asp) 
y la  referencia  completa  en [w3schools](http://www.w3schools.com/svg/svg_reference.asp).

Para crear elementos dentro del tag SVG debe utilizar `createElementNS` en lugar de `createElement`:
```Js
<elem> = document.createElementNS("http://www.w3.org/2000/svg","<elemento>");
```

Utilice el siguiente código para adicionar atributos a un elemento `<elem>` que haya creado:
```
<elem>.setAttribute('<attr>',<value>);
```

Parte III - Opcional
====================

* Revise la documentación del [manejo de eventos del mouse](http://www.informit.com/articles/article.aspx?p=1903884&seqNum=6),
aplicados (en particular) a un elemento Canvas.

* Revise el siguiente [ejemplo](http://plnkr.co/edit/WVNDG9sgYgoWaNlrNCVC?p=preview), donde se muestra cómo se puede acceder a un contexto `Angular.js` desde un JavaScript externo.

*  Utilice lo anterior para implementar la funcionalidad para agregar nuevos ‘planos’ al API (dibujándolos  en  este  o  en  otro  canvas),  a  través  de  peticiones POST:

```Js
$http.post('blueprints', this.<nombredelobjeto>)
.success(function (data, status, headers, config) {alert('success!');})
.error(function (data, status, headers, config) {alert('error!');});
```

