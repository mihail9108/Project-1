let d = document, container = d.querySelector('#container'), arr = [], box = [], list = [];

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        JSON.stringify(data);
        console.log(data);

        function createTree(container, data) {
            container.append(createTreeDom(data));
        }

        function createTreeDom(data) {

            // super
            for (let x in data) {
                if (typeof data[data[x].parent_id] == 'undefined') {
                    let div = d.createElement('div'), h3 = d.createElement('h3');
                    h3.innerHTML = data[x].name;
                    div.appendChild(h3);
                    container.appendChild(div);
                    box[x] = div;
                } else {
                    list[x] = {'parent_id': data[x].parent_id, 'name': data[x].name};
                }
            }
            data = [];
            arr = [];
            // category
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
            // items
            for (let x in arr) {
                let li = d.createElement('li');
                li.innerHTML = list[x].name;
                data[arr[x].parent_id].appendChild(li);
            }
        }

        let container = document.getElementById('container');
        createTree(container, data);
    }
};

xmlhttp.open("GET", 'http://test1.web-gu.ru/', true);
xmlhttp.send();

