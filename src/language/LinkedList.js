class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, nextItem) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === nextItem) {
      this.insertFirst(item);
    }

    let tempNode = this.head;
    let previousNode = this.head;

    while ((tempNode !== null) && (tempNode.value !== nextItem)) {
      previousNode = tempNode;
      tempNode = tempNode.next;
    }
    if (tempNode === null) {
      return;
    }
    previousNode.next = new _Node(item, tempNode);
  }

  insertAfter(item, prevItem) {
    if (!this.head) {
      return null;
    }
    
    let tempNode = this.head;

    while ((tempNode !== null) && (tempNode.value !== prevItem)) {
      tempNode = tempNode.next;
    }
    if (tempNode === null) {
      return;
    }
    const tempNext = tempNode.next;
    tempNode.next = new _Node(item, tempNext);
  }

  insertAt(item, index) {
    if (!this.head) {
      return null;
    }

    let tempNode = this.head;
    let previousNode = this.head;
    let tempIndex = 0;

    while((tempNode !== null) && (tempIndex !== index)) {
      previousNode = tempNode;
      tempNode = tempNode.next;
      tempIndex++;
    }
    if (tempNode === null && tempIndex !== index) {
      return;
    }
    previousNode.next = new _Node(item, tempNode);
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let tempNode = this.head;
    let previousNode = this.head;

    while ((tempNode !== null) && (tempNode.value !== item)) {
      previousNode = tempNode;
      tempNode = tempNode.next;
    }
    if (tempNode === null) {
      return;
    }
    previousNode.next = tempNode.next;
  }

  find(item) {
    if (!this.head) {
      return null;
    }

    let tempNode = this.head;
    while (tempNode.value !== item) {
      if (tempNode.next === null) {
        return null;
      } else {
        tempNode = tempNode.next;
      }
    }
    return tempNode;
  }
}

function listInsertAt(list, value, index) {
  if (!list.head) {
    return null;
  }

  let tempNode = list.head;
  let previousNode = list.head;
  let tempIndex = 0;

  while((tempNode !== null) && (tempIndex !== index)) {
    previousNode = tempNode;
    tempNode = tempNode.next;
    tempIndex++;
  }
  if (tempNode === null && tempIndex !== index) {
    previousNode.value.next = value.id;
    previousNode.next = new _Node(
      {
        ...value,
        next: null
      }, 
      tempNode
    );
    return;
  }
  previousNode.value.next = value.id;
  previousNode.next = new _Node(
    {
      ...value,
      next: previousNode.next.value.id
    }, 
    tempNode
  );
}

module.exports = {
  LinkedList,
  listInsertAt
}; 