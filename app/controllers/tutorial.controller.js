const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Cria e salvar um novo tutorial
exports.create = (req, res) => {

    if (!req.body.titulo) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });

        return;
    }

    // Cria um tutorial
    const tutorial = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado : false
    };
    // Salva tutorial no banco de dados
    Tutorial.create(tutorial).then(data => {
        res.send(data);
    })
    .cacth(err => {
        res.status(500).send({
            message: 
            err.message || "Ocorreu algum erro ao criar o tutorial."
        });
    });
};

// Recupere todos os tutoriais do banco de dados
exports.findAll = (req, res) => {

    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.like]: '%${titulo}&'}} : null;

    Tutorial.findAll({ where: condition}).then(data => {
        res.send(data);
    })
    .cacth(err => {
        res.status(500).send({
            message: 
            err.message || "Ocorreu algum erro ao recuperar os tutoriais."
        });
    });
};

// Encontrar tutorial por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id).then(data => {
        res.send(data);
    })
    .cacth(err => {
        res.status(500).send({
            message: "Erro ao recuperar o tutorial com id=" + id
        });
    });
};


// Atualize um tutorial pelo id na solicitação
exports.update = (req, res) => {

    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial foi atualizado com sucesso!."
            });
        } else {
            res.send({
                message: "Não é possível atualizar o Tutorial com id=${id}. Talvez o Tutorial não tenha sido encontrado ou req.body está vazio!"
            });
        }
    })
    .cacth(err => {
        res.status(500).send({
            message: "Erro ao atualizar Tutorial com id=" + id
        });
    });
};

// Exclua um tutorial com o id especificado na solicitação
exports.delete = (req, res) => {

    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id}
    })
    .then(num => {

        if (num == 1) {
            res.send({
            message: "Tutorial foi deletado com sucesso!."
        });
        } else {
            res.send({
                message: "Não é possível excluir o Tutorial com id=${id}. Talvez o Tutorial não tenha sido encontrado!"
            });
        }
    })
    .cacth(err => {
        res.status(500).send({
            message: "Não foi possível excluir o tutorial com id" + id
        });
    });
};

// Exclua todos os tutoriais do banco de dados
exports.deleteAll = (requ, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: '${nums} Tutoriais foram deletados com sucesso!.'});
    })
    .cacth(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao remover todos os tutoriais."
        });
    });
};

// Encontre todos os tutoriais publicados
exports.findAllPublished  = (req, res) => {
     Tutorial.findAll({ where: { publicado: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tutoriais."
      });
    });
};