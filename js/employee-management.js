/*eslint-env browser*/
/*jslint browser */
/*global window */

var employeeList;

var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};
function init() {
    "use strict";
    employeeList = [
        {name: "Sally Smith", title: "Quality Assurance", extension: 3423},
        {name: "Mark Martin", title: "VP Sales", extension: 3346},
        {name: "John Johnson", title: "Marketing", extension: 3232},
        {name: "Raymond Ray", title: "Operationa", extension: 3422},
        {name: "Maria Gonzalez", title: "CEO", extension: 3847}
    ];

    showEmployees();

    var addBtn = $('addBtn');
    addBtn.addEventListener('click', addEmployee);
}
window.addEventListener('load', init);

function showEmployees() {
    "use strict";
    var table = $('tableMain');
    var tbody = table.getElementsByClassName('tableBody')[0];
    var i;
    var employeeRow;
    var deleteBtn;
    tbody.innerHTML = '';

    for (i = 0; i < employeeList.length; i+=1) {
        employeeRow = document.createElement('tr');
        employeeRow.insertCell(0).innerHTML = employeeList[i].name;
        employeeRow.insertCell(1).innerHTML = employeeList[i].title;
        employeeRow.insertCell(2).innerHTML = employeeList[i].extension;

        deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', employeeList[i].extension);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', function(del) {
            var extension = del.currentTarget.id;
            deleteEmployee(extension);
        });

        employeeRow.insertCell(3).append(deleteBtn);

        tbody.append(employeeRow);
    }

    var count = $('count');
    count.innerHTML = employeeList.length;
}

function deleteEmployee(extension) {
    "use strict";
    employeeList = employeeList.filter(function(employee) {
        return employee.extension != extension;
    });

    showEmployees();
}

function addEmployee(event) {
    "use strict";
    event.preventDefault();
    var i;
    var error = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[id="name"]');
    var title = form.querySelector('input[id="title"]');
    var extension = form.querySelector('input[id="extension"]');

    var input = [name, title, extension];
    for (i = 0; i < input.length; i+=1) {
        if (input[i].value === '') {
            error = true;
        }
    }

    if (error) {
        return false;
    }

    employeeList.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    showEmployees();
};

