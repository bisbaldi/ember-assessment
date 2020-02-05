import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  url: attr(),
  filename: attr('string'),
  filesize: attr('number'),
  filetype: attr('string')
})
