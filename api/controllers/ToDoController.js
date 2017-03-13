/**
 * ToDoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
    ToDo.find({ sort: 'order ASC' }).exec(function(err, toDoList) {
      if (err) return res.negotiate(err);

      return res.ok(toDoList);
    });
  },
  create: function(req, res) {
	  ToDo.create({
	    text: req.param('text'),
      category: req.param('category')
    }, function toDoCreated(err, newToDo) {
	    if (err) return res.negotiate(err);

	    // ToDo.publishCreate(newToDo.id, newToDo);

	    return res.ok(newToDo);
    });
  },
  update: function(req, res) {
    ToDo.findOne({
      id: req.param('id')
    }).exec(function(err) {
      if (err) return res.notFound();

      ToDo.update({
        id: req.param('id')
      }, {
        complete: req.param('complete')
      }).exec(function(error) {
        if (error) return res.badRequest(error);

        return res.ok();
      })
    });
  },
  updateGroup: function(req, res) {
    var list = req.param('toDoList');

    if (!list || (typeof list !== 'object' && list.length === 0)) return res.badRequest('The submitted group is not an array');

    for (var i = 0; i < list.length; i++) {
      ToDo.update({ id: list[i]["id"] }, { order: i + 1 }).exec(function(err, updatedToDo) {
        return true;
      });
    }

    // ToDo.publishUpdate('', null);

    return res.ok();
  },
  delete: function(req, res) {
	  ToDo.findOne({
	    id: req.param('id')
    }).exec(function(err) {
      if (err) return res.notFound();

      ToDo.destroy({
        id: req.param('id')
      }).exec(function() {
        return res.ok();
      });
    });
  },
  subscribe: function(req, res) {
    ToDo.find(function ToDoList(err, toDos) {
      if (err) return next(err);

      ToDo.subscribe(req, toDos);
    });
  }
};

