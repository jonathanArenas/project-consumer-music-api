1. ¿Cuál lenguaje y que tipos de diagramas se utilizan para
   diseñar clases?
   
   UML (Lenguaje Unificado de Modelado)

* Diagrama de clases
* Diagrama de objetos

2. Haga una paráfrasis de la definición de una clase, objeto
   o instancia, atributo, método. Incluir un ejemplo.
   
   Una clase es el diseño de la estructura y el funcionamiento que tendrá una entidad o tipo de dato, plasmado o definido en código.

```
//SINTAXIS
class {
   constructor(param1,param2){
   this.param1 = param1;
   this.param2 = param2;
   }
   //methods
   
}
   
//Ejemplo
   
   class Persona {
   
   constructor(name, edad,){
   this.name = this.name;
   this.edad = this.edad;
   
   }
   
   comer(){
   	console.log('Estoy comiendo');
   }
}
```

   Más sin embargo un objeto es el elemento (tipo de dato) que se crea a partir de la clase y que tiene vida en el momento de ejecución. Esto no es igual en Javascript, ya que puedes crear objetos literales sin instanciar una clase.

```
//EJEMPLO INSTANCIANDO CLASE

   const persona = new Persona('Maria',18);
   persona.comer();

   //OBJETO LITERAL

   const persona = {
   name: name,
   edad: edad,

   comer : function(){
	console.log('Estoy comiendo')
   }
}
persona.name = 'Maria';
persona.edad = 18;
persona.comer();
```

 Un atributo es una propiedad propia de la naturaleza de un objeto el cual define su estado, mientras los métodos son las funciones que puede tener dicho objeto, es decir, su comportamiento.

```
class nombreClase{
	//Propiedades
	cosntructor(propiedad1, propiedad2){
	//asignando valores a las propiedades del objeto
	this.propiedad1 = propiedad1;
	this.propiedad2 = propiedad2;
}
	//métodos del objeto
	nombreMetodo(){
	//funcionalidad
	}

}
```

3. Codificar con la sintaxis que desee una herencia de 3
   clases (1 padre y dos hijas).
   
   Ver archivos ./class.js
4. Explicar la diferencia entre prototipos y clases.
   
   La diferencia está prácticamente en la sintaxis para diseñar clases o la definición de atributos y funciones de los objetos. Anteriormente la forma habitual de hacerlo es a través de ‘prototype’ algo un poco más complejo de entender si vienes de la Programación Orientada a Objetos en un lenguaje fuertemente tipado.
   **Nota:** Puede ver el ejemplo que se da en en la prengunta 2 con respecto a las clases.

```

```

