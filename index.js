//Cria uma lista vazia para ser consultada pelo storage
let mainContactList = [];

//Funcao para adicionar os dados na tabela
function addContactToTable(contactName, contactPhone1, contactPhone2) {
    //Cria novos elementos para a tabela, linhas e colunas
    const newLine = document.createElement('tr');
    const contactNameTable = document.createElement('td');
    const contactPhone1Table = document.createElement('td');
    const contactPhone2Table = document.createElement('td');

    //Preenche as colunas com os valores
    contactNameTable.innerText = contactName;
    contactPhone1Table.innerText = contactPhone1;
    contactPhone2Table.innerText = contactPhone2;

    //Insere as colunas com na nova linha
    newLine.appendChild(contactNameTable);
    newLine.appendChild(contactPhone1Table);
    newLine.appendChild(contactPhone2Table);

    //Variável para adicionar os dados na tabela
    const contactList = document.getElementById("contact_table");

    //Utiliza a variável criada anteriormente para adicionar dados à nova linha da tabela
    contactList.appendChild(newLine);

}


//Funcao para obter os dados nos inputs (nome, telefone 1 e 2)
function saveContact() {
    //Obtem os dados informados no input:
    const contactNameInput = document.getElementById("contact_name");
    const contactPhone1Input = document.getElementById("primary_phone");
    const contactPhone2Input = document.getElementById("secondary_phone");

    //Valida se os campos obrigatórios foram preenchidos
    if (!contactNameInput.value || !contactPhone1Input.value) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    //Cria um novo objeto com os valores de nome, telefone 1 e telefone 2
    const newContact = {
        contactName: contactNameInput.value,
        contactPhone1: contactPhone1Input.value,
        contactPhone2: contactPhone2Input.value
    }

    //Chama a funcao para adicionar os dados na tela
    addContactToTable(newContact.contactName, newContact.contactPhone1, newContact.contactPhone2);

    //Salva os dados na lista principal e armazena no browser (storage)
    mainContactList.push(newContact);
    localStorage.setItem("contact_table", JSON.stringify(mainContactList));
}


//Funcao para armazenar os dados no browser (storage)
function loadContacts() {
    const storage = JSON.parse(localStorage.getItem("contact_table"));
    mainContactList = storage ? storage : [];
    for (let contact of mainContactList) {
        contactName = contact.contactName;
        contactPhone1 = contact.contactPhone1;
        contactPhone2 = contact.contactPhone2;
        addContactToTable(contactName, contactPhone1, contactPhone2);
    }

}

function setupEventListeners() {
    loadContacts();
    const saveButton = document.getElementById("contact_button");
    saveButton.addEventListener("click", saveContact);

}

window.addEventListener("load", setupEventListeners);