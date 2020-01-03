/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
'use strict';
import Vue from 'vue';
export default function treeToArray(data, expandAll, parent, level, item) {
  const marLTemp = [];
  let tmp = [];
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }
    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    // If there is parent element
    if (parent) {
      Vue.set(record, 'parent', parent);
      // If the parent element has an offset, it needs to be calculated in the offset of this
      // The offset is also related to the previous sibling element, and you need to add the length of all the previous elements and
      if (!marLTemp[_level]) {
        marLTemp[_level] = 0;
      }
      Vue.set(record, '_marginLeft', marLTemp[_level] + parent._marginLeft);
      Vue.set(record, '_width', record[item] / parent[item] * parent._width);
      // Add your own length after this offset has been calculated for the next element.
      marLTemp[_level] += record._width;
    } else {
      // If this is the rool element - initialize the offset storage map
      marLTemp[record.id] = [];
      // Map is an array that stores the length of each level and starts from 0
      marLTemp[record.id][_level] = 0;
      Vue.set(record, '_marginLeft', 0);
      Vue.set(record, '_width', 1);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level, item);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
