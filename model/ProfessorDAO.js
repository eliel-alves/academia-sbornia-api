const Professor = require('./Professor');

module.exports =  class ProfessorDAO {

    constructor() {
        this.professores = [];
    }

    add( professor ) {
        this.professores[professor.id] = professor;
    }

    get( id ) {
        let index;

        this.professores.forEach( professor => {
            if (professor.id === Number(id)) {
                index = this.professores.indexOf(professor);
            }
        })

        return this.professores[index];
    }

    remove( id ) {
        this.professores.splice(this.professores.indexOf(this.get(id)), 1);
    }

    update( professor ) {
        this.professores[this.professores.indexOf(this.get(professor.id))] = professor;
    }

    all() {
        return this.professores;
    }

    getNextID() {
        return this.professores.length;
    }

}