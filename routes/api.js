var express = require('express');
var router = express.Router();

// Imports
let Disciplina = require('../model/Disciplina');
let DisciplinaDAO = require('../model/DisciplinaDAO');
let Professor = require('../model/Professor');
let ProfessorDAO = require('../model/ProfessorDAO');

// DAOS
let disciplinaDAO = new DisciplinaDAO();
let professorDAO = new ProfessorDAO();

// Adição de Disciplinas
disciplinaDAO.add(new Disciplina(0, 'Programação Web', 'PW'));
disciplinaDAO.add(new Disciplina(1, 'Linguagem de Programação Emergentes', 'LPE'));
disciplinaDAO.add(new Disciplina(2, 'Serviços Web', 'SW'));
disciplinaDAO.add(new Disciplina(3, 'Trabalho de Conclusão I', 'TC1'));
disciplinaDAO.add(new Disciplina(4, 'Algoritmos I', 'A1'));

// Adição de Professores
professorDAO.add(new Professor(0, 'Jorge Bavaresco', '969.167.780-67', 'Mestre', 1));
professorDAO.add(new Professor(1, 'Élder Bernardi', '247.625.510-66', 'Mestre', 2));
professorDAO.add(new Professor(2, 'Josué Toebe', '761.397.640-84', 'Doutor', 3));
professorDAO.add(new Professor(3, 'Carmen Scorsatto', '205.348.550-75', 'Doutoranda', 4));

// Home API
router.get('/', function(req, res, next) {
    res.send('Sbonia University API v1.0.0');
});


/// DISCIPLINAS 

// Retorna lista de todos as disciplinas
router.get('/disciplinas', function(req,res,next) {
    res.send(disciplinaDAO.all());
});

// Posta uma lista com uma ou mais disciplinas
router.post('/disciplinas', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;

    // Se possui um objeto
    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos uma disciplina!'
        });
    } else {
        // Para cada item no body adiciona na lista
        data.forEach(item => {
            item.id = disciplinaDAO.getNextID();
            disciplinaDAO.add(item);
        });

        res.send(201, {
            status: 'success',
            message: 'Objeto(s) inserido(s) com sucesso!',
            data: data
        });
    }
});

// Atualiza a lista das disciplinas
router.put('/disciplinas', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;

    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos uma disciplina para substituir a lista!'
        });
    } else {
        disciplinaDAO = new DisciplinaDAO();

        data.forEach(item => {
            item.id = disciplinaDAO.getNextID();
            disciplinaDAO.add(item);
        });

        res.send(201, {
            status: 'success',
            message: 'Lista de disciplinas atualizada com sucesso!',
            data: data
        });
    }
});

// Remove todas as disciplinas
router.delete('/disciplinas', function(req, res, next) {
    disciplinaDAO = new DisciplinaDAO();

    res.send({
        status: 'success',
        message: 'Todos os registros foram removidos da lista!'
    });
});

// Retorna um objeto com um ID específico
router.get('/disciplinas/:id', function(req, res, next) {
    let data = disciplinaDAO.get(req.params.id);

    // Verifica se foi encontrado
    if(data === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não foi possível encontrar a disciplina!'
        });
    } else {
        res.send(data);
    }
});

// Atualiza um objeto com um ID específico
router.put('/disciplinas/:id', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;
    let dataReq = disciplinaDAO.get(req.params.id);

    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos uma disciplina para atualizar!'
        });
    } else if(dataReq === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não é possível atualizar um objeto que não existe!'
        });
    } else {
        data.id = Number(req.params.id);

        disciplinaDAO.update(data);

        res.send({
            status: 'success',
            message: 'Disciplina atualizada!',
            data: data
        });
    }
});

// Deleta um objeto com ID espefício
router.delete('/disciplinas/:id', function(req, res, next) {
    let data = disciplinaDAO.get(req.params.id);

    // Verifica se foi encontrado
    if(data === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não é possível remover uma disciplina que não existe!'
        });
    } else {
        disciplinaDAO.remove(req.params.id);

        res.send({
            status: 'success',
            message: 'Disciplina removida com sucesso!'
        });
    }
});


/// PROFESSORES

// Retorna lista de todos as disciplinas
router.get('/professores', function(req,res,next) {
    res.send(professorDAO.all());
});

// Posta uma lista com uma ou mais disciplinas
router.post('/professores', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;

    // Se possui um objeto
    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos um professor!'
        });
    } else {
        // Para cada item no body adiciona na lista
        data.forEach(item => {
            item.id = professorDAO.getNextID();
            professorDAO.add(item);
        });

        res.send(201, {
            status: 'success',
            message: 'Objeto(s) inserido(s) com sucesso!',
            data: data
        });
    }
});

// Atualiza a lista das disciplinas
router.put('/professores', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;

    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos um professor para substituir a lista!'
        });
    } else {
        professorDAO = new ProfessorDAO();

        data.forEach(item => {
            item.id = professorDAO.getNextID();
            professorDAO.add(item);
        });

        res.send(201, {
            status: 'success',
            message: 'Lista de professores atualizada com sucesso!',
            data: data
        });
    }
});

// Remove todas as disciplinas
router.delete('/professores', function(req, res, next) {
    professorDAO = new ProfessorDAO();

    res.send({
        status: 'success',
        message: 'Todos os registros foram removidos da lista!'
    });
});

// Retorna um objeto com um ID específico
router.get('/professores/:id', function(req, res, next) {
    let data = professorDAO.get(req.params.id);

    // Verifica se foi encontrado
    if(data === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não foi possível encontrar o professor!'
        });
    } else {
        res.send(data);
    }
});

// Atualiza um objeto com um ID específico
router.put('/professores/:id', function(req, res, next) {
    let data = req.body;
    let dataLength = Object.keys(data).length;
    let dataReq = professorDAO.get(req.params.id);

    if (dataLength <= 0) {
        res.send(400, {
            status: 'error',
            message: 'É necessário informar ao menos um professor para atualizar!'
        });
    } else if(dataReq === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não é possível atualizar um objeto que não existe!'
        });
    } else {
        data.id = Number(req.params.id);

        professorDAO.update(data);

        res.send({
            status: 'success',
            message: 'Professor atualizada!',
            data: data
        });
    }
});

// Deleta um objeto com ID espefício
router.delete('/professores/:id', function(req, res, next) {
    let data = professorDAO.get(req.params.id);

    // Verifica se foi encontrado
    if(data === undefined) {
        res.send(404, {
            status: 'error',
            message: 'Não é possível remover um professor que não existe!'
        });
    } else {
        professorDAO.remove(req.params.id);

        res.send({
            status: 'success',
            message: 'Professor removida com sucesso!'
        });
    }
});

module.exports = router;