#!/usr/bin/env node
class LinkedList {
    #head;
    #list;
    constructor() {
        this.#head = null;
        this.#list = {};
    }
    append(key, value) {
        if (this.#head == null) {
            this.prepend(key, value);
        } else {
            this.tail.nextNode = new Node(value, null, key);
        }
    }

    prepend(key, value) {
        this.#head = new Node(value, this.#head, key);
        this.#list.head = this.#head;
    }

    get size() {
        if (this.#head == null) return "List is Empty!";

        let counter = 1;
        let temp = this.#head;
        while (temp.nextNode != null) {
            counter++;
            temp = temp.nextNode;
        }
        return counter;
    }

    get getHead() {
        if (this.#head == null) return "List is Empty!";
        return this.#list.head;
    }

    get tail() {
        if (this.#head == null) return "List is Empty!";
        let lastNode = this.#head;
        while (lastNode.nextNode != null) {
            lastNode = lastNode.nextNode;
        }
        return lastNode;
    }

    at(index) {
        if (this.#head == null) return "List is Empty!";
        let temp = this.#head;
        let counter = 0;
        while (temp != undefined) {
            if (counter == index) {
                return temp;
            } else {
                counter++;
                temp = temp.nextNode;
            }
        }
    }

    pop() {
        if (this.#head == null) return "List is Empty!";
        let prev = null;
        let curr = this.#head;
        if (curr == this.tail) {
            curr = curr.nextNode;
            return;
        }
        while (curr.nextNode != null) {
            prev = curr;
            curr = curr.nextNode;
        }
        prev.nextNode = curr.nextNode;
    }

    contains(key) {
        let temp = this.#head;
        while (temp !== null && temp.key !== key) {
            temp = temp.nextNode;
        }
        // if the value is not in the list
        if (temp == null || temp == undefined) {
            return false;
        }
        return true;
    }

    find(key) {
        let temp = this.#head;
        let counter = 0;
        while (temp !== null && temp.key !== key) {
            counter++;
            temp = temp.nextNode;
        }
        if (temp !== null) return counter;
        return null;
    }

    toString() {
        let stringList = "";
        let temp = this.#head;

        while (temp !== null) {
            stringList += `( ${temp.value} ) -> `;
            temp = temp.nextNode;
        }

        return (stringList += null);
    }

    insertAt(value, index) {
        if (this.#head == null) {
            this.prepend(value);
            return;
        }
        if (index < 0 || index > this.size) {
            return `index should be between 0 and ${this.size}`;
        }
        let prev = null;
        let curr = this.#head;
        let counter = 0;

        while (curr != null && counter !== index) {
            counter++;
            prev = curr;
            curr = curr.nextNode;
        }
        prev.nextNode = new Node(value, curr);
    }

    removeAt(index) {
        if (this.#head == null) return "List is Empty!";
        if (index < 0 || index > this.size) {
            return `index should be between 0 and ${this.size}`;
        }
        // if removing the head
        if (index == 0) {
            this.#head = this.#head.nextNode;
            return;
        }
        let curr = this.#head;
        let prev = null;
        let counter = 0;

        // if there is only one element
        if (curr == this.tail) {
            this.pop();
            return;
        }
        while (curr !== null && counter !== index) {
            console.log(prev);
            counter++;
            prev = curr;
            curr = curr.nextNode;
        }

        prev.nextNode = curr.nextNode;
    }
}

class Node {
    constructor(value = null, nextNode = null, key = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

const HashMap = () => {
    const buckets = new Array(16);

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
        }

        return hashCode;
    }
    function set(key, value) {
        const index = hash(key);
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (buckets[index] != undefined) {
            const existingList = buckets[index];
            if (existingList.contains(key)) {
                const indexOfKeyInsideList = existingList.find(key);
                existingList.at(indexOfKeyInsideList).value = value;
            }
            // We have collision
            else {
                existingList.append(key, value);
            }
        } else if (buckets[index] == undefined) {
            buckets[index] = new LinkedList();
            const newList = buckets[index];
            newList.append(key, value);
        }

        //implement code that grows the bucket here
    }
    function getBuckets() {
        return buckets;
    }
    function get(key) {
        const index = hash(key);
        if (buckets[index]) {
            const indexOfKeyInsideList = buckets[index].find(key);
            return buckets[index].at(indexOfKeyInsideList).value;
        } else return null;
    }

    function has(key) {
        const value = get(key);
        if (value != null) return true;
        else return false;
    }

    function remove(key) {
        const keyExists = has(key);
        if (keyExists) {
            const indexInHashMap = hash(key);
            const indexInLinkedList = buckets[indexInHashMap].find(key);
            buckets[indexInHashMap].removeAt(indexInLinkedList);

            return true;
        } else return false;
    }
    function length() {
        const filteredBuckets = buckets.filter(
            (bucket) => bucket !== undefined
        );
        let totalKeys = 0;

        filteredBuckets.forEach((list) => {
            totalKeys += list.size;
        });
        return totalKeys;
    }
    return { hash, set, getBuckets, get, has, remove, length };
};

const map = HashMap();
console.log(map.hash("a"));
console.log(map.set("yousif", "32"));
console.log(map.set("yousif", "23"));
console.log(map.set("a", "55"));
console.log(map.getBuckets());
console.log(map.get("youif"));
console.log(map.has("youif"));
console.log(map.remove("yousif"));
console.log(map.set("yasser", "34"));
console.log(map.set("yousif", "23"));
console.log(map.length());
console.log(map.getBuckets());
