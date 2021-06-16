const Band = require("./band");

class BandList {

    constructor() {

        //Arreglo de bandas
        this.bands = [
            new Band('Metalica'),
            new Band('Heroes del silencio'),
            new Band('Bon Jovi'),
            new Band('Maroon 5'),
        ];
    }

    //Metodo para añadir una banda nueva
    addBand( name ){
        const newBand = new Band( name );
        this.bands = [ ...this.bands, newBand ];
        return this.bands;
    }
    //Metodo para borrar una banda
    removeBand( id ){
        this.bands = this.bands.filter( band => band.id !== id );
    }
    //Metodo para obtener bandas
    getBands(){
        return this.bands;
    }
    //Metodo para incrementar votos de una banda
    increaseVotes( id ){
        this.bands = this.bands.map( band => {

            if( band.id === id ){
                band.votes += 1;
            }

            return band;
        })
    }
    //Metodo para cambiar el nombre de una banda
    changeName( id, newName ){
        this.bands = this.bands.map( band => {

            if( band.id === id ){
                band.name = newName;
            }

            return band;
        })
    }

}

module.exports = BandList;