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
  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
    return console.log('removed');
  }
  insertBefore(newNode, value) {
    let currNode = this.head;
    let previousNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== value) {
      if (currNode.next === null) {
        return new Error('Not found');
      } else {
        previousNode = currNode;
        currNode = currNode.next;
      }
    }
    previousNode.next = new _Node(newNode, currNode);
    return console.log('Successfully added');
  }
  insertAfter(newNode, value) {
    let currNode = this.head;
    let previousNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== value) {
      if (currNode.next === null) {
        return new Error('Not found');
      } else {
        previousNode = currNode;
        currNode = currNode.next;
      }
    }
    currNode.next = new _Node(newNode, currNode.next);
    console.log(currNode.next);
    return console.log('Successfully added');
  }
  insertAt(newNode, position) {
    let currNode = this.head;
    let previousNode = this.head;

    if (!this.head) {
      return null;
    }
    let counter = 0;
    while (counter < position) {
      if (currNode.next === null) {
        return new Error('Linked list not long enough');
      } else {
        previousNode = currNode;
        currNode = currNode.next;
      }
      counter++;
    }

    previousNode.next = new _Node(newNode, currNode);
    console.log(previousNode.next);
    return console.log(`Successfully added at ${position}`);
  }
}

module.exports = LinkedList;