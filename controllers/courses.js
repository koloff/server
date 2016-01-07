'use strict';
let co = require('co');
let courses = require('../data/courses');

exports.save = function(req, res) {
  console.log('saving course controller...');
  let course = req.body;

  co(function *() {
    try {
      let savedCourse = yield courses.save(course);
      console.log('Course created');
      res.status(200).send({
        ok: true,
        course: savedCourse
      });
    } catch (err) {
      console.log('Error in creating course controller:');
      console.log(err.trace);
      res.status(500).send({reason: 'CANNOT_SAVE'});
    }
  });
};

exports.insertResources = function(req, res) {

  // test resource: 5687eece782df6cc21503a83 ruby 2015
  // test course: 5687ef1f782df6cc21503a84 petkan, dragan

  co(function *() {
    let courseId = req.params.courseId;
    let resourcesIds = req.body.resourcesIds;
    try {
      yield courses.insertResources(courseId, resourcesIds);
      console.log('Resources added!');
      res.status(200).send({ok: true});
    } catch(err) {
      console.log('Courses insert resources error from controller:');
      console.log(err);
    }
  });

};