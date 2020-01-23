let d = document, container = d.querySelector('#container'), arr = [], box = [], list = [];

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        JSON.stringify(data);
        console.log(data);

        createTree(container, data);
    }
};

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
            box[index] = div;
        } else {
            list[index] = {'parent_id': el.parent_id, 'name': el.name};
        }
    });
}

function categoryFunc(data) {
    for (let x in list) {
        if (typeof box[list[x].parent_id] != 'undefined') {
            let ul = d.createElement('ul'), h4 = d.createElement('h4');
            h4.innerHTML = list[x].name;
            box[list[x].parent_id].appendChild(h4);
            box[list[x].parent_id].appendChild(ul);
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


xmlhttp.open("GET", 'http://test1.web-gu.ru/', true);
xmlhttp.send();

