function deepCopyFunction(obj) {
  let copyObj = obj.bind({});
  return copyObj;
}

function deepCopyArray(obj) {
  let copyObj = [...obj];
  copyObj.forEach((val, index) => {
    if (typeof val === "object") {
      if (Array.isArray(val)) {
        copyObj[index] = deepCopyArray(val);
      } else {
        copyObj[index] = deepCopyObject(val);
      }
    } else if (typeof val === "function") {
      copyObj[index] = deepCopyFunction(val);
    }
  });
  return copyObj;
}

function deepCopyObject(obj) {
  let copyObj = { ...obj };
  Object.keys(copyObj).forEach((key) => {
    let val = copyObj[key];
    if (typeof val === "object") {
      if (Array.isArray(val)) {
        copyObj[key] = deepCopyArray(val);
      } else {
        copyObj[key] = deepCopyObject(val);
      }
    } else if (typeof val === "function") {
      copyObj[key] = deepCopyFunction(val);
    }
  });
  return copyObj;
}

function deepCopy(obj) {
  let copyObj;
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      copyObj = deepCopyArray(obj);
    } else {
      copyObj = deepCopyObject(obj);
    }
  } else if (typeof obj === "function") {
    copyObj = deepCopyFunction(obj);
  }
  return copyObj;
}

const a = {
  one: "one",
  two: "two",
  arr: [1, 2, 3],
  fn: () => {
    console.log("some function");
  },
  nested: {
    three: "three",
    four: "four",
  },
};
const b = deepCopy(a);
console.log(a.nested === b.nested); // should be false
console.log(a.nested.three === b.nested.three); // should be true (same for all primitives)
console.log(a.arr === b.arr); // false
console.log(
  a.arr[0] === b.arr[0],
  a.arr[1] === b.arr[1],
  a.arr[2] === b.arr[2]
); // true, true, true
console.log(a.fn === b.fn);
