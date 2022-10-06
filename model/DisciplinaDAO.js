const Disciplina = require('./Disciplina');

module.exports =  class DisciplinaDAO {

    constructor() {
        this.disciplinas = [];
    }

    add( disciplina ) {
        this.disciplinas[disciplina.id] = disciplina;
    }

    get( id ) {
        let index;

        this.disciplinas.forEach( disciplina => {
            if (disciplina.id === Number(id)) {
                index = this.disciplinas.indexOf(disciplina);
            }
        })

        return this.disciplinas[index];
    }

    remove( id ) {
        this.disciplinas.splice(this.disciplinas.indexOf(this.get(id)), 1);
    }

    update( disciplina ) {
        this.disciplinas[this.disciplinas.indexOf(this.get(disciplina.id))] = disciplina;
    }

    all() {
        return this.disciplinas;
    }

    getNextID() {
        return this.disciplinas.length;
    }

}