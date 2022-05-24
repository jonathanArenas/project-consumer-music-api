//clase Padre - Electrodomestico

class Electrodomestico{
    constructor(color, material, precio, electricidad){
        this.color = color;
        this.material = material;
        this.precio = precio
        this.electricidad = electricidad;
    }

    enciende(){
        console.log('encendiendo...')
    }

}


//Clase hija 1 - Lavadora

class Lavadora extends Electrodomestico{
    constructor(color, material, precio, electricidad, soportaPeso){
        super(color, material, precio, electricidad);
        this.soportaPeso = soportaPeso;
    }

    

    lavar(){
        console.log('Lavando... no abra la cupierta');
    }
    cerrarCubierta(){
        console.log('cubierta cerrada');
    }
    abrirCubierta(){
        console.log('abriendo cubierta');
    }

}

//Clase hija 2 - Television

class Television extends Electrodomestico{

    constructor(color, material, electricidad,pulgadas, resolucion){
        super(color, material, electricidad);
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
        this.canal = 0;
    }

    sintonizar(){
        console.log('Sintonizando canal.. '+this.canal +' ..');
    }

    nextChanel(){
        this.canal++;
    }

    previosChanel(){
        this.canal--;
    }


}

//INSTANCIANDO OBJETOS
const electrodomestico = new Electrodomestico('black','plastico',5000,110);
const lavadora = new Lavadora('white', 'aluminio', 8000, 220,40);
const television = new Television('black', 'plastico', 7000, 110, 43, '4K');

electrodomestico.enciende();
lavadora.abrirCubierta();
lavadora.cerrarCubierta();
lavadora.lavar();
lavadora.abrirCubierta();
television.sintonizar();
television.nextChanel();
television.sintonizar();
television.previosChanel();
television.sintonizar();


/**
 * RESULTADO
 * encendiendo...
class.js:33 abriendo cubierta
class.js:30 cubierta cerrada
class.js:27 Lavando... no abra la cupierta
class.js:33 abriendo cubierta
class.js:50 Sintonizando canal.. 0 ..
class.js:50 Sintonizando canal.. 1 ..
class.js:50 Sintonizando canal.. 0 ..
 * 
 */