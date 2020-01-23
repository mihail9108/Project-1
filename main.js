let d = document,
    container = d.querySelector('#container'),
    arr = [],
    boxes = [],
    list = [];

$.get('http://test1.web-gu.ru/')
    .then(data => {
        console.log(data);

        createTree(container, data);
    })
    .fail(e => {
        console.log(e)
    });

function createTree(container, data) {
    container.append(createTreeDom(data));
}

function createTreeDom(data) {
    // super
    superFunc(data);
    data = [];
    arr = [];
    // category
    categoryFunc(data);
    // items
    itemsFunc(data);
}

function superFunc(data) {
    data.forEach((el, index) =>  {
        if (typeof data[el.parent_id] == 'undefined') {
            let div = d.createElement('div'), h3 = d.createElement('h3');
            h3.innerHTML = el.name;
            div.appendChild(h3);
            container.appendChild(div);
            boxes[index] = div;
        } else {
            list[index] = {'parent_id': el.parent_id, 'name': el.name};
        }
    });
}

function categoryFunc(data) {
    for (let x in list) {
        if (typeof boxes[list[x].parent_id] != 'undefined') {
            let ul = d.createElement('ul'), h4 = d.createElement('h4');
            h4.innerHTML = list[x].name;
            boxes[list[x].parent_id].appendChild(h4);
            boxes[list[x].parent_id].appendChild(ul);
            data[x] = ul;
        } else {
            arr[x] = {'parent_id': list[x].parent_id, 'name': list[x].name};
        }
    }
}

function itemsFunc(data) {
    for (let x in arr) {
        let li = d.createElement('li');
        li.innerHTML = list[x].name;
        data[arr[x].parent_id].appendChild(li);
    }
}