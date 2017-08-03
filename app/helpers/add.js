import Ember from 'ember';

export function add(params) {
  return params.reduce((a, b) => Number(a) + Number(b));
}

export default Ember.Helper.helper(add);
