import _ from 'lodash';

const getNodeType = (oldValue, newValue) => {
  if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
    return 'internalNode';
  }
  if (newValue === undefined) {
    return 'deleted';
  }
  if (oldValue === undefined) {
    return 'added';
  }
  if (newValue === oldValue) {
    return 'notChanged';
  }
  return 'changed';
};

// тут получше имя не придумал...
const nodeTypes = {
  internalNode: (oldValue, newValue, parseSubtree) =>
    ({ children: parseSubtree(oldValue, newValue) }),
  deleted: oldValue => ({ oldValue }),
  added: (oldValue, newValue) => ({ newValue }),
  notChanged: (oldValue, newValue) => ({ newValue }),
  changed: (oldValue, newValue) => ({ newValue, oldValue }),
};

const parse = (firstConfig, secondConfig) => {
  const allUniqueNames = _.union(_.keys(firstConfig), _.keys(secondConfig));

  return _.reduce(allUniqueNames, (acc, nodeName) => {
    const oldValue = firstConfig[nodeName];
    const newValue = secondConfig[nodeName];
    const type = getNodeType(oldValue, newValue);
    const nodeProps = nodeTypes[type](oldValue, newValue, parse);
    return [...acc, { name: nodeName, type, ...nodeProps }];
  }, []);
};

export default parse;
